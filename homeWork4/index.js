var applicationInformation = {
  id: 1001,
  createdDate: '2025-04-01',
  Strategy: 'some_strategy',
  SubjectList: 1,
}

var subjectList = [
  { id: 1, host_mtype: 1001, value_mtype: 1 },
  { id: 2, host_mtype: 1002, value_mtype: 2 },
  { id: 3, host_mtype: 1003, value_mtype: 3 },
]

var subject = [
  {
    Id: 1,
    SubjectRole: 'заемщик',
    SubjectIncome: 75000,
    RegistrationAddress: 101,
  },
  {
    Id: 2,
    SubjectRole: 'поручитель',
    SubjectIncome: 50000,
    RegistrationAddress: 102,
  },
  {
    Id: 3,
    SubjectRole: 'заемщик',
    SubjectIncome: 80000,
    RegistrationAddress: 103,
  },
]

var registrationAddress = [
  { Id: 101, Region: 'Новосибирская обл.' },
  { Id: 102, Region: 'Московская обл.' },
  { Id: 103, Region: 'Свердловская обл.' },
]

const subjectInfo = {}

/**
 * Получаем информацию по конкретному заемщику
 * @param {*} applicationInformation
 * @param {*} subjectList
 * @param {*} subject
 * @param {*} registrationAddress
 * @returns вернет информаци по конкретному заемщику
 */
function getCreditInfo(applicationInformation, subjectList, subject, registrationAddress) {
  // актуализированная Информация из таблицы subjectList
  const subjectLink = subjectList.find((value) => applicationInformation.SubjectList === value.id)

  // актуализированная Информация из таблицы Subject
  const subjectInfo = subject.find((value) => value.Id === subjectLink.value_mtype)

  const creditFullInfo = {
    appInformId: applicationInformation.id,
    region: registrationAddress.find((region) => region.Id === subjectInfo.RegistrationAddress)?.Region,
    role: subjectInfo.SubjectRole,
    subjectIncom: subjectInfo.SubjectIncome,
  }

  return creditFullInfo
}

const debitorInfo = getCreditInfo(applicationInformation, subjectList, subject, registrationAddress)

// Критерии поиска
const cretaria = {
  role: 'заемщик',
  minIncome: 60000,
  region: 'Новосибирская обл.',
}

/**
 * Соответвие критериям выбора
 * @param {*} applicationInformation
 * @returns
 */
const accordingSelectCriterian = (debitorInfo, cretaria) => {
  // console.log(cretaria)
  // if (debitorInfo.role === cretaria.role && debitorInfo.region === cretaria.region && debitorInfo.subjectIncom > cretaria.minIncome) {
  //   return true
  // } else {
  //   return false
  // }
  return debitorInfo.role === cretaria.role && debitorInfo.region === cretaria.region && debitorInfo.subjectIncom > cretaria.minIncome
}

console.log(accordingSelectCriterian(debitorInfo, cretaria))
