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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI5G7MZG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIAo%2BaQkB6dMfxv19yb8v0nSKMWJ4ZqXe0r%2BHE77vfnkuAiEAvGavu%2Fk4ZsMWmMMHZbTi88zgKidyHJP2GBW6HCsWj90q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDMyGZKJjbQNrbULE%2ByrcA9kh7%2F9nFkbZZWcudGqjEN4kO%2FeDmZzuyt2jAZL6GSolS%2Bf%2BSgFDs8Gmah86jfcV4YxryBbW%2FPc4WlP0ZvWJptPI84W7j%2BHPX%2FCVXjnKdQ8OLceAOMtrg2R%2BCw4BnMJGuXrsc6r0tMGglw8DwQYyUYELAl6Jh6woGXRs7OnMV4hNP0sWnC6R9mJVoEvUm78opxgYl5RrKrVy4Jncq%2FanZy7DuMqHxFf1PsLWw%2BsZNPFQNF0SOg%2BICRcWCtk6ayw4oUnd%2F7TIiwm1IO7hTk2HNCs65QoZFtu6kn4ebBPdcVe2iZIVkN8eY1%2F%2FSmGP3GMrWiZLAzJ7lWMMsHfR3TtmiKQYvO2k7FpvKFTu1L3taSJC0Y10xsTjWFDdyhG7LPLzhOcFfPCrv6wektG%2BreksZoY%2BpvFyIW6T%2B2HMt%2BeCN321M3R4c6tiYToSYbefziqgmX8IbA7sezzTz69mBxEmTiBd1Bv%2FVBW720W4KpZU%2B4Sou5xFhN4tBf%2F7wqDcAxK1Ns353PhR8LmwF1pEAMhwlgj4LFcsVbXO5bVuZf69rEPzOIShML%2B46t%2BcA09zXGXLbMeonoevFzWw0GSbNydNOb1ISlcERjrkwfxlfSbmqaGc5UrbKDfxKh5p6SFVMLKX%2F8wGOqUBuuMPTKWi%2FfpZ8Tgfqs0RwqXFPt61f5%2F4lNMEyLtrX%2FS3xGzBei07EbvQLcgjZE3WlIo%2Fqm4HAy7jNmz6VAcftHiE%2Bi7g6kdAOxNyp5sB11UTryntLWjZe10IO8IBLc41O03fNDoFH4PTQgP8XdUrV30QAMRL6JAif1zs8AsEuhhWcc089lckcRDd5aetJPGx2FopVFMeFe5Y5Z6JifL5NvwaCTZT&X-Amz-Signature=76ea2663e25ac8b9a652f988623e06cdb398e51af22e7eccc2fb1dd8a799bfb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI5G7MZG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIAo%2BaQkB6dMfxv19yb8v0nSKMWJ4ZqXe0r%2BHE77vfnkuAiEAvGavu%2Fk4ZsMWmMMHZbTi88zgKidyHJP2GBW6HCsWj90q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDMyGZKJjbQNrbULE%2ByrcA9kh7%2F9nFkbZZWcudGqjEN4kO%2FeDmZzuyt2jAZL6GSolS%2Bf%2BSgFDs8Gmah86jfcV4YxryBbW%2FPc4WlP0ZvWJptPI84W7j%2BHPX%2FCVXjnKdQ8OLceAOMtrg2R%2BCw4BnMJGuXrsc6r0tMGglw8DwQYyUYELAl6Jh6woGXRs7OnMV4hNP0sWnC6R9mJVoEvUm78opxgYl5RrKrVy4Jncq%2FanZy7DuMqHxFf1PsLWw%2BsZNPFQNF0SOg%2BICRcWCtk6ayw4oUnd%2F7TIiwm1IO7hTk2HNCs65QoZFtu6kn4ebBPdcVe2iZIVkN8eY1%2F%2FSmGP3GMrWiZLAzJ7lWMMsHfR3TtmiKQYvO2k7FpvKFTu1L3taSJC0Y10xsTjWFDdyhG7LPLzhOcFfPCrv6wektG%2BreksZoY%2BpvFyIW6T%2B2HMt%2BeCN321M3R4c6tiYToSYbefziqgmX8IbA7sezzTz69mBxEmTiBd1Bv%2FVBW720W4KpZU%2B4Sou5xFhN4tBf%2F7wqDcAxK1Ns353PhR8LmwF1pEAMhwlgj4LFcsVbXO5bVuZf69rEPzOIShML%2B46t%2BcA09zXGXLbMeonoevFzWw0GSbNydNOb1ISlcERjrkwfxlfSbmqaGc5UrbKDfxKh5p6SFVMLKX%2F8wGOqUBuuMPTKWi%2FfpZ8Tgfqs0RwqXFPt61f5%2F4lNMEyLtrX%2FS3xGzBei07EbvQLcgjZE3WlIo%2Fqm4HAy7jNmz6VAcftHiE%2Bi7g6kdAOxNyp5sB11UTryntLWjZe10IO8IBLc41O03fNDoFH4PTQgP8XdUrV30QAMRL6JAif1zs8AsEuhhWcc089lckcRDd5aetJPGx2FopVFMeFe5Y5Z6JifL5NvwaCTZT&X-Amz-Signature=76ea2663e25ac8b9a652f988623e06cdb398e51af22e7eccc2fb1dd8a799bfb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664G5PDL5N%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCICBrgrptlJGq0MaMOeR1pz7zQNq4HvJNz%2BQ29wQ9mZsmAiBMWW%2FLnbjYxm%2BeIvG20XuVMk0XKpABgiWQK4fs6jjnGir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMrpzfqVQyEmTpxu2QKtwD%2BYgws3s8fWwjp3YWB0OKbD9BfNqyb88VLgKAwTc6mnpVPzh3p0krzPWi5IFlgyFg9saOBMPKUklpyPi9%2BK%2F%2B%2FXSgAspOjZHl9c7RjDG4gwrrEWmYC1PIWwGBhSdvPX3qTUsBrkOiiNQdLn4gNXMLzBlZneSwA8X7QUGSsC4ebzHjCf%2B1TfegR1a8PYXnPhrsiSi3cSHvEaUZYp6nIukBYGjvT0dzF2oZDSyS2n%2BwFmaQ6HjAUFtE8LMsGzcf4P4MuIbl73gqjFXGy7f2T0qtBIJfStctI%2BuGyEPDgqtYQrgDFejd6XULWXZlE8cr5bxC0g6QndyeyEP0r1viEKKxdqqYqIA%2BHlPOLwmPymjhUYkRCArYxNlqixVWm%2BReRcHkg2o1NlVpEUNxgrpziZA8tRllw17cCoZjyKUEyQolNh%2BW5AnY60ZCnz%2B3rFzY%2Bd4viO1o%2B1XPZLSERhO23Hi%2FJH%2BdHDujWSpPNbH7%2BOBnMDYpN%2BAXYuwVqVlMQ3UHq3PdK766NG2xXg%2B%2FGucaOkSGmbyAHMfjpp9lP3FEEnVlzSILKUdEfJDaGVKzN36R0XGZ%2FWb9Ww0KfCD2q%2B23dJ6m98KYHsNZEMO0RHvyUUQK7b%2FzG9cvhmqhKo%2Bvu%2BQw%2Fpf%2FzAY6pgHcry1UbxUICbOTfgEUpiALoZU59khP28oC5WdFbg2sgnx24PG%2FU%2FLe9yERUGzXsuQ1r5As%2FZgAmISw4Rr8j9nQMOVmZgVVCBdQwO8Se7r1ZiZhQPVUwqPDnRXWKWUIhAs%2BPTJKPclEWioCVr9Be6he0khL2oCUJ%2B0QkuLBO8wWJ2aqu%2FzytIjy1TsAlZoXnWRFY3Vdm0LvGIBzWV9mHDSQ58c5vDO1&X-Amz-Signature=15698021420f71aef794a190feaab9e50ce5865202c3392e92f6fb86b7692feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCXOA4EG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDpaEwkBbcnY3XoInChhx8lnEjBrC%2BvNT8ADRAK8z6OdAIhAOSGHsVARQtw5qEGrHM2DgCkvdmc2xOEiRyTu%2BCKl7HDKv8DCB4QABoMNjM3NDIzMTgzODA1Igy%2FVqpgqWdRzN6QWD8q3AM41d9iSDp9hYjMAiAGBEORLifqbd379%2FwmFP6GR0uls1cE0%2BjEbYJyCEEuHoGvjD8WkiFDNPPj8Br1izwQMFaPiMVDmW%2BoBtFAkAAFFmCKbuJ7Cw1ngd0hWWnMYXxUCS5K7QQ5CKDhoh%2BORgG2CQOqFt8oTkO77zY1TDub2in9ewvoJdOkbLzSnMy0ppzN16FfDR5hlhMDCa9x2VuyEgmfYEH8ZMp8lwTiCmt8%2BWCtrVlozv0hczEnOia5PJWldy%2FXwpVQEgALmS33WHXcOQ%2F8JqDZzWbbaSRgE2UlDysUONOuHKc1I7SszO%2BYd27V4%2FB%2F9yFCgQOtIykIFgG%2FpgurAHQcpa%2BsO1PKG1Dm6bNcDMgVOMwmd8Yjtl79C9vy5RltdCB6bvYlPlY2%2Bbfy%2FINomKp5ljWIqgmLzgOP4htCS%2B94SqJW0eckG2rWdEyxhWYGaStBErDRoCWGbqvdaVVKob4lLTzQiVQxaMSScl14owXkL%2F8ZSxncHxsJjUmlR0Q%2FZL0JPGrLYjTeFHmNmKJwUWS0kTcVmNiF%2BiVfaBHGNg4GTpAjt%2B8Z1JcBOyvjKPSCnYUmrYs9BGAKqi0jx1EByP%2BHLrKsH6Ya02xC7RkjVrIu8wa4oyvE1BbnhTC1l%2F%2FMBjqkAZgN7OafP%2BiLo8yo9plwmgU1YGb4uP6%2B0SWBzoQLLxGF3PhHKdd6Z2dR3MrUYEi2%2BeoRctNAphR36c6nrh3q5nLrcvdDdwFoy%2B0Hh1748poHgFOJ7hwLp8o8jw%2FqSYl4eKyh%2B9Hz6sKNTlQDFClEes9o99QWkvkOT5G0DYH8ylkbFbV7d6%2BIDLeJelOHa1SkiQ0rK7hi3JBgPviDP8RlLIwQxrBp&X-Amz-Signature=3edc85ff06c7040641377463ce46aec52757baaf134b3bef4dc47d38b2c5b874&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCXOA4EG%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDpaEwkBbcnY3XoInChhx8lnEjBrC%2BvNT8ADRAK8z6OdAIhAOSGHsVARQtw5qEGrHM2DgCkvdmc2xOEiRyTu%2BCKl7HDKv8DCB4QABoMNjM3NDIzMTgzODA1Igy%2FVqpgqWdRzN6QWD8q3AM41d9iSDp9hYjMAiAGBEORLifqbd379%2FwmFP6GR0uls1cE0%2BjEbYJyCEEuHoGvjD8WkiFDNPPj8Br1izwQMFaPiMVDmW%2BoBtFAkAAFFmCKbuJ7Cw1ngd0hWWnMYXxUCS5K7QQ5CKDhoh%2BORgG2CQOqFt8oTkO77zY1TDub2in9ewvoJdOkbLzSnMy0ppzN16FfDR5hlhMDCa9x2VuyEgmfYEH8ZMp8lwTiCmt8%2BWCtrVlozv0hczEnOia5PJWldy%2FXwpVQEgALmS33WHXcOQ%2F8JqDZzWbbaSRgE2UlDysUONOuHKc1I7SszO%2BYd27V4%2FB%2F9yFCgQOtIykIFgG%2FpgurAHQcpa%2BsO1PKG1Dm6bNcDMgVOMwmd8Yjtl79C9vy5RltdCB6bvYlPlY2%2Bbfy%2FINomKp5ljWIqgmLzgOP4htCS%2B94SqJW0eckG2rWdEyxhWYGaStBErDRoCWGbqvdaVVKob4lLTzQiVQxaMSScl14owXkL%2F8ZSxncHxsJjUmlR0Q%2FZL0JPGrLYjTeFHmNmKJwUWS0kTcVmNiF%2BiVfaBHGNg4GTpAjt%2B8Z1JcBOyvjKPSCnYUmrYs9BGAKqi0jx1EByP%2BHLrKsH6Ya02xC7RkjVrIu8wa4oyvE1BbnhTC1l%2F%2FMBjqkAZgN7OafP%2BiLo8yo9plwmgU1YGb4uP6%2B0SWBzoQLLxGF3PhHKdd6Z2dR3MrUYEi2%2BeoRctNAphR36c6nrh3q5nLrcvdDdwFoy%2B0Hh1748poHgFOJ7hwLp8o8jw%2FqSYl4eKyh%2B9Hz6sKNTlQDFClEes9o99QWkvkOT5G0DYH8ylkbFbV7d6%2BIDLeJelOHa1SkiQ0rK7hi3JBgPviDP8RlLIwQxrBp&X-Amz-Signature=4a2fe887a7c71fe3338f7cf7e6e30c0f861caf66d4b335072b43cc8908eac1ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PJFKDI3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIGGLJV6D4%2Bv1AIbzUlItyrxoHVjqrUJX3vlz141Sth0LAiBwrbrzBmV4TD26LI81WhqOe8Di0QGKUmVKPncvfJJMWir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMMg3uTCDg0r3tNt%2FLKtwDuEYMCuKe75tu4U0Qez6BGhKU4srCSAO9cc6OJKpJ%2BvSrzKwUHeSxgQLnEdthxH6Z1ONs%2BTetWdP9ndckti3fopXWinyest%2B5tdc9x5AgQ09cKRazag1uEIAZ%2FnjJPjwry12gYQS0WrPA%2BNznVOgX1Vv61vL0LuIEZkdxChJYuDndOyVvdutvNHZhf%2BO4F0c84FF%2Boj%2Bb%2Fe4Gwx3zIvtkrcAgsCnVwYsSaXET%2Ft1VAotCT%2FZ7JScVe%2BdP2MzV2nsyPF4pqhXk534MXbc%2FBmcmgC896YgJwqk4FvtmP%2BWl5fYo%2BKd7k4BVQH2zO3bJWN2DUJyBRiaeAtkd0wcVzXIo%2FrNA20D%2FVnyh1z8bwTZjePrKvtf2495fIVYOAphUoOPsqgHz84JVmXT14%2BY0S0j0JGZUinEm7l3yC1q8HjeO6WOYP62ZY4bVtGKn5fT%2BKCYxPg3Tevxi9rIbdfFm86C4QWG%2FwwpxmUdLc%2FY4OkNaerbJNyXhHYgaZhacnp7D6L1UYvavDcH05TlvOM0znS8C6Exx2EKcbWc1mxdAUz4HXsH0s3SKv4idWi6AzVTJG2gMKG6h9W0h24Kl69d4DkpnC%2BSMPlOKsy7wDTifMztgChfDSndd0yK5iVw8xW8wv5f%2FzAY6pgGnVky%2FeYEJWakynwWjRzh7jUzhqeTppQt50RApX78H5HMPpx29rooK5nNKx%2BaFR%2BjZ8XxSl%2FvUxKYMgrPVxK%2FehwX0fgV6Wl2Dt8QDP%2Bga5bXmxaVRi7WP6V%2FsLrFZDrqneYiN6XkfFmkQcvzzM3QfCmBP%2F7pHb0kXOTgzf%2FJ2%2BIVzmMvGJ3KQRZaFWTwA0nS0lbcRdXFnHMCEo3JCEJJIBNUO5pVB&X-Amz-Signature=dbe7bbef3d80a2752ab2954c255095ee130cc0e3ea487d286326643b55a2c728&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLHFT4JV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCDrTPiKk9m%2B%2BGKp60JpiNuAJ4U9zTqDf%2FH6dz8LpIs2gIhALN1NvgbBbyhJqtidjgvgSnQa0VbjWYLF49ecAFoRdOMKv8DCB0QABoMNjM3NDIzMTgzODA1IgxMLXdsAdB3oRQEk%2FEq3AO6bOgwgtIvHwShoLgSKgpcOh%2BjgNw39kkSDwZNJv8%2BNooSxqjyvXPUPTXRU6YMVdUY4%2B1OsHdupVRgHaDZCmzaHKgHe48qvAl%2Bpp2AqdASWa0Z2TCBYVoYzPVapMrPpBWf4pG%2FhDJtqncwDrFrYe74gG7L5EFpZ0WG%2BCmhs%2BRF8uUjiRZHL5kNokQJNEJQKerRD2KyiUO8o8nhK4%2F4enrgVu9LVMZoIN7ihGOkgvoimgjvNfbBsjmiuBci2PJognXIWy9tGJy4fw31XM2hruvvZnElOqh3Xfz24E6EmqyefjRr7fSPluBcBrt7ANGizMDPi6qO5eeCrclSyzqSXg6sLUS4odjJLpk%2FuX2kWtCC%2BNrb1YvqQFf%2Bbdi21SFJ%2BjQU00%2B0THr36qcdA4wLC65Ix9ezwUWqHI3s3Y9h4LdPjKv%2Fu%2B8D6hrUre9DBlNRZ0hHyNVzPBmE4Dh4ey%2BeRhOvGNWVv7%2FlRV%2BMqsK3giyAnhyQk%2Fr14Kn21jwsr57Oss889aG7ziKD%2FJKo%2BT%2FRxFDpiQeyeMcOZ304DI5OjBb3bz67ud%2BMikv8lWUCyeB22CV%2F4YZFT%2Bfez%2BzNzhBjSg7TZ3bqnvClzZNuBw%2FxOhQkCIHXqGeWPiMjiJFhBjD8l%2F%2FMBjqkAbtrAoO5a1EFrKuNnVXVMmu2ftifqyVQVbPW8%2BZZkPXolVXPek0Pz4tljaYJLGFFYwiH1YgHKvX3BmzAfvMx2AxgYDhizX26XA%2BD4kEEgk02SU8P%2BYYyomyzdqa7HbxtgKd1iePLC4vYG2xtebG5RuedhtAcvjtTUUbH%2BzW33%2Bzi6U6B242WgG5WzF3OHM6p4DcL4qmE87Etvoi7LeHbetmP00im&X-Amz-Signature=6a88ba0f93e280b1f2b13d26f6be29baac850fd6ea1578d187e95d22d8d5c0ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2YX7ANO%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQD5IZ%2F5wrZdBoyi9kt2ERaWT6JMDhruBpHP0PbnCQH%2BDgIgbL3zO4NQAQPIGRUGkEkgb%2BDn%2Bm9upETRuYu9ERes8cYq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDO2wxNvE%2FH2SQPdP8CrcA6iDD44xlkFeCKnoctl17IN4qp1ZbxkAxio8ui6JhRpqjwpaTCBXUFXnOmv%2BxRiqJcv66avEbFrZWNwCh6VibpfF8auMmr4x6d4kcUJMylrm8JUDqX%2BQ2Oa5aGcllI6UcVmkre2ugIFIeJ393BRIyz6Utiv6DLiyp7Rc73GWlLKEPel3wCJ7Qwh%2FC%2FzXDbf404UxMJEk4LvQ4w5pt%2F6Nnj15Biw4qHdEkILESut7zJSR08MwIdb9M%2BJj3LbHZ4mYoE0mnmIXKym2TyvjSux8fbV2RTPvN0VQf5TRsqe%2BN%2FBZ4rAICnpchPZHIz0NNgiJ3drq7wRd4QkFl6fJk2MUEdOyIxmEXcAVqgYFBTKTstbE9DeI7dzrMNEwYL%2B6ysjwb9Gz8J0AlJTzDm2t%2FkIkMCVXDIEvDpxZFu3%2FrgG1qdBJ5XqM82MqhEdeS8%2Fj4xH7GyBp6a8OD5xKRJHoj8AbpqX3iBrY0eQqvP%2FfjYgtrQ3YhD30qhwRHLq15z4rKibLzlzgIbpXBt38ovQW3aJ%2FRDuXqqrsxQWz2tKtU7FL8ysp1f275f6zeD%2FhcA5srVw0ncJ58W4szJwwz9yIurYNJCI4457PvQbS6gKqdoZnvtlTQIX89zQSF2EAmzMrMJSX%2F8wGOqUBz62xMA7HaBk7uUJR76zVDFzrCpJ2UF0HYqT6rz%2BbWSCtuPlr8aL%2F%2BpD6XYRnIccHstMUUXC0DG6ieskvp8Mm4TPpoCVRi9zEsNhb3v%2FyMR3hDVRupLmN648f%2FAcEgb6XOhpmH4jz16xR4%2F3gZES5mfLECJXhLxv6PgbOhgs955%2FNJplhgFHRqNEP4qYrdR%2BffyYPCPSDFzWE4PC6qg6y6PYcsvVf&X-Amz-Signature=03e2f284b28570bcbd4cf31b8384fb8d5606cef28d72565caf741a6f5a506d9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPFAOOPV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIEp1NXtNKkPaFAjBuB96tlQ6UCLJ6L1%2BhmcBhnUj9WSBAiAMibqaL4QGeLDrvtpaD64p%2FD6iL1%2BRUVshAxDuoA07qir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMeSEExTzTIbBrw7ZoKtwDR5ID7ZaXNM3tJOomStGGeVF2i%2BUBiU9KoDsiIoRV7bp5mMoEHQN6sOOnTkDWDGlxK%2FSn5TMvdHsdh9qKMXf%2BzZnP4RpuGCyLptxeSZlvDPuLiNrDGcTLPG9T%2B7dN9UFBiC%2FkukkbAYVCjf%2FM7cM%2FYWtT67IixtmfwOf0a2WPmEFMmHYerOtj0C%2BOltwcV40fNJw0giozSN1gXmsNta5rT58sCcqMWCO3a2a0L5UkoROI9d6uNSgcHGpEYkL8D9nv1D384IXJiu8Y%2B1xQ81j%2BQcFlCGXrm2fneXV%2FZV%2FmVgg966384BeqTCMwr6I9xls5tiFk2V7qJ7IyiPCsqtouaGVgHT4zkBILUydahiubDVIWM9VRKECNjEgKo6QIEa41cuFGYZhR3wa0kF3lg9%2B2mDgbkO7TwH7IX1EPwN%2FrVcf4VdkImLmVbJ8TBQ1WIZqBmL2vWKlvJH1ySZiIvGX%2Brx7qbbrNU9qANx86eV4Atmb7X54xF6KZKA6GGqa%2FHNR0rap8Yt0NEaAOvHFSz0VfzGxXRYoipZQ55QmEBF2F3SiYpRkCT5fLJjx2yOotaTL6merw9jx9fUpKDqr4vTMLuoW2eO1PesMRJh9BcQHY9GJjjdK%2BLGb5KJ%2F7JAQws5f%2FzAY6pgEQbGkYXGqF%2BCh5STiYgbZ1Km9QkIZc9eu7gLEClSsLuRIVX2Uxj2B%2FtB76Uev9JO55COybonzRr8LeWahgcKnHJrr7r3nySUvO7ZS7EtoPbNklfxalc%2FcShL4Jf%2F5ZLFn6SlmsEXoQ0%2B6yeZpEMWcbFhG94fHEiVh%2BQl5dIwiAuaey1msPzsnJTp0YMYd26da3z56WZddoRr%2BUCATuW0VNbsth6c8e&X-Amz-Signature=ac6582a5a45fcdf9c22fd50a0e2ec8596512b6cfc6a0be82b0dd1276a79b3733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPFAOOPV%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIEp1NXtNKkPaFAjBuB96tlQ6UCLJ6L1%2BhmcBhnUj9WSBAiAMibqaL4QGeLDrvtpaD64p%2FD6iL1%2BRUVshAxDuoA07qir%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMeSEExTzTIbBrw7ZoKtwDR5ID7ZaXNM3tJOomStGGeVF2i%2BUBiU9KoDsiIoRV7bp5mMoEHQN6sOOnTkDWDGlxK%2FSn5TMvdHsdh9qKMXf%2BzZnP4RpuGCyLptxeSZlvDPuLiNrDGcTLPG9T%2B7dN9UFBiC%2FkukkbAYVCjf%2FM7cM%2FYWtT67IixtmfwOf0a2WPmEFMmHYerOtj0C%2BOltwcV40fNJw0giozSN1gXmsNta5rT58sCcqMWCO3a2a0L5UkoROI9d6uNSgcHGpEYkL8D9nv1D384IXJiu8Y%2B1xQ81j%2BQcFlCGXrm2fneXV%2FZV%2FmVgg966384BeqTCMwr6I9xls5tiFk2V7qJ7IyiPCsqtouaGVgHT4zkBILUydahiubDVIWM9VRKECNjEgKo6QIEa41cuFGYZhR3wa0kF3lg9%2B2mDgbkO7TwH7IX1EPwN%2FrVcf4VdkImLmVbJ8TBQ1WIZqBmL2vWKlvJH1ySZiIvGX%2Brx7qbbrNU9qANx86eV4Atmb7X54xF6KZKA6GGqa%2FHNR0rap8Yt0NEaAOvHFSz0VfzGxXRYoipZQ55QmEBF2F3SiYpRkCT5fLJjx2yOotaTL6merw9jx9fUpKDqr4vTMLuoW2eO1PesMRJh9BcQHY9GJjjdK%2BLGb5KJ%2F7JAQws5f%2FzAY6pgEQbGkYXGqF%2BCh5STiYgbZ1Km9QkIZc9eu7gLEClSsLuRIVX2Uxj2B%2FtB76Uev9JO55COybonzRr8LeWahgcKnHJrr7r3nySUvO7ZS7EtoPbNklfxalc%2FcShL4Jf%2F5ZLFn6SlmsEXoQ0%2B6yeZpEMWcbFhG94fHEiVh%2BQl5dIwiAuaey1msPzsnJTp0YMYd26da3z56WZddoRr%2BUCATuW0VNbsth6c8e&X-Amz-Signature=d020aafaded640acbef53ef10ecd1b9de8012b65ba697b96452d84866ff8afd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644JXRLUQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQD%2ByEJidit0l9eLmcvzLU7b1KrWBE8qkEM%2FvAbFBuh9YwIge9x3RKK9p0ydWOeJnvmpvk5Bo8%2FxPwAdmvL4WJkwRD8q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDDWfYkUv%2F0MSQ%2BjfoCrcA0JykMO%2BbeClcpo1449hV94ybL5ajdNr4pnnqnPz3kSnOszvD61dVNQutCAlVZTYrOzuesguqdKJXRzAhTSsZ9Mdpe%2BioCO809gxNovF0CqZ02GpMtxsLc%2F20rPCD8sRVPscKHIYraYnpfxiEMFAmD5Ajx%2B2Hoytt%2FCaL%2FvkRHQRtGYreL%2FUXfikNsMXA28fT2c5bTx06MY1McD8QnCoRhLh7%2B7ZLqzPWXV2brSStSv9f0nKR%2FzFzNX%2FAwsd%2FtGKttaJZVIXJzJ13uOjjFDeqsA75rKJJSaaaKwzHbr8AL31EplIA4dyJmBy0E3dW9kVksLClWmGS0Yhff42WHbIcPhfjt%2BSq26k4tut%2BiPQbBvQJ%2FKeOe6co91s6kE4nrzdA3djCF24hfI3EAC7%2FU%2Fk3a5NvVGAd4qYTNaDE7Ms4DTwSQbhE33Nz6yV0wq91ZQCd4OfJQ7Qhapt8wRYcqLE0XSRogHPe2IRlbgCCx7Nb0tumedGWig1CGxi2NQBvWYctgN7mBH4F%2Fp20dmx2HL4cpIauHELZEcn0LtVzOK29VXbryMqBipktkIFIsjxX8RL2Ga4yv9Mu8B6jIAIkbpRvbIt4e5wz%2FBqAG4SEVRuyBt%2B1P1tzO3ihiYfQ4w4MOyW%2F8wGOqUBy9JR2wj7B87A4Pd0LwnvCG6en5zMsOTX%2FZPOSYNrEsflfzNbMonxAWiZCUA69yDn50UicWwEXKc4azM0hWjXGqIPzLTMZimanrlS%2FfUdx4I1klysEfL9UDaSEf3ONknezsl5oVhZylmgrEXs9lZ8bblmlCAJHlaK9rfq3JUy%2BVUMI0iE8cAoImZx7b8wqXbVGmYZQC9BE8EzJb7xtAXs%2FJgJNYZ9&X-Amz-Signature=8b24f052d9315e75def587c4cd7b0fb0c9082a444f8f34dd1633c541fae82588&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRP3YX3H%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCCe%2BeufcH9LSIOnhoNGCIftAib1HDkkIk%2BUlsWUC5nCAIgOyxGQtjuokBz4rTeWN6gg89CvzaekqXmSeF6FpF6Cnkq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDDV0VIvdy6CzoeqUqCrcAyRm%2BFSyxhBeOtHX27frEKJV3TfKZDMc1V8%2F9O226hUQdrZ0DEEiU0uZCDttZVtE4fdFNPIqAqnspmlDwVz2Aec5JWCWAu4FdxwGIDjcu2LbKkl3srsdQI7KOylNv6KcNdPTGz%2BuPBwq8xv3CbwRfNzrWkzVT8lMiRfMRFcfRyHBApHPB7t4Xz1YjSLgYJG8uqdo%2FR1Tshw9SJGDin1rFRyHiKVWmKtraJvqHTbrnlgoNfFDxws%2FtEZMCvdsBuybSgStGx7y%2BjSH6JyBaem3BBOlIjG%2BoWDkUxV4twCeFNcGcdvgmaErhr7AaFPT3WAS5XV89Btsl3LMzLAzdffNr9xu3%2F%2F8HAtYSFHkWXAsnnn%2FIKxl4MdKdrsCqCVtLRybjZ4D6os8kvsWSYGvQzesmoZlmeLULCvgkz9mMc4k%2BdedyH7Hey3XyMAPpvg7cg%2F21e2jC0DL1wb2SlEEyVfZbZi%2B9X68UaCSkvBgs9xOWe7u8rUKNzv1eCjdq%2BPygBrC2SLf2%2B5g09g7v%2BCP0NU%2FXdv%2BQuVxK%2BztC6%2ByDQEKLPXtFUpI4LQjzcW3iYV6GzvXK1rqtT%2B%2FFMTq4Jefa%2Bh%2BcsL6TG2eNQr9Xty0Ry0aTVlh2ISATR7qUlJSWv3MMLeW%2F8wGOqUBFQRk06tesRtLUMxcc9EkU%2BL8suUWlwY1FEHAdaHK7V5tJHYRBMgeHg79Ep5Ht0rmNfZ61XygK86GoZGuBW1TkorPPY62GsGO7ECALN0jKruAUAkvcb06bzi6dUqivSDBInbpvKS6LusPSjNAD0BgZmajX4i07jHN95AGi%2FfS3Zsh3V5WWO9aRn4%2Fod0ZgJqisjrpAGiRWfuF5zJWce2wiLiDB3OG&X-Amz-Signature=945467f624c37d5996c032fd03e3c7ea7b24c608993cbba4a51d0853b6911546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRP3YX3H%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCCe%2BeufcH9LSIOnhoNGCIftAib1HDkkIk%2BUlsWUC5nCAIgOyxGQtjuokBz4rTeWN6gg89CvzaekqXmSeF6FpF6Cnkq%2FwMIHRAAGgw2Mzc0MjMxODM4MDUiDDV0VIvdy6CzoeqUqCrcAyRm%2BFSyxhBeOtHX27frEKJV3TfKZDMc1V8%2F9O226hUQdrZ0DEEiU0uZCDttZVtE4fdFNPIqAqnspmlDwVz2Aec5JWCWAu4FdxwGIDjcu2LbKkl3srsdQI7KOylNv6KcNdPTGz%2BuPBwq8xv3CbwRfNzrWkzVT8lMiRfMRFcfRyHBApHPB7t4Xz1YjSLgYJG8uqdo%2FR1Tshw9SJGDin1rFRyHiKVWmKtraJvqHTbrnlgoNfFDxws%2FtEZMCvdsBuybSgStGx7y%2BjSH6JyBaem3BBOlIjG%2BoWDkUxV4twCeFNcGcdvgmaErhr7AaFPT3WAS5XV89Btsl3LMzLAzdffNr9xu3%2F%2F8HAtYSFHkWXAsnnn%2FIKxl4MdKdrsCqCVtLRybjZ4D6os8kvsWSYGvQzesmoZlmeLULCvgkz9mMc4k%2BdedyH7Hey3XyMAPpvg7cg%2F21e2jC0DL1wb2SlEEyVfZbZi%2B9X68UaCSkvBgs9xOWe7u8rUKNzv1eCjdq%2BPygBrC2SLf2%2B5g09g7v%2BCP0NU%2FXdv%2BQuVxK%2BztC6%2ByDQEKLPXtFUpI4LQjzcW3iYV6GzvXK1rqtT%2B%2FFMTq4Jefa%2Bh%2BcsL6TG2eNQr9Xty0Ry0aTVlh2ISATR7qUlJSWv3MMLeW%2F8wGOqUBFQRk06tesRtLUMxcc9EkU%2BL8suUWlwY1FEHAdaHK7V5tJHYRBMgeHg79Ep5Ht0rmNfZ61XygK86GoZGuBW1TkorPPY62GsGO7ECALN0jKruAUAkvcb06bzi6dUqivSDBInbpvKS6LusPSjNAD0BgZmajX4i07jHN95AGi%2FfS3Zsh3V5WWO9aRn4%2Fod0ZgJqisjrpAGiRWfuF5zJWce2wiLiDB3OG&X-Amz-Signature=945467f624c37d5996c032fd03e3c7ea7b24c608993cbba4a51d0853b6911546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4M5KS5H%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T064237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIEV54REXE20G4JJEO%2BNtUWFGKPY5qDSQG2jg9%2Be6dFbaAiEAx67SStV%2F2ujFOA935vr1fNat%2FK9ADkG3iRxfC6ITmBMq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDAEXwL%2FwTMZhtdHP2CrcA%2ByxKwRYQyxGRWcdDInesaS8lnYTNxucrKpPzLK0EyCCDAJWmB77J6JcMlSuzVyrhHf9%2FWNM0zX5huvt0e0BKI4Fa53cgXDxpUZ8aewHb%2FiVq19skY0DjwxUN8mTDppqVgwHd8VPZrI%2BXn7HnnfWXZz36wG29sJ6E47ookAG%2BfeIA8W4qYagDCE2IeRKjB6KoWZcLuJswX4zkbK3MFlqO7bqMtz%2BFThxqM8r1IU0ub8kcPKf0jUQ9W9bvrkKkAtDPkFHyuwPtezrDW7pEhCnLIfeK7MrBhWUftTDdyD9rHvQFr9RHSgM%2BNnbnYNaDsT6sLdEvfef6xkU3mL6AE3QuhJcwFQgs2UFLwtvJv4DzJ%2FD%2FBbWffvdseU2lvj1oRgY%2BSE%2BmOYX16EmDHBkr8E8tBHg1GXyfjRbmlp4TMnDBqIXk2mlMncTmYpZUMrQtzil9kufmDMCcMrG0Ofgz0w%2FqbTim4TcXWqN%2Fh8MmhIFPJhmWLpWLz7IeMwFOqdK5omS57pNN4G%2FsFiYSiMKoB11V0gFtDOrhTMHge2M%2BoaabFaa0w2rUicj1OcM18BrXr8YxU5iqhkSkAIHqEFBS04EOWDP10BN0r4y3BOE9JllBUoGsVI7Fwf6g2coj4DwMP%2BX%2F8wGOqUBbFva67on2S0h%2Bximoc86%2FmF7CAHIMRkurNVU6%2F7DV%2FMj0J3uGxFeJ6tBV8NA%2FSWLf2Sg6SgQPPwTYbAbB5xXqdgTaWkVmd2vCgR3AjFvZOXmw9pCJoqwJyBoOyDeQdcruBHxJffh4EEBmUdn%2FSgUyR%2BjNwBczIzvYm3ulwVzAyWJZVbmq1xT%2FZpjyf9FrK%2BM0XrfjbzMtjvMBwQUtVTprJRaBxxT&X-Amz-Signature=be59f62608ecd7be126dd04d1ac4227d994bd1fea5d1e5217c145da84339cf71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

