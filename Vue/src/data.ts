export interface SalesItem {
    orderId: number;
    region: string;
    country: string;
    city: string;
    amount: number;
    date: string;
    approved: boolean;
}

export const sales = [{
    'orderId': 10248,
    'region': 'North America',
    'country': 'United States',
    'city': 'New York',
    'amount': 1740,
    'date': '2013/01/06',
    "approved": false
}, {
    'orderId': 10249,
    'region': 'North America',
    'country': 'United States',
    'city': 'Los Angeles',
    'amount': 850,
    'date': '2013/01/13',
    "approved": true
}, {
    'orderId': 10250,
    'region': 'North America',
    'country': 'United States',
    'city': 'Denver',
    'amount': 2235,
    'date': '2013/01/07',
    "approved": true
}, {
    'orderId': 10251,
    'region': 'North America',
    'country': 'Canada',
    'city': 'Vancouver',
    'amount': 1965,
    'date': '2013/01/03',
    "approved": true
}, {
    'orderId': 10252,
    'region': 'North America',
    'country': 'Canada',
    'city': 'Edmonton',
    'amount': 880,
    'date': '2013/01/10',
    "approved": true
}, {
    'orderId': 10253,
    'region': 'South America',
    'country': 'Brazil',
    'city': 'Rio de Janeiro',
    'amount': 5260,
    'date': '2013/01/17',
    "approved": true
}, {
    'orderId': 10254,
    'region': 'South America',
    'country': 'Argentina',
    'city': 'Buenos Aires',
    'amount': 2790,
    'date': '2013/01/21',
    "approved": true
}, {
    'orderId': 10255,
    'region': 'South America',
    'country': 'Paraguay',
    'city': 'Asuncion',
    'amount': 3140,
    'date': '2013/01/01',
    "approved": true
}, {
    'orderId': 10256,
    'region': 'Europe',
    'country': 'United Kingdom',
    'city': 'London',
    'amount': 6175,
    'date': '2013/01/24',
    "approved": true
}, {
    'orderId': 10257,
    'region': 'Europe',
    'country': 'Germany',
    'city': 'Berlin',
    'amount': 4575,
    'date': '2013/01/11',
    "approved": true
}];
