interface CardProps {
  day: string;
  temp: number;
  icon: string;
}

const ForeCastCard = ({ day, temp, icon }: CardProps) => {
  return (
    <div className="bg-forcast-card dark:bg-forcast-card-dark w-full h-full rounded-3xl py-10">
      <div className="text-lg text-center font-semibold ">{day}</div>
      <div className="w-full px-10">
        <div className="w-full h-0.5 my-5 rounded-[300px] bg-text dark:bg-text-dark "></div>
      </div>
      <div className="h-1/2 w-full my-5 flex justify-center">
        <img src={icon} alt="weather condition" className="" />
      </div>
      <div className="w-full flex justify-center">
        <span className="text-text dark:text-text-dark  text-3xl">
          {temp} : ℃
        </span>
      </div>
    </div>
  );
};

export default ForeCastCard;
