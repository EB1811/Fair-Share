using System.Collections.Generic;

namespace FAIR_SHARE_ALLOCATION_API.Models
{
    public struct Goods_Allocation {
        public int who;
        public List<int> goodsList;
    }
    public struct Room_Allocation {
        public int who;
        public int room;
        public int price;
    }
    public class Command {
        public int[][] valueMatrix { get; set; }
    }
    public class GetRoomCommand {
        public int[][] valueMatrix { get; set; }
        public int totalCost { get; set; }
    }
    public struct Error {
        public string Message;
    }
}