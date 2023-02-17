import { PhoneNumberUtil, type PhoneNumber, PhoneNumberFormat } from 'google-libphonenumber'
import { useState } from 'react'

/**
 * ハイフン付きの電話番号を取得する
 * @param phone
 * @returns
 */
function getFormatPhoneNumber (phone: string): string | null {
  // 日本の国コード
  const region = 'JP'

  const util: PhoneNumberUtil = PhoneNumberUtil.getInstance()

  // 番号と地域を設定
  const number: PhoneNumber = util.parseAndKeepRawInput(phone, region)

  // 電話番号の有効性チェック
  if (!util.isValidNumberForRegion(number, region)) {
    return null
  }

  // ハイフン付きの形式で返却
  return util.format(number, PhoneNumberFormat.NATIONAL)
}

/**
 * 電話番号Inputコンポーネント
 *
 * @param name
 * @param className
 * @constructor
 */
const InputPhone = (): JSX.Element => {
  const [phone, setPhone] = useState<string | null>()
  return (
        <>
            <input
                type="phone"
                name="phone"
                placeholder="例：0901235678"
                onBlur={(e) => { setPhone(getFormatPhoneNumber(e.target.value)) }}
            />
            <h1>{phone}</h1>
        </>
  )
}

export default InputPhone
