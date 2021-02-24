using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using FAIR_SHARE_ALLOCATION_API.Models;
using FAIR_SHARE_ALLOCATION_API.Data;
using System;
using Newtonsoft.Json;

namespace FAIR_SHARE_ALLOCATION_API.Controllers
{
    [ApiController]
    [Route("api/getRoomsAllocation")]
    public class RoomsShareController : ControllerBase
    {
        private readonly ImplementedRoomsRepo _roomsRepository = new ImplementedRoomsRepo();
        [HttpPost]
        public ActionResult <Room_Allocation> postGetRoomsAllocation(GetRoomCommand givenValue)
        {
            Console.WriteLine("Rooms Share Requested");
            int totalCost = givenValue.totalCost;
            int[][] valueMatrix = givenValue.valueMatrix;
            Room_Allocation[] result = _roomsRepository.getRoomsAllocation(valueMatrix, totalCost);

            return Ok(JsonConvert.SerializeObject(result));
        }


    }
}