import {
  formatIPAddress,
  formatRelativeTime,
  isSessionExpired,
  parseUserAgent,
} from "@/lib/utils";
import {
  AlertTriangle,
  Clock,
  Globe,
  Hash,
  Monitor,
  Shield,
  Smartphone,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Session {
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  impersonatedBy: string | null;
}

type SessionCardsProps = {
  userSessions: Session[];
};

export function SessionCards({ userSessions }: SessionCardsProps) {
  const [sessions, setSessions] = useState<Session[]>(userSessions);
  const [sessionToRevoke, setSessionToRevoke] = useState<Session | null>(null);
  const [showRevokeAllDialog, setShowRevokeAllDialog] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  // The most recent session is considered "current"
  const CURRENT_SESSION_ID = userSessions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0]?.id;

  const handleRevokeSession = async () => {
    if (!sessionToRevoke) return;

    setIsRevoking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSessions((prev) => prev.filter((s) => s.id !== sessionToRevoke.id));
    setSessionToRevoke(null);
    setIsRevoking(false);
  };

  const handleRevokeAllSessions = async () => {
    setIsRevoking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSessions((prev) => prev.filter((s) => s.id === CURRENT_SESSION_ID));
    setShowRevokeAllDialog(false);
    setIsRevoking(false);
  };

  const currentSession = sessions.find((s) => s.id === CURRENT_SESSION_ID);
  const otherSessions = sessions.filter((s) => s.id !== CURRENT_SESSION_ID);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <header className="border-border bg-card border-b">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Shield className="text-accent h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-2xl font-semibold">
                Active Sessions
              </h1>
              <p className="text-muted-foreground">
                Manage devices where you&apos;re currently logged in
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Current Session */}
        {currentSession && (
          <section className="mb-8">
            <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wider uppercase">
              Current Session
            </h2>
            <SessionCard session={currentSession} isCurrent />
          </section>
        )}

        {/* Other Sessions */}
        {otherSessions.length > 0 && (
          <section>
            <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wider uppercase">
              Other Sessions ({otherSessions.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onRevoke={() => setSessionToRevoke(session)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {otherSessions.length === 0 && (
          <div className="border-border bg-card/50 rounded-lg border border-dashed p-12 text-center">
            <Shield className="text-muted-foreground/50 mx-auto h-12 w-12" />
            <h3 className="text-foreground mt-4 text-lg font-medium">
              No other sessions
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              You&apos;re only logged in on this device
            </p>
          </div>
        )}
      </main>

      {/* Sticky Footer */}
      {otherSessions.length > 0 && (
        <div className="border-border bg-card/95 fixed inset-x-0 bottom-0 border-t backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>
                {otherSessions.length} other active session
                {otherSessions.length !== 1 ? "s" : ""}
              </span>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowRevokeAllDialog(true)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Revoke All Other Sessions
            </Button>
          </div>
        </div>
      )}

      {/* Revoke Single Session Dialog */}
      <AlertDialog
        open={!!sessionToRevoke}
        onOpenChange={() => setSessionToRevoke(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke this session? The device{" "}
              <span className="text-foreground font-medium">
                {sessionToRevoke
                  ? parseUserAgent(sessionToRevoke.userAgent).device
                  : ""}
              </span>{" "}
              will be logged out immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRevoking}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokeSession}
              disabled={isRevoking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRevoking ? "Revoking..." : "Revoke Session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Revoke All Sessions Dialog */}
      <AlertDialog
        open={showRevokeAllDialog}
        onOpenChange={setShowRevokeAllDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke All Sessions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke all other sessions? This will log
              you out from{" "}
              <span className="text-foreground font-medium">
                {otherSessions.length} device
                {otherSessions.length !== 1 ? "s" : ""}
              </span>
              . You will remain logged in on this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRevoking}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokeAllSessions}
              disabled={isRevoking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRevoking ? "Revoking..." : "Revoke All Sessions"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface SessionCardProps {
  session: Session;
  isCurrent?: boolean;
  onRevoke?: () => void;
}

function SessionCard({ session, isCurrent, onRevoke }: SessionCardProps) {
  const { device, browser, os, isMobile } = parseUserAgent(session.userAgent);
  const expired = isSessionExpired(session.expiresAt);
  const DeviceIcon = isMobile ? Smartphone : Monitor;

  return (
    <Card
      className={`${isCurrent ? "border-accent/30 bg-accent/5" : ""} ${expired ? "opacity-60" : ""}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                isCurrent
                  ? "bg-accent/15 text-accent"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <DeviceIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-foreground font-medium">{device}</h3>
                {isCurrent && (
                  <Badge
                    variant="secondary"
                    className="bg-accent/15 text-accent text-xs"
                  >
                    Current
                  </Badge>
                )}
                {expired && (
                  <Badge
                    variant="secondary"
                    className="bg-destructive/15 text-destructive text-xs"
                  >
                    Expired
                  </Badge>
                )}
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {browser} on {os}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Hash className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {formatIPAddress(session.ipAddress)}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>Last active {formatRelativeTime(session.updatedAt)}</span>
              </div>
            </div>
          </div>
          {!isCurrent && onRevoke && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRevoke}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Revoke session</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
