import React, { useEffect, useState } from 'react'
import SelectMenu from './SelectMenu'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store';
import { CiSearch } from 'react-icons/ci';
import CategorySlider from './CategorySlider';
import { ListTypeArray } from '@/types/type';

export default function AdvanceSearch({filterData,setFilterData}:{filterData: ListTypeArray, setFilterData: React.Dispatch<React.SetStateAction<ListTypeArray>>}) {
    const { moviesCategories } = useSelector((state: RootState) => state.movies);
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedAdult, setSelectedAdult] = useState("")
    const [selectedRating, setSelectedRating] = useState("")
    console.log(selectedDate,selectedAdult,selectedRating)

    function checkPastDateRange(dateString: string) {
      const today = new Date();
    const itemDate = new Date(dateString);

    let startDate = null;
    let endDate = today;

    switch (selectedDate) {
      case "Last 6 months":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 6);
        break;
      case "Last 1 year":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case "Last 5 years":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 5);
        break;
      case "2020-2015":
        startDate = new Date("2015-01-01");
        endDate = new Date("2020-12-31");
        break;
      case "2010-2015":
        startDate = new Date("2010-01-01");
        endDate = new Date("2015-12-31");
        break;
      case "2000-2010":
        startDate = new Date("2000-01-01");
        endDate = new Date("2010-12-31");
        break;
      case "Before 2000":
        return itemDate < new Date("2000-01-01");
      default:
        return true; // hiçbir filtre seçilmemişse tüm veriyi göster
    }

    return itemDate >= startDate && itemDate <= endDate;
    }



    const filter = () => {
      const filteredDate = filterData.filter((element) => checkPastDateRange(element.release_date))
      console.log(filteredDate)
      setFilterData(filteredDate)
    }

    useEffect(() => {
      filter()
    }, [selectedDate])
    

    const dateArray = ["Last 6 months","Last 1 year","Last 5 Year","2020-2015","2010-2015","2000-2010","Before 2000"]
    const yesNoArray = ["Yes","No"]
    const ratingArray = ["4+","3-4","2-3","2-1"]
  return (
    <div className='border border-[var(--primary-blue)] rounded-3xl relative h-[20rem] mt-20 mb-10 p-10 flex flex-col items-center justify-center'>
        <div className='text-2xl text-[var(--color-primary)] absolute top-[-3.5rem] left-5 w-[15rem] h-[3.5rem] bg-[url("/blue-clip.png")] bg-cover bg-no-repeat bg-top flex justify-center items-center'>Advance Search</div>
          <div className='flex flex-col items-center justify-center gap-10'>
              <img src="/search-logo.png" alt="search image" className='w-[14rem] absolute left-5 top-5' />
              <div className='flex items-center justify-center gap-5'>
                  <SelectMenu label="Date" data={dateArray} setSelected={setSelectedDate} filter={filter}/>
                  <SelectMenu label="Adult" data={yesNoArray} setSelected={setSelectedAdult} filter={filter}/>
                  <SelectMenu label="Rating" data={ratingArray} setSelected={setSelectedRating} filter={filter}/>
              </div>
              <div className='relative w-[40rem] h-[3rem] border rounded-xl flex items-center border-[var(--primary-blue)]'>
                    <input type="text" placeholder='Search Movie' className='absolute w-full h-full left-0 pr-12 pl-3 text-[var(--color-primary)] outline-0'/>
                    <CiSearch className='text-[var(--color-primary)] w-8 h-8 object-cover absolute right-2 cursor-pointer'/>
              </div>
              <CategorySlider data={moviesCategories} />
        </div>

    </div>
  )
}
