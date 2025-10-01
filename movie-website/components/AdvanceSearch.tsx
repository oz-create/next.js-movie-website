import React, { useEffect, useState } from 'react'
import SelectMenu from './SelectMenu'
import { CiSearch } from 'react-icons/ci';
import CategorySlider from './CategorySlider';
import { CategoriesTypeArray, ListTypeArray } from '@/types/type';
import Image from 'next/image';

export default function AdvanceSearch({filterData,setFilterData,searchName,categories}:{filterData: ListTypeArray, setFilterData: React.Dispatch<React.SetStateAction<ListTypeArray>>,searchName:string, categories: CategoriesTypeArray}) {

    const [selectedDate, setSelectedDate] = useState("")
    const [selectedAdult, setSelectedAdult] = useState("")
    const [selectedRating, setSelectedRating] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [search, setSearch] = useState("");

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
        default:
          return true; // hiçbir filtre seçilmemişse tüm veriyi göster
      }

        return itemDate >= startDate && itemDate <= endDate;
    }

    function checkAdult(adultValue: boolean) {
      if (!selectedAdult) return true; // filtre seçilmemişse tümünü göster
      if (selectedAdult === "Yes") return adultValue === true;
      if (selectedAdult === "No") return adultValue === false;
      return true;
    }

    function checkRating(ratingValue: number){

      switch (selectedRating) {
        case "4+":
          return ratingValue/2 >= 4
        case "3-4":
          return ratingValue/2 >= 3 && ratingValue/2 < 4;
        case "2-3":
          return ratingValue/2 >= 2 && ratingValue/2 < 3;
        case "2-1":
          return ratingValue/2 >= 1 && ratingValue/2 < 2;
        default:
          return true;
      }
    }

    function checkCategory(genreIds: number[]) {
      if (selectedCategory === null) return true;
      return genreIds.includes(selectedCategory);
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
      setSearch(e.target.value);
    }
    function checkSearch(title:string){
      if (!search.trim()) return true;
      return title.toLowerCase().includes(search.toLowerCase());
    }


    const filter = () => {
      const filtered = filterData.filter((element) => {
        const dateCheck = searchName === "movies" ? checkPastDateRange(element.release_date) : checkPastDateRange(element.first_air_date);
        const adultCheck = checkAdult(element.adult);
        const ratingCheck = checkRating(element.vote_average)
        const categoryCheck = checkCategory(element.genre_ids)
        const titleCheck = searchName === "movies" ? checkSearch(element.title) : checkSearch(element.name)
        return dateCheck && adultCheck && ratingCheck && categoryCheck && titleCheck;
      });

      setFilterData(filtered);
    };


    useEffect(() => {
      filter()
    }, [selectedDate, selectedAdult, selectedRating, selectedCategory, search])
    

    const dateArray = ["All","Last 6 months","Last 1 year","Last 5 Year","2020-2015","2010-2015","2000-2010"]
    const yesNoArray = ["All","Yes","No"]
    const ratingArray = ["All","4+","3-4","2-3","2-1"]
  return (
    <div className='border border-[var(--primary-blue)] rounded-3xl relative h-auto w-full mt-20 mb-10 p-10 flex flex-col items-center justify-center'>
        <div className='text-2xl text-[var(--color-primary)] absolute top-[-3.5rem] left-5 max-w-[15rem] w-full h-[3.5rem] bg-[url("/blue-clip.png")] bg-cover bg-no-repeat bg-top flex justify-center items-center'>Advance Search</div>
          <div className='w-full flex flex-col items-center justify-center gap-10'>
              <Image src="/search-logo.png" alt="search image" className='w-[14rem] h-auto absolute object-contain left-5 top-5 hidden xl:block' width={140} height={140} />
              <div className='flex items-center justify-center gap-5 md:flex-row flex-col w-full'>
                  <SelectMenu label="Date" data={dateArray} setSelected={setSelectedDate}/>
                  <SelectMenu label="Adult" data={yesNoArray} setSelected={setSelectedAdult}/>
                  <SelectMenu label="Rating" data={ratingArray} setSelected={setSelectedRating}/>
              </div>
              <div className='relative max-w-[40rem] w-full h-[3rem] border rounded-xl flex items-center border-[var(--primary-blue)]'>
                    <input onChange={(e) => handleSearch(e)} type="text" placeholder={"Search" + " "+ searchName} className='absolute w-full h-full left-0 pr-12 pl-3 text-[var(--color-primary)] outline-0'/>
                    <CiSearch className='text-[var(--color-primary)] w-8 h-8 object-cover absolute right-2 cursor-pointer'/>
              </div>
              <CategorySlider data={filterData} setSelected={setSelectedCategory} categories={categories}/>
        </div>

    </div>
  )
}
