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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TKBG3J3%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIBa08QKuUd5CKVBqPTDhX5xOrHqHBxgwgVTU2x0kodIKAiEAlIa3njeGIMgFYHHDJu5ZSVeIoRXd%2BRriGma0sf3WxlAqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBDqHyZjy0Akh5KzLyrcA9jW%2F7CzGOq2lqdyRDQQDwGHM0hDL9NOnxJmVawTEEDxt4G0K05qyz9P4Xzw7an%2BaLCwMfycmBxKVBIjQszZAPUEzCp%2FqQagwZ%2BAeovlaeVY9qsn5CTazWxPP5x0urWtLq5ubooSgvN44EtJBTAyV8JNXuSgn6Z6lWvKXylC7cEl9qV8cr8EuTrrn4vwaTeFRDEgxzTrlAHIr9sSTtvhkb2UV8zdHcbMuEBC34ah20A4mlXJ8%2Bep%2Fx%2FagFYIumgK22BsQWr5uDllXNxL3tDPY4V%2B68kJbkJ33Psfj%2BSVvvkd%2Fmx4ygeQz8q5vcM38QD9YLrzWrZF5yXPxkhwSfADibBwI%2BS0YukgJofnLZf5qJjVHAlngyrpWDboou%2FqClRRsC6Xv5ggLj3VMX5aCI98NgWxYd4YyZolvpbdEeOKHp%2FkdSaqRcFgV8XNfpYM7DvYja%2FCsTF65FSlXb72Y8CY2TFDgIxvlUz4MisOLvqh77dCK5bdibUB6YoCponwAqInbQTfcC2cFrNCZI0bK2Kz8q5alpo3xdbghsFtLej3FqusFVXOC%2FuAbFt4y9u6lkT6vPMhLU1NsQgzK0zTWJwTBWMs4O3xVpWz1qrH5MdD3m%2F%2Br4q2Xmj%2BkobjSS5QMJqtyssGOqUBrBV7uzjUBi4i4F0Vb11ZRw%2BpInWWXEsa0qk4WkR0ZHDCk1fHCLK33mlCA%2Bs%2F%2FZTKySiz2%2BxieIGbHF1MpIIOAU9Ea2In%2Bvw7GcnWLnaFk35BeD7fkFolPnMlPmnZxJH1OyyRoqsMCd4uifZyU8Bc8zByiCFp7qGxhMI8cZAQSuiU5j9r6yz6eXxW5ePNT%2FYySOuJeWnGGxdCzoloDrdvJ9xpSPGH&X-Amz-Signature=28503e426a6e0b05de7c829f2ab496bd759d26d5bacdb12ba3d9e9e3e3a00173&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TKBG3J3%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIBa08QKuUd5CKVBqPTDhX5xOrHqHBxgwgVTU2x0kodIKAiEAlIa3njeGIMgFYHHDJu5ZSVeIoRXd%2BRriGma0sf3WxlAqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBDqHyZjy0Akh5KzLyrcA9jW%2F7CzGOq2lqdyRDQQDwGHM0hDL9NOnxJmVawTEEDxt4G0K05qyz9P4Xzw7an%2BaLCwMfycmBxKVBIjQszZAPUEzCp%2FqQagwZ%2BAeovlaeVY9qsn5CTazWxPP5x0urWtLq5ubooSgvN44EtJBTAyV8JNXuSgn6Z6lWvKXylC7cEl9qV8cr8EuTrrn4vwaTeFRDEgxzTrlAHIr9sSTtvhkb2UV8zdHcbMuEBC34ah20A4mlXJ8%2Bep%2Fx%2FagFYIumgK22BsQWr5uDllXNxL3tDPY4V%2B68kJbkJ33Psfj%2BSVvvkd%2Fmx4ygeQz8q5vcM38QD9YLrzWrZF5yXPxkhwSfADibBwI%2BS0YukgJofnLZf5qJjVHAlngyrpWDboou%2FqClRRsC6Xv5ggLj3VMX5aCI98NgWxYd4YyZolvpbdEeOKHp%2FkdSaqRcFgV8XNfpYM7DvYja%2FCsTF65FSlXb72Y8CY2TFDgIxvlUz4MisOLvqh77dCK5bdibUB6YoCponwAqInbQTfcC2cFrNCZI0bK2Kz8q5alpo3xdbghsFtLej3FqusFVXOC%2FuAbFt4y9u6lkT6vPMhLU1NsQgzK0zTWJwTBWMs4O3xVpWz1qrH5MdD3m%2F%2Br4q2Xmj%2BkobjSS5QMJqtyssGOqUBrBV7uzjUBi4i4F0Vb11ZRw%2BpInWWXEsa0qk4WkR0ZHDCk1fHCLK33mlCA%2Bs%2F%2FZTKySiz2%2BxieIGbHF1MpIIOAU9Ea2In%2Bvw7GcnWLnaFk35BeD7fkFolPnMlPmnZxJH1OyyRoqsMCd4uifZyU8Bc8zByiCFp7qGxhMI8cZAQSuiU5j9r6yz6eXxW5ePNT%2FYySOuJeWnGGxdCzoloDrdvJ9xpSPGH&X-Amz-Signature=28503e426a6e0b05de7c829f2ab496bd759d26d5bacdb12ba3d9e9e3e3a00173&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KHZUP36%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDpjbz6lGkcA9%2FVXtl2aIHmsSxtEJjBS82ctyCxKT8aEQIhAPRn8IFh653zY8g2PtWeASb1QPMYZOv7iFJDOkYLydXJKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzrp6XJUH5wCL4pxzEq3AOlHWUU2XYJsxU6YOtTZMP7NXdFY5Q4jMTcePqdYReT4%2Bbq%2BNTxmO90KxZkXGX5JIayGclu3rRwJlKg8kzLiybmwxDq3PwVW2OC%2BHOC%2B7Mu0GWzVXJZ%2BghUiwNcOU2BtnhrnhuQhDhNPAhF52r1DVRLzofWkouIIzZZtz%2FbaG1g7nFNHs%2FRbgxmcKfKWqe4O%2BvQMyOhE8wvvlVhLA%2BX38l3Z0pB0OeHLcdO4XjkIUQbKw7L35hMYYcSq6DwX1RbmngKuRfQ%2BC6Fh4V%2FTnJraBWDQTOuwI7pjw57Q2ix9a3TY1gSC8xjHZutcVgq9umuHIoPoOzaBYnYrwcAxSJejqRe2kbbBKLw9c5Fksg5EHvOt50oPYvSnMXxvdn20574CSU7pe9reC1uX2mVNP74QAv34DQcq%2Fxdq1jachlc%2FrDVZ%2FOSvWv%2Fyh7tEHn7Y2MWkjKXwDlVJt3vdiT3iP044GVm%2F0XpMy5PFa%2Few5jfWrnG8W%2ByBRLDQd4MnYS5Vv160Q2yUHJaXhyyBhFt5GBkJdw0v2L3g9lw27B0NPMDR8UW8J9U6kVwvDJZT5RPtbzV%2BsnIrkX7Jw7kEpsQ3wjO9libGT2Ushcu95n8jO2ClZaMH1HfXOWgiPog5kZc3TCurcrLBjqkAayh3ZmTXI1XrgaMZ0xuBQGA%2Bt5%2BOOPy0xEG5fPbPP%2BAwEVqbQXiw0lyQ0fCKr9tskR1yx0qoyDK%2FGFMszLdEXhtLj1P53lPmPaHA96FRPxOdL21Bd0iRNFdOsHMG%2F5KWq0sUghWkC1akgaEzGw3eM68AANBDSyv5WWqzctlGOgDEeDErKbWZjPc4Dkj%2FUlWVklbQeqvOGSJbKi49DLShRpB7Pzj&X-Amz-Signature=9e6654c13ea59bc0fcae71f901ecc332c7f58f1dd3acb7e606b5eb476bcdedd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZDKXRRI%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCUu9p2QJyQ9QbYMvqZV9nihl40AqeN0lv8%2FZSDClB9qAIgYwLPnhfb9XgLTDBFu93jdKMk2aKz1SuQi1T3j781tsoqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOkOmhlQKWIhEsYVCCrcAzvUFHTq3Nd5nIAtpXTb3nPlc26%2BCpNwPLEPUZeqO1B45goQfoYzrovQRsHuTXPsoUzf1ibV4YDHHMvuwLPSBs%2Fu%2B4NkdmADo2VQildJmcubo0jY6i%2BWIH3MqZneh1BCpt2SOUvoP%2FhOhzUd93wP%2BVK%2BRkyPzn4iwR20%2Fni7QeYA7eZKH99id2GLYdszKL%2BDk56rEnqvJEHv%2F0opvCk5YRIlcN78cR69Ksu8olNpceVf01nN2nGU4mDkv9X06GF6kG0uvOmWqCDXzKa%2FYYwigagF1l2yNfkYhGiOOKJbFkZ3tboy0IohAHfnwUixbIUomyGHu1u5tKsHlx8FN3%2Bbjo44QitxGN8yPploMRBTbL9B%2F%2BhdPPkNka42o4vG08EiAQXlisA%2FDS6gDbJ7jHOCd4SAtGscmnYll4G%2FtNeBZUALLf3hAUcviyve72wFcxhWchJct9jnjleVPDx42qwHlt2OCJ1sgHp17wJgySSJSJIIGWby9pxZdAuxyfkFXsHRZgLWNdNtKtJcR%2B6p3HSE%2FtbTICCI7PA8pHwnxbK7h%2BGQ6yoWkRF7Svy6N%2Fzgj1gFtwTjJLc0mJ0ciVaks6yfpig%2BHzCHtqEJlVnUwq6xno6F0tA%2FZvyrxSS0iCXAMKatyssGOqUBSWEH7bo30rI8NxPNFFMzQAn7S271mfU9dpxf693qkxSnc0M0Pxm60enZUpy8ITNnAkf9v89TvEA8moy37OLmvBjmV9xIBiaDqGcGIjiakOJAJTAjUUR%2BRHsMYY2eAamJJKm%2F0pozUSHbgf35N9YM%2Fz%2BNRlVaiA%2FAN97CjGg2qQwY7aUrgR0CLzptVRx0QVCMdyGsOfA162SLMVBGwfNAwBxMqhUE&X-Amz-Signature=8973bb1588bec14dccd2dad0d9af7363043e64fab3e997fb199e2fe035a06ddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZDKXRRI%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCUu9p2QJyQ9QbYMvqZV9nihl40AqeN0lv8%2FZSDClB9qAIgYwLPnhfb9XgLTDBFu93jdKMk2aKz1SuQi1T3j781tsoqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOkOmhlQKWIhEsYVCCrcAzvUFHTq3Nd5nIAtpXTb3nPlc26%2BCpNwPLEPUZeqO1B45goQfoYzrovQRsHuTXPsoUzf1ibV4YDHHMvuwLPSBs%2Fu%2B4NkdmADo2VQildJmcubo0jY6i%2BWIH3MqZneh1BCpt2SOUvoP%2FhOhzUd93wP%2BVK%2BRkyPzn4iwR20%2Fni7QeYA7eZKH99id2GLYdszKL%2BDk56rEnqvJEHv%2F0opvCk5YRIlcN78cR69Ksu8olNpceVf01nN2nGU4mDkv9X06GF6kG0uvOmWqCDXzKa%2FYYwigagF1l2yNfkYhGiOOKJbFkZ3tboy0IohAHfnwUixbIUomyGHu1u5tKsHlx8FN3%2Bbjo44QitxGN8yPploMRBTbL9B%2F%2BhdPPkNka42o4vG08EiAQXlisA%2FDS6gDbJ7jHOCd4SAtGscmnYll4G%2FtNeBZUALLf3hAUcviyve72wFcxhWchJct9jnjleVPDx42qwHlt2OCJ1sgHp17wJgySSJSJIIGWby9pxZdAuxyfkFXsHRZgLWNdNtKtJcR%2B6p3HSE%2FtbTICCI7PA8pHwnxbK7h%2BGQ6yoWkRF7Svy6N%2Fzgj1gFtwTjJLc0mJ0ciVaks6yfpig%2BHzCHtqEJlVnUwq6xno6F0tA%2FZvyrxSS0iCXAMKatyssGOqUBSWEH7bo30rI8NxPNFFMzQAn7S271mfU9dpxf693qkxSnc0M0Pxm60enZUpy8ITNnAkf9v89TvEA8moy37OLmvBjmV9xIBiaDqGcGIjiakOJAJTAjUUR%2BRHsMYY2eAamJJKm%2F0pozUSHbgf35N9YM%2Fz%2BNRlVaiA%2FAN97CjGg2qQwY7aUrgR0CLzptVRx0QVCMdyGsOfA162SLMVBGwfNAwBxMqhUE&X-Amz-Signature=8210287bc3f41e6560d13b147e612c71dde2d0600becfcc8010fb79717d08d30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNPNZ3LI%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDKTuZYS7PRZwwCEdyP6tOkr8SrcQtontxcR%2FwCaKrQ1AIhAOXB62HKoiqJWpCz82Zf4Vc87e8i24%2FxjuQ6Wgtk3aZiKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwilUxcd9gFr%2FnJ26sq3AN%2FVcYMw6alVsG6CackGrXvMbNRR4Sqmlf%2BBic%2FmEKYAEZwWkRBxMeCkHA688%2BWUjgTs2YFh7EKL6J8kfIG1gNENuTBFIGnEFjPefiv%2BxCMep99DMZHjWjpjUeorT6AWFjNejddtoTJmFWt2%2BojN%2BblhPzvwTCBsKCowh%2Bn0cRBDb%2B4A5ZKCrt1%2BpOOwjqUoulnDCtl8eWgQmlEaWiAJ8NgQwpivVxjjJOFOU1odcI%2Bm9yIR9WQOtJUAaujlVxYlb8WQ2j3hu%2BXnS3ImY64QbD4saomVkJnamaMKbGMYKHzVgAVaxsxcBgnDvZdHl2Xr1V4SVigDKmsTIXTh2EQsksVmYBq8nEPu9rGjOTa6V4nbKzZV75WGgnWlvSCwVelooXJ2mghDtDkNuf6BxAGvp9qctyQ8%2FDJrFVy02SV6HhdMRsFhtgdF22gvsFLVBZLEGs1kVQ5fcPTYCrxxujITltLa4hQ%2Fkr1YpZbdzzkNzlzLxOx8o9LqQBloeEIdCYnuA0qyn7rwJso%2F39U%2BKWrLaX2yAWPYk1zzFY57FS3Q6kkJn7uEGou%2F51L10jthdBh%2FpwkMfSm4m320M7K0gYXztPEbMH4JpqY4n6vwT6AilUlH%2FndkPX7nbLVBeJIvzD1rcrLBjqkAX5y%2FBfBhbdUWDT%2FN%2BwCymYpKXjZuvGLzFh8Y26pYpt0Qq4MmQwqlyPUWBNjJLyFX0BwvFag9WTJkcbZQWPEpeIDjngxpZl8NEq1L2DT4c7bMQhs5O8MK%2BlSa%2FvwSA0nt%2FSSiS72tnAkA5HgrYcuavRFdOAhwawkY9fpKUaixMmcvAC731xntv59v6hXuVVBCmAXjaTJk5UdNDp51bBqiqjbq31K&X-Amz-Signature=ba5012409521a5d250d5ee39b79616999e93d5b16e18ed49171df8d3a7e2a0ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4GZUGDY%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIAsk%2BjZULHhBXvfn%2BAlD6R7RWpTesYRlO4kWsdtaek%2B8AiEA%2FVcWfcwdoIXKS6NGUck%2BzvxUnbqzyOsm2T1NnIp0EmAqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGxN61rEjqDLa523FircA%2B7Psl6rCnFEMDk051X7HtZMMjo%2B%2BhhzQPtIqZryzj3lfqwFMZu3f%2F7tA6Y6%2FDwV1gjQ1GrCn7q1igrwcLrojhnKSgBi0mgUBhR%2FlRUBqDtczkz28LGoHtlby%2FYAnoNBCnXTDHeLS13DdFE3DznYN7KnjOuw5XUPCGoxJpm%2FOuog9brbwzmSERsQ9QSPyKk8evH%2FSqlfGJp81bKu4j0p2Uq9s70iTndtwmr01lyKlypAYyre89O%2FE9VRTdJPD4sphA5dP0LoHZm7ibISqPKa4vmYUvgcrWRMj1Pm7rE6CGNU6xwddX7NQFAIWUFFViXdriWVF79YL7Ghg4nD7f1TXV86epS%2BLejYTX5T%2BOvBANeiy%2FWkFz%2FGBpqPlj6UnafB3udqj6Fhc%2BJ2juAXmpRfKN%2FAvquGZA6iNMzaV64EF2QC6AZJmq5yN9OOTZsqoDu43fvK2OWEP%2BKoxyMl6P%2BP5ndBdrwExXbg1vzYNkJJLISKA7MV%2Fdep%2B3RhrPpgHvP8rI2DkuAnN461v%2FIGHMqlCIPpHMTpJMlR1Av5k8izMU4QJ7e9RU1jQ6QMTCl3UU9vCirxBykcmbGHKgKlF%2BQFssj71HHe63mAAkL4AzVjsqbzAUOCJR4%2BbwtsFUj7ML6uyssGOqUBJdPKZzAaWDpDYI5d6JqvKVAOoLcmcXF%2BhoWfxiwjclxcN6eFQpmiiQCK%2Bm6zmXV9D%2Ba65iAQPjjJOwYcj4n4%2Bxvu8aEqCkRh1IhuNiCFES6LorGnd5s2E7QjY%2BpqR0WuEV5C4dkYjiCyEOSp%2FMUvYZAO28bpWqKDQDAX%2F7K3jKU3p%2B5sPbS7InaHGxtOkJgpiCvX8g2xNrEi3ZgFVA9xy7fllUqq&X-Amz-Signature=e19c4e108dd827dbddc4919ee0e4ccf6418370d847431106f5d7e3c967453199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKA4RZZA%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDbHKtqangxq5pRXSZ6WZQkZXjuZhD79izDyzfXzS5jTgIhALz7N98mPi9X7EngONrohM9SlrB%2BrG%2F5IU4U%2FdwTg80%2BKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgygGepGlZfCWHNoawgq3AOe8NomtsKhTLZAs8PeOA6p1O5u4DlKc1TXWzbwaZznRzalZyLVeDb2BBWpUUrpT%2BogolJatkt%2BzOd%2BKrenETMdtpvV3QGC2akFwDhnAK2ygiu2sUhD7%2FEw1%2BILwKVROpE9DMu%2BTf2f7Mtx8F6rmDMPscv7SbKWJNV0%2FeIexFIBKVb6zWsaSkWLqdKYVBLxfN0A7vkW6dMfn7UKaUEfG1hs2ZHjbJFhX%2BzOjTYvmImNE4lscOGVgxrIBwO%2FaFFCbkBDh2w5Ftr%2FjvgEcimd%2BHMaYNyg4z0OKwlwddOkBqAxtcaE09Vfi4BBWRnB8Z%2FLPcJ5tdSxT7aHaAz%2BZiotmOZTEOvOTjz1BJz3txQ1pyxKa4fPibbdmWwf7uqKMU0Re3fLtBcDWHtMPegfPKudvr9DuIsz3lRnlqNj7Ht7xrcglvW%2FNOlVLQpc%2BDa%2FbC%2FpN5OJGbS1h5xQQ%2B5z1BJrWrXs8nClsgHT1J1whEJxe20nbtAIwYb7%2BDPSrhcGlyad0J8xXr6SrfxmqEnvUmfemX5hMwkTvSld%2BRCh8j5F5NhAG3K8%2BtKfbU4AG%2B43Cczv4%2BupWiG5tja4diAUfF67NcycymVr74LxoVEF90rv5qcmTCclmngX6JBBNOOORDC5rsrLBjqkASuIzkI2QYzazb1g2jjP0F2IZtbSGUwf220ojBSbVlGfJKpF0SdvI8oizqNg9J2lk5nOjwgDCsQGaJ22llglklkclbLn%2BbMnraVCuj25q6wqdwcIrrE2xW6COiiZ1xsOj6Zi64WUEkpqguXrp4LYa5NBSuM%2Fko8wh4dni7msTxUMRQir7TQkGNVrRe1G6MR37kvbyAGd2GlPg%2B%2Fv7gEdO49JjO75&X-Amz-Signature=e5bc1fa2777afb35e072754e5221383f971d5a7afe55126a09a766be3903f9b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNZZVCM4%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIDJvgv86vCFLotnH5fydhGz%2FywVbihIkIJ9mO92egslWAiB24Z9G7E8eq2oSJfvp4if3M5r9%2F81cFAFTZbyKOJ8UjCqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNZ1D619Svgr2Z6GWKtwDNdQWg2z6rvvyo%2B6LAkdsL9CeQ19cHWj7YwmSfnYxcWx1ZbWzgMLDtGPedp84Xf46Lr1KZfzoJK66vI%2Bo88CKeiUHeRFlb7ndUZtVicUghmPbOTEIUUByKEF4WPRZ771RSPI%2F%2FzdWPBWI6EOm6U94QESQnIswsM7Ud4dGVd63YTKMxL60T6O94yNE3DPSWu%2BaUaS3E5HPD0bTRDsJWb487OdFsUewv2RKVNxJ5fZFPZ7Sgg2Ce7lr%2BfdcYMnBxP5f5qXbyQBBsOjtKy2jf5sn2O9a9egLKkh3feBhwMgYVpQB6RialFUiT8Q3DaiJ2pvYT3sfYzK55ugvwmBNnAQ1KStyOxWNTrtUzlplbtovSTd5%2FrMDRAsyi%2BE9k2buZMC%2BLFJjFKHJ4baUqeyYLH7EkDUDBPRgjP0zJrPuekDRJ68C4tU6Bq70qMsSLXaDwRobmq5kxaCglxtkTIOkcMSMKosBbAJV%2FLeyFWk2PY%2BFX%2FmGMM6uNw7K5gpznNc9dBAEaugJ%2BSwBqOC9wHA85HcDWfY7mqHdf2bJ8W5chLnrc4hARNG3RKaWJQ4U9uAnRbCIoOUBEt%2Fxg%2BLWrZ%2Fntw7VrMy4PNgpVvOyTmtLakuzRIT%2Bkvvmqd95lAmealEwja3KywY6pgHbjWryYZwsKIK4J3IL2roXy3w2ZlAhyzw1SuJX%2BD46RJWsYP96GeSGmMrRnHVz6KkfKtMwQOtZqvNkdSYXGwYKxKsZIckfXyT5BI9vI75yz9HT4yU%2B3%2FqUPOfRfqXTpNe1Fa2unkME0S2kx4KDUy6zH1HXCZkR4c3nhjPe%2FTPyM1T8KLvAqSgJkuGgijNLxpL1sZ1i18sgoF6Oq8oLd7AGXFnpGs8z&X-Amz-Signature=b77935528125f8ca877c77b165b41e651055f18d25b1599b68ccbb4628b91e53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNZZVCM4%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIDJvgv86vCFLotnH5fydhGz%2FywVbihIkIJ9mO92egslWAiB24Z9G7E8eq2oSJfvp4if3M5r9%2F81cFAFTZbyKOJ8UjCqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNZ1D619Svgr2Z6GWKtwDNdQWg2z6rvvyo%2B6LAkdsL9CeQ19cHWj7YwmSfnYxcWx1ZbWzgMLDtGPedp84Xf46Lr1KZfzoJK66vI%2Bo88CKeiUHeRFlb7ndUZtVicUghmPbOTEIUUByKEF4WPRZ771RSPI%2F%2FzdWPBWI6EOm6U94QESQnIswsM7Ud4dGVd63YTKMxL60T6O94yNE3DPSWu%2BaUaS3E5HPD0bTRDsJWb487OdFsUewv2RKVNxJ5fZFPZ7Sgg2Ce7lr%2BfdcYMnBxP5f5qXbyQBBsOjtKy2jf5sn2O9a9egLKkh3feBhwMgYVpQB6RialFUiT8Q3DaiJ2pvYT3sfYzK55ugvwmBNnAQ1KStyOxWNTrtUzlplbtovSTd5%2FrMDRAsyi%2BE9k2buZMC%2BLFJjFKHJ4baUqeyYLH7EkDUDBPRgjP0zJrPuekDRJ68C4tU6Bq70qMsSLXaDwRobmq5kxaCglxtkTIOkcMSMKosBbAJV%2FLeyFWk2PY%2BFX%2FmGMM6uNw7K5gpznNc9dBAEaugJ%2BSwBqOC9wHA85HcDWfY7mqHdf2bJ8W5chLnrc4hARNG3RKaWJQ4U9uAnRbCIoOUBEt%2Fxg%2BLWrZ%2Fntw7VrMy4PNgpVvOyTmtLakuzRIT%2Bkvvmqd95lAmealEwja3KywY6pgHbjWryYZwsKIK4J3IL2roXy3w2ZlAhyzw1SuJX%2BD46RJWsYP96GeSGmMrRnHVz6KkfKtMwQOtZqvNkdSYXGwYKxKsZIckfXyT5BI9vI75yz9HT4yU%2B3%2FqUPOfRfqXTpNe1Fa2unkME0S2kx4KDUy6zH1HXCZkR4c3nhjPe%2FTPyM1T8KLvAqSgJkuGgijNLxpL1sZ1i18sgoF6Oq8oLd7AGXFnpGs8z&X-Amz-Signature=1c6b4a0e1ded627bce0d2d9d1362d29129b20e75f46683db86e3e3308ea9ad16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WACULISX%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCgSE5abzpH4FSoWMuUuCK2n80%2Flk8zY%2FJKoz145l3i0AIhAIk0%2FiMMAcSb1cVr1ax3FgTw%2BOKVgkraFV3%2BjK3HQ%2BOUKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxw6mzA%2BZ%2FiNv52n6Aq3AMqTCqimso%2BwHBxGMVYEIX2%2FUMqzjlkRf%2B0qEntCOmeQZdTxor46UQTHHzlHMSiSdNKJqXtoF%2BTunb8TvIACfpmcA5ne2vzJSJAg58yFBY66sFUInoLVfdgGFiWWhcaHMh%2Fi25w9P6QRfevXD3s9ZRDSV%2Fpjy1vIkGRttXuNGVigY4AkDvfmh4kHxqi%2BG3Qo67ZTqpebSKtK8JQmNiRHVT6bFxgKmvp%2FWS8bvsliQcYDcyWcdUuEDrAThhX5DtgBmCEw92eB11qWVl1nUkSm1yVwnuw9nXYj%2B%2FkzKqXRktvtw3hs1NnrXl4zLv86%2F%2BsMd2TTOcHAN13nLDq9mBvnFMLvZAYfAOf6fKpbeCYVSb7XubxM2%2BSlHTfn8G1G8M0jBaUAaOIWJnkDH2x8ZA9K2JF3tv%2BsJO6dZm9jElT4wioK0Xhx2Plr3e8MW%2F3AsAlufjVGKa5%2B2Roh%2F0VwAlD6tLlZDoTwHoAm0XwX%2FNCYwNCHYOmHj1ZVSt2mlXLDUAlAcBWzfGDAGtOx6RNyl4PkKkXfgWhiv%2FzO0kK1FUUNE2YXIM8WpS4AgxHJQ7vxs5vqUkSGntVd8iwM50pUFOLlXdvKGbkXEcFDo3qyRPKV92WH2V6WHgdQy%2F2HIvcsjCwrsrLBjqkAQWyzQXQ46UJOXjBrxuuOPr96GjTCJld8BjDLZdR5LT5jGJkoLB23%2FRSBGL4IUdoNhZ1zswgYX7eGgXP6c7ocuLHOhvmcoLmidPLGpu1cfxoWhXR5gKL0tfcmiqbmycN1VIsTmPeWAEyfG9%2BOhHVPsaJB2hHcUOmDrDaff9u8vVjsmSroguhkfQGP11WUUEU2ioEoBUw6HQC2znd8mzSZTgY05NA&X-Amz-Signature=dd39526dedeab7ebfe1afe1f813aedcde94623a905290801196e50801207795e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U26NVMK6%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCkjeMLlobHzMpQ4trAVtDhoLxNRbBP%2Buf%2Bado7YKNYIwIhAKHDbIqNIcJ1Hd3lVahUJw78%2FE9nnCMAcVNi3dbwWziVKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw2fjOdFfijLkGxUZgq3AO2AF538PUDkzm63q6XT3JWzri2LSzC6J8gxjAuBXI8S6wXue%2Ft7NT%2BInf0Y%2FmKnxsXXzyLnbxHnLk4IitzGnaoBYD%2BAE3bgc2M3j%2B470hal9SsdMN%2BaPINhpmAxam1rz4pJkKMWsesp82ahadmVhXYxPxG%2FFzq1qdejHoJFiQ7jicknUk82gsxjEeB0roJ4kBVDroPgVE2Pi7Xvv8Ptd7ytWXrZ%2FuJFhnbYk7j5iL9L%2BFqKceQLXRjoxcEjzgjxPXePhs1ndnz7%2F5dd84XC%2FXoZ6Fo6Sc5FXWyJngCitdx70ZNU4z6UKExqTVGzMUsP%2Bi9KjTqOdIkvVzSs6Ur7dctqHGjjaVCDqVtQvI0mZrGiks4WTxy6aEdd1WZwAoELQGUZxm2tY0JK3ei2fQlFLYEuUkwfiO%2BWrSRf%2BrbNC3o%2BsyNdsQQevSpkLsU5xh4hw0rwGUNzdZbQqQ8WD56KxBadvdzueXOh6e46EOR8k4vTx%2BCyV0AO9WjFOQzsGm52mTZpKfB7aFPyYVT7sTZwWevEweFBclbtIzWoFnC7vtsSNyejObOjFhWVsskYKp3fHPTOxFeFlHVhmvgzlzJpIq8CFLtUtIKKvQfZcEqUMFfw8lh5AICG5WMIyp%2FCDDHrsrLBjqkAdFXJnfCv9T9rrCvtqb2PKrLlXIoU1XP%2FlD94s1UaFVQ7jngUtk5keKkk3bNA%2BF8l5Gp%2BwfGM5HEesVeAFnFG%2FCvwUfc0ZR7EzhBBPrOlmZ7DnYv3cyulFVjaqRqpis8A%2Bx1rdzDEXDLljBch4k37X2rT17hOt0mOjhNXr6bNlDedV8HEBWQhl3NmBqvL27v%2F8kK4Lp68WTY1msk2ysvY3PimC4H&X-Amz-Signature=7dcf7824fe37e72b989dbc80827227583eb3a8db4ac4393bb0ddab8e8c503407&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U26NVMK6%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCkjeMLlobHzMpQ4trAVtDhoLxNRbBP%2Buf%2Bado7YKNYIwIhAKHDbIqNIcJ1Hd3lVahUJw78%2FE9nnCMAcVNi3dbwWziVKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw2fjOdFfijLkGxUZgq3AO2AF538PUDkzm63q6XT3JWzri2LSzC6J8gxjAuBXI8S6wXue%2Ft7NT%2BInf0Y%2FmKnxsXXzyLnbxHnLk4IitzGnaoBYD%2BAE3bgc2M3j%2B470hal9SsdMN%2BaPINhpmAxam1rz4pJkKMWsesp82ahadmVhXYxPxG%2FFzq1qdejHoJFiQ7jicknUk82gsxjEeB0roJ4kBVDroPgVE2Pi7Xvv8Ptd7ytWXrZ%2FuJFhnbYk7j5iL9L%2BFqKceQLXRjoxcEjzgjxPXePhs1ndnz7%2F5dd84XC%2FXoZ6Fo6Sc5FXWyJngCitdx70ZNU4z6UKExqTVGzMUsP%2Bi9KjTqOdIkvVzSs6Ur7dctqHGjjaVCDqVtQvI0mZrGiks4WTxy6aEdd1WZwAoELQGUZxm2tY0JK3ei2fQlFLYEuUkwfiO%2BWrSRf%2BrbNC3o%2BsyNdsQQevSpkLsU5xh4hw0rwGUNzdZbQqQ8WD56KxBadvdzueXOh6e46EOR8k4vTx%2BCyV0AO9WjFOQzsGm52mTZpKfB7aFPyYVT7sTZwWevEweFBclbtIzWoFnC7vtsSNyejObOjFhWVsskYKp3fHPTOxFeFlHVhmvgzlzJpIq8CFLtUtIKKvQfZcEqUMFfw8lh5AICG5WMIyp%2FCDDHrsrLBjqkAdFXJnfCv9T9rrCvtqb2PKrLlXIoU1XP%2FlD94s1UaFVQ7jngUtk5keKkk3bNA%2BF8l5Gp%2BwfGM5HEesVeAFnFG%2FCvwUfc0ZR7EzhBBPrOlmZ7DnYv3cyulFVjaqRqpis8A%2Bx1rdzDEXDLljBch4k37X2rT17hOt0mOjhNXr6bNlDedV8HEBWQhl3NmBqvL27v%2F8kK4Lp68WTY1msk2ysvY3PimC4H&X-Amz-Signature=7dcf7824fe37e72b989dbc80827227583eb3a8db4ac4393bb0ddab8e8c503407&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBGNE4UX%2F20260122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260122T220107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDKYuIl%2BUCydEVxM3JrBAa%2F9abTFskWPlxKhQQF6vwgDQIgCt0%2BeKZw9QIgwgxX9xCNQoLUq9qMPd9vZz2GGzN2%2FhcqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOzxkIsS%2B5pr2YwYfircA4mi61GwLN7I%2Fv0ctEFG5FUcf15DP6%2FCc%2BeFhsL58fZaTXFi2aqDexrZz0VhzUn2BNX86Iji%2BnCiNYOCIKbo3b6V8gzltKOG23EH%2BDr7oNFBqGacaIfVrnBS2LM%2Bcz7X44bLq69HEYjLJWCnSLJC2ftHAoO48WkrWrzvMn2a8FMSbKaEt1S9pvOp2DINOcWtRmj18olq8Ge8PA61vK7%2F0QLLpjhaHwXs3heRDzNkk1opNgMfQwI5I3DcMrSp6beylcL%2BPnH%2BAw28upw5n8VgTlGpCVgHvGond4Xw2NfKLs874UjJnCMA9Xeb4tuRqzD091KDadX2usNEf1cOluS6ngJdDT6Suh2adBrGz0q1CFMOOEm7295bgEdBPKSLpIjEfiTgtEmohvC5VnOufThvFCNZDBKBXielBiUuSlCWNKHy1IZqMljCZCBXlhiVYTUicKVJCWx9RcGix920qQeAQ2IkwCkfAUzhGRjwLjayfoopdsz1fO3Gtzjvn22jU3UrMQMDopY7osOnLktgv7BcWksUkusQhD7QqziLySog4VO%2BQu9tc4KdS%2B44NJVhrSMxA0TYfdYCgdPOwClPUiQ2WUIqXhmT5%2FlAQ%2F5nlTmGitk2uz0FlQJUpV5brj8FMO6syssGOqUBr3AKUOYqKGI7koHgZ0RzTptLtQpAZg0CqJoDhDtq6Pzk35%2FXDhKoQXvRQDJ3DCXjJQvj1%2B5lkmEDrSt7CXLoOtpYpR0%2BzfVNXgNh2v%2F9bTU9aZpVho02r3TDmyJMEJ2o3rYpdy8MROq%2FERPnZOMRXGjUXm5hqHkBw4e%2BuSIULzZznxmv8elPMPWkjGfaXoww6udGEexTBBOkpCagzYItZtxOxoS0&X-Amz-Signature=8750a87c95ef77853cee29536580d146dd9e9c53815db2599b7e0cb207954216&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

