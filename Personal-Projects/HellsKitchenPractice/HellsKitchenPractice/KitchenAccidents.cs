using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HellsKitchenPractice
{
    internal class KitchenAccidents
    {
        private string KitchenAccident;
        private int accidentSeverity;

        public KitchenAccidents(string kitchenAccident, int accidentSeverity)
        {
            KitchenAccident1 = kitchenAccident;
            this.AccidentSeverity = accidentSeverity;
        }

        public string KitchenAccident1 { get => KitchenAccident; set => KitchenAccident = value; }
        public int AccidentSeverity { get => accidentSeverity; set => accidentSeverity = value; }
    }
}
