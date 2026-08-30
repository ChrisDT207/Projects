using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class KitchenAccidentException : Exception
    {
        public KitchenAccidentException(string message) : base(message) { }
    }
}
