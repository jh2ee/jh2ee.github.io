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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JQT62JH%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIEIZ9KmWoazQlqHXidKFjs4j0hnVz9Zh7Bjg%2FkPJ2eMvAiEA57B8oFMedqFSQDjkXNrwEjSlamudbEaVq%2Fuks8pUK4wqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDFEkrb3x%2F5RVrXceircA%2Bu421jFF50An8jbdktaJ572pLe9mBan9LCN1U9%2Bk%2Ff2Bgq4elxyV1kp0MIAEkwSIepqjCTwNs3917YKgoEwT5rgFuSZPfrf5Hqq9VY6ppsUD3fPJBBG85f0tEZBjO7cFLf8ajkuvO1VjJTVSDowDF8fGTrZJFx3SmJwVWxEw41436ccNwo9LMse%2F1PzvbqA0Dk6Ouh8CxrTJuaqUYKkGU1Pn6e6%2BbTmP97qd9zdHvcMZdeqUad2Q9sQ%2BkSU6g87aZvw4XNtOE51NLKN1azy8%2Fqlvb8Z0%2FO6P%2BVrN%2FpZtFV8h7KcXBlCmZ4NBaV9oeypzYWSS%2BGQAQquB%2BesbRNRF9hVDrxw4rmw606%2F7aaPXQJXt%2BIfqUbHLkef5tLvCB%2FM2%2FSLtVpuGrjZkgosdKIcevlw3%2F2N20tloC7oVha%2FTXV87OYT0CzVmH81JdBNJnQZrU0%2FMBJqzzgIMQKYOLfLgoinP6nxFmMxftPjdEzAXfxYG7sGxJyqC6ANXCDPHib668dhKJVRtjyOeyNLOOt04UOP5FbNRtv7qhVeE3oaFG5cl4Ke12VyHL8qoAuynvJv%2FAxTsibwU5i0xpQm%2B6tC54z64R9ipCrAGuXSZA6iqesNRA6T1h6ALv7RVTPwMKCwxM8GOqUBHt%2F6ABkDaEqzDAHCjTL3EvJ2ivv62eRVxLfq07LxI7i2WhZr5BSnp9eg68OpC%2BQYs3u1MR8d4XHGfQYKCyjf8NauixzWxSsbHqmTpNNyBCjS6Romfhu%2B4HZ3%2Fo9FsB8T5sMLp9CSd1FsOXi3h3K%2BsK5%2BRMiwZUGqZ8FcZU9yE%2FcrLcN9plW1OEoc9RW0kcddsgYY3D48v3vPBGOhNUX1jWp0xvkU&X-Amz-Signature=61d3b3e3623c0d52be8b90dde68ba60150cc8e61e7e08ca3f6dd3f70831b3454&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JQT62JH%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIEIZ9KmWoazQlqHXidKFjs4j0hnVz9Zh7Bjg%2FkPJ2eMvAiEA57B8oFMedqFSQDjkXNrwEjSlamudbEaVq%2Fuks8pUK4wqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDFEkrb3x%2F5RVrXceircA%2Bu421jFF50An8jbdktaJ572pLe9mBan9LCN1U9%2Bk%2Ff2Bgq4elxyV1kp0MIAEkwSIepqjCTwNs3917YKgoEwT5rgFuSZPfrf5Hqq9VY6ppsUD3fPJBBG85f0tEZBjO7cFLf8ajkuvO1VjJTVSDowDF8fGTrZJFx3SmJwVWxEw41436ccNwo9LMse%2F1PzvbqA0Dk6Ouh8CxrTJuaqUYKkGU1Pn6e6%2BbTmP97qd9zdHvcMZdeqUad2Q9sQ%2BkSU6g87aZvw4XNtOE51NLKN1azy8%2Fqlvb8Z0%2FO6P%2BVrN%2FpZtFV8h7KcXBlCmZ4NBaV9oeypzYWSS%2BGQAQquB%2BesbRNRF9hVDrxw4rmw606%2F7aaPXQJXt%2BIfqUbHLkef5tLvCB%2FM2%2FSLtVpuGrjZkgosdKIcevlw3%2F2N20tloC7oVha%2FTXV87OYT0CzVmH81JdBNJnQZrU0%2FMBJqzzgIMQKYOLfLgoinP6nxFmMxftPjdEzAXfxYG7sGxJyqC6ANXCDPHib668dhKJVRtjyOeyNLOOt04UOP5FbNRtv7qhVeE3oaFG5cl4Ke12VyHL8qoAuynvJv%2FAxTsibwU5i0xpQm%2B6tC54z64R9ipCrAGuXSZA6iqesNRA6T1h6ALv7RVTPwMKCwxM8GOqUBHt%2F6ABkDaEqzDAHCjTL3EvJ2ivv62eRVxLfq07LxI7i2WhZr5BSnp9eg68OpC%2BQYs3u1MR8d4XHGfQYKCyjf8NauixzWxSsbHqmTpNNyBCjS6Romfhu%2B4HZ3%2Fo9FsB8T5sMLp9CSd1FsOXi3h3K%2BsK5%2BRMiwZUGqZ8FcZU9yE%2FcrLcN9plW1OEoc9RW0kcddsgYY3D48v3vPBGOhNUX1jWp0xvkU&X-Amz-Signature=61d3b3e3623c0d52be8b90dde68ba60150cc8e61e7e08ca3f6dd3f70831b3454&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNQ2DHMV%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQD%2Bbl8pFyefDmrIOu0poifhAbdQLcYMxe1Iya2NQ2L7YAIgQlsh1kT7vcpqmulhMucS%2B2d%2BZ3QPYEXZIVyXQm0HRlUqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDO6jLTchrRgj6YhUyrcA2Mi0RDtemg44dQVZX549HEKnKK4zRXLxWblmi4UYBD9f7sD%2BHvHLBbfVCLVSepURnEryTyD%2BrNtBpYrV3qnMybWXNLi0SgnjSQt7oCiOqPLtADwXn%2BwJl7KchY1kpRYgFrMR342aHeYYcSWwwNfk3KTMfJewbqNRqE6q%2Fx2s%2BtWoRajQnAdtHrH5zsZNd5gY7QinKIhy%2FG%2BsLAzfuMvjExHW5TKGWqXb1YCvj9SQ6tl821alcPeJ123uyGam2VWZGuwVeLhizi8faNiRVk%2FV3DzuVHYgiFUZKWTGoujMWCpIck%2FggtWJJMMqYy%2FjwppkgwTpB0Zxbd05NCmbfkFnagU9C5chIdKf%2FHBAuZeKFQU0Yw%2FtMIHSPZQXc0eQxbUAWAIp2YSie1TZg9%2Bodn%2FTwams11ydwvqn3QMn6ycBNNWBnkV10nqMpzVg9h9ISnVqBGizg%2BNDQYm50pNwSnX1N7%2F6rN1zFlVvT8%2BTz01IVVuFQfh8R%2F9J4g1rwzlSxowa9aRILdmleFH4HvFi9SPiES2N8Uu0qm%2F3z4j5wy5IVmTXEUeO9%2B8d%2FAGHz78lmgFZjLKTvTF7qpq0PWQNPFZdZg%2FkPhJTbEDdA8Uv8VTvo430lcwxrOaHPLTaqajMMaxxM8GOqUBetcJCz0suei21QCS3tRxMIuNqManRtYnfU%2FQSdzllqr%2FN8M2E1BD6jI%2BubXly9lmknADrKGG3BtOfzEXtJaKJdh%2FMMXlHxetLPH%2FN%2BzygDv93RA63LFiMvabMDuKp2KGDyLjly6qXOkG50gQ%2BsNVT5UuTN9VR2y4BGFi0Xp%2BiV6XcOw0VLEpHi2hzn1%2BIkObvGcC1FzGls3mKYjbswapV0ngp%2BOD&X-Amz-Signature=03d6be8cf0ef0525d18ccb37596ebad4e123517097a4b5d699aa8de0d50ebf3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GQV2QUL%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIFlFnc%2FHhERGIYNLxmZZOO19nw3D8qRc1tSzeqwmEfYGAiEAoqNsbzLEQH05Zbhjpu5%2BTXZ4QKGLWX0dJSIh%2F5iwsdYqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIQVQTPTxPNeOZvnWSrcA%2BCjhbd8JhKV9krBouPdmHC0ivAHTSYJx3AE5q0P4kwly7ZgLIxoWLhESPd7A%2F3w6BKOr2S%2FhCixy1ju4GOwSS9XWWqlM5TCvxZLzmgNetnpjG7AsGcZyHAH5rCZQjnIQuODGfEtAeA4cmz5Jp1iP%2FVRVQfIeVjuNrA4LPM2bdyOODdnMVxCoyeGaq8XV949Mc2XzXiqZbopFqQBBiwwViretE4Tlfjxvxd1x%2BADZxdewkaCG25zxVJt1V%2BvIIqOcI9A7wL1hPvHoBCi6vSljBJG1YkhW55G4hLi1cLrLbB3FzWi%2BtWgYf%2Fowo0l53OnMGXFELBnP5CMe%2Fd8ZLmqLoaCT5HD1Ebe%2B6%2F6nsL%2F%2FuhNyOjCYzQBdDeP8Hl%2Fdql2xQw%2FLkCO0MLZ5%2F2uAi70%2FFWLwuZjFh5HWCpZsBUWNNZpqIYHJTN792C07UzU6NYenDSytPkH8mGerLrz1ojXQheUufaLTXL%2FvhOCpQKChzoHKtRGAFT5ig%2BsDYK1HNTnhZMElYObBGnw0HIa6hTLL3Nadt8pWX6oKpslVwWNVtpzsGWsS2zGBO9NfMwKBh0vQHM%2BZ1MQmonE2ubhQ6wISrI6AT%2Bc%2BsGCM%2BtMOvNWESVD%2FqvtAmFalt9EhTDdMP%2ByxM8GOqUBybK7a3oW7rCilDE4pYwhG7UN%2FFc3GTP3GR0DFJOnf0ixyRjw7hZRNSGebDvuwXBnQWPYasZEoXOW3JzuiSa0qwSy7VFie5kSckr5WD9G3WqpdSqIpxVCoWgWyW9a71Q1SgTO8PP8PAusLOaac0oHj%2FuxE%2F2BoVODyN21iSAjYNWHS5C9e4hLhrcqa2Pd8Dfbfk%2Bdsdq4hFHdK7To8SCunaYguqX9&X-Amz-Signature=68626ad7d278ea9ebbe9048b1bd7247300f47854751eae6c97ca8d0c2e17b60a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GQV2QUL%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIFlFnc%2FHhERGIYNLxmZZOO19nw3D8qRc1tSzeqwmEfYGAiEAoqNsbzLEQH05Zbhjpu5%2BTXZ4QKGLWX0dJSIh%2F5iwsdYqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIQVQTPTxPNeOZvnWSrcA%2BCjhbd8JhKV9krBouPdmHC0ivAHTSYJx3AE5q0P4kwly7ZgLIxoWLhESPd7A%2F3w6BKOr2S%2FhCixy1ju4GOwSS9XWWqlM5TCvxZLzmgNetnpjG7AsGcZyHAH5rCZQjnIQuODGfEtAeA4cmz5Jp1iP%2FVRVQfIeVjuNrA4LPM2bdyOODdnMVxCoyeGaq8XV949Mc2XzXiqZbopFqQBBiwwViretE4Tlfjxvxd1x%2BADZxdewkaCG25zxVJt1V%2BvIIqOcI9A7wL1hPvHoBCi6vSljBJG1YkhW55G4hLi1cLrLbB3FzWi%2BtWgYf%2Fowo0l53OnMGXFELBnP5CMe%2Fd8ZLmqLoaCT5HD1Ebe%2B6%2F6nsL%2F%2FuhNyOjCYzQBdDeP8Hl%2Fdql2xQw%2FLkCO0MLZ5%2F2uAi70%2FFWLwuZjFh5HWCpZsBUWNNZpqIYHJTN792C07UzU6NYenDSytPkH8mGerLrz1ojXQheUufaLTXL%2FvhOCpQKChzoHKtRGAFT5ig%2BsDYK1HNTnhZMElYObBGnw0HIa6hTLL3Nadt8pWX6oKpslVwWNVtpzsGWsS2zGBO9NfMwKBh0vQHM%2BZ1MQmonE2ubhQ6wISrI6AT%2Bc%2BsGCM%2BtMOvNWESVD%2FqvtAmFalt9EhTDdMP%2ByxM8GOqUBybK7a3oW7rCilDE4pYwhG7UN%2FFc3GTP3GR0DFJOnf0ixyRjw7hZRNSGebDvuwXBnQWPYasZEoXOW3JzuiSa0qwSy7VFie5kSckr5WD9G3WqpdSqIpxVCoWgWyW9a71Q1SgTO8PP8PAusLOaac0oHj%2FuxE%2F2BoVODyN21iSAjYNWHS5C9e4hLhrcqa2Pd8Dfbfk%2Bdsdq4hFHdK7To8SCunaYguqX9&X-Amz-Signature=0de2889a44dd0ef33c6c33e5f95642f8161c54bd1afddf3616121168e627ece3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUJQUGWK%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDnRrKczROO4vrn2kDFFv7%2Fnhc4gHbMMoaIwh75nKS2fgIhAITToe9Z7UMNDrl%2F%2FPklk6zv3xfAFeo7DAe2PyTnWpenKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyhJ2am9uOIoJbq900q3AMfd%2FqHYT9U3t84pJ9szpKEfy4IABHA00fRFzvPC9Maf2rJrcIOoMuqILp%2FcEcevPrVOfA9IKu6USTOR6%2FCFR%2FcjrT09uoI%2FJBBX53r5DxlMHSuU3zyCv6n%2Bcsg0mhnvPjV0rh6aodRRVuciBAbQ5zHXgpdGah9CzHrUrdJlgofnsMn3BZs7ClqfEM4r89N8AXvLjhJPOQvIkOqFjCXssFvmh8srAb4Lvgb1zAxK9pPj8VF2zNzEFY8wb19RNb6Xbn%2BGtjGr3aUqEM4ZUgA2h5lDD062kloi28B5ayNi71CWqtzAN5KccVbuxYlmyAyjGBZszQ7FkE%2FqGp4n%2FcGpu%2FPF1OAZ93YInYfbySCAWTc3qzoUxJCzmUWMgV%2FhNRVAtL%2BpLTXfphukTeaQxPmeim15Cly4N31jQf51gN%2FJl2FpXsRuSrLHicfhpgdWPRhmJD6FcAU0IvXWyXuIk%2BaYZYDaBIIZoDV5i%2BC%2Be9nZ1Y4IIwU8AcVhrS4FfW5Ix%2FXsxl3E4bW0Zh9%2BTOXMwHpNifjqaqaO1AeqhoyelKJEqAeaz4tN%2BBP32g5hu8rYTvKMUyGMYOXinrUFdNsmJ6Du%2FzOF%2BIDBevI%2FeN%2BnBNamVv7yN0JRvkJK%2BKevrtPQDC0ssTPBjqkAQTdqRPYBQQxx7BmwG6W53g0tXiEH9%2Ftqh9EJbMERSgmqOUdH%2FF0Z1BA42MGHP9M1ZQWaIS%2FgPtoXBkMMjmuCPFbGqw%2FK01HWTiRd2NGpgYTOBxNyK5kiRGiq9krb1WESbDi0DbXkagsm0Ia9DIk%2BK6rZZoQKSz%2BSIjM4WRQ5ND%2BKQandTYxkDHtlMMolwXWOhoDxkJvryJQhRrubQWebIxm1zxs&X-Amz-Signature=f5b1b492b3b7269d746a382efbf3a94c76ee8d3cfab23c20ceff485fe9301385&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTSWIGM4%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJGMEQCIHPoN1gAnSHz405OxYGQyniPCZntYcVCtKR452Kx3VZJAiAoSR41t4uf%2FwaPqNIyWVD4FbG6HlFfux0bn7BWjE2p%2FyqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM60Cmb0CBtU%2BKLMlTKtwDD4p6I0yYaqYSVDgnCfL0Hty3UnzLLITaok7Cv5sRRpd8lU0dLou9Md7n2wqTT8HTAdk54kV5A4vAGuhyBLgY7CQgQ75LyRcXA8j8YoL7qoDyn9wpQV7l%2B59AOq%2FLEHQctuWObKyQDCz0dskuYJBQ9%2F7%2Fp69U1R18j4TjN26MCZzu%2BXuf6%2FZZMcMEfiAEoj9tdtOBfJ32FEG5rIFtRFeKM%2BnT3dp99oV%2BWDbo4G%2B7%2FR1eHQX%2FugIozvGDOYwxs%2FAi02M3IGABLMc1S4488W6X%2F6xGyN6GICyffBr28oybyaUZgXgfKR%2Btoss8OdTMnFx168XsWKSLBroICo5yaa8ZyvzZajo%2BUIh6OO1d6OcZjFXJ%2BTDXtUGL38%2Fi0fiTmpqNAlAvaW6rQwkNEtxdDNToLY407lDRxHE1aJWodGKO4o4DoWcTpq9n01wf0TEWcEyrrnXm6ZtWaCrGF3CV25LhkF2eXRNIohJ9TgoTpjLN9kMJfEArs4qCc1HIe%2FhNF9zmZvMMJ8fW0c6f8x%2F5yWTLBfRjXAhDcNtGij8qxNvycMHVkEo0kpASnre8HA80EvI7wiIpw20NkzxVzVXbVserJU2agjEvceQ9AViVwCp%2FLQIEWZ%2BhRBmdLcSPQ%2BYwkrPEzwY6pgGEUSDHKxwLl42eWsD81y%2Bcco%2Bl%2FD5evLl6K%2BcmpcLDg0LA%2Bmy2JL67CNtelKusKORg2PdM2BIAnqxmjA2F6FI4Ddj1o%2FNOzIVkKRgq9ua%2Fm1sZAO2e9qTM59M5BRw4QY9aYt2GMVW%2FW8Y1gno%2BC8qsb%2B2%2BvwBuKn6PN2makeNLNw1VvHcPNZT7gLEo18a3uATQzCvE38DdxnD%2F44YugY4PJBfWd9Du&X-Amz-Signature=99a902d5f2d665c025c16fa91d36b37352558721bc3154479ad6c791dd17e0e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OI5NKJB%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDDjhhgih686dabrOIlYkUYuqPwJ0JcITynpLc5%2FmsoUgIhAJONlOw6DlLToslsLfxFcPYwo3uvba%2B%2FqCy9usXhEnF5KogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw74mrKqTx%2FmZBOJ2Eq3AOeFTGYUmF9FOg4zFoznbc%2BqodCmD2vpcflE0rXw3sSGhzCxqFPtN%2BAyJYsnuOb6B2P16K3SuIlrqa7y%2FN%2BxL7FICQ9XwIh8Q2K1rnZJz53tF7qVfrfocm1z3I7DY2Rf4A%2BidCUwlxxhePmSgnVKddoPJ7kvVkcITc1aoNIPug64bxP4%2FK2jHVwj3nuEgctLHLBs2wXGG%2BnIjnKBwQRkfQRwL404eE5LCVecXuPrtt%2B4MFsAsS00gVYU6fmcP0eemeD9pCzRF9%2BibCUZy1B9z5%2FNEBUe27IxS4BOiimBMZerMmdBfD69XZWoQzcAGQjL%2BoKnVMYPSh4ircfLiyvA9mNcfPnYbBwJxUY9CZePQ3QLY6pYrsTmPa9IPLZkqwzEtYGG%2BaCWxryUESf8lY5WweT%2BHFoqF4KbcS0JhTjIXnAAw3Trpr9FvkCzpckyFJIkpIqfAqN6x9ilK9KvBr5%2Fk%2FSOgLtNwUEFKiwmiPZFMckeW9z3dH5Mu03JY3SZqN5O%2BS2M3kur4Mso0%2Bx%2FiA%2F6oDRWAJZ1slRtnvGRaS2Rikh6dFXa2NjNI4o5vMh%2FhE8KwQl6BUL3%2Bh%2BjuX6DyI2%2FPMhaRE9xQCkypgJxBgRO6E3JC80X1h5Iu7vYC0hjTC0ssTPBjqkAdSJHTbGg6Nw%2FFKcPN5gHExsmVW5YRQIrnBnpIraFXwHY8uZKiqW9piOY8%2B96Ys7Zy%2Fcysj%2FZvSMVhgxqrqOo28aEdh4xhsAtvkq0B5zuBxJcAoSU5lh9dsZWOp%2BTbGeo4pg4UKYtMvse6mwP2PWknb4pStOz1BqziRUncU5qRCMFRdntMUQbPKSlHBbaP%2BESIhdVn6KHIbn2oFjVYj4vJ95Cva7&X-Amz-Signature=b8b1c035c25320573fe46f7bfb96d7d9941540ca80809ff69d72d097a35c7e86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEN7V5NM%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDlIki8fL%2FRhRFhfxyx24ggrmme1IOObNC%2BPDRIZBX5UQIhAMF4FQU7x84NkBP7lGl5fN5mnsOV8oa9gQA45ZVeR%2FcKKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz01202jeCglK77Ecgq3ANY1PjbuqphHi17Xt2hMtgOD4p%2BKBxwFcShhQnlj0Awl0AXBZDGp1GOhtVkKiD89l22yQUdcg27GMiX%2B6eZeYqlzlzp65M5K8N0pLcR7yzYV2l%2BbW7UELsi%2By9%2FOvGgYI%2FDGzJs7geL%2BaGSxCUNcLP0GLi3PVJPYFdaBN%2BQak2Uck7GTWtCcbO6Y0HMUSS4%2Bn2%2F1bokDpiMin8QXZlF3wwU57SXmuzPZtTgZ6MKLK22ARy2Ld8oVN8Wh5XBGYWnxt3lNSzJeenJrSzYZlpt3Imssjo6L27qtWaq%2Be1iJnCu%2FaQHdQSQxjtVKgW8RUPGHrXr3vDp1xuMgVY4WGoHKM%2Fn%2BG6jejwhzfiFUnWf0zmOJnxuG5AIaSmP2KuLBPINElOdVQu8aeBi6o%2FS1G4lqFDIiTdUu%2B0XhIwNdpXSB2C%2FZWExZOnARtatZx2v%2F%2F%2B06%2B52jbcHbbkVBZuL98F90CfdyBSs7D4jp8zOGq9ecjQzqLLRsiQZFE0JEhOFdG06bmqYPJv6BRphnur83E4fvR5fULXvfFzfaTbOW7Z039upuCuV3ZpPc0Mg8c4B6dA7SyhWYMMnMKz3ICxcJypDJpks07Wpk2AiZ5%2Btdl0qPi00xoAAL5KhmDKPu0T6yDDbsMTPBjqkAQuODDY6THlHY0VSZwGzeEXNxKpKGr%2BawDR2ZFJGuAcMqpzB5WYwTjjJoXFv5ozb%2B74FUhQcOFVMSZzEC4JA2GwGMTZ53mPKEzVkOynkzNNpq%2Fj%2FMNLtyWcw1EwAQh1cucJlXbwpBqZLPrsv2N1HaVb6MpaC3YDue9hdwm3xOZsEPw0mtJftiMsWPP0iabwSDljYkKJ9V5fKZTStgc%2FzB%2F8EvSSm&X-Amz-Signature=c1f4a9a2e1163314498bedf908a9e2a895a4ed2ac0f27f3ce1a8df0e2cb6a9f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEN7V5NM%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQDlIki8fL%2FRhRFhfxyx24ggrmme1IOObNC%2BPDRIZBX5UQIhAMF4FQU7x84NkBP7lGl5fN5mnsOV8oa9gQA45ZVeR%2FcKKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz01202jeCglK77Ecgq3ANY1PjbuqphHi17Xt2hMtgOD4p%2BKBxwFcShhQnlj0Awl0AXBZDGp1GOhtVkKiD89l22yQUdcg27GMiX%2B6eZeYqlzlzp65M5K8N0pLcR7yzYV2l%2BbW7UELsi%2By9%2FOvGgYI%2FDGzJs7geL%2BaGSxCUNcLP0GLi3PVJPYFdaBN%2BQak2Uck7GTWtCcbO6Y0HMUSS4%2Bn2%2F1bokDpiMin8QXZlF3wwU57SXmuzPZtTgZ6MKLK22ARy2Ld8oVN8Wh5XBGYWnxt3lNSzJeenJrSzYZlpt3Imssjo6L27qtWaq%2Be1iJnCu%2FaQHdQSQxjtVKgW8RUPGHrXr3vDp1xuMgVY4WGoHKM%2Fn%2BG6jejwhzfiFUnWf0zmOJnxuG5AIaSmP2KuLBPINElOdVQu8aeBi6o%2FS1G4lqFDIiTdUu%2B0XhIwNdpXSB2C%2FZWExZOnARtatZx2v%2F%2F%2B06%2B52jbcHbbkVBZuL98F90CfdyBSs7D4jp8zOGq9ecjQzqLLRsiQZFE0JEhOFdG06bmqYPJv6BRphnur83E4fvR5fULXvfFzfaTbOW7Z039upuCuV3ZpPc0Mg8c4B6dA7SyhWYMMnMKz3ICxcJypDJpks07Wpk2AiZ5%2Btdl0qPi00xoAAL5KhmDKPu0T6yDDbsMTPBjqkAQuODDY6THlHY0VSZwGzeEXNxKpKGr%2BawDR2ZFJGuAcMqpzB5WYwTjjJoXFv5ozb%2B74FUhQcOFVMSZzEC4JA2GwGMTZ53mPKEzVkOynkzNNpq%2Fj%2FMNLtyWcw1EwAQh1cucJlXbwpBqZLPrsv2N1HaVb6MpaC3YDue9hdwm3xOZsEPw0mtJftiMsWPP0iabwSDljYkKJ9V5fKZTStgc%2FzB%2F8EvSSm&X-Amz-Signature=a1ed12cd4cd58e55a9e8fb33eb473cc514221f04156c671034ff7416a6938b19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBTSKJDA%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214605Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDP6cmob8Wx3HvSin5YZmqA3uWav9QlmXTaXDDcEcl7oQIgRKDp5d92qs5lJjISlOUwfYcn82eylHZ2y0dFIpWlEXIqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ2Gn2Xfp6tU9dwtCSrcA60bOsIK%2BvOWdv03DJQ9czJhlKl2XZiptRroT1mQPLHS6RpFKZEcenf3zGV32BD4wmNKPBJLt9nnGYiv%2BJ%2F3i7RZYbGOERDw7%2FBhMhn2U58H8u%2Fcg1WoEnnaKHH1PoyZZb64xvGdg43S7GuWmbaiIFqmIU5oH97AF3ayQ%2BAifDTU983EUUWEtjAIuXUq9vEwM2olz5TAQjcbplwmCo%2Fy53qxBSGmbpAH2sRz5z8RemkbrL0GEOcZccZDmAY1ntje%2B9iHkSRFJAMVXt1nQeV5q%2B9Gybvtm2v2ifGAdVXZVAsTTC3063aUcVseQcCKIPartzWHeeeWJkVV2HhWCK%2FnRJaymNnbn0acNd7t6RjCxCRaYA2WmAEnjl3Q9Fe0spD5PgzEi0a6thJ%2BLzWTQKllmkvKdn2r3FEon6Q%2B7y1cI2sN%2By3Gs3TxBQrS8EEDhcYI7Z7LG2UTp7epiSYEF0tBkxVpwhX4VRQUnLNtHduW6gzD7BVdTGqda4kDzymeX2lcVhzWExuIq45hAN6mMn7mnjjW0ZZdI%2FtsbXxohhDQhROu83m2Q%2FWN1R6fWWdT19wBoiq4OtriAWdTtSvS7CnBNnavi6ZYjBrYcgF8u1iCNdWpV3kXiUoboGR2RoTAMM7KxM8GOqUBtY%2B%2Bqa9nfWkZqOx1vLCy%2Bx%2BDSpafPVVlBHbKdvOlS5MiEg%2FlDDVqm6sZnm%2BF5SSaFrcOquuD4%2FShu6egULcp%2F0uopeh01nvMztOvhqDL57sLCamGadh%2BCghDYNmaAvQXbon3o69SH1I8MEFRYcnb%2FryX54p%2BI1PEvsrAOxb9YxkaSxwJ0IIneDyKxLvKI1G%2Bppk89oTAw%2B1UcyRe6ZLsPp6rJ2fe&X-Amz-Signature=a7d822aa4066507b2a3475cde9bbed01c29f6235eb484d25316d36729485618e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYGOLPHR%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCO5VQpMzYD0TkICnFmNc3cIBZoxdqrt%2BEAgyzuO9PMnAIhAOjnpaa%2ByiCsWVHnli3lbfXFaEm5uevtRVykA55hSwRtKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxkwRuqbUNcOCD28DUq3AOSdrO%2FI379FF8REEbORg1Q4trd7dNS74McnxwjqAycJdjDE%2F01njKbhxbayajXfptE3HXTWCOZpau9Qfi2Z%2BDeOBgM3kaDvzkGzOyXpHMWLn68lDJ08LR4OLEkT5YSYnf8J%2BeRil65ewMECc2voGusEVaoG6HIWG49V9F1H4UWg3QW1mn0KrtxXsU0F21DXyVKH%2Bf4gfUwh4XLgQddJ7rRXB1BGNPaVfgyuygH6ZlqpyMxBamhln605l1C01QKsfakq%2BO%2BxZMrSyoXEK96SgbeUUHtGUGYzbxuAAyS3ADj3k1Kn6SCCAQeeanq2JQiAHfnfhSrh1RcMshD%2FdrSCsRlzIsjIyn7sd5fw5aUDug4wwZzEgrpRxsI8YiwvA5rLEQGb8QinsPbW0auXsvSS0J1cM8EZC9gxq9YG%2F8xMcu%2FumJjNlES%2FixOmoxN6Oh9iNECiA6N1fTIWf9pzXmpPrMg9JFEV2wKk0MUfPqy15stw3mOQYLf9y5PMX01dT%2Beit3XEmXFbJWaQS4mw2tU7SCvJ6o3X7bSglvyjp8iewqx5eKON4iRcfQyu2IOFATmwROK9hrQgjq%2FU3mZSEIxOrHQP4SrB%2BqcuLHw3fJ8Xg%2Biozs5jIF6F0JUNSBEQDDqsMTPBjqkAQcTVtBIixQeQK7S18as1hWBoNszHkd6PXvnAZjTE38St0%2FwxUnH2Oy4vPBeeyAOiBdfUvbwM1Au%2B1qYXGOqmMkiTFlOpJKBfWtTTp42Q5Y7xF6OcOnhO21GmWul36j8Y37Py%2Fsbm%2BByVQcbbB3EuuTX9BUJm3dbpUWA7QwE0SNBbJUbba%2Fs3%2BMb8BFxb%2B8wI3UV0%2Fx5grEIAgf4Xq3e%2F6ZUead6&X-Amz-Signature=b95ef19ca800ae189d24cabe70d9fac8618939a308d2f36a3b18c6bb295ec345&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYGOLPHR%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJIMEYCIQCO5VQpMzYD0TkICnFmNc3cIBZoxdqrt%2BEAgyzuO9PMnAIhAOjnpaa%2ByiCsWVHnli3lbfXFaEm5uevtRVykA55hSwRtKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxkwRuqbUNcOCD28DUq3AOSdrO%2FI379FF8REEbORg1Q4trd7dNS74McnxwjqAycJdjDE%2F01njKbhxbayajXfptE3HXTWCOZpau9Qfi2Z%2BDeOBgM3kaDvzkGzOyXpHMWLn68lDJ08LR4OLEkT5YSYnf8J%2BeRil65ewMECc2voGusEVaoG6HIWG49V9F1H4UWg3QW1mn0KrtxXsU0F21DXyVKH%2Bf4gfUwh4XLgQddJ7rRXB1BGNPaVfgyuygH6ZlqpyMxBamhln605l1C01QKsfakq%2BO%2BxZMrSyoXEK96SgbeUUHtGUGYzbxuAAyS3ADj3k1Kn6SCCAQeeanq2JQiAHfnfhSrh1RcMshD%2FdrSCsRlzIsjIyn7sd5fw5aUDug4wwZzEgrpRxsI8YiwvA5rLEQGb8QinsPbW0auXsvSS0J1cM8EZC9gxq9YG%2F8xMcu%2FumJjNlES%2FixOmoxN6Oh9iNECiA6N1fTIWf9pzXmpPrMg9JFEV2wKk0MUfPqy15stw3mOQYLf9y5PMX01dT%2Beit3XEmXFbJWaQS4mw2tU7SCvJ6o3X7bSglvyjp8iewqx5eKON4iRcfQyu2IOFATmwROK9hrQgjq%2FU3mZSEIxOrHQP4SrB%2BqcuLHw3fJ8Xg%2Biozs5jIF6F0JUNSBEQDDqsMTPBjqkAQcTVtBIixQeQK7S18as1hWBoNszHkd6PXvnAZjTE38St0%2FwxUnH2Oy4vPBeeyAOiBdfUvbwM1Au%2B1qYXGOqmMkiTFlOpJKBfWtTTp42Q5Y7xF6OcOnhO21GmWul36j8Y37Py%2Fsbm%2BByVQcbbB3EuuTX9BUJm3dbpUWA7QwE0SNBbJUbba%2Fs3%2BMb8BFxb%2B8wI3UV0%2Fx5grEIAgf4Xq3e%2F6ZUead6&X-Amz-Signature=b95ef19ca800ae189d24cabe70d9fac8618939a308d2f36a3b18c6bb295ec345&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5WIRMDK%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T214612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMiJHMEUCIQC5ep59gejbPGrc9ncH1c9nDlg3J0C8yy5uESt4STJxmgIgbLNHPY9IEABNz1W876RgJWY4Cx%2Fj%2FIwAFhiCzpP1Mb8qiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG09CNRH2AvykgGX5SrcA%2BzVLI19iJuahg7oRY175Tc4O2nrXGNNde4UaBa79jTAySRl8nWYE6Aud3gsiFQhPVpHarlBmg9ojqak1QbkN%2FW3u0V2DpN2n6ub%2BEkh7PBkRf8vJFViY6kKuoVFAd4eXd75LxfWESBMmvdPCHYn%2BkjkszyFT6f1s4dmkTR0VZJ6xkliflCcOjoa4IS9gww5Xe6kNVFN%2FTzTI3DIKfdhA%2BT90IQN042t8sxPqG5yHg7ryJZYb0pD20pxuNAJ39tR1e7jZOZIkExzNu7AAnXH5zQna0s7DM%2BcOsYUXZ6zxTK6lw%2BAS93LqZGo%2BsP%2F%2FV%2F9VPlncPXIpw1MbZYRuef6JKhejtOmoS1nC%2FV1PU9kAtnxJsqIi3YuvyFXHr6vfTiNGlm7Fji6URLcRtfV9sQ2yuXj2QPQk8x8yuHeNp42xBcoDGqANQdskTajX2cdiz4x2dbUxDEig%2BKJj9P%2Fjio8MsQGvqNYiOwnSguDuGX2ZuJwWNDyQNF1yfrrFWUX0tX72%2Bwxk2lu1yZhCquHa43T0ACiMvnE8RNDhHv4X4CmGNP%2FFQ27yrZgrnMzsT6YrYxifDFnQ83KDrBqepiBj2mmd6PzS%2Fcpb3bvJtRzDAEfisoRTCzAhCgGVFVnSPnrMIeyxM8GOqUBM9MzyAFzo8Cc7kBHwce5Y8omqG6dKy3pPA0EEgwzfdJpACO3PBjhyzQLdLIgFhFmVz%2FW9Y6U3RpCtGeMwFFH9LzMIVmxEV6KuLKYd64OJ%2BZeFUtPBAomHtC9jMArMcZs7TKW3U4ik8GbB36HHQwpiD1MJD2qlbWOFGNGRj6plNNNYAjSs0v9U4E%2BVey3LUbsnrYUd%2FbMIaokdot8uUFSbpEqUIXB&X-Amz-Signature=79b87f53e4bae1c2482a7ec2cbca0776ecb56a375068e7d980885a69e0536c92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

