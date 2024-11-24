class Utilities{
    static FormatDate(date){
        const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        const months = ['Jan','Febr','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " "  + 
        (date.getHours() == 0 ? "12" : date.getHours() % 12) + ":" + String(date.getMinutes()).padStart(2,'0') + ":" + String(date.getSeconds()).padStart(2,'0') + (date.getHours() >= 12 ? " PM":" AM");
    }
}
module.exports = Utilities