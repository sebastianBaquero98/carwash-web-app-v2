import { Skeleton } from "@/components/ui/skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex w-full flex-col items-center bg-slate-900 pb-3 pt-6">
        <div className="flex w-full justify-evenly">
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-[40px] w-[150px] bg-slate-700" />
            <Skeleton className="h-[10px] w-[90px] bg-slate-700" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-[40px] w-[150px] bg-slate-700" />
            <Skeleton className="h-[10px] w-[90px] bg-slate-700" />
          </div>
        </div>
        <div className="mt-5 flex w-full items-center justify-center gap-2">
          <Skeleton className="h-[30px] w-[150px] bg-slate-700" />
          <Skeleton className="size-6 rounded-full bg-slate-700" />
        </div>
        <Skeleton className="mt-4 flex h-[100px] w-[340px] items-center justify-evenly rounded-[10px] bg-slate-700 py-3">
          {/* <div className="flex flex-col items-center justify-center gap-1">
        <Skeleton className="h-[20px] w-[100px] bg-slate-700" />
        <Skeleton className="h-[20px] w-[100px] bg-slate-700" />
        <Skeleton className="h-[20px] w-[100px] bg-slate-700" />
      </div>
      <div className="flex items-center justify-center gap-1">
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-[33px] w-[40px] bg-slate-700" />
          <Skeleton className="h-[10px] w-[40px] bg-slate-700" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-[33px] w-[40px] bg-slate-700" />
          <Skeleton className="h-[10px] w-[40px] bg-slate-700" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-[33px] w-[40px] bg-slate-700" />
          <Skeleton className="h-[10px] w-[40px] bg-slate-700" />
        </div>
      </div> */}
        </Skeleton>
      </div>
      <div className="mt-3 flex flex-col items-start gap-2 pe-4">
        <Skeleton className="me-2 ms-[-4px] flex  h-[150px] w-full rounded-e-lg bg-slate-700" />
        <Skeleton className="me-2 ms-[-4px] flex h-[150px]  w-full rounded-e-lg bg-slate-700" />
        <Skeleton className="me-2 ms-[-4px] flex h-[150px]  w-full rounded-e-lg bg-slate-700" />
        <Skeleton className="me-2 ms-[-4px] flex h-[150px]  w-full rounded-e-lg bg-slate-700" />
      </div>
    </>
  );
}
