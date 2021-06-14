using FAIR_SHARE_ALLOCATION_API.Models;

namespace FAIR_SHARE_ALLOCATION_API.Data
{
    public interface IGoodsRepo
    {
        Goods_Allocation[] getGoodsAllocation(int[][] valueMatrix);
    }
}