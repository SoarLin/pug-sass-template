import DBHelper from './firebase-service'

$('#phoneNum').attr('disabled', 'disabled')

const db = new DBHelper();
db.checkPhoneNumber('0910387918').then((res) => {
  console.log(res)
})

let AllPhone = localStorage.getItem('AllPhone');
if (AllPhone === null) {
  db.getAllPhones().then((res) => {
    AllPhone = res;
    localStorage.setItem('AllPhone', JSON.stringify(AllPhone))
    $('#phoneNum').removeAttr('disabled');
  })
} else {
  AllPhone = JSON.parse(AllPhone)
  $('#phoneNum').removeAttr('disabled');
}
