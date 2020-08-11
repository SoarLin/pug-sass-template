import DBHelper from './firebase-service'
import dayjs from 'dayjs';

class Popo {
  constructor() {
    this.db = new DBHelper()
    this.AllPhone = localStorage.getItem('AllPhone');
    this.phone = $('#inputPhone')
    this.name = $('#inputName')
    this.sendBtn = $('#sendBtn')
    this.canLottery = false

    this.init()
    this.formNotReady()

    if (this.AllPhone === null) {
      this.db.getAllPhones().then((res) => {
        this.AllPhone = res;
        localStorage.setItem('AllPhone', JSON.stringify(this.AllPhone))
        this.formReady()
      })
    } else {
      this.AllPhone = JSON.parse(this.AllPhone)
      this.formReady()
    }
  }

  init() {
    this.sendBtn.on('click', this.clickSendBtn.bind(this))
    this.phone.on('keyup', this.checkPhoneFormat.bind(this))
  }

  clickSendBtn() {
    let phone = this.phone.val().trim()
    this.checkPhoneHasUsedToday(phone)
  }

  formNotReady() {
    this.phone.attr('disabled', 'disabled')
    this.name.attr('disabled', 'disabled')
    this.disableSendBtn()
  }

  formReady() {
    this.phone.removeAttr('disabled')
    this.name.removeAttr('disabled')
    this.enableSendBtn()
  }

  disableSendBtn() {
    this.sendBtn.attr('disabled', 'disabled')
  }

  enableSendBtn() {
    this.sendBtn.removeAttr('disabled')
  }

  checkPhoneFormat() {
    const regex = /^09[0-9]{8}$/
    let phoneTxt = this.phone.val().trim()
    if (phoneTxt.length === 10) {
      this.enableSendBtn()
      let result = regex.test(phoneTxt)
      if (!result) {
        this.disableSendBtn()
      }
    } else if (phoneTxt.length > 10) {
      console.error('Phone too long')
      this.disableSendBtn()
    }
  }

  checkPhoneHasUsedToday(phone) {
    if (this.AllPhone[phone] === undefined) {
      console.log('This phone never lottery')
    } else {
      this.canLottery = this.isTodayCanLottery(this.AllPhone[phone].latest_date)
      console.log('is Today can lottery: ' + this.canLottery)
    }
  }

  isTodayCanLottery(latestDate) {
    const today = dayjs(dayjs().format('YYYY-MM-DD')).unix();
    const latest_date = dayjs(latestDate).unix();
    return today > latest_date
  }
}

var popo = new Popo();
