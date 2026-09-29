interface CardProps {
  day: string;
  temp: number;
  icon: string;
}

const ForeCastCard = ({ day, temp, icon }: CardProps) => {
  return (
    <div className="bg-forcast-card dark:bg-forcast-card-dark w-full h-full rounded-3xl py-10">
      <div className="text-lg text-center font-semibold ">{day}</div>
      <div className="w-full px-10 max-lg:px-5">
        <div className="w-full h-px my-5  bg-text dark:bg-text-dark "></div>
      </div>
      <div className="h-1/2 w-full my-5 flex justify-center">
        <img src={icon} alt="weather condition" className="" />
      </div>
      <div className="w-full flex justify-center">
        <span className="text-text dark:text-text-dark  text-3xl max-lg:text-2xl max-sm:text-lg">
          {temp} : ℃
        </span>
      </div>
    </div>
  );
};

export default ForeCastCard;
