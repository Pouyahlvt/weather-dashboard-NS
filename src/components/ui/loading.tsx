import { Skeleton } from "@mui/material";

const PulseLoader = () => {
  return (
    <div
      className="w-full h-full absolute bg-card-bg dark:bg-card-bg-dark flex z-10 inset-0 rounded-4xl overflow-hidden
    justify-center items-center">
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={"100%"}
        animation="wave"
      />
    </div>
  );
};

export default PulseLoader;
