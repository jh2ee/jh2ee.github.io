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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGA4HA3T%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBoqXv5dbkthB5XSOGKvrrT9ciE2l9iVGEaYGBCJZahgIgckzg326xAUekY5JzDMeNBGxzySyGAuNB5bKDotCpSbYq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDOhH0qqO9KjnVuu3LSrcAwObZHHQIht3h0syF%2FccuIvxg8EKDm7IhPAB7QIAfPYS2CMwkQqTqgIT6%2BWu1fRpV1ud61GQTd1b%2F1oFzyHGe%2BRlHGIf5icxXrK9pkK2RbhqmGlMGuu%2BzkPtSmFZPPDLNfpEAClv6S%2Bx6Q7%2BI1pZHwiiAtPJFMguMjLhqM%2Bku8rEcek7kjGp5DURVQEKUMLsglXsxsq%2BLNogszG5GQp5ybhdKa1iqub9C8cdBdpUXafTZVV%2BJ5NqcT0rRR6EkexbhAYGnotZuXUsqowQqOSB77tooLt1nutvFELGEFeItPxnppkS86L2FvnmwkpbTHEzuioybNFPcCFWfgZAT8rMAbOZfc6%2B2F2NT20c%2F4R2J0l0RAEBQZitznTeHto35nQ76oqJLAohhhFLEYzRYCWyKzkw2WHRzsZmf3z7PYqPQT4z550Hc8UdtWl%2FxjgtBjSBbNhnSiRWxBaU%2FpNuw5w3S0xhc%2BnQByJAV3nNAwshKBPyYDjPoqMe1tOqedU4kZ%2B4D%2B3qk%2F5VQGrJgheEaeXWqaH%2Bs4Y71eoipukKiBkuKUqamSdmJG%2BLD6hXJEwDzw4jLLdppEBQTJ%2Fw9c4b2mDTsY%2FhhF5F8SIgGgSqkXozUZ6ZXGK8z3FGZbRlL46EMKK6n8wGOqUBYhuuEDqD6HD92a68BmnBATUv9H1KdObUkywlR7qPenO0jrwXXNSNsaJFg%2FQ3NPionQJULiTfoO00jAFjv9JgUYERjlAKC4SAD8O26NqvjnVh%2BvTKZOfJS5BV9dYoX%2FpIO5U1tkPf%2FpJbAJJgq1C%2FTu34V%2FUfZRyD9qBqqUvfhb5q8RNSfg6xbYYgiy8zOjnbDslswi0mk%2BlUzMYzAVPZopyyFkxd&X-Amz-Signature=8799d68c5bc929c3520ea774188b845a9b1c839bb221fc70e74df357d93e5ca4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGA4HA3T%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBoqXv5dbkthB5XSOGKvrrT9ciE2l9iVGEaYGBCJZahgIgckzg326xAUekY5JzDMeNBGxzySyGAuNB5bKDotCpSbYq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDOhH0qqO9KjnVuu3LSrcAwObZHHQIht3h0syF%2FccuIvxg8EKDm7IhPAB7QIAfPYS2CMwkQqTqgIT6%2BWu1fRpV1ud61GQTd1b%2F1oFzyHGe%2BRlHGIf5icxXrK9pkK2RbhqmGlMGuu%2BzkPtSmFZPPDLNfpEAClv6S%2Bx6Q7%2BI1pZHwiiAtPJFMguMjLhqM%2Bku8rEcek7kjGp5DURVQEKUMLsglXsxsq%2BLNogszG5GQp5ybhdKa1iqub9C8cdBdpUXafTZVV%2BJ5NqcT0rRR6EkexbhAYGnotZuXUsqowQqOSB77tooLt1nutvFELGEFeItPxnppkS86L2FvnmwkpbTHEzuioybNFPcCFWfgZAT8rMAbOZfc6%2B2F2NT20c%2F4R2J0l0RAEBQZitznTeHto35nQ76oqJLAohhhFLEYzRYCWyKzkw2WHRzsZmf3z7PYqPQT4z550Hc8UdtWl%2FxjgtBjSBbNhnSiRWxBaU%2FpNuw5w3S0xhc%2BnQByJAV3nNAwshKBPyYDjPoqMe1tOqedU4kZ%2B4D%2B3qk%2F5VQGrJgheEaeXWqaH%2Bs4Y71eoipukKiBkuKUqamSdmJG%2BLD6hXJEwDzw4jLLdppEBQTJ%2Fw9c4b2mDTsY%2FhhF5F8SIgGgSqkXozUZ6ZXGK8z3FGZbRlL46EMKK6n8wGOqUBYhuuEDqD6HD92a68BmnBATUv9H1KdObUkywlR7qPenO0jrwXXNSNsaJFg%2FQ3NPionQJULiTfoO00jAFjv9JgUYERjlAKC4SAD8O26NqvjnVh%2BvTKZOfJS5BV9dYoX%2FpIO5U1tkPf%2FpJbAJJgq1C%2FTu34V%2FUfZRyD9qBqqUvfhb5q8RNSfg6xbYYgiy8zOjnbDslswi0mk%2BlUzMYzAVPZopyyFkxd&X-Amz-Signature=8799d68c5bc929c3520ea774188b845a9b1c839bb221fc70e74df357d93e5ca4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3L5CVMJ%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDTBPcGvCAfLaDTRY8AUyOGQA1ZBUsZMn1Q43iRAxYblAiEAgP2%2BjqyFunbK%2BoYcCjN3z36HC88CpOZFx3vhfCtdK6Eq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDJ3iGVqkPQEWmCFiQCrcA8t6CAJJBCoCHOAZW2tgnEVv6zjMlCLPwWYDH6gvF7LLIA9Q62crLylqfLvXMSIdz%2Brl7HzVKMp0YkckBs3yS%2BvgrnBIkirxqTl3P%2B01sZj7OVge%2BLgDfOkjwDXSU5NsCJB%2BK2Oac1KDIOQNd0nQWe6pqBfsyPBnHSqu74ZlhTB%2Blx3Y%2B81wekBDtg7YhLsit6g7aAvp3kKWP4ldWyZJd%2B5kG3JqaebwHTT0KVZ6%2FoEEBRsFt4wuG91gVedTATovBj0aMlQY2R70C8OkXH12%2BCSAmKtsdMkJmEqfYStv8gcbCP4J0R1pWipffjo%2Fj94OgrqsBQOx%2B6j0gE4LYJhGjVMagdiL94z779kVly2%2FZSwPFEU4KEN5zgIha6V6kjlZ1O8%2Bfa61%2FIvo9QKoE3j8zAZBoFWKZY2aAXSHTuXnVKr%2FKlGyjVx%2F9XV51XEAgWqsNSwQHwYz%2B%2Bzf7HtszWZqEkrmgieTX2UZKLpWfr5ibRTipPazTKY%2Bq16BfblBI6XagvvFFeYkI0ZJI3kWG86uVUs78OwQXtrLaN0NDagoxWIEK0PfIzW2Iy%2Fl%2FpOLupm0aiKtq2iv48uhvPdxXaA6Ev%2F6M3fPs3wlrT26NuI5MRrtnppwULgrqwH%2BXQhvMJi6n8wGOqUBbjooruw7Kh%2FE%2FzPArqD53fpnI7d5h47WmtHnhLW1LcFc%2F7yENlatFh7Q5JmdYT3Dn4SP5CgQahUx%2BWtXWnuZzPQSP7skOTzeZBXUHePaYsxmBFg0tuF%2BospBOmLOXTFcIf9AF24PcS3A%2BcwUavufZEZbOrSDQwIj1VFC%2FFFBIeGmTa%2FnsLOc8V4GI2YAEha5Zyud6fcH3WVvKdtMpy6IsqjtHt8Y&X-Amz-Signature=48e153eb171b513788160c2965320ddb07fd3caa746b0ff91be5c514d7f9120e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IE3MAU4%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHHd%2FpXp3TN%2BWu3uLT3ISr888svAE7sfszKa7SpmDBfjAiEA%2BoeqEv8yuCHEX936lkTI8X0DwNfBbBMJbBnOZy9ttZ8q%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDB4EE7Ra%2FqUuglWlySrcA9wxVSqfZ5nRLw%2F%2B7xEoCI%2BgunWCyJ%2FMw%2Brg7R1uozoi%2Fw4GTGVtwtsUOpWh%2B7XMv5DFMEBG3oJpv0QJ4cycAfij6joeB2Sxw6mQZQo11OgLYeK9aZb9n92WudK%2F6avbweiua5CgX61077W5RKiAqrEIY7D39VbGiDR%2BxYUYXNa0E4wye8GyGBKKxm32Ibb2m5EcQoyfv9puHoh0wJxQ%2BV6xhO3sKmyULamluLINUlDFROFM1ctW7rSxSo4unu9r7bG0NHZWglx7U%2BfYJAEuXINAsA%2B1vMVZrprsZiOSAxaJ2Hp3p8gFQykeLbIgISCm%2Femrzn0q3ZV68g65nx2huFPllF2z5ThthLjKDDKXlsuQ2cOF%2BOkRw8TzpnOBUhEAy4OghnDA8Xz5mA3K3C7wx6wnkWKrGUn9f8KW8fBiUEpazyHtaFN6n8QWQyvYcz3D9qLTVEkvL3CsiZlxjybiaZY7Y8XqToBjlol3%2BHPW7Jxfz6GzLa6XuW7D974%2FOGzcVsiXz4sf2rzKMl9N5IEUFSq65W0M8hUGfQOokcVPn61RPpVJtj%2FaLpEgyBQAbe70MFN9E8nDeC%2Bk4YrggXvtWMqPaqsFioSU6S0nXFtTcvK7UvkBTilZjQkX9do1MOm6n8wGOqUBspN5lmfiWWKUckEl4ymK2Alhi0q3w%2F4xk2mBg5cFk3wI1GpgtnoP%2FSAe130ZdWmBVqqOBByo8ag3lxW4ZCid4qa1XMoL2HhWIiLLQzdKK70s1dP37NeKBD5T%2B98FUnI7s%2Fncjoskilc%2B0YQlNhe8jgwjh%2BCOtiIfQDpwbE4tlyhATxeY20ceiCM4ZzvMnQi2W63rOWcMUpVHJM3t08j9fYXnyPxt&X-Amz-Signature=c894d75a30038d4b9863523fe513fa6794249986b8a2317c034259d0069eb435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IE3MAU4%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHHd%2FpXp3TN%2BWu3uLT3ISr888svAE7sfszKa7SpmDBfjAiEA%2BoeqEv8yuCHEX936lkTI8X0DwNfBbBMJbBnOZy9ttZ8q%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDB4EE7Ra%2FqUuglWlySrcA9wxVSqfZ5nRLw%2F%2B7xEoCI%2BgunWCyJ%2FMw%2Brg7R1uozoi%2Fw4GTGVtwtsUOpWh%2B7XMv5DFMEBG3oJpv0QJ4cycAfij6joeB2Sxw6mQZQo11OgLYeK9aZb9n92WudK%2F6avbweiua5CgX61077W5RKiAqrEIY7D39VbGiDR%2BxYUYXNa0E4wye8GyGBKKxm32Ibb2m5EcQoyfv9puHoh0wJxQ%2BV6xhO3sKmyULamluLINUlDFROFM1ctW7rSxSo4unu9r7bG0NHZWglx7U%2BfYJAEuXINAsA%2B1vMVZrprsZiOSAxaJ2Hp3p8gFQykeLbIgISCm%2Femrzn0q3ZV68g65nx2huFPllF2z5ThthLjKDDKXlsuQ2cOF%2BOkRw8TzpnOBUhEAy4OghnDA8Xz5mA3K3C7wx6wnkWKrGUn9f8KW8fBiUEpazyHtaFN6n8QWQyvYcz3D9qLTVEkvL3CsiZlxjybiaZY7Y8XqToBjlol3%2BHPW7Jxfz6GzLa6XuW7D974%2FOGzcVsiXz4sf2rzKMl9N5IEUFSq65W0M8hUGfQOokcVPn61RPpVJtj%2FaLpEgyBQAbe70MFN9E8nDeC%2Bk4YrggXvtWMqPaqsFioSU6S0nXFtTcvK7UvkBTilZjQkX9do1MOm6n8wGOqUBspN5lmfiWWKUckEl4ymK2Alhi0q3w%2F4xk2mBg5cFk3wI1GpgtnoP%2FSAe130ZdWmBVqqOBByo8ag3lxW4ZCid4qa1XMoL2HhWIiLLQzdKK70s1dP37NeKBD5T%2B98FUnI7s%2Fncjoskilc%2B0YQlNhe8jgwjh%2BCOtiIfQDpwbE4tlyhATxeY20ceiCM4ZzvMnQi2W63rOWcMUpVHJM3t08j9fYXnyPxt&X-Amz-Signature=ab4f80e33c004b8dadf767169b32bd524e6feaa13ae3660b287e9c74d83fe1a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGUISA7G%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD007QjkSnqK6zp3iYmiVpS1TPYJijoa73yzhWScaK4BAIgIIQJchTySiLZMxgMokx0wLy08tHAI1lN3Ph2nF1TftQq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDLudqaFGinZGpCoxKircAwdgvnAB6cDsbih%2FWoqUvD7yfE4nikiC%2FJyf0ClgDL4kNixKeIOBK5%2FrbfckeYIDLyEiFBNIEet4w%2BxPba9Y5UiXomOWOX6fFEFy3fHhzEC%2F9IYf3txBEtW55LZLWNH5ysWdnSh%2BZyrkLTJBOCfeGRqre0LR2LRb9Rq%2B6g0y6V6FkPEyevhF7El6AOdigYKw%2Fc2ipIdI68nrvJeQ62vkvsNRbRpnuTnPFBwhk2wg5mI2IozasL%2BLvlEpZyNSjswSKKBoT0EGrx3s%2Bdf8jxABFG%2FA7puy8l%2FuFQAEfLSabojLOtw4Ht57JNpCGNZh1Pf1F%2BziClygU84OUvc2EHgWXXd%2B0rYmi0S69v7pQmqji4IjdsNqzgGVPpCiViCUdzn12OMs1VdXm8MeQaBFST68MEQN5FPHTnQSRelv9H4tE%2FxDEaxh6pcg3AhC9TAFkMqsFCiCxNq1y4mpP5lGAEHc4Aj1uat3jAom3wV2g4tcdURHeNAhbXpX6EHbuzCIQ4Q5Ex4IYJF%2FxH%2B2XxgXNpVAc6xuIvGiG095vzVcS4CNwQFntEIloJhCddrV7YgBzFJeUE%2Bk0KjB%2FHi0PTz5TeJe5tksO3309wrWFAzPp56Rpm5PDi0eaiVY02e%2BhCLwMIa7n8wGOqUBCtIXGgakNTNiP%2FAUqTl0hSHFqcqRXsi6hxgzUSSHWnCoFiwFCpykEd7aRX6J7R2KRNKFODmngy1xqElhBFg%2B%2BhyhFHhTB7CNmYPRr%2BmiuAQmLexdoOnAAf35iUCscBVkRo%2FC1gHwXtq%2FEHLrP2FlZTaHGVRGl8ig0JHXtHaqvtpy3MIKiSpumzHOVhv4rxdoule3owdfcWSJe43Qo4bB6qzgOhK6&X-Amz-Signature=f42250d5aecca122ae9c7dbe7a733c6b71b7ba7121cdcca9f864f233fa059299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGA4HA3T%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCBoqXv5dbkthB5XSOGKvrrT9ciE2l9iVGEaYGBCJZahgIgckzg326xAUekY5JzDMeNBGxzySyGAuNB5bKDotCpSbYq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDOhH0qqO9KjnVuu3LSrcAwObZHHQIht3h0syF%2FccuIvxg8EKDm7IhPAB7QIAfPYS2CMwkQqTqgIT6%2BWu1fRpV1ud61GQTd1b%2F1oFzyHGe%2BRlHGIf5icxXrK9pkK2RbhqmGlMGuu%2BzkPtSmFZPPDLNfpEAClv6S%2Bx6Q7%2BI1pZHwiiAtPJFMguMjLhqM%2Bku8rEcek7kjGp5DURVQEKUMLsglXsxsq%2BLNogszG5GQp5ybhdKa1iqub9C8cdBdpUXafTZVV%2BJ5NqcT0rRR6EkexbhAYGnotZuXUsqowQqOSB77tooLt1nutvFELGEFeItPxnppkS86L2FvnmwkpbTHEzuioybNFPcCFWfgZAT8rMAbOZfc6%2B2F2NT20c%2F4R2J0l0RAEBQZitznTeHto35nQ76oqJLAohhhFLEYzRYCWyKzkw2WHRzsZmf3z7PYqPQT4z550Hc8UdtWl%2FxjgtBjSBbNhnSiRWxBaU%2FpNuw5w3S0xhc%2BnQByJAV3nNAwshKBPyYDjPoqMe1tOqedU4kZ%2B4D%2B3qk%2F5VQGrJgheEaeXWqaH%2Bs4Y71eoipukKiBkuKUqamSdmJG%2BLD6hXJEwDzw4jLLdppEBQTJ%2Fw9c4b2mDTsY%2FhhF5F8SIgGgSqkXozUZ6ZXGK8z3FGZbRlL46EMKK6n8wGOqUBYhuuEDqD6HD92a68BmnBATUv9H1KdObUkywlR7qPenO0jrwXXNSNsaJFg%2FQ3NPionQJULiTfoO00jAFjv9JgUYERjlAKC4SAD8O26NqvjnVh%2BvTKZOfJS5BV9dYoX%2FpIO5U1tkPf%2FpJbAJJgq1C%2FTu34V%2FUfZRyD9qBqqUvfhb5q8RNSfg6xbYYgiy8zOjnbDslswi0mk%2BlUzMYzAVPZopyyFkxd&X-Amz-Signature=408113e7ffffc1eba04a88b2e22cb7ae79cf489d20ddfd54cf63ede895c57082&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVAWPOBO%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCv77Cl6VEndfJUqqlRJAHKj2%2FaWfkn5aT%2FXPuLW0sPRQIhAKnhD6hPk38dS5hgeK2OL7wlpMXarzr0IIfBdjGbKF6gKv8DCGoQABoMNjM3NDIzMTgzODA1IgwBribFbXRBStuujxgq3APcwxaK1%2BoMfUd1YX78MwcO4QI0oZAkXoNHhe46S23mFZhvtKe2EDVydaLDXWmr9qh%2B9V%2FtXFEE2YxeOjuDDpoakOWFFTSMzgWdYrcqORBeMxk8upOxbfQCR438CqbkSftyf9M8Kom0syOvogKYR%2FbGm7Pi37V%2FdSUz%2FbefOUSM5c3grWplEdEzDKUwyEoTs51P7YhdVz9aDhh3ZFcLYedHNtQHnF%2F%2B%2F6VbBO%2B4i8r4tHfDyDObmRPVQwA7%2BI0%2Ff9%2B2K4qowE5iDFMF1SiZT0M1I8vbwyvKdy2QbWG%2FyWBzhwRZKFHOD8PT0T2XAuRcsWXL%2Fig3w7fGWAjbwvj56ZPh8JtLBufWCEc%2F%2FklMJpun8Nv5Jg7RbIfjbiupAQAznJhDeVwIxPcXVSM%2FqU4Cty0YdJkHluYU%2FXu0pyjaKAmoSRFsfrOP8DzLnwZDmwgJXEa65sjhJJwFNbXk4Ch6Au7%2BFx4%2BWWZuEcv4pcSJ8gnlg9XMBHPPQsnlA65J4sjzqmCtY975qUhymafRQvyfMfIW5149NnNVSG6S%2F0mL2wZINHoL8GvJ%2BuBq%2BILtngVOdiJkP%2BbRhii4febIPkLda84O3NMCP9SAhKtMudtUvPrRKIARC4RJ3GD30cBzgjCrup%2FMBjqkAdTtJiQhZOdXl4GA%2BB7kzZkijO8tcNX0kKQFxHY00oIC7CU%2BAHpx%2FAQv1KcrC3rLvxlARxni953zPzF3khqdXrz2zhvn%2BhfiHSr0k2LEylBY5bP8Acrkhf9RD24X1bvmD9YrRMHVPsIZ%2FAsNduSABRADR1uVInMHyqBZfUx9m1CH%2BdT8nFfjSx4VVLNTWwt6APaQ8NEKZJbjyAVfBdK3nrDWENbT&X-Amz-Signature=8955b9ba0974903616b66672203865ea237ad46a572f4384fd5cb437d9190e31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFKCF2YZ%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDIRElSrj9zSvqyYwy17SEXrZNWnaYbCPB%2BPl1PQhSjbAiEAx4vuHZxEca6n4xBOsgIL%2BqYTXF3sNMI9HB4%2FSnht6Y0q%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDI9GNOSRKHevlJ1zqCrcA6DeRMlQgcWkN90pH1y05Eq0l%2BsTmORlJl8Z1eOh%2BlGZNhsSaYArj4Lrcla2KivHJ%2BK3amoB5FZWpFfyelrmLwyw5hWwiKpGuP8tgDlY6Ekb2%2FtwL%2B8mlXVTT7zPBMcYfb6Vyx2ejucpxohutx87XeU%2B5KXN1iP3zeUKgb716GfThC0wr9rTfnh6r4J75uSUSwD%2FvcHcfoZjci7gBJvg82iJfVf4WS2yqjLNNywrznSWqCaW5JEgcz7b1fwexpLkTq2%2F53IP5rLJJ235xCbRa%2FTVV5J7UIKjF7T1rW8E6qvBeUF7ZHsZnCeh8n%2Bz8wlVaLiqLGrI8dOyU%2B19IFL3TMyXr6nQZGz2uzEEpVdYzOVbolp44nUxlODR7%2B2eQmeRd4eheCSdNJ2LPHXbr%2FTC7cgIh7zgiNg0c91inypQ3t93RnyMGjKgyEgyr6dM%2BitKF6Xr1D7p%2FLzrSfoxEUX8nl7qQRi6mqjOoUOSukq2gWFVrmwX6TF6hA3fn3JOWb96QtM%2BVqVdII%2FFc2GAVIWyRYLS3JXQXpJrSHNi0Yfn1sgujHRQpnxCrsQMoEVXo5QQXdaK3oDKQ3%2FVLdVJoApHgEvHVDtNEAozd3rIYg7A3t2YKvLr%2B8ytCebT8ZGeMK66n8wGOqUBsNR3V7Dc0rVi%2FFmUDCMF%2BY%2FCJz%2F8dQioKi5hPF%2BqPYrsi9nGIDfxx2BOU1a3%2BQp8H8zlgf7HKAZ%2BNLFWm6u9VlgRAbAk%2BTOC1HFk9J99hszKisYJ3UYO3jKvAYkx%2F7Lo6%2BTJ7WvKhHPwIv1VqW7Et4EMP0MDHajmNhN59t7fdvuz8I4L2sYtEVKGv%2FrYWBflndN%2FBnG7PzoO3GS3wQ0Q4zzk8hEF&X-Amz-Signature=d52bbc60a239e2b00f39fe21a3f46e526703e7ad99d38759169c4842042fc7e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFKCF2YZ%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDIRElSrj9zSvqyYwy17SEXrZNWnaYbCPB%2BPl1PQhSjbAiEAx4vuHZxEca6n4xBOsgIL%2BqYTXF3sNMI9HB4%2FSnht6Y0q%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDI9GNOSRKHevlJ1zqCrcA6DeRMlQgcWkN90pH1y05Eq0l%2BsTmORlJl8Z1eOh%2BlGZNhsSaYArj4Lrcla2KivHJ%2BK3amoB5FZWpFfyelrmLwyw5hWwiKpGuP8tgDlY6Ekb2%2FtwL%2B8mlXVTT7zPBMcYfb6Vyx2ejucpxohutx87XeU%2B5KXN1iP3zeUKgb716GfThC0wr9rTfnh6r4J75uSUSwD%2FvcHcfoZjci7gBJvg82iJfVf4WS2yqjLNNywrznSWqCaW5JEgcz7b1fwexpLkTq2%2F53IP5rLJJ235xCbRa%2FTVV5J7UIKjF7T1rW8E6qvBeUF7ZHsZnCeh8n%2Bz8wlVaLiqLGrI8dOyU%2B19IFL3TMyXr6nQZGz2uzEEpVdYzOVbolp44nUxlODR7%2B2eQmeRd4eheCSdNJ2LPHXbr%2FTC7cgIh7zgiNg0c91inypQ3t93RnyMGjKgyEgyr6dM%2BitKF6Xr1D7p%2FLzrSfoxEUX8nl7qQRi6mqjOoUOSukq2gWFVrmwX6TF6hA3fn3JOWb96QtM%2BVqVdII%2FFc2GAVIWyRYLS3JXQXpJrSHNi0Yfn1sgujHRQpnxCrsQMoEVXo5QQXdaK3oDKQ3%2FVLdVJoApHgEvHVDtNEAozd3rIYg7A3t2YKvLr%2B8ytCebT8ZGeMK66n8wGOqUBsNR3V7Dc0rVi%2FFmUDCMF%2BY%2FCJz%2F8dQioKi5hPF%2BqPYrsi9nGIDfxx2BOU1a3%2BQp8H8zlgf7HKAZ%2BNLFWm6u9VlgRAbAk%2BTOC1HFk9J99hszKisYJ3UYO3jKvAYkx%2F7Lo6%2BTJ7WvKhHPwIv1VqW7Et4EMP0MDHajmNhN59t7fdvuz8I4L2sYtEVKGv%2FrYWBflndN%2FBnG7PzoO3GS3wQ0Q4zzk8hEF&X-Amz-Signature=522512846ed3e99aa110bd3279f996f82f57d85beb986a7558a04fc3f1fa8996&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVVFRPTU%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICbBpAkkRdBk4bfqbczlhfgRwGJj6DFzbKIYQegIZMd%2FAiBkGxC5IAzda46ogTmQulNqmz4R3QfpuUzKsm1v9bgazCr%2FAwhqEAAaDDYzNzQyMzE4MzgwNSIMFMx%2Fecc0wpLSnzkNKtwD6A80V9Ergy8ihcL%2BipGZV9zf1CPcsZw9V4ToT4O5ja2CE2MR3ivDw%2FaCvsJCkPo5g39x7IGgoAn9iGp0TkT06%2FBaDrEFZrKcrqZgmqfhm0r3IEctWVMIVdXQH4QUMb0vo9AfWhL9ZFH4Zq34s1LpSLtvWCxrQjhhlzR1rjk9XZdO5JvBjlBvxPT0J9NCb7ON03IBYMjqP%2FWvzVroEri45GzTJ6xJPXA%2FvC4eS%2BZ%2B4daWGu5hubhAcW8vWAlfbJ3SZKU707Lbsc79HwXpN5FSJvkPQeAc8TrPJIgR%2FJ%2BfbYIo%2F8wZs43%2FZf%2BYu3iYC5TKvwiStzmFwFY3kQdFWu%2B7ede%2Bv5msqzleXynz8%2FaBpgvtMhFRkzm5I8pLAPOGlzzy7ogpLTgMIoV5PcTzjkU1Fj05%2B4ptSXDhtQQUEbz9xTQgtIuDXWNWWB2mBc9c8CnfMLyXZd2%2BbpnqOgY0S20JgINwkJAYh5RpLnxOHsEd2JyMj%2B0k2iNEPl7x15SzgY4WKFm6cWFYMzcQibIkBTNqAplQDaxc0Shy3%2FNf7eUVBFhSyUMa52xymHcpFOzS%2F%2FQ08V1Pja3dmDOI7yiJEpsBugSUz%2F0FwzVVJMfFszyOH3QpsO%2F2q5KQYGunm8cw7rmfzAY6pgGGHbSlF%2B4pRb3Sr3zAY5p3%2F437TVujt6coIh%2F5JB9YS%2FnWq%2BbQWKIyE1wdwZuZWg0SQTY%2BDXO8dR7WdW9opMVpWY53w%2F0e81QCVfhx3KXT9HdAsEDOwYuuVNOgdGDJCfBAocjBXaIN%2FdGUcxtJYNM%2BPpT3Hrjmm7pPXdFEoXKXsAEGFdqw3k8TV7gZgKF%2FeksLrgsuGVFh12Ghfds%2BPENK2aL1RFFg&X-Amz-Signature=97a456aa3e2d94bec36dfbdde241ee0b069bc4c2e0c8f0b45871904f4ca50693&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTKTQIKI%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFJHYiPKCej75ubV6PxFMlvHxi09Hnzy2J6MOP4fX2piAiEAliOGq1mnxQBOZPytOc92%2FIpgBImRKNOaHDaPJb1OMGAq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDOngry995VH955yfnyrcA32ARCn6%2BMiNO%2Bix1f%2FjFtu7DXWyaOkBBp33%2FA9FK40yeHeHVTIlcKJpIP8X7COCn9nmxuh6GrSHGHELjcSaHkWQj%2Brb1WnXcmxdtGnySUqeABtgY4OpqUKk9oKQdjLHk1tImKG%2Bt3oKbblrhzsrFc6RduZExIWXe4cBbwCrgGEA5%2FDkASvOycy3hH32uEFACvvmhqo5L2ooDiy%2FyoGQQ2extsPlz%2FFMeFma%2F5sYSMy9sjpMTIyWsGeZ9m7y1FdIg3IBbx96raUclPUwlTXcsZuU1sd5nVf8jus66Dbe2m9256TknKRZSSdoghZoBXWTkNFKmwZ0OkBkEYgixBW0QKt1Ew0q9DfVHA2imrhUzZwagldxqyuaLZ2RSaKaS8YeixQ%2BBPww2gnJHa3rAtbMiwAPYsKZSFNvJXsDgffjg2uStCSf5lEkkyrbuxSKj%2BjmgUqesgLtGuNzeBgaLgYNmOonWlj2Fo6P%2BXLw7g0hPvAzt21oRyJzfYr%2FngdJ3KcmnmR2bxecmE4O%2FpSbL7S%2B%2Fc1Dc2KM9oeVIkXd5IuVuTg%2Bd9ool2I9zfdb7YgreTQDN7fyx%2BAXfOWYgQHLPrBSqU4n9jvuhSihLkjHetTe5Ej2sStmQiO4U1NprZC4MPa6n8wGOqUBHljnbhbg%2Fype7XFcDlEber6QLfSjr07xkcxH5MsN1L%2FtMhKa85pQW6l0NPaQA%2BtYh73%2FDw6Brc8MF%2Bn7aIpi%2BD0AMy3VGglAr2HFaaMO6WgrvqUy%2BRDLf0UgLjdwYPa5wJiDtPRwi%2B9BWysJ3YUDmrpWB7Bfjn87Y5TxegHdl6egJ6RmXSNk4Y7439lFUEPvRAjRhE6X0zr3bzVJ4Gj4htj2C32l&X-Amz-Signature=d08751349fbefae38f32986ef8e79671d38c4ed59d4b1ac1944d8ef86611e400&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTKTQIKI%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFJHYiPKCej75ubV6PxFMlvHxi09Hnzy2J6MOP4fX2piAiEAliOGq1mnxQBOZPytOc92%2FIpgBImRKNOaHDaPJb1OMGAq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDOngry995VH955yfnyrcA32ARCn6%2BMiNO%2Bix1f%2FjFtu7DXWyaOkBBp33%2FA9FK40yeHeHVTIlcKJpIP8X7COCn9nmxuh6GrSHGHELjcSaHkWQj%2Brb1WnXcmxdtGnySUqeABtgY4OpqUKk9oKQdjLHk1tImKG%2Bt3oKbblrhzsrFc6RduZExIWXe4cBbwCrgGEA5%2FDkASvOycy3hH32uEFACvvmhqo5L2ooDiy%2FyoGQQ2extsPlz%2FFMeFma%2F5sYSMy9sjpMTIyWsGeZ9m7y1FdIg3IBbx96raUclPUwlTXcsZuU1sd5nVf8jus66Dbe2m9256TknKRZSSdoghZoBXWTkNFKmwZ0OkBkEYgixBW0QKt1Ew0q9DfVHA2imrhUzZwagldxqyuaLZ2RSaKaS8YeixQ%2BBPww2gnJHa3rAtbMiwAPYsKZSFNvJXsDgffjg2uStCSf5lEkkyrbuxSKj%2BjmgUqesgLtGuNzeBgaLgYNmOonWlj2Fo6P%2BXLw7g0hPvAzt21oRyJzfYr%2FngdJ3KcmnmR2bxecmE4O%2FpSbL7S%2B%2Fc1Dc2KM9oeVIkXd5IuVuTg%2Bd9ool2I9zfdb7YgreTQDN7fyx%2BAXfOWYgQHLPrBSqU4n9jvuhSihLkjHetTe5Ej2sStmQiO4U1NprZC4MPa6n8wGOqUBHljnbhbg%2Fype7XFcDlEber6QLfSjr07xkcxH5MsN1L%2FtMhKa85pQW6l0NPaQA%2BtYh73%2FDw6Brc8MF%2Bn7aIpi%2BD0AMy3VGglAr2HFaaMO6WgrvqUy%2BRDLf0UgLjdwYPa5wJiDtPRwi%2B9BWysJ3YUDmrpWB7Bfjn87Y5TxegHdl6egJ6RmXSNk4Y7439lFUEPvRAjRhE6X0zr3bzVJ4Gj4htj2C32l&X-Amz-Signature=d08751349fbefae38f32986ef8e79671d38c4ed59d4b1ac1944d8ef86611e400&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UB46FTRY%2F20260208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260208T011204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYBovgjeRUBK0ovC5GtMy3Fpmb9v3XYskcmjal7NbVnQIgZGniJcTP8SrFwBKCSBUdiYCp0Yrbbg5AWIUrzLg8eLMq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDJLh7E2Sb0ZHElToKircAwkXcvNo1RkwIMmh%2BBf0xXE%2BzyHbh08d4QiF3w9Vfgwry4TtHZrWimlE1IZYkHUpkDSI0F6f6tcIoZGbK7neVWSi0WeLQBiUK3pOA0Vik4BcWlL4g3e99Ic%2BHbPZufLGenBIIUZLBZgdpSeLOAnSC7t1NO5m9QZHejhDI7GzzN4kZHmOmW9SYk5FFR20q67jIZoYm4X3u%2BCTglKGyL8kqgNCAtkYaV5pmv7lomZmvONC8haddGV5rrod2K2zXDAj6J6en9%2BHdbR0eJfytGOdUjI83%2BrrADfqSAjkTYJ92WaHfwYR31FPjXqKTIK1N6yWbbkqcwWjWp%2Bq%2BmMsLK8QOQnDQ9a%2F1CUgi5fWPZnOF64SMUrb%2FNfKVEMasY1MS9hBEilOZojsYpxtAxTUNTo04c%2FcQH4Ee1u1TY5wI1UMCsdRea6rZcbC0cQUIb1xuDfcuE2vjsdec3n4P4mYE1L4f3gjhbbfLtnsct9UG%2BcqbKcZ12beAxwwxg9MhEPxZ7Ijn5oEDngzY533dP4osQu5WDzV4gAtLjQNhH2M6mkTCBHuO6%2B9vqkBWxBTOnFI3mkYomkC50VylzHr91BB3kaF5qLZIZUc5OEkZkDa%2BcoEyc3jbxVZoWj0kdkrWNn3MLm6n8wGOqUBUuXOfP%2BGPPtOm0A5oiOq8mI%2BI2g5dNdSRZPabeAxo750Y3UxtdlUtMXYgxk5%2BHwCbVkLbxQ%2B%2FJkq0d%2F2Tf%2FaskXuU970Tvf%2F9CEheWEzpj1diF6IjpoZV1StPS9yVDeoRtH5ZaLRlymDO9Y%2BjPHN351Qq%2BDgssFRFyW6F%2Bxk93dhOw8eUkxcV%2BjdO5DS7ez%2BU7jf8kqN3WRaBnpESpIdAex78k4r&X-Amz-Signature=91506caa408bf2b0c819c5dc331a7642af0bf5821bbbf317b5b1e802ae951264&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

