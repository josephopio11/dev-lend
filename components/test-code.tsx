import Link from "next/link";

const TestCode = () => {
  return (
    <div>
      <section className="bg-gray-50 py-12 dark:bg-gray-950 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:flex lg:max-w-screen-2xl lg:items-start lg:px-8">
          <article className="relative lg:sticky lg:top-8 lg:w-1/2">
            <Link
              className="group relative block overflow-hidden rounded-2xl shadow-lg shadow-black/50 transition duration-300 ease-in-out"
              href={"#"}
            >
              <img
                alt={""}
                className="aspect-[6/4] w-full rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-[1.02]"
                width={250}
                height={250}
                src={"/confirm.jpg"}
              />
            </Link>
            <div className="mt-6 md:align-middle">
              <Link
                className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600 dark:text-red-500"
                href={"#"}
              >
                1
              </Link>
              <Link className="group mt-3 block" href={"#"}>
                <h2 className="text-3xl font-medium tracking-normal text-gray-900 decoration-red-600 decoration-2 transition duration-300 ease-in-out group-hover:underline dark:text-gray-200 md:tracking-tight lg:text-4xl lg:leading-[1.25]">
                  ""
                </h2>
                <div>
                  <p className="mt-4 text-base leading-8 text-gray-600 dark:text-gray-400">
                    {""}
                  </p>
                </div>
              </Link>
              <div className="mt-4 flex items-center sm:mt-8">
                <Link className="relative h-10 w-10 rounded-xl" href={"#"}>
                  <img
                    alt={""}
                    width={100}
                    height={100}
                    className="aspect-square h-full w-full rounded-full object-cover object-top transition duration-300 ease-in-out"
                    src={"/userp.svg"}
                  />
                </Link>
                <div className="ml-3">
                  <Link
                    className="text-sm font-medium text-gray-800 hover:underline dark:text-gray-200"
                    href={"#"}
                  >
                    {""}
                  </Link>
                  <p className="text-sm text-gray-500">
                    <time>{""}</time>
                    <span className="mx-0.5">·</span>
                    <span> 3min read </span>
                  </p>
                </div>
              </div>
            </div>
          </article>
          <div className="mt-12 sm:mt-16 lg:ml-12 lg:mt-0 lg:w-1/2 xl:ml-16">
            <h3 className="before:tw-absolute before:-tw-bottom-px before:tw-left-0 before:tw-h-px before:tw-w-24 before:tw-bg-red-600 before:tw-content-[''] relative border-b border-gray-300 pb-2.5 text-2xl font-medium text-gray-900 dark:text-gray-200">
              Featured Articles
            </h3>
            <div className="grid lg:grid-cols-2 lg:gap-x-5 xl:grid-cols-1">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>
                  <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit, voluptas ullam! Hic reiciendis consequatur odit.
                    Illo voluptates esse cupiditate maiores numquam officiis
                    quia earum ducimus.
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate ut dolorem est atque, magnam tempora unde ratione
                    non consectetur fugit commodi distinctio consequatur,
                    repellendus architecto, provident ipsum eos rem. Odio, quasi
                    commodi. Officia natus quo repellat quas minus possimus
                    ipsam nisi facilis, culpa vel maxime officiis odio esse,
                    vero iure.
                  </p>{" "}
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Itaque aut doloribus est consequatur earum possimus
                    cupiditate inventore nulla quos saepe totam quaerat at
                    soluta, dolor modi. Autem architecto, nihil sed omnis fugiat
                    itaque quaerat unde quos alias sapiente ea laudantium
                    ratione impedit ut dolorem nemo quod, illum sunt
                    consequuntur sint ipsum nulla minima dignissimos. Voluptas
                    consequatur optio beatae reprehenderit explicabo.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestCode;
