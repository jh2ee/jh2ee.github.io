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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQJUDEQI%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIHcdfwXDid%2F8JTCtv8iyAhGdesIuqnLDFHTwirL%2BR%2BW7AiEAq%2FA%2BkCANBpt8F9AxMeQ4dci7H3fF0asHRlUHDX2ufNUqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLxGVnOqDQNJfqEKwircA%2FyJEoNs%2FYMCHL3koX131gBOtsBq4yEagUd3hITVkrhMektKanC2jwIr0TdzQwsgTB01fMD%2B418OkkvJyOy6slpl64KnBCsCVsnkywp4E0nIT1ft4qJnfcQmXPGC9e7AXw9DmewNERVoPeVm1TXwayTFTGvhgvEdhkuYnEFza26bUQetJE6LK%2Fx2SRi33PRSxXY30f16EPhJjwi1RtroXHVDsKWt5hRK1qo%2F%2BTWJtFrIK%2B313qEe3x4RMSBj2c5WZ%2FwNYtuu1gZeY%2FJ3mXaEGsvUpwPWcTOyw0%2BJnEx4q5VMTav%2FGvZCOzTpk%2BhC9SM2ft8LSOZvGgvCHIdYAgUpT26xx7%2B6SEqzRuWnxJgujpN8F00oQKckDgxcZ1jGx4pIRfjP0wbUMxAzQfdjy3dFp4pdgLkkfr4wiC%2FsUoGd%2BMiWTWNhnwLJLFl7PNbSG0JQ5hwqAAJqduV9XSxhrxBRBxjyzPZi6IQXgKQ%2FmA%2FOVw2rIyuhJpgYyL1Cr2xajalkkUOYk9c29EGVmZfzh9dKNu6GUzNRrxKEC7m8FP9mbp5Hb1s7zOEbrHq05%2BY%2FMPWlfqEcPaiEUWpzAupsod0mnYbg0ZJ2WsA8jO5GyJgrs9M3zaqzShbrliuWh0NmMJ%2BKwM8GOqUBgw4o0VVyFaYABjWJnYa%2FChcY5JyvBKZ4qFs25yTLg4ARyf7cjgbvAgYSc95jq2N2uCzmwuM44xdR9JvAcEHrRKVhAtBrsUVmKiXZT74xJ7swTneFIOWb0pHwgqSZQS81fDdJyYpw8vkCT3IuE3XcRv3Axa6LPuWOsPeuqwdF3xfgiKpOFOQSOAgFBTlk9RGsWVsLuyisjCYwzXuYrkw1IjRe4Av1&X-Amz-Signature=ae6654e0f4827d8104e10b6c438f7f6a9623ddcd13f2c22014b0406f16fba5a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQJUDEQI%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIHcdfwXDid%2F8JTCtv8iyAhGdesIuqnLDFHTwirL%2BR%2BW7AiEAq%2FA%2BkCANBpt8F9AxMeQ4dci7H3fF0asHRlUHDX2ufNUqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLxGVnOqDQNJfqEKwircA%2FyJEoNs%2FYMCHL3koX131gBOtsBq4yEagUd3hITVkrhMektKanC2jwIr0TdzQwsgTB01fMD%2B418OkkvJyOy6slpl64KnBCsCVsnkywp4E0nIT1ft4qJnfcQmXPGC9e7AXw9DmewNERVoPeVm1TXwayTFTGvhgvEdhkuYnEFza26bUQetJE6LK%2Fx2SRi33PRSxXY30f16EPhJjwi1RtroXHVDsKWt5hRK1qo%2F%2BTWJtFrIK%2B313qEe3x4RMSBj2c5WZ%2FwNYtuu1gZeY%2FJ3mXaEGsvUpwPWcTOyw0%2BJnEx4q5VMTav%2FGvZCOzTpk%2BhC9SM2ft8LSOZvGgvCHIdYAgUpT26xx7%2B6SEqzRuWnxJgujpN8F00oQKckDgxcZ1jGx4pIRfjP0wbUMxAzQfdjy3dFp4pdgLkkfr4wiC%2FsUoGd%2BMiWTWNhnwLJLFl7PNbSG0JQ5hwqAAJqduV9XSxhrxBRBxjyzPZi6IQXgKQ%2FmA%2FOVw2rIyuhJpgYyL1Cr2xajalkkUOYk9c29EGVmZfzh9dKNu6GUzNRrxKEC7m8FP9mbp5Hb1s7zOEbrHq05%2BY%2FMPWlfqEcPaiEUWpzAupsod0mnYbg0ZJ2WsA8jO5GyJgrs9M3zaqzShbrliuWh0NmMJ%2BKwM8GOqUBgw4o0VVyFaYABjWJnYa%2FChcY5JyvBKZ4qFs25yTLg4ARyf7cjgbvAgYSc95jq2N2uCzmwuM44xdR9JvAcEHrRKVhAtBrsUVmKiXZT74xJ7swTneFIOWb0pHwgqSZQS81fDdJyYpw8vkCT3IuE3XcRv3Axa6LPuWOsPeuqwdF3xfgiKpOFOQSOAgFBTlk9RGsWVsLuyisjCYwzXuYrkw1IjRe4Av1&X-Amz-Signature=ae6654e0f4827d8104e10b6c438f7f6a9623ddcd13f2c22014b0406f16fba5a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ML3FWCO%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCkHB2J4Vj04cgvmwjjrgy4fKXiZcR0AecYCHWt%2FKoJwgIgO6zq%2FFV7qKUmQYEIMCpTKU%2FPzwqWYyc5Q5tk7GfbOpwqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGIwN4cRDSUjuMl%2BESrcA4OWLwEsK4VmvO6dbdlt9w9rHC%2B9ZTR4jyKw6WdjzzeAQyq3sCm40hnsTZMy6qWuWCtTePCTKD0EDTJ91GOyLO4e%2B6O2A1NDARPyQJ%2F8Q%2B6g5kGkTA9H6YJVXNKaswNOVoIn%2FJaZyrIil0nzYIe113K3BxBh%2B0oW%2FnAkNv0weG7ZvWvk8iX3OlXObrulHZ%2FTApTt8jl1lbWSGdut9ege3R6Z7R3xlEcwS%2FDWXe%2BcAPecYKYlb%2B9ffzzGXTK677XQB4Mc3ldfeslrmzCrT15%2FRbRFgKaEwAESfOt3QxB9MATJZNdZf5H4ZreRIegVvlI4oI8kbMk1FagDCJ0JETCwAhnPFrmvgsOM%2BZBE%2ByjMRdwDXZGJ0t6sFa%2FePilongaL68Kbamxh%2BUJXq2V6MsoX91St72mKJXfQep7k70E6aWwx0QFpg080sUPMwYR5%2FDimEwJm9ZaOOafa8KF%2FOM%2FRCB8%2FfvXVgZZpFN4EpoYnzo9L15G8KHW404ns%2FXLXqYl3Jt1u17qxxWhoH1J%2Fj749fmtXnFQcmIDV0Uoa%2FhQrhUzgUmjlc%2FscLg%2F52LaPStXGu3i3h8a9bMF2VCmjJ9LnRkGeDWHxpfMIZaTmaqz68Fsvz1AWWwBlFlcVPDFUMLCKwM8GOqUBwc%2BhN4JK5NrVOe58k5BikJWMGeYkEAP1U66pubd1lFu9pcnJOPCtEmxuoCqJqvDbiH0YngwSmk8d9aGSM47WXvhtqWDkarZdtBzkqj%2FytNQTbTglGV0jSzn%2FUPXgSmzLbAZ4dByrvyvW4ceDkJFFWkPlYOb0LIVAhIehdrqJ3h9%2BwElzlUM1BArfL2RciB18cCNew%2FDo6VtILmhcqj4cUA6chifH&X-Amz-Signature=d506ccc4ffea6fabf06d596482ad6e7362ef57b49279c3c7ee868e1b080be662&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHHDAD2G%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCviYt3x0yh3B14P4IGGif%2FoU83UXIDwNxz8jQ0iy%2BjRAIhAPzZU2DDhvsE4%2FZ8V7hHR8jvCHlY9AeZnMN%2Bdi70fkuSKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzDhh5HBhhtseGRIPEq3APOYXQltNj%2FZxNihmsgzvsVZ1QUXKcnpsNcqXk4h5sQZkwsq%2BzCj9c3Pwyw31TJvAUl%2FIeu3Buill2JcjrYVUwYM%2Fbml7sKH2Y%2FSYjhyYc6rmdtL%2FXc5oRbfr49VnoEE4SbTBVXilj9ObyPpe5Sziqo2z8tu38LgxBm2%2Bkkk5Uva9g8emEfrIkfZt8v%2FW4AfsvXQfDDoHGQyVQbzas7ztkQw0gRNA%2ByNYRjJV0x%2FxJsyVaPgGUkuM%2FL5G9emag6ctKtgbkwxFMoPECc2zA%2B%2BnTF08x1Z0Aet1QzOp13pILeW2bk2fcqvvr%2F%2F%2Bj5DxjgWh3bJCd7S4ZzWEhyBds84jJCHewHuLJ2iINga2C9VLUpDXAS7mpOEIEhwp4mC1Y6tvog3r5gBS1Myj1JMCY69ufTd%2B9h%2FOMrB%2FxKUpZ6UqdMNRbzIq%2BUKXCgHxKraqsx19DkjG3YBjC3AEOpZaep3CPtmHbiNNjbgsl%2FlwkziJvC5%2BbUKjSoP3uLN4iT9ZHnkZ%2BlRSORQtFSmp0NR6XZdHDQ8esPFR9OTy7u6IzioWVGmFXPXvzU6BDOU2lMdQOUX3GkuHiLo%2ByPnChMrYGEkptk7ljSOJXsfBhhwyUI0pGGOAI6trk2D%2BLDzxpDbjD5icDPBjqkAf6sbTfF53vk4j3Pm8jCgoIRL%2BYipFtwAA51o%2BFfQ%2FYb5C0Cdfqpm91OLgWM51S7AtLEaznMaANx5KnDPthZZBGYeZiIsK7WPbonnEqeUI2s5lEVAooAd%2Fl69umcXbZMwafWQUSE2LKDjGG%2B4RJZDeMF7lKtu%2F6cgLIQiqP2tRqHE6WWBIdP795T2gdTMX3aTFvgV77ZVD%2Fw5xk6qRdKJ7KPJQCu&X-Amz-Signature=662bb1495503cfc312ea45c778e20f0b349ff7129116f03489462fe833ad4c4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHHDAD2G%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQCviYt3x0yh3B14P4IGGif%2FoU83UXIDwNxz8jQ0iy%2BjRAIhAPzZU2DDhvsE4%2FZ8V7hHR8jvCHlY9AeZnMN%2Bdi70fkuSKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzDhh5HBhhtseGRIPEq3APOYXQltNj%2FZxNihmsgzvsVZ1QUXKcnpsNcqXk4h5sQZkwsq%2BzCj9c3Pwyw31TJvAUl%2FIeu3Buill2JcjrYVUwYM%2Fbml7sKH2Y%2FSYjhyYc6rmdtL%2FXc5oRbfr49VnoEE4SbTBVXilj9ObyPpe5Sziqo2z8tu38LgxBm2%2Bkkk5Uva9g8emEfrIkfZt8v%2FW4AfsvXQfDDoHGQyVQbzas7ztkQw0gRNA%2ByNYRjJV0x%2FxJsyVaPgGUkuM%2FL5G9emag6ctKtgbkwxFMoPECc2zA%2B%2BnTF08x1Z0Aet1QzOp13pILeW2bk2fcqvvr%2F%2F%2Bj5DxjgWh3bJCd7S4ZzWEhyBds84jJCHewHuLJ2iINga2C9VLUpDXAS7mpOEIEhwp4mC1Y6tvog3r5gBS1Myj1JMCY69ufTd%2B9h%2FOMrB%2FxKUpZ6UqdMNRbzIq%2BUKXCgHxKraqsx19DkjG3YBjC3AEOpZaep3CPtmHbiNNjbgsl%2FlwkziJvC5%2BbUKjSoP3uLN4iT9ZHnkZ%2BlRSORQtFSmp0NR6XZdHDQ8esPFR9OTy7u6IzioWVGmFXPXvzU6BDOU2lMdQOUX3GkuHiLo%2ByPnChMrYGEkptk7ljSOJXsfBhhwyUI0pGGOAI6trk2D%2BLDzxpDbjD5icDPBjqkAf6sbTfF53vk4j3Pm8jCgoIRL%2BYipFtwAA51o%2BFfQ%2FYb5C0Cdfqpm91OLgWM51S7AtLEaznMaANx5KnDPthZZBGYeZiIsK7WPbonnEqeUI2s5lEVAooAd%2Fl69umcXbZMwafWQUSE2LKDjGG%2B4RJZDeMF7lKtu%2F6cgLIQiqP2tRqHE6WWBIdP795T2gdTMX3aTFvgV77ZVD%2Fw5xk6qRdKJ7KPJQCu&X-Amz-Signature=743d94fe08464818c0c0b6ef93cddfa150dd77fa31f4f955f1ab3905fa16802e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGUJKWJU%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDYcyVri38FSmZsxZNKgdlyprcJll3tvYzhOgRWFkE3BwIhAPrinNSUJ9yrVb8xieJCzh5E7%2Fg%2F%2B937dXXfVQWatuoZKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwCMuHrz7k9WavMpB0q3APq3uO44W8wh1GlwquDxCabkQzA6CbhgeCk53OZowdxIk5BiYcF0SUfHChux02pQc8K%2FFklUGIYkRuEJ%2B7vwvByfD5JIExZbrQ1ieCvpBbY1f3tf4ah2XvKcYltipqKeTZXbEyj8oHTawboxEXbzGd2%2FQHv5tPGTrxyY0mc4LYtMqCV5czZbWFMfBEGsD1PeA1JUviWwSLJMHApHx2T63NGs7mibVhy2mwTLFvrzXzrzewymB%2F1UMFaQFYmSVGPf8BHARUQJKqk3B7TNmrJVA4%2Bjo%2B1RVjiIvxL9Kx6rWpTF%2BT7H9oIYombD7uyeOajeU9wcP204955hoTqyd0pb3HOpb3sb7HqqYpcnZ8srssQZaOCP355WsTtX8HHD2%2BJ0fLxbLOfLLN4SWar64iV64QiyhGdC0lOIDVuiKng%2B7kQHiTE%2FgvWw0D4Umcf6dVTxcEfuqkQg36oTvgIZxKHDMl4Ju4a2GOXxgaNK623o1gFTNId3LHZQGI8JzI40hx%2BmOLDgzg7jzyZL0wIF1X3BDI09LSXk46GJKJxlVxex67ol2R4Tq644z054zamc5a5%2F3huQO6%2FZQhZQAY5S3tJPSEk0scfP%2FkjsIAmsMaJ13kG7REV5mP%2F9HlOaSCEZDDAisDPBjqkAfhZdu16FiAzAqVRufXrIa%2BYSKordAfy4m%2FMbjj%2FnKg4yrsaETSJI4enCfO6Dj%2FXARzP1oXArcnPL6wJsLMCKy6%2Bs1jEk%2B3CgY8teD4XYxsV0gxvDXl496LAoMDHSghgwkY4Zn%2FG69OjdsIItTPc7s5XNN5IHWl9EMfTeYxweyA1Z0lZ8x%2BBVwSyBwSp5QB4xQFDOmEHUszEEFvrdxidPme%2FQSk5&X-Amz-Signature=196b4c67bf48fa2eb898ecfe8420ba861edfa42551f7b97580c3203663e92fa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2NQBEA4%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDXf%2FkCgV4js8p1avrU0xnbR60TLMql0QJdn5960qltJgIhAJyTVTwABFzSyvYmv8oDEHf0kw0PeVTMggwjt3k9H0p7KogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxVp93KD16CJyy7L8sq3ANtzK0m1XIjQG%2BMCoS12a0lNE3%2BvlgCkm2S317HyMvtK9Yz4Z3eh9%2FcrjcCtChXKZCV5wBbf2U2Rf2eTqPOrAeJkWYS6uMOiErwtmfJyaXsKEHA7aEqpBsGlk0VLw%2FbMNk7w%2F8S5cmjYKSWHfqO53Dhjy6w4Fn1EVOdO09lnuxGDBcHK5IK56iSCIRKlErYEgj3c1MpcgO07rFTEckl3bDqbqFC6RxFbQNvf7y8taVFAZpluIfIZQjGVmko%2B63p9WD1aAGA5%2BglDVCEgBejcr3AED8sTx5p%2FjtBewhfL2xIfgjMWu1MY2su%2FB9MIyAlyjARNpG8peEJo4VCQBaWER3OAw1AVtV84R5BWZTeh1gYtK7ezFj8GXKjlNKKwDVKEPMVDZ%2Bqb6h3o4zb1K9Fl4UCIUuAjDTIvM9IHztt42xI865kHmKH6WoXBIsSedPkywQN0qSWnzTcGgRNnFSLYQf1LgiyjAmpe4MrVoNRqYz23jf3GmhGeVDWb1SrF8yMFV4CcgK1wchTCNzGPncoMiCIKfUyY5U2%2Fsd0rIr1tTOMV55RwNQChv6GNobQ2CqNoP4NgOSsxmb0rbE2oB2bzYzGmcq5wNyXs0r8ztSBeGUhvm2hfx0Aa6%2BLyJphAjDJjMDPBjqkAakq%2FzjvJwitZ2pNoKh6wQycQOiYcKVJi9fM8dAr4qH6cNpH09dDSEsopdN2ufqLEUuA1rKV8nUWDJ8l%2BRUorraukFBeI6lkBC0ddPOSYu4UchQfFWjqCXvLekdgCgvzc47c5sLHV5v3wEuUNPFqc43Yjq3PH%2FGi7MXSxkemQUNXkKByJVDTPcnDNUYOYpRyclEdZxjZmSmNPzeZWlh0DHcLSj%2Fp&X-Amz-Signature=8f65f5b787e8da9ba1300213163e38232587fbbf69d385bc6728e75a8e562586&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7GFCWLF%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDOoMu2I1X4gGfYcqEHjfdu%2Bwk9d8%2BaglcqSNT8%2BmaXlwIgImUbg6WPqBY3T1zETn11iKjc0u9hH2%2Bx%2BahstJe05DkqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOjBiw7Wfa%2FPYrN8NircA9S%2Fdkz%2FCf45mJjv2dczSPFg6aA3B8DiSUtBx8%2Ba8u4SFsGc92xn8Br9SX9vRhCSXn3mePjopQRFUKCEH6iX882PJ8C987qeCSygtZs7Q37%2FppdzX3cPGMa1ysCXz1JpXbwbDRgOi8a62qdj0lsmufV1TXqQ79woqcplWeBbS1dbTOdzTFzEXpOD%2FLrf47YKWHPpdjuIDL0NGOR2mVCztiZWPZERZ0omDZl2nYeMwGRsaURk%2Bb8Yaedl%2BIapPcY2FGNmTk4MW%2F%2Fmp1AzeE1SpRxsk2G2TZILYr%2BiZrJL3ZhGfSz4ALVwxOy8rv81ewqz1pC%2FQYbN4cWG9wXaKxnOKAjlA3DRkvgFixMcsNDe9wQewbNguPRxpSBfKEbuSGGOGqB55CRLxRbc3WkHR3CgJIhdJB6v%2FE85jyY5PJyE1dCOxLp0NwY2zpj6q1olvWRjx50ybtUKHuyjibomBe1ve3cCb%2By3Pp7%2FQlKoJIrsygrPmH6YxRq%2Bmh%2BzJGImA5hcPrpxKzBIHK5aJivnbb0ezZSPoSanMhr7IuvZBOwF9SGX6TPSmno6Kz%2FOThhKUB1cOo7kwrzEyU9fNZpR2vNaMbrip%2FgI92jAIusZ2WezXNXS1vd%2BTR1km9RBxv3zMJ6KwM8GOqUBYfTNuVMG5EcB99uWrs%2FBmiNqZj1nZmPXQVfKjWkJjG0ec560QzTU3uAmJGZw%2FSd2S%2F12XuRPEbdX8HVyKaeCW88NJeIUXJ7sq70%2BEC1%2FS5m5jzolfLkg4sGcsLn4At5tepuHG%2BF7o2VVKQya%2Bs07%2BlO7eG5IVs2hfFUB3zkZpZIjXi4iFi4Tzkx4fF1JrAMSnFz845XzU4XEjFbHL1e78J7bBpqX&X-Amz-Signature=d6120f0d87c1a34ec28f277a5f1d936a4af49a9bf030ef3dafea35e86726eb42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZ3HHRNO%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQC6kI1AwUneaayUpU476ETpUZ7jfFLDe825n5dj%2FTbBwgIhAPhzZiry7yykDuL3ctfrr%2FORzTn%2FNgTtmBIfEeaItLaIKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDrcGr6fKCDoTYeEQq3APVZqMVQk1xkjIy6Ew8FUYspN4Y%2F0aZf3F3WnXsucAmuY6twRg5PnF4Y71V4J4d81gYoBt%2FOUjhh9tNs5lZSlRtD16F9GYbagqMSUfp09S4GM1oQGsdHh4fZdXwYs4GRJWuO2Ae%2BdlhjRQAOUc8rpwSDtRdWx8zY8veEI%2FRyFXORcCLMixdBcu%2FRTc5SfqKbtit6ZELBTQ8meeZvhPjwB541LVgO2XCledq2Z%2FHDVIjmCNWiGpiDQFEb%2B39U9H6dsP%2B01WmMgBhnIy2AAHFBKJ1cr7a6zAtw6M%2BIeJ2PDsDD6i%2B%2BvgXA4UygqTSCESRZxjA0QTxL66OiBRlNDcNJ0OPwf0eGfr5h3ABbH7h4BkSlPsJK910WqYudTIB6danrpY851NOlPztewL1xrKHluZiH85H7tJarrFwN54ojJVezo%2Bdzd7inrS8nIzpo6z3fUau5OaQ3DJsIGAyOLXMZIbcUl%2B8%2Bk%2FodCUsKm8h2NQcvL7Z1yTgftliH0IWVCJSpnJqff6nQ%2BRnC1uatrliiK9LaX6re6%2BweiGgfM3O2%2Fo0mwdsdMz%2FxwuEeFlp15LSbEiSgpfUA%2FGZQ2b5YZlPNJjWFry5Jgzp7gHlmXMkvHbIupRufWRgdMjwpX7oCDDQi8DPBjqkAQxepjkQjlwZhL9MiuAChlYk3Qh%2F4X%2B%2FBx6pasddAdALzaDTSzHfou4jdhLnnlGzmcT%2Bl0jPZOk%2FgsTGnCZX%2BxdpW4tiOyPxj5BXuKCZEJH9qRF5oBSi4WR%2B7pyYspIiIzpkvuDAOAJpRDnOBuiNhUk8d6CMG%2B8hd1KbveTG2xixWvUw8FzXScWh9vdl7SQLYQ26SURvNpZvwtqPLoK8W4BdNEjY&X-Amz-Signature=1f4a14df4f8403e3dd0579757634a4dd461012d371e55c0fd72b723233a3e755&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZ3HHRNO%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQC6kI1AwUneaayUpU476ETpUZ7jfFLDe825n5dj%2FTbBwgIhAPhzZiry7yykDuL3ctfrr%2FORzTn%2FNgTtmBIfEeaItLaIKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDrcGr6fKCDoTYeEQq3APVZqMVQk1xkjIy6Ew8FUYspN4Y%2F0aZf3F3WnXsucAmuY6twRg5PnF4Y71V4J4d81gYoBt%2FOUjhh9tNs5lZSlRtD16F9GYbagqMSUfp09S4GM1oQGsdHh4fZdXwYs4GRJWuO2Ae%2BdlhjRQAOUc8rpwSDtRdWx8zY8veEI%2FRyFXORcCLMixdBcu%2FRTc5SfqKbtit6ZELBTQ8meeZvhPjwB541LVgO2XCledq2Z%2FHDVIjmCNWiGpiDQFEb%2B39U9H6dsP%2B01WmMgBhnIy2AAHFBKJ1cr7a6zAtw6M%2BIeJ2PDsDD6i%2B%2BvgXA4UygqTSCESRZxjA0QTxL66OiBRlNDcNJ0OPwf0eGfr5h3ABbH7h4BkSlPsJK910WqYudTIB6danrpY851NOlPztewL1xrKHluZiH85H7tJarrFwN54ojJVezo%2Bdzd7inrS8nIzpo6z3fUau5OaQ3DJsIGAyOLXMZIbcUl%2B8%2Bk%2FodCUsKm8h2NQcvL7Z1yTgftliH0IWVCJSpnJqff6nQ%2BRnC1uatrliiK9LaX6re6%2BweiGgfM3O2%2Fo0mwdsdMz%2FxwuEeFlp15LSbEiSgpfUA%2FGZQ2b5YZlPNJjWFry5Jgzp7gHlmXMkvHbIupRufWRgdMjwpX7oCDDQi8DPBjqkAQxepjkQjlwZhL9MiuAChlYk3Qh%2F4X%2B%2FBx6pasddAdALzaDTSzHfou4jdhLnnlGzmcT%2Bl0jPZOk%2FgsTGnCZX%2BxdpW4tiOyPxj5BXuKCZEJH9qRF5oBSi4WR%2B7pyYspIiIzpkvuDAOAJpRDnOBuiNhUk8d6CMG%2B8hd1KbveTG2xixWvUw8FzXScWh9vdl7SQLYQ26SURvNpZvwtqPLoK8W4BdNEjY&X-Amz-Signature=87868ed005ec5ca40f48e4c6c9c94fcfa9b3924a0341ff20e9bce241a8b27573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2GMWAYX%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIHfnmuz3TnY6jN7vo49OLP9fMIfa%2FfzWJLOolLmnjtSLAiAwVM5v23cxZSHNUzfYRilsDB3KRkwAmROHx4cd6DiqayqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BRkXs6%2Fvakptm52wKtwD1cmFI%2BmjFbSLxuI4eEW2YxdaH8lVrxGh6splR5aLJAnf67Y8aboU%2FakELAnwUxu11szq1YyKU8UecDRaSwbSyqXo3zc%2FKPFrq2UTj9XLMIW6QH4o294ZelrrBgXUaExe4zo5zWURVQlndnbfNf7T%2BLRy1NaFvzGbfeq%2BsYUw%2FylPwoCZkN43bwxJ2rr1HxV6Y%2B6YbBTUwtS4%2FFRyq%2BI%2FtXYTs15GknfGsTmtV6g%2FdGbNWJZNVuWUOoxzOhk6kNqQJHU67Y1VUg1NpdP6vPaxB%2BzdHGCnAe1frUYrP4ZOC1ArPrzILvz%2BksJGx2NGbwYdZgY7o2oTja1S%2Bs0wX%2FNmF6g1CrVSBad8clnlS0qwQMuZz1RM%2Bbe7LNCzAz6J%2FXtBX89lPs5bbgQoC4Jb3K7sJsGoD61NVllMm0F2tez%2B%2FRuddUzzKur8B9Xt22BR9svn1ub0tfI4WHfY7%2FBLxeHQBHCGbmy7%2B%2BB6leDX7aNiKyzBV4yY%2F4%2FuY%2B6ywg42iqp2kNDqogwKJFzsPyHET4vi4433PEPQAF%2FD4uA6SH7v9%2Bf3iOjiWQegyrvaS1tTG%2BFVqtkfQNDDSwv7mczSSs0DkNSyxdZ%2FlEcjD7Jby0W%2B3ilyrWYZ%2FkyUWP2PQYAwlozAzwY6pgG1XmNwtwO%2BRCl92KWuvwcnyY5JXA361AuyBosUb0I4oQh59oLeDeWxVeo0HYVKRbdDe9vhs%2FUrQ2MwxlFMExDJlhC7YgAK9VbE8h7e7D0YagjogbXUHh9BPTyQjuLzRA7kuvQHHMjeGVsWzD2UWfPmJYhbO%2FeTQh26oacakCawM2FuveZpBmQ1b4rPUuVdhdBbvRarX74o3QI35DeZoUvWdzNCTm7t&X-Amz-Signature=fe66f3a4681af03553966d572f58324cdda1d99026283bbd3e6e5fbeb0c7ddcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C7V25XK%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDSukDxA3IFoaxkbWOCPPAvLJxCs2A92cWjY6hzn27sQAIgcWnxCRX2F9SVPwtCffXtLjiJUSVViLs46zVTBSiwaXwqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLzQsy5NuXlEaJGDOyrcA43yK8s9NOpTr2A%2BQfegW448sV3Wgpt5cRIHKQbqHGhfD%2BiOezQDvqH65pWpGiAy0pp%2Bk5w9S9zb8lgTOuFAHnnQ2s9gaqfMMSP404%2F6lzND3J3LgLN8gLkVcIJjOEm8JrWXBtpHskThNf7Jc%2B82G62O5KcbEZjoSy8XCaTzZIwxdov0h7lSWqN4R4n13yqM1zipad3bG9OL17WCBoEFSVRC4klT4FHITAxxxcAXlqYIEsiDtBgP3P5YnfG0BceVkYGUMfoo%2BVhUDFtgiJ9dhqXXk9y%2F3NG%2BmTkh%2Fg4APt8rqLYwGp52SyezZm4NV1jXGsOTPidhGcukGHy2GmrfYr13j%2FwJrvyuNdCE6zxSxrDJ1dU%2FZ7Gu6YgUCa0UBNUakaddHKND9I0TJ2q1Cs%2Fe%2B7xeBt%2Fvg2q0CFNbNo6ogNjqO9r15M2EMCpVxlndcy6decca2waLQQwLEERUhy5wPgs2HFiXJtUjAY90Vc3YVTrfprjNwK5203YydoNMeoA0urm5FwIxaynJdixs%2FjGeyCNhBpPVQjdO%2FYBSHXnY4%2B7VPvjHRizZRUpCqq8H%2BlosOaX4wdzLjsfIUwc6QsFffeC4a2SVO4mjLzOC78Osm%2FOJUgk4IouQsT56Wv4LMMeJwM8GOqUBJp5E9UD1WBuyhKWBY3%2FhF%2F0C60BlPh3ZwK0ZzCI3c2wf6PVXtC1TPFNADE3gj3Ztiiv2jzt5TWYfNQG4wsQ8L5cKNoZ0IvOBmiKP24wF%2BuuSy%2BIKRfJu92wKRxUX8u34LcwHfWIFIRA7vyjhmCNq%2FiLon1eb0YvPgYKCqgeuxMZitA9TxuYARUD5ZiHH8OLxbHJH%2B9i6yE%2BsRGRV11Vs9c%2BsOQ6R&X-Amz-Signature=1f78e1660523b542ce16cbfe7ef3516da88de14cc2bed0859a39963cb26bc752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665C7V25XK%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDSukDxA3IFoaxkbWOCPPAvLJxCs2A92cWjY6hzn27sQAIgcWnxCRX2F9SVPwtCffXtLjiJUSVViLs46zVTBSiwaXwqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLzQsy5NuXlEaJGDOyrcA43yK8s9NOpTr2A%2BQfegW448sV3Wgpt5cRIHKQbqHGhfD%2BiOezQDvqH65pWpGiAy0pp%2Bk5w9S9zb8lgTOuFAHnnQ2s9gaqfMMSP404%2F6lzND3J3LgLN8gLkVcIJjOEm8JrWXBtpHskThNf7Jc%2B82G62O5KcbEZjoSy8XCaTzZIwxdov0h7lSWqN4R4n13yqM1zipad3bG9OL17WCBoEFSVRC4klT4FHITAxxxcAXlqYIEsiDtBgP3P5YnfG0BceVkYGUMfoo%2BVhUDFtgiJ9dhqXXk9y%2F3NG%2BmTkh%2Fg4APt8rqLYwGp52SyezZm4NV1jXGsOTPidhGcukGHy2GmrfYr13j%2FwJrvyuNdCE6zxSxrDJ1dU%2FZ7Gu6YgUCa0UBNUakaddHKND9I0TJ2q1Cs%2Fe%2B7xeBt%2Fvg2q0CFNbNo6ogNjqO9r15M2EMCpVxlndcy6decca2waLQQwLEERUhy5wPgs2HFiXJtUjAY90Vc3YVTrfprjNwK5203YydoNMeoA0urm5FwIxaynJdixs%2FjGeyCNhBpPVQjdO%2FYBSHXnY4%2B7VPvjHRizZRUpCqq8H%2BlosOaX4wdzLjsfIUwc6QsFffeC4a2SVO4mjLzOC78Osm%2FOJUgk4IouQsT56Wv4LMMeJwM8GOqUBJp5E9UD1WBuyhKWBY3%2FhF%2F0C60BlPh3ZwK0ZzCI3c2wf6PVXtC1TPFNADE3gj3Ztiiv2jzt5TWYfNQG4wsQ8L5cKNoZ0IvOBmiKP24wF%2BuuSy%2BIKRfJu92wKRxUX8u34LcwHfWIFIRA7vyjhmCNq%2FiLon1eb0YvPgYKCqgeuxMZitA9TxuYARUD5ZiHH8OLxbHJH%2B9i6yE%2BsRGRV11Vs9c%2BsOQ6R&X-Amz-Signature=1f78e1660523b542ce16cbfe7ef3516da88de14cc2bed0859a39963cb26bc752&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTAWHFTR%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T012431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCUzuqggxunmSVxWqszzJztTomR4lgjHVWHgR2P2AND4gIgSizgT2TDBBx4HtTtRJLu%2BaKiWF5M3NkNl7AuW2cgX8UqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEwi2XnX2%2BPDspBL9yrcA0k98tI391aZww9M2bP9yfa2e71TJiWlTuTFQ3qvFS67AA5zpJJSE84BRdogHQ203a%2FduSCe4o2xFa%2B%2BH%2Faq075P28dBNp%2FCQ2tbdk6NZSjkXb%2BeRIPJYGQgIkNEcrnSykTgKPon5J4vngGWYkP9RqQU%2Bv0IQsYjCKxb%2B2ufKbrP8djzTQprBX2x6h%2FbSeMUPiwLOgztYxZaw0k%2FbBg8UXhxp4s7hGLvpBmpINptz6YIQc7nfJUPmsZdqdAcT3asVe9uLvEkrgYQB%2FzOp%2BkU9kFatuRWdmCymtYYBZUDWAHevs7XaisUmLlF%2B2MNvG2pj8wSfEIyE0rMnOHOohyh37OY4Sr3M2%2BzRA7JVKW6P1OlK86m6NjcqifVSu71sZBc3%2F%2BjKU9qJMO%2F5l5lcvY%2BdpKHVN27uGB%2F2Uo4K9QuHei42tsgRBk47uWTh0fBjzUdSOQ1l4aSwBCR6I6%2F7OdopYjjW3BpiSdfeSfzg8saWaOM6RwMtONuBNcvi0lfTi8CBqJI6FhkQ%2F7dYbLiUBQ%2BWmUOUhEXy%2BheOrFdw5ncdKUgczf2HPQ4FVRDVSvnArj9W6Mg2zbWsS2pTqokp3sXErYCEc5pJoNMx0Xt3WRaikjZ4rltjjSxEU9Xqs39ML%2BKwM8GOqUBktj26HkH685riWhvYsetQaH2NHpE4JdIZXb4uei5N2VJJ9j5vYzlEEyg1xyURV04vka9HBHdDcx4yXt9IJms%2FHDF0iMwaznIeeRJUDaHTW7TcFf2dm1XPbE%2BuxDNMYWIQiaGPZ6zf1%2FOjPw9cN67lhwbGrJSTGlW1ZZPqtIzkKo6dtJSaSqTDmV2awINw1ItJfMjJZcWFFO0xGNKaWam5r%2F1ETwO&X-Amz-Signature=0200964ad9ac312aaaf17603ca904be99b79b65927b12b4c3518e360c4d474da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

