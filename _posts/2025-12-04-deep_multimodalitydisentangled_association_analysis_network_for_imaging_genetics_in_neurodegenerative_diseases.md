---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WK3VEIER%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVGqP5ruF0T9F4qocnhgy7z7YlnrMgzoHSz2bg4h5GyAIgX4MF3FVE%2BD6sUVyzKK0FcpDMOWyHFc0nhUCSBsTeW9QqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIGj5F1iFJFxtP0X1ircA76aGqm1TWootXyCJ9eHEuwqEhRo33AuU8ha717GFTzC4K8oDgmH27FEmLwZma80g953kWCZWzrICmsqeVplk232D5%2FDG%2FpsRz5859n1Vjfd0YsTj4WXYpt40ISJYN0EKRoIxMwYDn%2BSZA8dk8%2FtKU%2Bel0Wc5GsIZGMGrOIc3jf1aduu6VbeU40w8cvxKF1u1XbtBihH%2FUjNjkX%2F%2F5s9zuB3oIUFPLhfm%2FhFN4mXCJA%2BfKtRzz7ZPkXZoqoP0x8z7GJIm3Dk1S9I2wedfj9qD5NEKo5G29l2Npz%2FrlDHFfvb0jF0%2BcvxzohTx981zpVASG%2BYKyI0LOLrv3Rwy9L%2Fyaw0mKoT93uS06MzzUovog0RkyEfIIFDOQGE12lOSxnqdr9d2Wnm%2B6g1jD72xa4IipfNRcTZ9sHGMOCguCksiVam9xKcu2PyOulE3FmEyxMj%2Fikxw03Tjs0KrRC6HoJYPCSkfP4tJZsKd7Y%2FLmbUguYSiJsEuobzqH%2FwuAojgI0nHnB%2F%2Bd7QcGnSKK9UmMnY3uova2q9OTAw7aJcinQfsLYx5OCCpkehQGhF%2BcHp1qdlTP4yIap23dzfAPAkOSFWoRm3Har9UFppEnfeRfRWfDBVT%2BOGTdg2OJdFKVKuMIfats8GOqUBzO3iIvxzQON3F22HCARzYL1ZHRgT1UGLm3ADIGcipfcBqd3XmGbcAT7s54u7nCHfmnrAJdYm43vERG%2BM%2BV7Zg78AsGkz9Vy8hhQEnm4cfa3wKP7OsIrHZCFjwfUMwmV6wNK3fl50ZhHznS125x5q38ZoPiCMgq9PxFoJPPs6dLuS7VUy5lFwEFQftNhGlzXgxs9oYUfGCBJAyaWXN8i%2F0b5fpHDq&X-Amz-Signature=3353fc4774db46d8a2892d39c20a813563c668970b5ab0403a3ce76b8731e91d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WK3VEIER%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVGqP5ruF0T9F4qocnhgy7z7YlnrMgzoHSz2bg4h5GyAIgX4MF3FVE%2BD6sUVyzKK0FcpDMOWyHFc0nhUCSBsTeW9QqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIGj5F1iFJFxtP0X1ircA76aGqm1TWootXyCJ9eHEuwqEhRo33AuU8ha717GFTzC4K8oDgmH27FEmLwZma80g953kWCZWzrICmsqeVplk232D5%2FDG%2FpsRz5859n1Vjfd0YsTj4WXYpt40ISJYN0EKRoIxMwYDn%2BSZA8dk8%2FtKU%2Bel0Wc5GsIZGMGrOIc3jf1aduu6VbeU40w8cvxKF1u1XbtBihH%2FUjNjkX%2F%2F5s9zuB3oIUFPLhfm%2FhFN4mXCJA%2BfKtRzz7ZPkXZoqoP0x8z7GJIm3Dk1S9I2wedfj9qD5NEKo5G29l2Npz%2FrlDHFfvb0jF0%2BcvxzohTx981zpVASG%2BYKyI0LOLrv3Rwy9L%2Fyaw0mKoT93uS06MzzUovog0RkyEfIIFDOQGE12lOSxnqdr9d2Wnm%2B6g1jD72xa4IipfNRcTZ9sHGMOCguCksiVam9xKcu2PyOulE3FmEyxMj%2Fikxw03Tjs0KrRC6HoJYPCSkfP4tJZsKd7Y%2FLmbUguYSiJsEuobzqH%2FwuAojgI0nHnB%2F%2Bd7QcGnSKK9UmMnY3uova2q9OTAw7aJcinQfsLYx5OCCpkehQGhF%2BcHp1qdlTP4yIap23dzfAPAkOSFWoRm3Har9UFppEnfeRfRWfDBVT%2BOGTdg2OJdFKVKuMIfats8GOqUBzO3iIvxzQON3F22HCARzYL1ZHRgT1UGLm3ADIGcipfcBqd3XmGbcAT7s54u7nCHfmnrAJdYm43vERG%2BM%2BV7Zg78AsGkz9Vy8hhQEnm4cfa3wKP7OsIrHZCFjwfUMwmV6wNK3fl50ZhHznS125x5q38ZoPiCMgq9PxFoJPPs6dLuS7VUy5lFwEFQftNhGlzXgxs9oYUfGCBJAyaWXN8i%2F0b5fpHDq&X-Amz-Signature=3353fc4774db46d8a2892d39c20a813563c668970b5ab0403a3ce76b8731e91d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667L3A4TCM%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGBP1i4iYA0F8sDREXegEOxqmBoOKb7sTojcPz7b9p4bAiEA%2B%2FEmpYUM4XZMmCtnUSFayj77xyBuPE5EEqzrIMDj8PQqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLColx9IyyeGrh2UFCrcA65DnHAXMRUftW8nt5CJTXRV41Yh7OO75LYwqRBJF6Wj8aUe6qsxXnpwH7ZBvgOSXa15gLkKxvE2XaPbqMSP3juMgA3oFgy82mNZ98zc8wS5Sy%2Bgj8rOu4cvlVVlZlRMZSRvn%2B5AuSnIGA5%2B4C5T6tFI8EXeuSQtI%2FuGG1HLBfXMk0wPWSEuYITvt5kDFcokn5YRWx0nWYna5O5XKpYBFd6jIu%2Bu3ighOmRUf3AoDrmC7ZsYks4tzZAokoB8slh4eqfp0D4vPYpsHO%2BCvQmMXqGqfO2UH2oSrPzqkJX%2FdgPbTTl0DuDdUS3g1hA4YnMGjWVj4ELSXMM3HIm2lWTcPPsXkJgeDy0P55iOdFDVqq85f7vSbq2ia%2BIA2PHAxNMmpEUWSojAi2EIe0GWdb%2Fdn4Gm8dbArbpJT2f4lW0449HThOQcWeJIuM0jKWrbVw%2FFznCmFwWY94gzWMD%2B9SdQSOU4ypCkxIN8Dh7VbxEct5qOK0zHiME%2BR5XZ2WV%2BQKf%2F6lKr9HiCYoCqDTcWiUcstipWp14MTzGLSKZcrm%2FFffBFh8ZrB2YFeaJGE%2FxkCl%2BmmX8CZCEKSozTvcDAad7SIAmLfhzT4LNfQcD%2BWWtq5PVstmWKJHF9o2YweDBzMOfbts8GOqUBdG2IHDwQ08CouGfVlhHpGqbcouGe%2BYFumzLA1bPlWnlgJYgeVxYdkyhVoVU1XWNL%2BOu3ExBDGZgiKCpmy9ohSi%2FjpTLLFwnNrWxP8AmQhZ0UwSqg%2BxhI3XGHnpexb53zLxRKa%2BrjpolaWB56izmVUF3MqgD%2BzbXBQJ1VvEdQqYtG%2BcHOQRB%2FEtXfgu61omcWyDXEonRHs6LiQ%2F6InlQhvLi5HCgh&X-Amz-Signature=2dbc464ce8dac5256b5baa8e2a2c844799c6ef2b47edd96263c53119d3f30213&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJZZZI3Q%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC5AOx%2FtdO9%2Fa1W9ZvZRXnNE5uLPj9ZdIvawTV32S10NAIhAOEDm%2BeKlrBl1af%2F9bsEZeCi4Wzo4MinMBd2H7M68QBUKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwbi4Q9D6EEhTaZpcYq3ANKAF37T5wJ6TBP6eT5qCZTAf6HuqCjIgOBNBaXqwjtHzMzT8NX6GKYPm9278Q5%2FmC%2BBwncLLzosDS2G0jKMtj9E6lWak46Yl91rxNiUnzIX8dtZl8EDS2brQvv5un1jspzaOzigS59%2B%2BcXY%2FYO9VIwvGSUOhYiCV7nIlEPDQwaI8jemdJt90nMaJLp2QxyBKiDb7FpEamDPWOUuerFhjmPWMGPUuuHLljjfVQDMygGzNn9MyFFzbLbl9rsD5%2F91BcKWKntIY%2BgITpR3oDGsBnRAYYTOUUpBZt06TLoYEiB4hGFGLGoNkhro1Ib0gMU%2F8SN3JGs7geV9XdvXNR%2BrdAOh0NBSV5BBSZ%2FXr6F0YbBAKoQqebTBbOnYvawXlBGtSBbSLJobrbggannmHm1N4iHQxoozzu3OE4Ejip0UArUTVaMFvF8jZTa%2FEj5I6vdPjxKlehppK5NQmlVDcHnwKi0J%2FuiSdRpe8NUDKwCeAtdrCA3fCA1BtjcW%2Bx64miWwM2HBMELMl92zDvUIpRZJ5oPyg4x9aYMLbkNglvAyPaTJarfEBxIiCSm0fS6qdbrLugLNfZ0iSR4m7o1Poht%2BZW7QCqQQGGrH9HZ3TeJ0XLMM9ePS1Zg6PmJtPTz6DCX3LbPBjqkAV%2FVJ9Ye9%2BzZZXtEUT4PdvnFouapwDR6Z4lMl1MGIljytoL0%2FZGFrkrRhVCS168mcJ4v9f0rM%2BPscoTH3AwkvnXPjGZOAdYpMav7p8tEwhKz8p5V8C4wK%2Bev9nuE9kXFNqWuzA%2BsyAhb%2BD608NfbYroodDWqzqvjWiAKKvc%2BzFypX18aH5XEzSJdcJ3HfCjwoc7J3BI4TMHf6gOSl20c6vK02d2j&X-Amz-Signature=9fd78747fd6dbe8f8fd683328b5ebe32812af0642aaf354fc95caeb098a9d6dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJZZZI3Q%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC5AOx%2FtdO9%2Fa1W9ZvZRXnNE5uLPj9ZdIvawTV32S10NAIhAOEDm%2BeKlrBl1af%2F9bsEZeCi4Wzo4MinMBd2H7M68QBUKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwbi4Q9D6EEhTaZpcYq3ANKAF37T5wJ6TBP6eT5qCZTAf6HuqCjIgOBNBaXqwjtHzMzT8NX6GKYPm9278Q5%2FmC%2BBwncLLzosDS2G0jKMtj9E6lWak46Yl91rxNiUnzIX8dtZl8EDS2brQvv5un1jspzaOzigS59%2B%2BcXY%2FYO9VIwvGSUOhYiCV7nIlEPDQwaI8jemdJt90nMaJLp2QxyBKiDb7FpEamDPWOUuerFhjmPWMGPUuuHLljjfVQDMygGzNn9MyFFzbLbl9rsD5%2F91BcKWKntIY%2BgITpR3oDGsBnRAYYTOUUpBZt06TLoYEiB4hGFGLGoNkhro1Ib0gMU%2F8SN3JGs7geV9XdvXNR%2BrdAOh0NBSV5BBSZ%2FXr6F0YbBAKoQqebTBbOnYvawXlBGtSBbSLJobrbggannmHm1N4iHQxoozzu3OE4Ejip0UArUTVaMFvF8jZTa%2FEj5I6vdPjxKlehppK5NQmlVDcHnwKi0J%2FuiSdRpe8NUDKwCeAtdrCA3fCA1BtjcW%2Bx64miWwM2HBMELMl92zDvUIpRZJ5oPyg4x9aYMLbkNglvAyPaTJarfEBxIiCSm0fS6qdbrLugLNfZ0iSR4m7o1Poht%2BZW7QCqQQGGrH9HZ3TeJ0XLMM9ePS1Zg6PmJtPTz6DCX3LbPBjqkAV%2FVJ9Ye9%2BzZZXtEUT4PdvnFouapwDR6Z4lMl1MGIljytoL0%2FZGFrkrRhVCS168mcJ4v9f0rM%2BPscoTH3AwkvnXPjGZOAdYpMav7p8tEwhKz8p5V8C4wK%2Bev9nuE9kXFNqWuzA%2BsyAhb%2BD608NfbYroodDWqzqvjWiAKKvc%2BzFypX18aH5XEzSJdcJ3HfCjwoc7J3BI4TMHf6gOSl20c6vK02d2j&X-Amz-Signature=13b81bc94ee9ad5f213f3108acbaca8245738c2da2d9504c25b667f64106fe2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3GTI7U3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAhoh1TQoMWm9KQDk%2BAKU5VMtO%2FN6JLC8k6BjubF9xJWAiEAyUdpD8oKWLxWPt83heAxE6fnlYGOhZJM6BBpQEA2cnAqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJV2nkLm6RlRctuDaCrcA80besT4atPVgTkApq18d978mk9hUnfG0hEOTXqKdvqPBrXpN5h5jvqgSL0AQdNE2lzNOuhCNDH63ZCsybrTqHXm5xHLyIpLKANui18ztyaHFWrcFeMpOn5VC3%2BAhX7o2PjG0hBW9%2B3rD0EgTaW9ZIb4x1CVrWTS4A4A61cnTcbiE7%2Fj9AOyM%2Fa7MrSoktNQy2OLxA6cqQkgbb7X3RteHvQSQnr8JUoO9yw4CyjbOKanbKA6%2F86uigWF6lcaYxy6vKbRGefiWYal%2BzuBtLWRkrenVgNxpz0loMCaJpVsAdH5g0CtaDflzdHXpjqhaCFZLLAvrpHmNSbO3Z7uSFCUxDinTdhdm5BxDVrO9QAOQmLim2yyVdx58m%2Flrm8O2EtPu3LH5tK88v9dLO7L%2Bnu%2FNqoSPJPaWQJKXfQ2bVrJ57ThoMU1Z91alZMJ81EUTeUG3oJlpWElKN2CrEe92Cok8aLDwDvOby4JLAYhvz%2FWnrt6dR%2BrcOQxX68h96bJbz%2BuvZkkCDxAartwTBfasIANmiRgv6D0d%2FK1reggLrXsDJMs8Vl54lz9fEV5UQi647EdZsNzX2sQ9FDFMUowMpu1FbihUItNFenAgc6jKt0BKCfd7BkfKdaSrR3N7dNhMNvats8GOqUBTbOaiTdOOAQLo1HAvhm5%2BRIDYGLNXvPQ%2FV2jKH4jQntUyByi2lFges5GxP%2FsTJ4W1u5ZeyXtpKxZQLcMbzO6Y1W88OK%2Fz3lvJly1%2BJdkpnN2XZm0fMAqDEfOETGVplfAoEljy9zGr4yCVlBUlVWJ37%2B01Q6zzABmjlJBG8%2Fs1GrRMYg9ezkhqlHEhquG%2FEkoO6wQod2OobDFZ7pLbDwmb2cKAxVz&X-Amz-Signature=c4c29bbafa3478130ae20bb24e044717e9de855ef6dbbfe6816ad0d022eed281&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466562TIU2A%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCanYheD9jhYn8dryc0VuyoYi5%2BDNx%2BgL06ZGdqJMVNSAIhAMhejcNrVmiiB%2F0PITZnskR5wEp2s8r%2Bw4M6fochDd%2FWKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwNqKR8f3j4rVPFmFUq3AMW5sW1So3dkgPKza2UcmDT99CQ5xAf8PY8e3arja1yRJ41sIL9JTxryISuACdlR75P2syGIpJJ2DGhOnV8gf%2Bl%2BRhKkg1iycK6iptzq%2BUySkrIA%2BWvCvVscLLjeTa8%2B3YrN%2Fhz1AybLneDhmPG8uYbpJ%2BT7x6AtUrgLRGQ9PJcAEoSfGQ%2FHML9%2FKm73rXM7PR%2FkI2NPVbESCtHg%2F9pBHukBLIEhz6729Kc1sWtAliNliYXUedaUgRgNl8XEuXKzdUItl1N8SSHSF98yEfKdfcwpcUkrxZ6%2FPch2gZUdo2a4nSOttmMVOTdFK7mGwqe4i4zTbeSaQ%2By5FhLgIK%2FgoP6rlZopAoyovcjkYzByaQaiHl6QqSizi6QIzbi4WxCtDuqEVzbZgu8fJIPZrcTnpUghdMgD1BaHHyZml7ECVjsfjRtXrZx1Nr4yPkui%2F7GYFIwuTNwn3O3Hm06fX5Oq9rU9exz5KJTAzqtcNU%2F4B%2BNGrbYm9qvSG96WVheHZAV%2Fhgex3z8XGFslW0ecW1%2BT%2F9IdrxaNVzjxwgaasFwNuvWSMDgp9gnQm0jtZtdcKDgsks8uzf8FG0%2B2GZo0BqcIQ012WOnup3TD8z7naezGQap7wfmrWcLrMr%2FaWQIwzDH2rbPBjqkAaPvZyuJ%2BM8MBcwb6or0YGS9BuSgcS5%2BR4lkrnPeySOqONBfmZQPevtYbzfsuWE6%2Bf%2BUi7o4%2Fy%2FiFyeiOx2AcGl%2FES%2FY5b1nS6jDcUXTvXaMAOZgjZ%2FF03VwHohs2uE%2BZaUsjKZljpR%2FtLt8nC3E1cqS20dLu8ctX%2BOZOty%2F%2FFIKBz%2BuI2aBqP9Jycb4ZlJpH%2FUKr1NPQeAHp1%2BIabWuwFxQFyP9&X-Amz-Signature=036adfb0d4a52feb4ab34b6561d002a8a8483f6b9ed8eba59c2c5124a042b199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZIKID7T%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0BDvfO6wMdJNI1PSBW5YZUlSKjQS8nuoLPctYql1kFAIhAKD2TJStAvptHN5ya7VcuXybW80fJIZIB8TYzo6K9vuBKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzlncgJ5UUQz61aVY8q3APw%2F4awpWP5OyQtmCZ1UphtlUcGN395gGjUemEmf7JKhcbDNBmahEQRmhw0zKst72KxFwYKV%2FrI3yPvtoDFPvlYRxLskHYVAU2QCMisQJBtTrUsWJgCeqX3OiEAIrkL9ERPrjLo6SwsNnVMi7M0nLM22Dt6bq89fz1c7IQCj%2BNsYWjG7QDqw967nhQRfFuckyOTQdtACqq5G4cgBYROdBHTSsJx6J6sVssXwb405wp4xdG2cDKM18zweRV6ns1weBhOILnhwmMXUuPSqND3BQiMqTWjIhsO7F%2F2GY9knXojtZMQGA6Z0pew7ZNeffAF%2BoUCqReYLtNjaI0trNyC7%2FP0sV%2FwUTqzEdvHiimHofqjX%2FipamRH3%2BmcaEqPwZAAsSulE9At5Uzxq2FGMPROGqGnnZQ%2BniXctMJM3sP%2F3tIQ8s6q3qSQZP1FFl%2Bl21hcCr5QGfwEaII8MEwu02hkbKiS7j3iFjmiYBAtUC2193F62RndyjXaFdoELpyv7lkUWs6ODGBdNL%2FEnzGKSKfCOCpsPcshTwiC6VX9WmH1ngUwTvdcNOcwb41Zf2z1P6hfoYAGjIKj8Soqyq3d9C4YimyBCmBbw7QCPeUQkrj15Thadg6FuNTADpwxU%2FeGjzCa2rbPBjqkAXkeQDCQy5JMzEj5dSD%2F7VlaypDz4ik5eB7CelKMuFxxg9X4dPSUgfGdPFityCS%2Fh61uJzrqMXFXdmU8n0tFnY%2BIGZA%2BncH7kQSm04lKyarMTHf95lcS4Yb%2FJgRBoPV8dpq8M3ADR%2FssxTPYiE2kNkPozApbiyV%2FvjIcoNuvrNQReMPUiUNHfKrm5swtS0ouesR5t2rz9%2FVsJIVkc5g%2FYSnq%2FlTb&X-Amz-Signature=e69b3df1ee5cde7bd48f48a3d5901672d7a6cad5bf8ed8d1ae7e18d4f22ba989&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZGLRCNX%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHt4NHvH1eE8ke3GnX7lpGQdsHJHET7KfFhBq4wgaQ5AIgfEg9aWLsTl9h9M20Lf6GDyWgBVipKWuS%2ByNKef24JlsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBZp5Gi6P9TNpfQvKSrcA4TcPJjjPTmQCnH0yTfvRq0Q2OFiEBawflwdc8riAs9n7iXFnpJU0oXxr%2BawFk9DIvaYQPHQhB84Unne6Pbt%2FK5Ac98HZpXKxFO5Hea7b1%2BdvvR%2FY9Csf1ldHqDW32vN5kEc%2BRrtFvdqP40CXP24unaameOsnMq9xpB8xB6fHAB1J2x9a8AYqXMb6%2FBDMzjRkwUaEWSoR8tPPsuhl27%2BY9fRbybwLTkGe0pcAcKi3ZUB%2B%2BHqiluvTdKyIihLtiEKYMFomfCQ2QxA%2BUiAMAFTMuFhEI3KqPYKgD%2FSAop1RSMjOa9CkGvJ1KhZGVmxMjRoQ61odjnbXpTCKTHVXPIIRfN76itUA8DccBd2uZou7Jm9NsB5ozWdxa1EXgNii7o%2BkBqH%2Bot6XI1gurDVNoQjx6EuHaRVs51Q67KiWNPGwiRNflDkv6%2FgyGZ7doNXSKkwo506DCwqJ6dERxoDVcBACIx2IVlypB6%2FpS6tw%2Fhcx0b%2FaK7roEJZA3ahxWG42yr%2B7pk6TGnwluS8pq%2BpCpfIw0lIBnke3%2Fax7bVgoKBypUBgmfYuM19tghvsdjX13Pv8Tu2maZAczhL2qhzyDWQWJl%2FMlUKUa7oIbabLSPWwuT7UvbMZCPfzn3%2BxjQMYMJvats8GOqUBrbuHdM%2BmUdaOtrR%2BpiF85n0On8RpSqtMuEAZgijZcWg2jyQRgiRtX2YEIyI8VwYDvi7wHXglYpG1tKsHHUsLhB8yQddIPbvKHcOL7HB8FejjLNNo%2BmkQ6uYk73pO1MGrzMQuB32vwoAmbDFtv%2BMMrbdE83YikMhqHFj05JPCtXuyMsCx%2BXFxT4F6wY2aXWuT%2BFYlW98CB2HdulUtMk74XpPQWzYs&X-Amz-Signature=978f63bb2a79bce0fe57ec0d8bf7caedf6550ab56a7fc58027a5a53f3ab38b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZGLRCNX%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHt4NHvH1eE8ke3GnX7lpGQdsHJHET7KfFhBq4wgaQ5AIgfEg9aWLsTl9h9M20Lf6GDyWgBVipKWuS%2ByNKef24JlsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBZp5Gi6P9TNpfQvKSrcA4TcPJjjPTmQCnH0yTfvRq0Q2OFiEBawflwdc8riAs9n7iXFnpJU0oXxr%2BawFk9DIvaYQPHQhB84Unne6Pbt%2FK5Ac98HZpXKxFO5Hea7b1%2BdvvR%2FY9Csf1ldHqDW32vN5kEc%2BRrtFvdqP40CXP24unaameOsnMq9xpB8xB6fHAB1J2x9a8AYqXMb6%2FBDMzjRkwUaEWSoR8tPPsuhl27%2BY9fRbybwLTkGe0pcAcKi3ZUB%2B%2BHqiluvTdKyIihLtiEKYMFomfCQ2QxA%2BUiAMAFTMuFhEI3KqPYKgD%2FSAop1RSMjOa9CkGvJ1KhZGVmxMjRoQ61odjnbXpTCKTHVXPIIRfN76itUA8DccBd2uZou7Jm9NsB5ozWdxa1EXgNii7o%2BkBqH%2Bot6XI1gurDVNoQjx6EuHaRVs51Q67KiWNPGwiRNflDkv6%2FgyGZ7doNXSKkwo506DCwqJ6dERxoDVcBACIx2IVlypB6%2FpS6tw%2Fhcx0b%2FaK7roEJZA3ahxWG42yr%2B7pk6TGnwluS8pq%2BpCpfIw0lIBnke3%2Fax7bVgoKBypUBgmfYuM19tghvsdjX13Pv8Tu2maZAczhL2qhzyDWQWJl%2FMlUKUa7oIbabLSPWwuT7UvbMZCPfzn3%2BxjQMYMJvats8GOqUBrbuHdM%2BmUdaOtrR%2BpiF85n0On8RpSqtMuEAZgijZcWg2jyQRgiRtX2YEIyI8VwYDvi7wHXglYpG1tKsHHUsLhB8yQddIPbvKHcOL7HB8FejjLNNo%2BmkQ6uYk73pO1MGrzMQuB32vwoAmbDFtv%2BMMrbdE83YikMhqHFj05JPCtXuyMsCx%2BXFxT4F6wY2aXWuT%2BFYlW98CB2HdulUtMk74XpPQWzYs&X-Amz-Signature=a8bbc84fc7503ded633abfe2bb4608937140ff76422518764b66a69354d27f99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ3JZBZ3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfUa9XLMxKaQFEZXVPKYS2PYICUVETO2GmG5Nx1SrViQIgWgZz16colesK6z5TvY0np9k16wIY0YwovA5yvRc%2F%2FAIqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGsOC4mfQBX2cSJI2yrcA8kTkLGZsA9J9b%2FV7ByEXPlzPmm3cQMpb1Gm%2BNZrA%2B4403uUpy8sdlNAVtFTG4Q%2BqdAWruG4Ex96aQiEoKZvGrtaDEDPdVORdbQr%2BopldXdGuzm8k7Z8Aib0TlJi5OBlOmbQRTV4AihlOrPeMYIiRXBDwtzjA%2BGUVa%2FhcMsF6VnadypE7zePhl5Xw1%2FCYm8GEso2SrJbgkbZMxTw9GW2uqlYw3UKmZdvhKe0GgtrXtXld1xxPP9Zq7qIYuAFbIeDPLrI2p2nP9N0cyT0b4ABEhwnVxHGwOtUi0BCJTAyNrBTd%2Bf4eQuCpWLAJgcDxj8wy0aGX69Erw%2FilS2iPp6d8zBgF6P%2BmFj9EeRhmZA%2FgtcLX0COY%2F0i4JEs6iZtuSOLY3XluJSrBv7rXro6L%2BWBC77n9xhihOP40wt3icqkvAW8pF1YnGMHgI9VSX%2FeiLon%2Boe09x1htfYoWeSHhGOLJaaw4YujowmsLr5vqfWn3eDNQ%2FubHA8zm7WYKcQgCmaPeFfPIQHiPqWmM%2BSW%2B8cmz7gD9djHFv15roBt9btUjuKXUM0nkeq8aTH0GS45Pf89NRj0RIEHyX59WXEfQtmOVFw5sPazgVpIpmFGZKOCvu8QgdOWLd9XYbFZaluBMJXcts8GOqUBiyZsSRcQJRDOxL6KfvfXivVpvmhYRRevq%2BKqi899x7VxsnQkSzJvqz4%2BRKwFYGeUMUHHR47xsdQwrzCUjXnj%2BkJicUDJrJpT4XUTfat5mRGwt5MYxrA2TqPPtE70navvJRYjoA0Ij6xfaWvPu4KNYbCqoMI23pcKCLHoxa5WV9jW0ugJsx%2BV0m9M5a7FFZxN3T2CdEXX%2FNjbfnkFJit%2BMZ4wgy%2FM&X-Amz-Signature=4e7d76c1b46cd4aa71bb6bad43e4996dd5955e8c8bceccaa1c7c4d6453945895&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAJFGMVN%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGEFOeKgpN41rKO1Msm6MXZWly7RejBV83Oj88SbvMIQIhAI6oJlRRSVKYeH1fE1EJjTO3QiJyLmsymOXl%2F1RX5G5rKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygFiBIvNwwOWMh%2Bq8q3AMWnhLSLj4JvyM8l6nw1dFkdE9aSY80%2Bs05D6x%2BEc7xmx4iWWc1ZyP%2BlIR66bbjzgmeRgUpjjVTYvL1Ksqv99lv32lg3tmQ%2F3ROFslXwAKMCj0Aq6Qz3SP4fFfsYfR%2FNAl6eGUpdSgqsaMmDFOaqvONcvY2vvqHceUhJo4JH%2BSnWJRxlu9BKZydNpGmki54sEsd92j7Pxk2CjcKwmWxtqTgCx7sh%2Brnvi3JxhnL9mRrWtE%2BuBU9NyuhFgNJaVIJKXsFlnblTlu1FfI8iAsBb2W8g1ideugyE8noT%2FAmBQzj%2Fvf5EtdaGMmOjktt%2FuSuZqYnrGdVE7as4Xz4q06MvR5Nlp6C5OFUCcBL4cQ1DSR%2F%2FKvluejUDc3O23Lq90QmSylCX0SZ%2B4xtA0AvUl1%2FTc9Bsx9VVgerOpfFVvYcTxJ8k40PFk5okm1rJORwsh1jwx%2FgjQGyx33akPDL%2BjD%2B38AAb3HIdwY0Pw8hkKb66vhUmrAQonxHAgBSJunnQZRcAij2SgrVBQsXXZTw0AD8v1Vq24c4ggy7E6knf3kGeYwIMhoV7Ii0GbdyEepzJttIMJTcrwLXKolvory9ybDrjaLzx6%2Fl8Qg6kRy1WsfCmlyhgLrK8x083aSDXfFlVjC83LbPBjqkATUK7LJHQ6AJfGW2DBsNsNbudFNlLQjFjIFiKWepalHpnFqaeUMyQ26ynz%2BuGF2TtgqK7ump8ajbT6sC23yA9sXeTxc%2BdJlO0xeVsmARxa6t81DmfhW%2B0VnZ2EPt0McdFQF8DHnmSvVws7V%2FpeODuClxIbBwVXBV0kLzw41obBJ1zX71Pg%2Fsx5kC0Lq8xnhXOjxxtlavfpkBztIWbYL%2Faiv7G0Rp&X-Amz-Signature=d6e2fd6c9488889448664cf2a70af11d2c00b73ae7a1efc1bb099f681fb34ed8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAJFGMVN%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGEFOeKgpN41rKO1Msm6MXZWly7RejBV83Oj88SbvMIQIhAI6oJlRRSVKYeH1fE1EJjTO3QiJyLmsymOXl%2F1RX5G5rKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygFiBIvNwwOWMh%2Bq8q3AMWnhLSLj4JvyM8l6nw1dFkdE9aSY80%2Bs05D6x%2BEc7xmx4iWWc1ZyP%2BlIR66bbjzgmeRgUpjjVTYvL1Ksqv99lv32lg3tmQ%2F3ROFslXwAKMCj0Aq6Qz3SP4fFfsYfR%2FNAl6eGUpdSgqsaMmDFOaqvONcvY2vvqHceUhJo4JH%2BSnWJRxlu9BKZydNpGmki54sEsd92j7Pxk2CjcKwmWxtqTgCx7sh%2Brnvi3JxhnL9mRrWtE%2BuBU9NyuhFgNJaVIJKXsFlnblTlu1FfI8iAsBb2W8g1ideugyE8noT%2FAmBQzj%2Fvf5EtdaGMmOjktt%2FuSuZqYnrGdVE7as4Xz4q06MvR5Nlp6C5OFUCcBL4cQ1DSR%2F%2FKvluejUDc3O23Lq90QmSylCX0SZ%2B4xtA0AvUl1%2FTc9Bsx9VVgerOpfFVvYcTxJ8k40PFk5okm1rJORwsh1jwx%2FgjQGyx33akPDL%2BjD%2B38AAb3HIdwY0Pw8hkKb66vhUmrAQonxHAgBSJunnQZRcAij2SgrVBQsXXZTw0AD8v1Vq24c4ggy7E6knf3kGeYwIMhoV7Ii0GbdyEepzJttIMJTcrwLXKolvory9ybDrjaLzx6%2Fl8Qg6kRy1WsfCmlyhgLrK8x083aSDXfFlVjC83LbPBjqkATUK7LJHQ6AJfGW2DBsNsNbudFNlLQjFjIFiKWepalHpnFqaeUMyQ26ynz%2BuGF2TtgqK7ump8ajbT6sC23yA9sXeTxc%2BdJlO0xeVsmARxa6t81DmfhW%2B0VnZ2EPt0McdFQF8DHnmSvVws7V%2FpeODuClxIbBwVXBV0kLzw41obBJ1zX71Pg%2Fsx5kC0Lq8xnhXOjxxtlavfpkBztIWbYL%2Faiv7G0Rp&X-Amz-Signature=d6e2fd6c9488889448664cf2a70af11d2c00b73ae7a1efc1bb099f681fb34ed8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TBIMB2M%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T094030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAQma6BPyMzQZMFZehl5%2FrcWRfFS8bC4nrnWqhy8%2BnvaAiEAi4OmLzWzdSs5J9sHN5fxIgpE00HrtIpSMWQ1lxDJklsqiAQIqf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDz4gWBi7dkQM4NLqSrcA8D6E5RdHF3Sgj2x%2FjWds9PI85aR4d1%2B4E7THDgIeMhiCW8ym7CTWdKdm50DVGuKdIJZdtpJ9MhVr6Ta08t6SiJoSsYmV%2FRP99yCRt2nra3qLWbGwHlg%2F818gL51CfA8o%2FQq%2B3uxCBTAKBQa2gr7D%2BbNDo74fq%2BKtRL%2F1wbxxYQWj6mYynu%2FCQ8LO6wlWkIvS7UwyDmtHHiod5Sneei2rgOLGyhjzoM4kcJDoqxJa%2FMPssDfATWXyvYSqnjdPIv03v2C9A%2B8qxNlpqqSvzQS4YZMz2ez4Tcdqw7biWqfcbqKUM%2F4bol3NI3dYJpRyJHmJMzCSwihhIBRexkb3BBAb0diHgTzjLq8ylg3Fi0zqFNzsgBXRdI%2FL0g%2BdUHiSVLAs9myS%2F2UrEy0WTyRYp9mu5gNNv7Qn2qPSpSWjsFVCx5Q6L%2BRlzuSUKS%2BlcLqas0vQuhiFvjYoVOFJr7oPOOk%2Bk2ivitdqNX9gVjpvnnpXfJK2Jw573%2BZ6tYGEyEP9mp4nz3H2zJF6ad%2BiwZ%2Bjv3%2Fo7PR0iJtKoZDfddC79GTifal%2F%2BTwj%2BCGNszPU9pxfuiAIH5u46lwejVYBdK6AyVEFuYlBHE8LlDhTL3nd4XEew3v%2FeTZn1bdKfklHYuBMPOGt88GOqUB3wGe3%2BtiZ2NsRuybFd2eaaVuFOAToB8lOt6eQMJuHtF9Uv3%2B%2FzwzkMCR%2FgUa4A3GPH9ugXHhcRGjtI6L%2BbudvdMBmNAYfILJ%2BrFUsYjLgc9XcjbOfT7xyqDucrsKLr%2Fc9SHmU8j7qyQgrH9cph2nmtXlLHgPLQ2KMGCAC86ZeFum%2FU2Wioowx3SCJO%2BFaRVXQTLXFr%2BFc8vHjNpdH2levCLsoQUL&X-Amz-Signature=2825720f6fc8d3597a2a97a3c8a817bcd2e9f9b45fa02679542a9930e01fcac6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

