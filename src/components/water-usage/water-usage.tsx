import { Component, h, State } from '@stencil/core';
import { WaterUsageSlider } from './water-usage-slider';
@Component({
    tag: 'water-usage',
    styleUrl: 'water-usage.css'
})
export class WaterUsage {
    @State() currentIndex = {index:0}   
    @State() shower1:WaterUsageSlider = new WaterUsageSlider("How many minutes does the average shower last in your household?",0, 30,0,0);
    @State() shower2:WaterUsageSlider = new WaterUsageSlider("How many showers are taken each week in your household?",0,50,0,0);
    @State() bath1:WaterUsageSlider = new WaterUsageSlider("How many full-tub baths are taken each week in your household?",0,50,0,0);
    @State() bath2:WaterUsageSlider = new WaterUsageSlider("How many half-tub baths are taken each week in your household?",0,50,0,0);
    @State() toilet:WaterUsageSlider = new WaterUsageSlider("How many people are in your household?",0,25,0,0);
    @State() teeth:WaterUsageSlider = new WaterUsageSlider("How many times per day does each person brush their teeth?",0,10,0,0);
    @State() shaving:WaterUsageSlider = new WaterUsageSlider("How many times per week does someone shave in your household?",0,75,0,0);
    @State() washing:WaterUsageSlider = new WaterUsageSlider("How many times are face or hands washed per day in your household?",0,100,0,0);
    @State() dishwasher:WaterUsageSlider = new WaterUsageSlider("How many times per week is the dishwasher run in your household?",0,25,0,0);
    @State() dishes:WaterUsageSlider = new WaterUsageSlider("How many minutes each day do you run water while hand-washing dishes?",0,60,0,0);
    @State() clothes:WaterUsageSlider = new WaterUsageSlider("How many loads of laundry are washed per week?",0,25,0,0);
    @State() outdoor:WaterUsageSlider = new WaterUsageSlider("How many minutes per week does your household use water outdoors?",0,500,0,0);
    @State() dripping:WaterUsageSlider = new WaterUsageSlider("How many faucets are dripping in your household?",0,10,0,0);
    @State() leaking:WaterUsageSlider = new WaterUsageSlider("How many toilets are leaking in your household?",0,5,0,0);
    @State() indoor:WaterUsageSlider = new WaterUsageSlider("Based on the number of people in your household (as answered above)",0,50,0,0);
    @State() sliders:WaterUsageSlider[] = [
        this.shower1,
        this.shower2,
        this.bath1,
        this.bath2,
        this.toilet,
        this.teeth,
        this.shaving,
        this.washing,
        this.dishwasher,
        this.dishes,
        this.clothes,
        this.outdoor,
        this.dripping,
        this.leaking,
        this.indoor
    ]
    shower1Input(event) {
        this.shower1 = {...this.shower1, value: event.target.value};
        this.shower2 = {...this.shower2, gallons:this.shower1.value*this.shower2.value*4.33*5};
        this.shower2 = {...this.shower2, ccfunits:this.shower2.gallons/748};
    }
    shower2Input(event) {
        this.shower2 = {...this.shower2, value: event.target.value};
        this.shower2 = {...this.shower2, gallons:this.shower1.value*this.shower2.value*4.33*5};
        this.shower2 = {...this.shower2, ccfunits:this.shower2.gallons/748};
    }
    bath1Input(event) {
        this.bath1 = {...this.bath1, value: event.target.value, gallons:event.target.value*4.33*36};
        this.bath1 = {...this.bath1, ccfunits:this.bath1.gallons/748};
    }
    bath2Input(event) {
        this.bath2 = {...this.bath2, value: event.target.value, gallons:event.target.value*4.33*18};
        this.bath2 = {...this.bath2, ccfunits:this.bath2.gallons/748};    }
    toiletInput(event) {
        this.toilet = {...this.toilet, value: event.target.value, gallons:event.target.value*30.4*12};
        this.toilet = {...this.toilet, ccfunits:this.toilet.gallons/748};  
        this.teeth = {...this.teeth, gallons:event.target.value*this.teeth.value*30.4*3};
        this.teeth = {...this.teeth, ccfunits:this.teeth.gallons/748}; 
        this.indoor = {...this.toilet, value: event.target.value};           
    }
    teethInput(event) {
        this.teeth = {...this.teeth, value: event.target.value, gallons:event.target.value*this.toilet.value*30.4*3};
        this.teeth = {...this.teeth, ccfunits:this.teeth.gallons/748};      
    }
    shavingInput(event) {
        this.shaving = {...this.shaving, value: event.target.value, gallons:event.target.value*4.33};
        this.shaving = {...this.shaving, ccfunits:this.shaving.gallons/748};      
    }
    washingInput(event) {
        this.washing = {...this.washing, value: event.target.value, gallons:event.target.value*30.4};
        this.washing = {...this.washing, ccfunits:this.washing.gallons/748}; 
    }
    dishwasherInput(event) {
        this.dishwasher = {...this.dishwasher, value: event.target.value, gallons:event.target.value*16*4.33};
        this.dishwasher = {...this.dishwasher, ccfunits:this.dishwasher.gallons/748}; 
    }
    dishesInput(event) {
        this.dishes = {...this.dishes, value: event.target.value, gallons:event.target.value*3*30.4};
        this.dishes = {...this.dishes, ccfunits:this.dishes.gallons/748};
    }
    clothesInput(event) {
        this.clothes = {...this.clothes, value: event.target.value, gallons:event.target.value*44*4.33};
        this.clothes = {...this.clothes, ccfunits:this.clothes.gallons/748};
    }
    outdoorInput(event) {
        this.outdoor = {...this.outdoor, value: event.target.value, gallons:event.target.value*6*4.33};
        this.outdoor = {...this.outdoor, ccfunits:this.outdoor.gallons/748};
    }
    drippingInput(event) {
        this.dripping = {...this.dripping, value: event.target.value, gallons:event.target.value*1*30.4};
        this.dripping = {...this.dripping, ccfunits:this.dripping.gallons/748};
    }
    leakingInput(event) {
        this.leaking = {...this.leaking, value: event.target.value, gallons:event.target.value*200*30.4};
        this.leaking = {...this.leaking, ccfunits:this.leaking.gallons/748};
    }
    indoorInput(event) {
        this.indoor = {...this.indoor, value: event.target.value, gallons:event.target.value*30.4*10};
        this.indoor = {...this.indoor, ccfunits:this.indoor.gallons/748};
    }
    disconnectedCallback() {
        document.getElementById('councilDiv').innerHTML = '';   
    }
    render() {
        return <div id='waterUsage'>
{/* 
<h3>Estimate your monthly household water usage</h3>
<h5>To estimate your monthly household water usage, slide the scrollbar next to each question to provide your
    answer. Calculations update automatically. </h5> */}
<div class={ (this.currentIndex.index === 0 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Showers</h2>
    <div class="container">
        An average shower uses 5 gallons of water per minute.
    <label>
        {this.shower1.label}
    </label>
    <div class="questions">
        <div class="inputs">
            <input type="range" onInput={ev=> this.shower1Input(ev)} onChange={ev=> this.shower1Input(ev)} min="0" max={this.shower1.max}
                value={this.shower1.value} step="1" aria-valuemin="0" aria-valuemax={this.shower1.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.shower1.max} value={this.shower1.value} onInput={ev=> this.shower1Input(ev)} />
        </div>
        <div class="totals">
            <div class="total">
            </div>
            <div class="total">
            </div>
        </div>    
    </div>
    <label>
        {this.shower2.label}
    </label>    
    <div class="questions">
        <div class="inputs">
            <input type="range" onInput={ev=> this.shower2Input(ev)} onChange={ev=> this.shower2Input(ev)} min="0" max={this.shower2.max}
                value={this.shower2.value} step="1" aria-valuemin="0" aria-valuemax={this.shower2.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.shower2.max} value={this.shower2.value} onInput={ev=> this.shower2Input(ev)} />
        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.shower2.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
                {this.shower2.ccfunits.toFixed(3)} CCF
            </div>
        </div>    
    </div>    
</div>
</div>
<div class={ (this.currentIndex.index === 1 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Baths</h2>
    <div class="container">
    A full-tub bath uses 36 gallons of water; a half-tub bath uses 18 gallons of water.    <label>
    {this.bath1.label}
    </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.bath1Input(ev)} onChange={ev=> this.bath1Input(ev)} min="0" max={this.bath1.max}
                value={this.bath1.value} step="1" aria-valuemin="0" aria-valuemax={this.bath1.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.bath1.max} value={this.bath1.value} onInput={ev=> this.bath1Input(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(Math.round(this.bath1.gallons)).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.bath1.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
    <label>
        {this.bath2.label}
    </label>    
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.bath2Input(ev)} onChange={ev=> this.bath2Input(ev)} min="0" max={this.bath2.max}
                value={this.bath2.value} step="1" aria-valuemin="0" aria-valuemax={this.bath2.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.bath2.max} value={this.bath2.value} onInput={ev=> this.bath2Input(ev)} />
        </div>
        <div class="totals">
            <div class="total">
            {Math.round(Math.round(this.bath2.gallons)).toLocaleString()} gallons            </div>
            <div class="total">
            {this.bath2.ccfunits.toFixed(3)} CCF
            </div>
        </div>    
    </div>    
</div>
</div>
<div class={ (this.currentIndex.index === 2 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Toilet Flushes</h2>
    <div class="container">
    The average person flushes 4 times daily, using 3 gallons of water per flush.     <label>
    {this.toilet.label}
    </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.toiletInput(ev)} onChange={ev=> this.toiletInput(ev)} min="0" max={this.toilet.max}
                value={this.toilet.value} step="1" aria-valuemin="0" aria-valuemax={this.toilet.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.toilet.max} value={this.toilet.value} onInput={ev=> this.toiletInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.toilet.value*30.4*12).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.toilet.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 3 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Brushing Teeth</h2>
    <div class="container">
    The average person uses 3 gallons of water each time they brush their teeth.
    <label>
    {this.teeth.label}
    </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.teethInput(ev)} onChange={ev=> this.teethInput(ev)} min="0" max={this.teeth.max}
                value={this.teeth.value} step="1" aria-valuemin="0" aria-valuemax={this.teeth.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.teeth.max} value={this.teeth.value} onInput={ev=> this.teethInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.teeth.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.teeth.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 4 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Shaving</h2>
    <div class="container">
    The average shave uses 1 gallon of water.
    <label>
                    {this.shaving.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.shavingInput(ev)} onChange={ev=> this.shavingInput(ev)} min="0" max={this.shaving.max}
                value={this.shaving.value} step="1" aria-valuemin="0" aria-valuemax={this.shaving.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.shaving.max} value={this.shaving.value} onInput={ev=> this.shavingInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.shaving.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.shaving.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 5 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Face/Hand Washing</h2>
    <div class="container">
    Each time you wash your face or hands, approximately 1 gallon of water is used.    <label>
    {this.washing.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.washingInput(ev)} onChange={ev=> this.washingInput(ev)} min="0" max={this.washing.max}
                value={this.washing.value} step="1" aria-valuemin="0" aria-valuemax={this.washing.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.washing.max} value={this.washing.value} onInput={ev=> this.washingInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.washing.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.washing.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 6 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Dishwasher</h2>
    <div class="container">
    The average dishwasher uses 16 gallons of water per wash.
    <label>
    {this.dishwasher.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.dishwasherInput(ev)} onChange={ev=> this.dishwasherInput(ev)} min="0" max={this.dishwasher.max}
                value={this.dishwasher.value} step="1" aria-valuemin="0" aria-valuemax={this.dishwasher.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.dishwasher.max} value={this.dishwasher.value} onInput={ev=> this.dishwasherInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.dishwasher.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.dishwasher.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 7 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Hand-Washing Dishes</h2>
    <div class="container">
    Hand-washing dishes with water running uses 3 gallons of water per minute.
        <label>
    {this.dishes.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.dishesInput(ev)} onChange={ev=> this.dishesInput(ev)} min="0" max={this.dishes.max}
                value={this.dishes.value} step="1" aria-valuemin="0" aria-valuemax={this.dishes.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.dishes.max} value={this.dishes.value} onInput={ev=> this.dishesInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.dishes.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.dishes.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 8 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Clothes Washer</h2>
    <div class="container">
    The average washing machine uses 44 gallons of water per load of laundry.
        <label>
    {this.clothes.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.clothesInput(ev)} onChange={ev=> this.clothesInput(ev)} min="0" max={this.clothes.max}
                value={this.clothes.value} step="1" aria-valuemin="0" aria-valuemax={this.clothes.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.clothes.max} value={this.clothes.value} onInput={ev=> this.clothesInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.clothes.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.clothes.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 9 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Outdoor Use</h2>
    <div class="container">
    When using water outdoors, the average use is 6 gallons of water per minute.        <label>
    {this.outdoor.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.outdoorInput(ev)} onChange={ev=> this.outdoorInput(ev)} min="0" max={this.outdoor.max}
                value={this.outdoor.value} step="1" aria-valuemin="0" aria-valuemax={this.outdoor.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.outdoor.max} value={this.outdoor.value} onInput={ev=> this.outdoorInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.outdoor.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.outdoor.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 10 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Dripping faucet</h2>
    <div class="container">
    A faucet that drips 10 times per minute uses 1 gallon of water per day.
    <label>
    {this.dripping.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input  type="range" onInput={ev=> this.drippingInput(ev)} onChange={ev=> this.drippingInput(ev)} min="0" max={this.dripping.max}
                value={this.dripping.value} step="1" aria-valuemin="0" aria-valuemax={this.dripping.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.dripping.max} value={this.dripping.value} onInput={ev=> this.drippingInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.dripping.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.dripping.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 11 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Leaking toilet</h2>
    <div class="container">
    A leaking toilet can use 200 or more gallons of water per day.
    <label>
    {this.leaking.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input type="range" onInput={ev=> this.leakingInput(ev)} onChange={ev=> this.leakingInput(ev)} min="0" max={this.leaking.max}
                value={this.leaking.value} step="1" aria-valuemin="0" aria-valuemax={this.leaking.max}
                aria-valuenow="0"/>
                <input type="number" min="0" max={this.leaking.max} value={this.leaking.value} onInput={ev=> this.leakingInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.leaking.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.leaking.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>
<div class={ (this.currentIndex.index === 12 ? ' active' : ' inactive') }>
    
    <h2 class="title t-forest">Other Indoor Use</h2>
    <div class="container">
    An average person uses 10 gallons of water per day for other various indoor uses. 
    <label>
    {this.indoor.label}
                </label>
    <div class="questions">
        <div class="inputs">
        <input  type="range" onInput={ev=> this.indoorInput(ev)} onChange={ev=> this.indoorInput(ev)}   disabled min="0" max={this.indoor.max}
                value={this.indoor.value} step="1" aria-valuemin="0" aria-valuemax={this.indoor.max}
                aria-valuenow="0"/>
                <input disabled type="number" min="0" max={this.indoor.max} value={this.indoor.value} onInput={ev=> this.indoorInput(ev)} />

        </div>
        <div class="totals">
            <div class="total">
            {Math.round(this.indoor.gallons).toLocaleString()} gallons
            </div>
            <div class="total">
            {this.indoor.ccfunits.toFixed(3)} CCF

            </div>
        </div>    
    </div>
</div>
</div>


<div class="container">
<button onClick={()=> this.currentIndex = {...this.currentIndex, index:this.currentIndex.index-=1}}class={ (this.currentIndex.index !=0 ? 'button back ' : ' btn-hidden button back') }>Previous</button>
    

<button onClick={()=> this.currentIndex = {...this.currentIndex, index:this.currentIndex.index+=1}}class={ (this.currentIndex.index !=12 ? 'button next ' : ' btn-hidden button back') }>Next</button> 
        </div>

   
<div class="results">

<h3>Total Monthly Water Usage</h3>
<div class="totals">
<div class="total">
{Math.round(this.shower2.gallons+this.bath1.gallons+this.bath2.gallons+this.toilet.gallons+
    this.teeth.gallons+this.shaving.gallons+this.washing.gallons+this.dishwasher.gallons+
    this.dishes.gallons+this.clothes.gallons+this.outdoor.gallons+this.dripping.gallons+
    this.leaking.gallons+this.indoor.gallons).toLocaleString().toLocaleString()} Gallons
</div>

<div class="total">

{(this.shower2.ccfunits+this.bath1.ccfunits+this.bath2.ccfunits+this.toilet.ccfunits+
        this.teeth.ccfunits+this.shaving.ccfunits+this.washing.ccfunits+this.dishwasher.ccfunits+
        this.dishes.ccfunits+this.clothes.ccfunits+this.outdoor.ccfunits+this.dripping.ccfunits+
        this.leaking.ccfunits+this.indoor.ccfunits).toFixed(3)} CCF


</div> 
</div>

</div>
</div>
    }        
}