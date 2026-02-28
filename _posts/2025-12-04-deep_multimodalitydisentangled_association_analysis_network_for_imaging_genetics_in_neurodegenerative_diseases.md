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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZORG7YSQ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoBAoI9bX8chBzWFbYU%2BnrgkdvzwR7Fx5QUyaUoiZLIgIhAJxJKBj0z%2F2LhKNgEd0jh4%2BNMJslI1AafQmPdPto%2F9z%2BKv8DCF4QABoMNjM3NDIzMTgzODA1IgxH%2BreUU62qIjHfzzAq3AOPwidxGfh4%2BZfQxbs9tWvogZ%2FBmq844gWryJHXNzRf%2BHiIIeBuejanlZz963MrwsOsOs0TSmbJpCAI3%2BfbVhqTAma7HVai%2BC2X4pi%2BDbsjFFpkptC%2F23RE5dhroge3dH%2FQfxFIVYCprYuQ9oKU%2FC1yCEX11BY59cqV9gGCovsXYPCV1thmGOD8F2%2BdSrbR%2FhU53rexbtKKv%2FGBN4vqcEDnaQWKBMH6TmPM9lmUDQfgoRiHxJezcMLVXPqU21aTgIEG%2FTLblLy0QOKh4j9spOkGctYuC3dGxwTAB7Sll0jBqtNu6ATLduaX37yTprR%2Ff2fXKWXdsifTCZWM3I%2BeYXmBOs0vOyAXxGBPzNtpAkgaoRoFLqBynI1pIF1OtodRrE3xu%2BKF%2FSJXD9es1eEdqauVRn%2BFMVdx3TryLUeqSF%2BywQuuMgA%2FIl8EqbDOGVKyKimdKQ%2BGGhaaNwwx3C%2BfteuumDrUgKYACgIvr08cVHjxxIU9P4926QJhzvj17JC7csVB1aXcz9IQ55QvmPlyfJmoWQt9g%2BrQulzxCNZiHtu5HM%2F5Cs1yTu1R2CGD7Kyr1AJIQSdMnJI6th3Ln%2B%2BGD%2BKp6S8EIQJDodg26gmc8bXpGRs%2BncOhTcxIkOBk4TCMrI3NBjqkAW4efaMaYbnmrpyQg5rDev1DZ8zT1EtrRm0ag6xC%2BjwfyXmj3vDVuyB6ZA5A9uWCWMEkeE2uziLW3q5Eo6iS4IRXfopQdEcPimFhfvWPedjk2zR6DSzZJa7BqnhfFTojI81p%2FNxghPywn2Q9QZDA%2FGTXV0g8dOAm2AD2XAXPOKAAG5lqFFQoFlK%2BUDlcD7pWkFEOM2deWqwTQmimFAwRG5A2trJ6&X-Amz-Signature=8c155ddce2dee2753b2a75c56d681673c636f2c05999c781c56c4e9f1d489c22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZORG7YSQ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoBAoI9bX8chBzWFbYU%2BnrgkdvzwR7Fx5QUyaUoiZLIgIhAJxJKBj0z%2F2LhKNgEd0jh4%2BNMJslI1AafQmPdPto%2F9z%2BKv8DCF4QABoMNjM3NDIzMTgzODA1IgxH%2BreUU62qIjHfzzAq3AOPwidxGfh4%2BZfQxbs9tWvogZ%2FBmq844gWryJHXNzRf%2BHiIIeBuejanlZz963MrwsOsOs0TSmbJpCAI3%2BfbVhqTAma7HVai%2BC2X4pi%2BDbsjFFpkptC%2F23RE5dhroge3dH%2FQfxFIVYCprYuQ9oKU%2FC1yCEX11BY59cqV9gGCovsXYPCV1thmGOD8F2%2BdSrbR%2FhU53rexbtKKv%2FGBN4vqcEDnaQWKBMH6TmPM9lmUDQfgoRiHxJezcMLVXPqU21aTgIEG%2FTLblLy0QOKh4j9spOkGctYuC3dGxwTAB7Sll0jBqtNu6ATLduaX37yTprR%2Ff2fXKWXdsifTCZWM3I%2BeYXmBOs0vOyAXxGBPzNtpAkgaoRoFLqBynI1pIF1OtodRrE3xu%2BKF%2FSJXD9es1eEdqauVRn%2BFMVdx3TryLUeqSF%2BywQuuMgA%2FIl8EqbDOGVKyKimdKQ%2BGGhaaNwwx3C%2BfteuumDrUgKYACgIvr08cVHjxxIU9P4926QJhzvj17JC7csVB1aXcz9IQ55QvmPlyfJmoWQt9g%2BrQulzxCNZiHtu5HM%2F5Cs1yTu1R2CGD7Kyr1AJIQSdMnJI6th3Ln%2B%2BGD%2BKp6S8EIQJDodg26gmc8bXpGRs%2BncOhTcxIkOBk4TCMrI3NBjqkAW4efaMaYbnmrpyQg5rDev1DZ8zT1EtrRm0ag6xC%2BjwfyXmj3vDVuyB6ZA5A9uWCWMEkeE2uziLW3q5Eo6iS4IRXfopQdEcPimFhfvWPedjk2zR6DSzZJa7BqnhfFTojI81p%2FNxghPywn2Q9QZDA%2FGTXV0g8dOAm2AD2XAXPOKAAG5lqFFQoFlK%2BUDlcD7pWkFEOM2deWqwTQmimFAwRG5A2trJ6&X-Amz-Signature=8c155ddce2dee2753b2a75c56d681673c636f2c05999c781c56c4e9f1d489c22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644TZ4U7T%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0pleY7avCZXCiSbLZZyyRRQcmSCcUCh2x2dPjCP9bVQIhAKR7ieri7IO85UKAc%2FwXbxIsQmdXKnhpw2hqQKt4wCbCKv8DCF4QABoMNjM3NDIzMTgzODA1IgyBk%2F4CevLu15HJYQoq3ANd2BqWraG93l23hd2%2BwT8KUxaK8aR0CcjXyxHnHhBb5hJiaRy8ZWeTX9LOf9R86WHeNvByfuz%2FMHPIDFx9BnOxJX6CIdXorvG62tYvdiZSwmV7TcN%2FSJOwWRKnEzUdEYMrFgbnx7KyRuBH%2FVOWGxc%2FIQima2l000pKQ4oLBg5j5KV5c2LZR70hR07htEahgOJSH9w3NuSSHzdKdyPAR1WcIQlii8HmJB3CesKz90%2FhuCtE0ssp%2FsWiuuukXpUoe7snEQbQS4dsqOaIpKxMh0iqcIUNMudK0HgQfZyXgX1GF1XayaLX0qlYIZH7%2F%2BvyPEq8h9IK94%2BVVfzdY9zkzXl3KBF0Q4TqLntL7V%2FxqmSVMiFKzllyLI34FnzYdbZEQuzXflia8KwHqdIj%2FfpNf1BDiZsT9vW6Ulix23m4iUncm%2FbQAHSWrddSohx4CH1U5vKmYkLPl1K8gqb%2FR0kGMFiCkVhhWfqS8k7ta63819AaimWx4FznrKc1SZuL8GH8l4mLPEvp9xYHL5D26P7B5XGMpSC2l8xE%2Fqor8wvbJNEV2orLuKz%2FYTtRCfk7VA8hs0GVCdsBMWMqJMlL43JPG16hRvFs%2BXGHf%2FqYozYssYYm8C5B81fXXZwlv9VzSTCxq43NBjqkAcYUJuWhpVmvPmM%2FfVRxUdStSVAQE%2BsBnd38QzVWSD7cWg9%2FjBv71T3g5jrvLMHpbmijsRaNooDK%2Bs6xGxbHFcnZZhOB5ne3q8fjNqjdTed%2BUXLssAUf137nu8Wo4lscbspydvmP2xJhiZuvyqrDGc06mvqyflvcLcObucMUc0w5j7zQU2qFnmN64%2FDtRyM1KSOS%2Bs78%2FN2LFh7I4jOSXEOYV5Pj&X-Amz-Signature=38ecbb338f4afb715d3a5508f43115490829b712c542c01e216bcbc7a40c5843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OK5PPWF%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD07uqZ0TSKw6F0Hk%2BYqOffzQDbSCA48hjjC49pf84tCQIhALDGY4TF5Dm0Bg0f90bgD1ZEuwK5sP6YU7DI9gJM0Cq3Kv8DCF4QABoMNjM3NDIzMTgzODA1IgwpI8wzUNS24q9x5jEq3AN4q5GEQzLtXSVyLiBaCUiJF30ubS9jia4MFOEZWcoAxb0QRp%2Bb9JoM0bSt5DTNAwxWxlYBzwjnmtQkvxUEInfCxoDPr%2Bl6tW7kQBuxvzmWFdJ7vikQLupV2PUUT4DuaOL3Z2n8F%2BBve6YwrJ3VdYjvwU6IevratJ3HuHAdJzkgZaI%2F6vxPMtFWS7oGjJUiYvYO5%2FihumgX0yS%2FG7q8MTqCsWyZscwkenAvW4UDsbs3o%2B5xpnvbb0kGbqTIixa8fiSk1iPxslL2w54dI%2BkGII2X1CxlhDrEYTWjSLYnT1%2FnwyyMjhX3k3o2UweZxvosVNb0Z8Eu7BpdFAaYY2FAbDlHpwboZiX%2FYMEUBTYQabk5BSX5qT21fR1vFF9SJGDRPaN1lG0IMJAQhWwgfTYM9Vu%2BVXyL1%2BhkeTQr07ilvna3QerqXYWrIzU7kHhYuwNC1dbGqsixT64fw%2F3I7u6s02mC8WydUO8ht6KXc9tuJHmIuJyS1hgHcxuz%2B37FUOOTmmKwI8c6V0gzoqf7Nr4rGIf%2F5uVEvdmsE8a9ucgerNrZDMdJ0YqzlfKRzpYUa5SZoMF7WsCN8KrAvwuo%2F4L4puAOYdwX0ZpL3%2BsB%2By1qVmpT5h0j4S44aV7vSlQ37DDXq43NBjqkAZrdXNj9KRhZLTHyt%2FqXB%2FXmlq1bDlirpFDUxLfghuDEHp1zJbqRAl%2B6uf6CCrsr04Wr%2BBPCtv8KivNPC1XgfKmz1suv7f2TDE2UyJGbaOMQwvrToFA1gTyKjOiUjngxi8Ekq62OQuEqo%2FF9PN8PUEf0ODUtUNqO331ZSgbeEocZcMvU%2FSWD4rdBMxEt%2FYRSv7djSxGvAnsvBFTwg2%2BO7HqH7Avr&X-Amz-Signature=54f4d1cf933df9e4df517bac68b5b2790dc5377aaa9d67bcb823ca0f37499f0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OK5PPWF%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD07uqZ0TSKw6F0Hk%2BYqOffzQDbSCA48hjjC49pf84tCQIhALDGY4TF5Dm0Bg0f90bgD1ZEuwK5sP6YU7DI9gJM0Cq3Kv8DCF4QABoMNjM3NDIzMTgzODA1IgwpI8wzUNS24q9x5jEq3AN4q5GEQzLtXSVyLiBaCUiJF30ubS9jia4MFOEZWcoAxb0QRp%2Bb9JoM0bSt5DTNAwxWxlYBzwjnmtQkvxUEInfCxoDPr%2Bl6tW7kQBuxvzmWFdJ7vikQLupV2PUUT4DuaOL3Z2n8F%2BBve6YwrJ3VdYjvwU6IevratJ3HuHAdJzkgZaI%2F6vxPMtFWS7oGjJUiYvYO5%2FihumgX0yS%2FG7q8MTqCsWyZscwkenAvW4UDsbs3o%2B5xpnvbb0kGbqTIixa8fiSk1iPxslL2w54dI%2BkGII2X1CxlhDrEYTWjSLYnT1%2FnwyyMjhX3k3o2UweZxvosVNb0Z8Eu7BpdFAaYY2FAbDlHpwboZiX%2FYMEUBTYQabk5BSX5qT21fR1vFF9SJGDRPaN1lG0IMJAQhWwgfTYM9Vu%2BVXyL1%2BhkeTQr07ilvna3QerqXYWrIzU7kHhYuwNC1dbGqsixT64fw%2F3I7u6s02mC8WydUO8ht6KXc9tuJHmIuJyS1hgHcxuz%2B37FUOOTmmKwI8c6V0gzoqf7Nr4rGIf%2F5uVEvdmsE8a9ucgerNrZDMdJ0YqzlfKRzpYUa5SZoMF7WsCN8KrAvwuo%2F4L4puAOYdwX0ZpL3%2BsB%2By1qVmpT5h0j4S44aV7vSlQ37DDXq43NBjqkAZrdXNj9KRhZLTHyt%2FqXB%2FXmlq1bDlirpFDUxLfghuDEHp1zJbqRAl%2B6uf6CCrsr04Wr%2BBPCtv8KivNPC1XgfKmz1suv7f2TDE2UyJGbaOMQwvrToFA1gTyKjOiUjngxi8Ekq62OQuEqo%2FF9PN8PUEf0ODUtUNqO331ZSgbeEocZcMvU%2FSWD4rdBMxEt%2FYRSv7djSxGvAnsvBFTwg2%2BO7HqH7Avr&X-Amz-Signature=507989743401cf4e4eebee82512f456e578c7bc40d25d56298cdfe4d03edf15d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AKUGS7J%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC911nuGNmUhkd%2FfXij639OdUmAvNCyzB1rYj3Cqp6rqgIgTmFbMtC3dG3G503PgjV6TnGPf32iRi2Op63Cxm0%2F0Mgq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDBRSvTiuI3toGhIWKCrcA%2FqQqC1MKwVHjjaRUfAu7lQgMz34VpehH1n220sJ4V%2B%2FqyGiChqMFNvzYqwubjt5S8NGr3LusxmRFDfc7TKJblOC1S0ETHFNexGDzue13YelBNc64S1BJoQjCcbahbiu%2BVti1yrj9CKboc74C4qx73BIR%2FxZrquIeDn2yRmUNIa09XBZ074TxWVz48BXxONPI3a935C3I4ruwQ9v0ufawLLsGZQwKsd5ej4ITcaOXeJJ6Tk7YAzzm0rTAv9%2FL3CtGkmNsatJsZ90uH6zvMbXfAg9XiuAfyXG03NR1uzhDhjiNlTYNTzIc7BIQU%2Bs1smywPm4Ed3o6TxCVlYg8dxj1kpibzggRLTkQiDb0sZN0Xr0AvW1U8drbEEzhQnyG1RRCl128yjAZnb5JOTv1%2F1hyr5p9Ib5kVQEeeXzHTa3Mz1tVZIjEUbwLdOXARH1tjEgvAY1ozAuT%2BmXozvEbKT7a5EcQUBFTn8BJmvk6SS80v0pn8kUXVOf%2BbIjLwiSB83M5dA%2BBzTtDPObvw1biOHQZLvHCH9Nv11n1Tpa05HbXKGWHQBRpOyDiymxdsSD57Mzd%2FyImGgCib3Elq3Kzw8abr%2FJW13kWkSd6lWr0aRxqsEW%2BjB4aquDbFkPx7VbMJusjc0GOqUBNrXjB547bXguCPfxITcchOAyjRruKW6d2xeHGsVruwWs5njDhGknJe3%2FFXc5XrZ0se4bybpgR4dEShigmflR0hNmPt%2BYvkbNV16882TQjgDjUHJP5uNi4I5eaXxujXzYtf3v70k%2FStVyC92%2FXfJRPIW1XYuuGRxyIhSwiT%2BFLt6ADcnmKiuW6bjc%2BeknVAtYkGIt6dWlRZGn0ojt%2FFHmIoOi0quI&X-Amz-Signature=64840522920d644d48b48049fa0c9cfc779a6baac2acef087ece2e9dbe422865&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWZBZHMD%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAaYDg3ZwUieMU5%2BFl2yX46Dv59eBMJ%2F%2B6EFVu4DWCa2AiEAzNSWH203XgkhcfHjb2%2FQdNuYzUNIzqbxTKtb7xFwW8wq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDKsmOBV%2FuzHHc6d4HSrcAydBZK2SlMAxiSZAVpG0mF%2F4RHn%2FqkMD6MQLmsyfpETckFKUY7hcXIqnq1lmnONXHYhhxCkIHogyU%2BaPAf3jY6WtfM3IuWXFmwV8Ucdf5rm883QZIxhEYvSPFsTV9qsIDfgB5J6i9w6drYwgxkqBn5R2NzgtZQXvX%2BH47ixuX334PvyWM0prMgEAwUbFW3TAgFCli%2FsA93BQnDJ54AQJT2FuVkbkgnXxG%2B7PlA9w%2FTmGTBbmf922KG%2Fam5HpGU9WkLM2lIvm92vn5dvHbZqPHqexWVNfmPd%2FcamkxROFRuoyMpbR0%2BuBSp%2BaDA2Z9l3QvP4%2FCZGGUWWq4FOKzIYngAsiuV%2F6rQW%2FHjw0z6OlUQWnW%2BLuwi3%2B62pgLDpaPSH9npPgEX0KbXT7w85vG9G56pSd3n1s6VpLDyank9g3P%2Bxk875EvTvudJ0fETc%2FP0jFPpsPbGEzIMuFvQiOK%2B08KfBXqxhmU47j0P%2FbO%2BUttltKcIib9KBbmmeQd1pfF7qhrb5QRJ3Y749pVja2sAVpQkXRoaRH9go9PwxGgruZN4aKQZjHYnQzi4d8wKlWPFXxe%2BU9%2Bq8ss69ZRD1p8dmaUZVW28FxkGU4VbZc1kAq%2FUVrLcVR4opyx6ItoFBKMMOrjc0GOqUB28NQZD1KNxmmG3duyFr2HmT4VWKxyfCR1%2Bmgw%2BCLBBmycFzUyejam97wdD4HzUH%2FK7fNS71KaQg7nmOH%2FKQzIpm3EaV5ZDsXyMN20%2Bw8SjVkwSSmX6oTAeoO8JCf8T7BCEd0Qfz%2FRv5s44ktamxyLq3BwOOlTe0cf25Wph51IIiH4J7C%2FFzrhxLVkwhBsr3kJSb4gWpKI8oVPhg8ljvAlaVLLIR2&X-Amz-Signature=a43c9a42e888306c8e8031a3eee5611a2cda55d835171b58b4ef80e31a84bc43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBUBRBWY%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCIrBx5ZYaECC6Tn3JRuroaIq6ASFJ4dxwKoGz3UZ%2BvYgIgEMQ5LZQXjL6lPcmjHn%2Bh0afVoZtOo3yONFUO7kTl7MYq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDHyi5imzQJy7aJdrWircA1Gc9l7JxNY%2FQxL9ejTTEV37ZJDg8SnRgclMQXc8tUwsD03SFphselL8oqUbD6InUnTAqY3BN7foMCRF8MxykoiOPmZFnzLY1GC6mM%2Bw0RiRCYkguXdrpzUUuPoOOWBGEDEtUXFXo2cGvb4lzuDMFFPkYIT0%2FYizyl1IbXCu72tLHeCg3%2FeXKl4BD948ZKkmoZaHKC8MDYBSfEGDHwBzwc%2B5KHm6gOgNbigwj0sGEOL3z4dhSayA0JNQ8Dm%2F4KfhTE7N5BEe30SXP2crJNQNJeRbiuS13oY63K9vkiQSpsAKhrSb3nn%2BIKSfZFCqa3cQELbpwUTD8lUWE9DcbrVJ0jq95aEbfnXhQcCtGggyaqJG44%2BIB5Y6jECq2xiUG2iqqdlK4cVGwJPxsVv0f5H0AAaMVfarh4gq%2ByJwgdH25qjAfriJwgrwZdHIIyjEqxgWR8rlKP5XRnUc1TNpX%2Bxlt%2F%2BX1EL%2BHoqxEt45pXh7CrTwNoDkaWK8Sm3rSwVjPrev6%2FcdwBH%2BYEYbxTzPkuuDjQg%2BPQHEKDSfZOhu2ibEOhBevM%2Fp8t3Vlk0UkhVDwFiiOcv80DBsf%2F4ON4rkjmj8fQC9IYBYUhBcCZ2h2RJsBropwICK5xgR1C%2BPqbUCMIerjc0GOqUBW4x17QyEc6wZ0TX2Adm4F09PukCvissHvCGmeoQN7K8RpHAXQN5JX0EilsRNWzA98Lmj9OtSuxbOYkDLZMgXH5IWUokvySXXJ4EQz97EGFx0vby%2F2jcIb3NFQwQiE0LE7zjI%2F4Woq%2BrHU4Wzo4E5xQCdJx9HOD%2B0nC2UOrTHiGeLvjazRF3TJqafGdiQ%2BKdLVIhYIJUTg4mu%2FxgeH5t6rHCxy%2F5T&X-Amz-Signature=9c9efc094bbb23574fc41b12b00cf2d76d294c4c5adce823599df6e3552f277e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXJYZQKP%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCiR4AazXZ4vXiT2TU%2BhSph9JHz70zjHvwXBxK0GJ3zfQIgYtFqfuV4340gGZR5uGDo3nBTOXFy5dpEzoTYxh9jrywq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDAB6X9Bg9eWmBm2DwSrcAwy8hy9NTU6%2FzJkL7gd%2FUXA4PDoQTQy0vQbwhh8tmZQavcQt18R8Ue%2BNuKckO1JhDALWwBs3Bb91R8UuDLou0NnYXAS2Ogb8Zt9Ao1K06i%2Fb9PB80p7xKOoxx%2FM%2F%2FnPBCCTRQWxrWmefJ5kbQ%2BEvk8lNwb9oakUwpal8KTkhApJRg7X1pfDNIgcbr4X91UaHtV5JnOcdsAkVMUzVweJmc7fmSaFsZYUzHOYAF%2BBRujgO9CTStIMqEmFnaV1tQkD%2FqMy15zSLy1csHwudcRCBL%2F67nUGX6cGNzy9IxmWegEkax5x3wmlOydfWapnRN96WcDCPRHUTKFGdffXVVXhHzdlBzyC66%2FDGRh3W0j68v%2Bsadm6%2FCHGHOgMA9nFzXASC6MjDFpJYTqK0Ed16B2mVWsN2wqj9AFUULdO%2BfzVzjPV%2BFQwzRiBTrPJ9sAAzRrJ5p6TlcSVm5QtYrN363mIISTZIoEMUmT6ZfPYo9ZAPqlEFQksfDyGVEyPLmijIgVqezBTMeTmFGiYpvHZ4FbVGkOHC3s7u98iiM685N5jj91u7gQTFekx5YEVabQB%2BFZDzBUo1SCN2kiKiq53RMrW12gngH3R%2BmDKhZMCq49Vm0NPnM2Ccn5QSobfK%2BgfhMOSrjc0GOqUBp%2BTIb2%2FVUq43e9Mhlp24yDEapUcGJmV%2BQNkscZJabVxX%2BkOOi%2B2R25ykxw08G3io1LMSc2KxeJtZBUKwedgRGjDW6b%2FZyWuFAIAPSlHqA3bW6sfWQCPozovNNZaetMoJkW1hqYD6a%2Bk25uMU3Qzmuws9Qdh%2FypNDmrAgmfP6U8SgkTYNJMFWPnTGvXiU%2B%2BUVDCI6hOsPrXCYxm4njJCEUCfJ%2Fdh8&X-Amz-Signature=4ad1791486264985692c42ba79647fadc04c42c417e24d637d7c037461fbfca6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXJYZQKP%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCiR4AazXZ4vXiT2TU%2BhSph9JHz70zjHvwXBxK0GJ3zfQIgYtFqfuV4340gGZR5uGDo3nBTOXFy5dpEzoTYxh9jrywq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDAB6X9Bg9eWmBm2DwSrcAwy8hy9NTU6%2FzJkL7gd%2FUXA4PDoQTQy0vQbwhh8tmZQavcQt18R8Ue%2BNuKckO1JhDALWwBs3Bb91R8UuDLou0NnYXAS2Ogb8Zt9Ao1K06i%2Fb9PB80p7xKOoxx%2FM%2F%2FnPBCCTRQWxrWmefJ5kbQ%2BEvk8lNwb9oakUwpal8KTkhApJRg7X1pfDNIgcbr4X91UaHtV5JnOcdsAkVMUzVweJmc7fmSaFsZYUzHOYAF%2BBRujgO9CTStIMqEmFnaV1tQkD%2FqMy15zSLy1csHwudcRCBL%2F67nUGX6cGNzy9IxmWegEkax5x3wmlOydfWapnRN96WcDCPRHUTKFGdffXVVXhHzdlBzyC66%2FDGRh3W0j68v%2Bsadm6%2FCHGHOgMA9nFzXASC6MjDFpJYTqK0Ed16B2mVWsN2wqj9AFUULdO%2BfzVzjPV%2BFQwzRiBTrPJ9sAAzRrJ5p6TlcSVm5QtYrN363mIISTZIoEMUmT6ZfPYo9ZAPqlEFQksfDyGVEyPLmijIgVqezBTMeTmFGiYpvHZ4FbVGkOHC3s7u98iiM685N5jj91u7gQTFekx5YEVabQB%2BFZDzBUo1SCN2kiKiq53RMrW12gngH3R%2BmDKhZMCq49Vm0NPnM2Ccn5QSobfK%2BgfhMOSrjc0GOqUBp%2BTIb2%2FVUq43e9Mhlp24yDEapUcGJmV%2BQNkscZJabVxX%2BkOOi%2B2R25ykxw08G3io1LMSc2KxeJtZBUKwedgRGjDW6b%2FZyWuFAIAPSlHqA3bW6sfWQCPozovNNZaetMoJkW1hqYD6a%2Bk25uMU3Qzmuws9Qdh%2FypNDmrAgmfP6U8SgkTYNJMFWPnTGvXiU%2B%2BUVDCI6hOsPrXCYxm4njJCEUCfJ%2Fdh8&X-Amz-Signature=7c61fdc54f034859ab94fdc198159b63d473e1869b1e4693c4f5927704c4aafa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3TRBQAO%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFOhVWXb2%2F8awworpU1T5sKMfTVOsbAyNzzNzxtkzLI%2FAiAJJHqjUL7vxwmRpmzZ54XKAYqVOC5o%2FL694tVpPnpZxyr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIM74EXn7h7mHJjSxmKKtwDz1mDtCwTC05fRKT7id15zsal3qDUlbHZ6xQuZnTwrd8d52XINTCfxuXjU3tWVSK0L3P%2FSv5iSxAk8kKct4Rv7wZMxDYxIekR4Iz5ZIFAImDvxqTDnezlU%2B5jnoPEfRHW8oKK%2FNYw6QFsmjFv2WfA8D4kEv7b4WbuC7hIA5wtVXw2w6CSoj7k9zXAs3SDRzNAHmEW%2FynWtkbkyFung56KBAEoymjGyuz77ULzDIxRB4ABV4elG6fFeoo4UPiAgJsQZCCRWu4JIz21IDclUTP3DOlXa9nnpLeoBsJJlaHQXLzjlY6RRLKeCtCcpmdnwnvQSIq5%2B627uzBuXlOEoYuEBm8STQW9t%2BHvM1eEUhE1paThntGjQrwXXbR4IzoVFGS2tCu2TDre%2FrhIIksd8%2FECLanIYM78sW3jSrgct2i2mWJsszr%2FvSgB8SAozWMKAI5dpYPW9mDOEjm6bHkf9%2FHP34hJcqGzPa%2F9WBZw1fPgh93GIWWpbWHTjD6%2Fyr7%2BhEOYImD2QSsbE1xM06tIEkmNBczBK5qGQ0v2hmDmR6hFUpESiz3b6I5SNxHoQotT42esdFbjSy6OhiQfzmoDKLRPZaH2u4uzS6D%2F5svMjjswDuUlFEWOXu%2Fuenz%2FbNowjauNzQY6pgHANmkbtCDGtQGCZvLncQnvevesH5USkwvOeaIBOSnIRzrFSUxBUeHE4j8TRmWF1ognLhTAcKwu%2F42ajJwBAcZTwZ5AFqGuauYv%2BGyTSHC4mTQ9jbElTsjoUVLzsVuF1ZRrEqVHqOEbb3a8DoYn%2FH1Kg7skeNbAkpXgMQ6G4V1gvbk7ZLjZUTNzcMl9p9q6NiXaE9PMDfSgym2vvraOKtrnCTxgUKXc&X-Amz-Signature=3829af44cadc477af5eb7c3cc37fde329744a6e2a229120604b3bc5ad0be2036&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RTNXHCF%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkNty%2Be3m0oI9z7Lep%2BHVPooIxv05tHEHwjL4CJHY%2BCQIhAPiAyPEvbsUoew%2F3gwlem6if%2FuS6Af0%2BivMMuSCM1w7xKv8DCF4QABoMNjM3NDIzMTgzODA1IgzHMK2zP71W%2BxA07Hcq3APKK%2BpoBp7dA8SMaUVy2DYHin1OABZmelTpOk4MkEmLgykYncxzAJ7V59Ugis%2FNS243J%2Fu1T2ITkoJnhkeNqvnqxkiDiM9RNfnWpHyMLz67QBExyPRrgvh9A5EOGifMwfAjiX5zcFyfB8pSiSTnPo8MWbjCudSoAleET%2FMEiivYOb0%2BtNwk2751mwREAo%2FRa4VkJkaQ7O40IK95Dj2ub77wqX3zu3%2BjRsLS4c5wa5tOgM7rajqLFVDFxzBkvLDOPcuUd3pmZsaxGXDIs%2BRfetASiNMJQ0v4z8HzrsRms6rxoNQjuk9iRkJWbMNZAItqbSaj%2BQVZ4ibKriHJCZfJdRo4LzRXJe6lqcOcPOieblKEPmMdyrX900n0SHvBtpye3EaxuzNcg7LA7Kc6GSVxVDSiRp9yzUjQeqEGP3STjfHEfI6%2BbBWH%2B868k97zxIbLoEr6SvPsIXTtPV3RaaxIq55JeBef%2BhoBog8TKIrZSMsabpPpdn0GHEYjTmLKa5SDqgEXrnvoG4FxtAFXu4AyL2wyW79vxR8QlJ1F%2FFdAGCqNzzn8F0Ivxv6vRoqZNLXAS2F8dE1%2BFeCqvFy06AcCwAf4rntpguQxoPnhBy%2F0CRlrDbx4Dw2%2F69a5gRY5DjD%2Bq43NBjqkAZmsjqLVGb0a%2FuEG5yugC6k5F%2FLYxda7FRtNgkFAX84VqECnx6QBB8qmgu7lGbChWdj4Kl4sGG0fLyFeIgFzXGrkT4qx8TDulp6DixrRgdJRLP%2FBWElZ%2B20BaKO8qZRLR0UvuB27UN2tkbsHHzq6hy1nMO%2FqmviCx6btQ28JBUjjyMTjNyXjpoRMZL8EBo9vI20KX8q%2FhFUNf0gKMHBvXHYVq6nT&X-Amz-Signature=a13204c301a332115929b48e2464e3b37b15df85f903c6d4ca2d835724a1cde1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RTNXHCF%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkNty%2Be3m0oI9z7Lep%2BHVPooIxv05tHEHwjL4CJHY%2BCQIhAPiAyPEvbsUoew%2F3gwlem6if%2FuS6Af0%2BivMMuSCM1w7xKv8DCF4QABoMNjM3NDIzMTgzODA1IgzHMK2zP71W%2BxA07Hcq3APKK%2BpoBp7dA8SMaUVy2DYHin1OABZmelTpOk4MkEmLgykYncxzAJ7V59Ugis%2FNS243J%2Fu1T2ITkoJnhkeNqvnqxkiDiM9RNfnWpHyMLz67QBExyPRrgvh9A5EOGifMwfAjiX5zcFyfB8pSiSTnPo8MWbjCudSoAleET%2FMEiivYOb0%2BtNwk2751mwREAo%2FRa4VkJkaQ7O40IK95Dj2ub77wqX3zu3%2BjRsLS4c5wa5tOgM7rajqLFVDFxzBkvLDOPcuUd3pmZsaxGXDIs%2BRfetASiNMJQ0v4z8HzrsRms6rxoNQjuk9iRkJWbMNZAItqbSaj%2BQVZ4ibKriHJCZfJdRo4LzRXJe6lqcOcPOieblKEPmMdyrX900n0SHvBtpye3EaxuzNcg7LA7Kc6GSVxVDSiRp9yzUjQeqEGP3STjfHEfI6%2BbBWH%2B868k97zxIbLoEr6SvPsIXTtPV3RaaxIq55JeBef%2BhoBog8TKIrZSMsabpPpdn0GHEYjTmLKa5SDqgEXrnvoG4FxtAFXu4AyL2wyW79vxR8QlJ1F%2FFdAGCqNzzn8F0Ivxv6vRoqZNLXAS2F8dE1%2BFeCqvFy06AcCwAf4rntpguQxoPnhBy%2F0CRlrDbx4Dw2%2F69a5gRY5DjD%2Bq43NBjqkAZmsjqLVGb0a%2FuEG5yugC6k5F%2FLYxda7FRtNgkFAX84VqECnx6QBB8qmgu7lGbChWdj4Kl4sGG0fLyFeIgFzXGrkT4qx8TDulp6DixrRgdJRLP%2FBWElZ%2B20BaKO8qZRLR0UvuB27UN2tkbsHHzq6hy1nMO%2FqmviCx6btQ28JBUjjyMTjNyXjpoRMZL8EBo9vI20KX8q%2FhFUNf0gKMHBvXHYVq6nT&X-Amz-Signature=a13204c301a332115929b48e2464e3b37b15df85f903c6d4ca2d835724a1cde1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AI6JCAY%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T210923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHwSrdKcryEyTLH6GasiOLjw7lMNULpcP4WZhuaKTxmvAiEAwgUGnqD3S%2BLyPSmPMLiCis1EB%2FWzpjyQ%2BztCaxrtQT0q%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDBBbixRPkJvNckCytCrcA7QQ6bedDPg2smjdfXfRxnkRKxCPgQsjNTWEQa%2F4Q21t53Y%2FVvfHXYdXCXUseO72su0mh27q82QOtRuVmTDNP%2BbM5SWunUh01e8yiv5XRQlnqE3Jp06%2FXprDvkYAK%2FiSsTRdKEt0tvw5R2aZkZCiKug3i%2BsPxn6OGKq4uao6CRtcblveMUjBCaTGHvl1dW%2FjG%2BYttyNJVR7Lu16DYOoYlA0CyPM6paAh4VfdJWQ%2BkPkBqqt2aQjD0qqgEVaxUYnnaPFrICkr3a%2BZPrk1CVTyoh%2BBPG2mOdrizi3zxAHjT1SNjtxEK65eFFk9ckc%2BWo2fXdsQwqwS6ICK2pPoB4x6vPTVUI%2FZoLYZxB3xv%2FdXuyzBa3RPb7a8kZn1iKNSMt6qUMCE7X%2FyFtny7FX7Qzg%2FtXGxS%2Fa0GXoBNI4Z3IMgrSCGGowlIa4f13W%2F9mAZZmnVGilxj6iwKzStJ1OmLjBBZ87VZscvNVXLr9c1znBve1pwu%2BQCZudZ7m3HH7WJ%2Fe7r3UFpKhJ8aR1PWGQK1tM9oio%2Fe1r1d9s8nd1X9q96PrCWJ2gRI9y3iM5Rt2NT4Z7CoxbQkRbBTnvtgj0Ddn%2B4CI1odWlHkACimj9GWvJAopKTk0Mddtdc9vHBCy5yMKasjc0GOqUBuv6r5JseoNVtInlnDKM5HIrj7NusruTIL1zqHHafbLNF7oTcxnn8nTyEorHpDZsM0tup8C0UeQ5jhPxY4os7OWUtA5y1YoUjQ4JbzCccsDGHmU7r4bXpQtPPV1w9PtWW%2FlCDivWrfwoVke2CaWyebfU8B8aD2xYj5EIbMEeYTkv2vQMc69V%2Fx%2B2M2Onl1HKGv0iLGB5PWc9YymwoSyvwUkmkt8qm&X-Amz-Signature=358c0a673c6f0efb1593a9c2680179a3e095b6b23faf322a7c629a34cc191093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

