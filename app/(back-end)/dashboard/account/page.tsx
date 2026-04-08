"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Clock,
  Globe,
  MapPin,
  Monitor,
  Shield,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface Session {
  id: string;
  device: string;
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "MacBook Pro",
    deviceType: "desktop",
    browser: "Chrome 122",
    location: "San Francisco, CA",
    ipAddress: "192.168.1.1",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "iPhone 15 Pro",
    deviceType: "mobile",
    browser: "Safari 17",
    location: "San Francisco, CA",
    ipAddress: "192.168.1.2",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "3",
    device: "iPad Air",
    deviceType: "tablet",
    browser: "Safari 17",
    location: "New York, NY",
    ipAddress: "10.0.0.1",
    lastActive: "Yesterday",
    isCurrent: false,
  },
  {
    id: "4",
    device: "Windows PC",
    deviceType: "desktop",
    browser: "Firefox 123",
    location: "Austin, TX",
    ipAddress: "172.16.0.1",
    lastActive: "3 days ago",
    isCurrent: false,
  },
  {
    id: "5",
    device: "Samsung Galaxy S24",
    deviceType: "mobile",
    browser: "Chrome 122",
    location: "Chicago, IL",
    ipAddress: "192.168.2.1",
    lastActive: "1 week ago",
    isCurrent: false,
  },
  {
    id: "6",
    device: "Linux Desktop",
    deviceType: "desktop",
    browser: "Brave 1.63",
    location: "Seattle, WA",
    ipAddress: "10.1.1.1",
    lastActive: "2 weeks ago",
    isCurrent: false,
  },
];

function getDeviceIcon(deviceType: Session["deviceType"]) {
  switch (deviceType) {
    case "desktop":
      return Monitor;
    case "mobile":
      return Smartphone;
    case "tablet":
      return Tablet;
    default:
      return Monitor;
  }
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [sessionToRevoke, setSessionToRevoke] = useState<Session | null>(null);
  const [showRevokeAllDialog, setShowRevokeAllDialog] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

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
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    setShowRevokeAllDialog(false);
    setIsRevoking(false);
  };

  const otherSessions = sessions.filter((s) => !s.isCurrent);

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
        <section className="mb-8">
          <h2 className="text-muted-foreground mb-4 text-sm font-medium tracking-wider uppercase">
            Current Session
          </h2>
          {sessions
            .filter((s) => s.isCurrent)
            .map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
        </section>

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
                {sessionToRevoke?.device}
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
  onRevoke?: () => void;
}

function SessionCard({ session, onRevoke }: SessionCardProps) {
  const DeviceIcon = getDeviceIcon(session.deviceType);

  return (
    <Card className={session.isCurrent ? "border-accent/30 bg-accent/5" : ""}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                session.isCurrent
                  ? "bg-accent/15 text-accent"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <DeviceIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-foreground font-medium">
                  {session.device}
                </h3>
                {session.isCurrent && (
                  <Badge
                    variant="secondary"
                    className="bg-accent/15 text-accent text-xs"
                  >
                    Current
                  </Badge>
                )}
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Globe className="h-3.5 w-3.5" />
                <span>{session.browser}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>{session.location}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Clock className="h-3.5 w-3.5" />
                <span>{session.lastActive}</span>
              </div>
            </div>
          </div>
          {!session.isCurrent && onRevoke && (
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
