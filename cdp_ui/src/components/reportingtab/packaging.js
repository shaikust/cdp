import React from 'react'
import EnergyContent from './energycontent'
import WasteContent from './wastecontent'
import { useSelector } from 'react-redux';

export default function Packaging({data}) {
    const { data: energyData, loading, error } = useSelector((state) => state.energy);
  return (
    <>
    <EnergyContent data={data}/>
    <WasteContent/>
    </>
  )
}
