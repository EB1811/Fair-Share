using System.Collections.Generic;

namespace FAIR_SHARE_ALLOCATION_API.Models
{
    public struct Allocation {
        public int who;
        public List<int> goodsList;
    }
    public class Command {
        public int[][] valueMatrix { get; set; }
    }
}