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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTZYGAVH%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDf5xTlnM%2F%2BLa0ZNBbz8dQE8zgCxyXQDrAaVoYTqD6oQAiA98qyAOYxLCHvmrUJt1rhpXjZrrdqApIRjwwiFH775GSr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMrI9%2B9sTMkqZJZT2ZKtwD86j7FeetwpXMMOBUmYQqfqkpPU9327D3OOpfE7oa%2B1sBp%2F1tGU84XcGiHEq8XvKTLmQexIDz1pGxQw6BWqgzRMVxc8ayCvo%2BA3hw7OWYUDBL%2FZOEtD9Xd%2Fcb9H1j2%2Bf3qxKpSqSAuiYVZkJ1iln%2BaRLtu379Mb13ecN8UuzWOtRzqDuyd%2BUga30GRfGQZ7mUlsCKhorqQaey2%2Fuuosr4DMszlx1QxpNqh6EVT1QeRdxyody2KBn48K8oSrBIDXVH7QaMKYCDb4D4bcvQA58CDJnUwOFQ%2BKHaJlB5XAuXUUh4T7aZlDS7JE3zDLQZz796NbTf%2BhSknYXQx1u%2Bgd4G2254qIfgcvpcsrOHfWSN0kqYxzZwiLi7l0jdBnME88SIRmPQwoQyrlCwAvkQQbQnytV%2BH3D%2FDAsw1x7SOc2PW0S%2BfvVvI91c4%2BoUhcBZflrX3quRuIALSNTOUFYcqkxK%2FfHpNZnI6lssWM%2BEOIKzmqR9hRbhUT3XF2DQfwBDXqcs0466q1lulwwCwU8tsWsz%2FTimjQ%2FwAGZ2H%2FYmC%2B5KQrsSy51CPYaSHsv87aKqw%2FtjlFUcVFBkTrddoyXFdvdxkARH6MVM1sLUY2nVXdiVXnkKTWrdEvewwPNLcWcw087GzAY6pgFb0LsCrB6FMYawv%2B2F7s8T8VJ5PjwHCbiYpGl9etEn6SqyMshTptLnD0XJuL%2Fdg7qlI0oSlmDA2s12KnOw53VlbvVkUNluMOADGuAYHjO8VTmYhJKM7UTYgd1UaprRqUQtFHP1UFHmLAxCjM%2BWxd3MqncbPUoFmzUu4jl2SMYwVE5TohOD9EbHgXE172Z4Om5JsCgJWRpWdFq1aMrwm7F9jDUcHCbD&X-Amz-Signature=bdd8153bc654573969dddcae4b1f7d9afefb2bab1768e7748104ff7c6cc70050&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTZYGAVH%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIDf5xTlnM%2F%2BLa0ZNBbz8dQE8zgCxyXQDrAaVoYTqD6oQAiA98qyAOYxLCHvmrUJt1rhpXjZrrdqApIRjwwiFH775GSr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMrI9%2B9sTMkqZJZT2ZKtwD86j7FeetwpXMMOBUmYQqfqkpPU9327D3OOpfE7oa%2B1sBp%2F1tGU84XcGiHEq8XvKTLmQexIDz1pGxQw6BWqgzRMVxc8ayCvo%2BA3hw7OWYUDBL%2FZOEtD9Xd%2Fcb9H1j2%2Bf3qxKpSqSAuiYVZkJ1iln%2BaRLtu379Mb13ecN8UuzWOtRzqDuyd%2BUga30GRfGQZ7mUlsCKhorqQaey2%2Fuuosr4DMszlx1QxpNqh6EVT1QeRdxyody2KBn48K8oSrBIDXVH7QaMKYCDb4D4bcvQA58CDJnUwOFQ%2BKHaJlB5XAuXUUh4T7aZlDS7JE3zDLQZz796NbTf%2BhSknYXQx1u%2Bgd4G2254qIfgcvpcsrOHfWSN0kqYxzZwiLi7l0jdBnME88SIRmPQwoQyrlCwAvkQQbQnytV%2BH3D%2FDAsw1x7SOc2PW0S%2BfvVvI91c4%2BoUhcBZflrX3quRuIALSNTOUFYcqkxK%2FfHpNZnI6lssWM%2BEOIKzmqR9hRbhUT3XF2DQfwBDXqcs0466q1lulwwCwU8tsWsz%2FTimjQ%2FwAGZ2H%2FYmC%2B5KQrsSy51CPYaSHsv87aKqw%2FtjlFUcVFBkTrddoyXFdvdxkARH6MVM1sLUY2nVXdiVXnkKTWrdEvewwPNLcWcw087GzAY6pgFb0LsCrB6FMYawv%2B2F7s8T8VJ5PjwHCbiYpGl9etEn6SqyMshTptLnD0XJuL%2Fdg7qlI0oSlmDA2s12KnOw53VlbvVkUNluMOADGuAYHjO8VTmYhJKM7UTYgd1UaprRqUQtFHP1UFHmLAxCjM%2BWxd3MqncbPUoFmzUu4jl2SMYwVE5TohOD9EbHgXE172Z4Om5JsCgJWRpWdFq1aMrwm7F9jDUcHCbD&X-Amz-Signature=bdd8153bc654573969dddcae4b1f7d9afefb2bab1768e7748104ff7c6cc70050&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUZQHDQE%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDo8vDh8JEFr6Kqy%2B%2BMEkNepSeEilXqt6M%2FVXtQUYdt5QIhALiF4g4tiy8RD7%2F0FzzRVLgRlDP6mn11D2WNorga3170Kv8DCBwQABoMNjM3NDIzMTgzODA1IgxWcrH6Gq1mcAZlecYq3ANsqMuXKT8ZAUADAIJdlu82IVGGDcKGRksD1J28xK6z5qPfPFPVjZsF0VkYmixM47zz77GoPXdT2r%2BOeoUcuXtnPEZ69bKKVjIHl3%2B2toz4W3bQQqq3h2I0%2BhaGZFI6Lfkz285kFKLD5aGVI4eey7tHmgABnDne%2B3sihSSOJd3sFwSiaIfODT%2BqunQXFZJqA2m5%2B762FcqVJrh%2Fouak8JW8lNd2VAc37wHxEYQpHNl4pKkIVOtqFm4BMLRuoGHJ6YPO1rGNRBNIeUMTqDbWLTJxR%2BPsGRB2oSiTndbe6P6zBfjiuaRSONHX13UZehdDcHkxELREmYeTdld9na%2Bhwf94xVMttG%2B52m2EbCtz%2BfrIyJtWplqalxLRJ2I0v%2FwPuu1OyiJrOs1KuxvhvoEUT2KjiCaRsymefsg1Z2SHxmj5jX7MyH2rOjcXrYABjWwsEUYIwsP5sh5lmKm%2Bqa3EPL6xIGhz1gfArLyayR3thKUe4PsxUoyXDURystn2yflgnMHIg3VYV%2F0AokKS77M8Jqm%2BecBdCwZXEs9%2BTbqMU7Qz0Qb7bgF6AdlyoOq%2FS1peAQAf0y071z9xl2no5Tk8PlRT53BYHuLvJ57wpFNUduY2IjUti0o26KSc7dlJfTC4zsbMBjqkAexyDMuklxCZcv7Ej97ZJ77DzIiRlPujaNuWyWrKWv0El%2FXuct%2Bu8Gvw%2FsvwEE4DDU2mlIZQ6pJkd4o%2FrhzS8ZYsnprxyHEOWYuxFhPHE9D4ObuFUFOEjUPrYGzJtnQ89ATRisCu5CL8DxhyS1tVhJzJBLtTLTEKW1%2BlRME9cGh1ZJN5PU2jnJdPVHPrL%2BXapTR6mS6R1B3m%2B4qpGVSzjhRefnZY&X-Amz-Signature=4e2bc48d693f0610ebbf5d253d69a49b266502fcbcc7482f9cd018e857fc0a98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USBLGKPN%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQD5FdOm031iAEniK8iRHOombFLh90GWRTC0Z4x9IEr4CwIgQsXw9FQItGY71Qcy3OuS7u8p7RC%2BssjAnPC%2FAJ2TqFEq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDGO4ByE6HmU9Ck5omSrcA4LfPHDoAnZ6wHpAvykcfl2O6LuKRcBLrOQegatPfhEzYVUMierS7ueSHOai9ckOGwnYtQXn1%2F7j3BiGW5p0hdq9LB%2F4ukXGi36KqXbVmBGLklZ0EkqoIKDYP5letZeY1gL6k7U9sUFzr%2BK%2BDkuqqV5knv1XOOpMCyRUVy5kGLEqAvBxD5leJrNb3gNEPw2rKd%2FhrK8DkQ3LG5F0Kw1x%2BOcmFGU6%2B%2BXdBLtb0RlsGG5nPj9cXz18TeBOUNJuDc3jx74LGzR0jEq5ebKDZAA7%2BHNns7Z4y5WFPsnam4JLkgGOoBV3sA0h5mFeRhat%2Bk5%2BOdbbid3ak0SqgWi0V0djLMlzeVYo8LEFZ2uzgkeP3J00j0IpAj5643SZHzRwMTcPf2gAD7q6Ouf94bdTjP9AbUNeR79MJu1CYrMI4hqw8llkkaNHpStwcK1DBySKcziozeoFVRZJjOVhIYUNimpZwQwwjPiphyR6JI4IaiJE1M3LQeVax5Yrk22lKFj%2FSdzWraZfGvVdp6krdhHmi9BiRpksoOEIERo3Adq1blfB5qHq0Q5RlnKNkcgGoFDIh0e%2Bt1UgdSm%2BzgrlUer42iAeFd1Ddpy8f22QPg1Rr4YnQ%2F%2F8gZvt4O4pYw%2BQzl4dMP7OxswGOqUB8Ve%2BBCaYA6vxO4dEpmtWFP3UPtak%2F4JORE51WV57S4NLyYAjQTtkHz37jG1uy0csEPrCEqVFlcxva7Av2dVNq%2BNLWQdvuw%2FRrXs7fbKzsUyu3QNfZc6h57h%2BDKvPF9MjDq2SLvLRcgYyNW188V9EX%2FPc%2B75N4Mya%2Fs5%2FAaHxL5H%2BW6HHv9wXnkoZIChD%2FVIUKfd4NXGv1rV19Gt1v3PqCv%2BOBkQv&X-Amz-Signature=73f604629700cbbc70edb996e273ea742880389ae14d0fb94ecd117da449bd6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USBLGKPN%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQD5FdOm031iAEniK8iRHOombFLh90GWRTC0Z4x9IEr4CwIgQsXw9FQItGY71Qcy3OuS7u8p7RC%2BssjAnPC%2FAJ2TqFEq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDGO4ByE6HmU9Ck5omSrcA4LfPHDoAnZ6wHpAvykcfl2O6LuKRcBLrOQegatPfhEzYVUMierS7ueSHOai9ckOGwnYtQXn1%2F7j3BiGW5p0hdq9LB%2F4ukXGi36KqXbVmBGLklZ0EkqoIKDYP5letZeY1gL6k7U9sUFzr%2BK%2BDkuqqV5knv1XOOpMCyRUVy5kGLEqAvBxD5leJrNb3gNEPw2rKd%2FhrK8DkQ3LG5F0Kw1x%2BOcmFGU6%2B%2BXdBLtb0RlsGG5nPj9cXz18TeBOUNJuDc3jx74LGzR0jEq5ebKDZAA7%2BHNns7Z4y5WFPsnam4JLkgGOoBV3sA0h5mFeRhat%2Bk5%2BOdbbid3ak0SqgWi0V0djLMlzeVYo8LEFZ2uzgkeP3J00j0IpAj5643SZHzRwMTcPf2gAD7q6Ouf94bdTjP9AbUNeR79MJu1CYrMI4hqw8llkkaNHpStwcK1DBySKcziozeoFVRZJjOVhIYUNimpZwQwwjPiphyR6JI4IaiJE1M3LQeVax5Yrk22lKFj%2FSdzWraZfGvVdp6krdhHmi9BiRpksoOEIERo3Adq1blfB5qHq0Q5RlnKNkcgGoFDIh0e%2Bt1UgdSm%2BzgrlUer42iAeFd1Ddpy8f22QPg1Rr4YnQ%2F%2F8gZvt4O4pYw%2BQzl4dMP7OxswGOqUB8Ve%2BBCaYA6vxO4dEpmtWFP3UPtak%2F4JORE51WV57S4NLyYAjQTtkHz37jG1uy0csEPrCEqVFlcxva7Av2dVNq%2BNLWQdvuw%2FRrXs7fbKzsUyu3QNfZc6h57h%2BDKvPF9MjDq2SLvLRcgYyNW188V9EX%2FPc%2B75N4Mya%2Fs5%2FAaHxL5H%2BW6HHv9wXnkoZIChD%2FVIUKfd4NXGv1rV19Gt1v3PqCv%2BOBkQv&X-Amz-Signature=fa3c1c2dfb2c1739691081f7adb4c537c678a6e2d325be45888824ed7721d182&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKNEVD4M%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIE4mGorDkgl3HicF8hJRB2DFMsGFZZfgGfejWBTaqRPPAiEAymwvljKaph4CqoRznuLYy56Zt9Ds4FfcW0EUD7%2BH8aQq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDOX4n%2FYCU%2ButE1GuPircA4Nwa%2BddVIEGhpCa3LslrPhko5Gr46HsYs0DZO5oNkgC72Qk1SK0IoHu7gpLoIxnAhYMwG%2BzOJ5duS3RUm35Jm%2B41hO28qKYk0TAlm1fEQMjD4BpZJQVAH%2BNhxokK6JdIZDunMCnVq4H%2FmB1cEr6tMoVHRc4AxPvPlhhcdpgIHrm%2BrpnElxU4W4J%2F11ZMF4j9Fy%2BlrMqmdpEkmI7UzOUxUXR8TBbbfGVl6RkDxVh3alvYxeRSDOb8%2BtMeRTq4BsVMxwSBJhLN4f2cU2nMYRlqxScWaLqFpqUQ5bpcy2E3kgN0gOxeP6VeOur%2BqH%2F5F%2BpPZvXTKAi%2B1uTlDqGi1nglIHL0e1z2DGBeeUqeG%2BZcgOqWiQK%2BlIyaR1e47Pi8H%2Fi4wAP%2BXy4LylbJxt8zaR8RGVfexPmFDiFG%2F0zHkr2btVOW0Vk5WDiyHCkJ4xKmLMrerKaH%2BCiYL1y4sA56OpbGzAjSOsPMVKG6NHldc%2FkY7sSdlfuAm7K4MNpXqvUszL9WrCQAUjpkGr4HlBDsO0svDim8j8iZ8N%2FoPzJRQtGaTk7xWlKU2FHWZ2KHmvK9IJDtHCoJ%2BeC7mqpycL0dhSFeZKmTop9F5IgXgSH9IQUx0iZ%2F5RTa5tmz5%2FaZtATMP3NxswGOqUB8HXEPgFWxcYrBbWcsbiycOLbJrvYIbzoj0HM7VNLozcKbYlDDEgj0zm32ti18rOzrF02C7SW3P0obYp%2FAvKfmzpYwXxzqCt3U%2BltxhOTx7xGJrIIJr2g4nrQh2bJocnLhdtyUBB6tFcEo3jr3sdoap8J7jN4Dg5Zsr%2FCmpzh7VCqi3BHHGAW1vaNGb2adBs%2F0OkPlZSTqLlTOYBbjA62tq5zzTfP&X-Amz-Signature=5bfa26497010513dc72284eeab14910cdef1889f9652cbbf55d155b19b96cb62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCIBGRD3%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDkJEoudkbYNARcun3XwHR8xbxfPmBZZjNzeuKDqH5hqQIgPYYpYgGPMYUNF7NpCkLXElgRhtN4ziwLNZOI1q7YX%2Bwq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDNorOOEtMCQDi6LOnSrcA6PvmophkMfPa4Uy5mkWapq8mYMrLwIHf0qKQNpwgTdSPeL9oV%2FLrJkbO92C2YS9IEECKr04%2Fwh3k0%2FKtZ2zyWgVFSTQ5Ya33HlKXw8yZmDfT4XSbMls4be%2BgqDLHMO5BuHscbip3yT8TexhKxAvrk3RMH9aep6QsPakgbu6PsjEA4e6vzYi15IWyb2vboq3FkOgTvNni08gvR1ww%2BvAy031vhpls5itPdYxkB4Fa1sCkDfVFQaFv0AuvsVjomYXDSMZ7661XMD28YoFOJM1rHbUqMId3gHJBNwaprfmk5czosAWsKNO1MKeqbdgSbsYe60kPNTSec6%2FMxKwaf4jec6ADvXCGzTrSw%2BuqQyqUlV5Gr81%2Bu8QphymzyiUqjafykg7HufUtX1v3zQSQoJVSrVn3Q9hzyrgVrwR6gt7xx9ivB0Ky7NaK%2BaouQrBIctA53b5vX9KaMSN0nxU4xur%2Fan%2Fxv%2BS9IKOPzIVf2jXZ1OEw9V3QqSwQFbqZAAmpKzgOVUaxWdf5jcJ7ttqVhapqV09decYf7kPLosj8R8n2nIJiawmHUUa8DeF6X1vpY%2FzuFqt64T2ZcUYztQD47wEuz5%2BabiQ2pWIWUmo3Vn%2F8mSGKgYkTamkomH27Z%2BNMJ3OxswGOqUBsfvEIDee8mPQmXtE%2BYEvSrHs3iMe%2FdM37Uq34gFa3nTQOCPKFhkPXi2OFWJYlR0llmmYBir0UqgWYj%2Bl6HzLmNrI8l9BnXOU6ZKB4Al22pc1AU60grPh6W9sf%2BZE%2FLXip%2FOKw6r44OB7GKIHFmyEX6uLKNQyYi1NfFjRTJq16P67ZpSAaBuN4UXQKSmnpKnEeFHP8rpNu%2FSF82I3gSxZpZI0fDVZ&X-Amz-Signature=816b78e0090367414e640165dae03dadfbc559bfd7caec4b4eca71c16038bb51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L2XUFEK%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIC9lsRXDysVB8wLMrFeZ3A80CRzh9tTO1oheokAlcNi0AiEA2oclK3gliNLStlTgks%2BumhKbR5sybCFItTg4YFQ8xh0q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDDxXBAmmxv9ekWjLUircA93H0X1RMvZdAgwtIcMQOZCgamZDu%2FYVW76Ueg48GtQIBIX6HWgrIJSL3Ijj8IxVCmPZfQL4FYCTrCaK1R6mp8h3s7JfNIr4eoS19A0UaevuHGclc5JbuphII%2FRSE2YV%2BX7vQwPGojNlrWJouVCeVdBe8Hg83FyTwq%2F4k%2F9m8RKoBiLSoHCL35VHfCBy13c1F1EdxYMGgxbnRYmUBXIr%2Bxiy%2Bclh3Cwjk3ZuUigqx83y1AH802XTVjVumO2elFDhBCvOw%2FT%2FgM66NjiuQzy8%2BNTBtxVoqDS9RXRU7MDnBR%2BWx9ljymwciJEk5vsijwfbacZjvgs2Iokh4hZalEDzh5yGCUN47CL6NgerRxvVbs3FzQQy%2BtNYS%2Bd8igPGdBqOjq8Y8y96bK9c5CCoFoNMPvEJy4QZ6qRuKhGaGxGcY%2FrxfvxI8n7XN3prw6QgTf3IJYsQHaQwZXYjkkrxpOe1bMLeblTPRb014KgOBYjXz2chXTtBRL8Fpw0DTLq1ngO4qYUsxg%2FGIANpWjq47Zm9TDqxSZ8DUmI19u5ldvKrdesQJF3xNomT9lvns2ISGnuv0UOv2rQBM6pv4JtiMfpGpeCadFgz7l5u%2B98ISI0FTqPOXT%2FtZCGOXit87oVrMP3NxswGOqUBy%2FzRg0CaVV%2F6KYOMhXIFge%2BzexKGN4AKBjc58otekPIuy0RC6qjpjpHD1Rgwu8q0mG5AjsRNLOF4sL7ZwS3kcHgGsVeRKPpmVDrACUxTST%2Fptaule4K85lRIZRX7VBjxl4KlbaVOd%2B2T%2BwxPIDJXA2POwPukkqAoENmH2r93Ceu8p2FT0phPARSfemFj3PdXLQnwOw1Rp8GjLeiG9B%2BgPybEc5ss&X-Amz-Signature=7f5224d0efff37737c4fc0bab0e4ff0800290af86a08bfebeb82373707a03ec6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625Z4GIDL%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDoYLmwrzdM%2Ftp2MZvPqxF5wOKWYCPqJyzAGiiaSRDDPAIhALQfxZvgOxdRvycNGyilWroDJxDCzmHnQCJyGkwuVd3pKv8DCBwQABoMNjM3NDIzMTgzODA1IgwxsVS8OqSIIKNFM0Uq3ANGVxeyvTMQLZIa30fLcmeHJ1Ffrwdn0fEGEQl5Vdyf574%2B6AoscjZdnTxqg3XlN0NCFU0H1vebmHwpjaWFkVnYPofjjCQHKOG5HuhvcXOB0jmge0tE4ADH6JUi1%2BRSCjnYvDxo8guChCcUsFdIJU6KB6OskbPqVq%2B0w%2Fl9Itji94g5r%2Bjprkkk7V4UH6GAo0AchA9RH2bQ%2BcKTwMCgYCswupc7GqQ4MkDFesczhMh7lV66pCjWnpHGINFOPwHcie%2Frru6PW9D%2B7PyTrGLxPlegBA5ZGrTNbKbwhVPxeFh0qZTksiUU4k4p9%2F3Mb4%2BwgQlRf8QCM4yrEWec1EQ2JBTTjSraXnsdlk6b301qNdrMh6ahGqKtHOjC%2Bpaqn2pTUc5A9zwzxjdcLZnYj7nFcf5zes%2BQnidZMhwjVlKx14xPM%2B0JXB4ac4UzRANS%2B8DTZTQKobzcVzJ03xARCtNu6GGrbyBIpuWveYkHnZDtNI3lrAj3mpi8IPD41YVIsVo%2FUtSPl%2BuuKkK7EpSxHB1Vv%2BW1gUctgPm5sQuSoEis37iwL9bgqBUk1sJNm7bz0Jr1Lsq0eZ7ahHHaoqv9GScVQjUbEiw1scmcGbEEQ6JK4CWDVvmp8rZ0qhFOJXW4CzCUzsbMBjqkASRAqDbE5pbCDCJ6qDBUFrZMbTxN3nEz6tlJOFAYwQ3HEfTAmgx7qRL4ePqwDf4w8%2FanlQ6ea%2BcMSvENSg5viB%2F2M0R%2Bik8wPsv2iwXyVAYaeiHlNg%2BhsRqXUwF4K7Z3CL3qkJflfpLTuafSyY6l%2BoVD23UsXmT8ttL1ZEiEmILZ4evStSVml4KmyDFJJiCMdgMW9VVvi1t2%2FVIWBGWaOhd86Zvd&X-Amz-Signature=abf6534f3e930d749dcfa1902cfd1d81e3fbfa8a4652781e8402a149859648c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625Z4GIDL%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDoYLmwrzdM%2Ftp2MZvPqxF5wOKWYCPqJyzAGiiaSRDDPAIhALQfxZvgOxdRvycNGyilWroDJxDCzmHnQCJyGkwuVd3pKv8DCBwQABoMNjM3NDIzMTgzODA1IgwxsVS8OqSIIKNFM0Uq3ANGVxeyvTMQLZIa30fLcmeHJ1Ffrwdn0fEGEQl5Vdyf574%2B6AoscjZdnTxqg3XlN0NCFU0H1vebmHwpjaWFkVnYPofjjCQHKOG5HuhvcXOB0jmge0tE4ADH6JUi1%2BRSCjnYvDxo8guChCcUsFdIJU6KB6OskbPqVq%2B0w%2Fl9Itji94g5r%2Bjprkkk7V4UH6GAo0AchA9RH2bQ%2BcKTwMCgYCswupc7GqQ4MkDFesczhMh7lV66pCjWnpHGINFOPwHcie%2Frru6PW9D%2B7PyTrGLxPlegBA5ZGrTNbKbwhVPxeFh0qZTksiUU4k4p9%2F3Mb4%2BwgQlRf8QCM4yrEWec1EQ2JBTTjSraXnsdlk6b301qNdrMh6ahGqKtHOjC%2Bpaqn2pTUc5A9zwzxjdcLZnYj7nFcf5zes%2BQnidZMhwjVlKx14xPM%2B0JXB4ac4UzRANS%2B8DTZTQKobzcVzJ03xARCtNu6GGrbyBIpuWveYkHnZDtNI3lrAj3mpi8IPD41YVIsVo%2FUtSPl%2BuuKkK7EpSxHB1Vv%2BW1gUctgPm5sQuSoEis37iwL9bgqBUk1sJNm7bz0Jr1Lsq0eZ7ahHHaoqv9GScVQjUbEiw1scmcGbEEQ6JK4CWDVvmp8rZ0qhFOJXW4CzCUzsbMBjqkASRAqDbE5pbCDCJ6qDBUFrZMbTxN3nEz6tlJOFAYwQ3HEfTAmgx7qRL4ePqwDf4w8%2FanlQ6ea%2BcMSvENSg5viB%2F2M0R%2Bik8wPsv2iwXyVAYaeiHlNg%2BhsRqXUwF4K7Z3CL3qkJflfpLTuafSyY6l%2BoVD23UsXmT8ttL1ZEiEmILZ4evStSVml4KmyDFJJiCMdgMW9VVvi1t2%2FVIWBGWaOhd86Zvd&X-Amz-Signature=2bb6544ebff55afd7e01beb5ece3ebc31b82e6ec4aac296ba4b32c8d449ad0c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HJEPWX3%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIHYUqTfvojKnbXzI22ModmJFTlZuI3FWyMIOG4qzqhj8AiEA6JS%2FUKnP%2BLB2R0uU9J3zXE%2BHaOu%2FBGUFrr3VN%2BgU39Iq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDI%2B%2FiJOQ5CD%2B%2Fz29%2BCrcAwQzdwPwls0BilfU0E7nU%2Fn4GaBHy7hN4uK0izmCulx7xzijVNWj3b%2FUpc94DjsTsyOVZVjacX18synkgljA1uXkUM1gXvdvPGVRONYarFIbZJ4COZv4O10%2F1g988gN0Ir3vVkis7TOvigkSi1V4gKrqIx2fIRIlB1FdMerH9x9yDO0v0DoXZcrIzMfZ3NXexjU9NiaTVWm6uDra%2FyFb8OLT%2BEr6MBjHUXUXuWmDQOzUI6SGEHCllFZQZdF700l4b32SgUaalcJN7hBXkfxIuDIDpFS1AKg8vo0OrUevY0awNv5YpBnZ9E20u0zzT3IUZIweij1Dpmc50ps%2FY2Odv5dEZ5zqqLhp0CiQA21axZC55N9mNi40%2BAfHgqMmJUBNVGQSYUvfoggMbq2pIFCgWA51rLdBUfpaj1bbUJpRoRSds%2BfpoM6OF6z36hPaw47ZJAm%2FzzPTog2XcuUbkaItRI35UZXQyUGrKkIkK7xVtecse7QKDseBWVVkGxDnMCjxcrNyIKzzFzdoynsqSb6FHUMY%2B3qQWq%2BNvX86bBugvjG9kDE78QGd8orZdVHdcy72tLnP9%2FGBxaQf14fhrTYXg%2BL4I8KlIU7uCR9MtthJ9SgTaJfsxG%2BbSuWQGddGMODOxswGOqUBV8ak0Blup7rskOPgXKL4GegEb05Zen9k5FK43dyxnEkCg7n0eazaBn5VLZTB6HPlvv%2FuF55OnF%2FcEJdHsHx4dQTDtH8BgQbaIsLYTbI%2FrTSSoaraCp3Kxcm7RA2jyDIqvrcQsWu0lVb7dCjTSZjHTcFSPr2zUmmjwl%2Fx18%2Bx9M%2FA0nr4g385PBQFi%2BzzN205pGEcMO%2FwG2pX%2FnPxHw%2FCqHiNAXqx&X-Amz-Signature=99bfcc015f2f0c7d5a0465714e4a0ab5a458e8fa573bb7365ef9a20c55425893&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DGGMKIM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIGFknymGcDvEZ9nMDVAbzyz%2F4essQWv%2FSI2oJFDUJEhRAiA4eEjWzSyoQTnByCw63aNSqeDIqwju4S2u8e377kBqByr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMEN4qI%2BSXrmZAszhqKtwDgZ2PbbWASJ5HAgFFB5e7jmPrD%2Bq7ADkuAi9la1TbYcrhBmfX5IoBUXN7FUGcvtIv9B8VqUN6g2kMKqstk45QJg4tf0mOo2EH0Rhw9b4xUD9wMWZUM6Y4OIjzGS4xBw%2FY7wbhIhC9q8Rma67%2FOgapyHQ1eoE33CJg0V3j%2FpCAfjDLVYZAzE%2BWTYSSnovBhCVVVMnSLZA8wq3m8QaqmkzeBtPkN9Ss8tC5cQcciGN4szukrHNfriP%2BL2H%2Bgm4%2FQoiSduc3bxhkAC2mTVPfodtqSAqptkDW2KIHskqng9YwFjoBL4ZjklO7j4iRps5c5DgjGaTErqHOTxbgFgpmmiediPSiHcT1ZTJNKe7ySe4%2BbPzXooVSE3DfucsvMQiupkAOsHeaKVp6HLy%2FmSdiTV5%2Fnzst%2F30dbzZhXLCwbdIkpxOewYw0HlM8A4F2rykQYk8gS8Jr1lW4TuLdvXWaVj2rBSzk3nFkxAC05Rxq6avyGjE0h9Z%2F1XbXUVEvGISoGEl5N12jJrV3MtDq7R32XNg9b1790n2RpBDgr%2F%2BmCbp3VAfiU0OEDrWAEx%2FuL2nvMACyHtDwwgTaMVjxFxz2qBtMTGQal5vl%2BA2yFG9jgYaLvFNqaTLTgx7UoTk8vtEwls7GzAY6pgE8%2F%2ByZ1vxWHFKSZCykjOD%2BA%2BLZnG3bFFdsYGc9DtIVHd4KJo%2FPi7fj4b7cJHngsQ0eJUE0kpgQdItySvZyOvEpZrlVWPsoplvXaRVlqF5IUKXKi7d8W0H7PS2okO0TSNyPdbk%2BAy7NW3y2z8bUQ%2FCYfyhOctV47fot9RuPAQeMSTwjOEIhCFuQqqRvYwgwVHqHZldM%2BJQx45ND3Nb0UH%2Fl1k%2BXxkL4&X-Amz-Signature=514122f2444a02c4832ef6b1c7243624abfa00b618f4f39a6d6e2fb0e49ecdd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DGGMKIM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIGFknymGcDvEZ9nMDVAbzyz%2F4essQWv%2FSI2oJFDUJEhRAiA4eEjWzSyoQTnByCw63aNSqeDIqwju4S2u8e377kBqByr%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMEN4qI%2BSXrmZAszhqKtwDgZ2PbbWASJ5HAgFFB5e7jmPrD%2Bq7ADkuAi9la1TbYcrhBmfX5IoBUXN7FUGcvtIv9B8VqUN6g2kMKqstk45QJg4tf0mOo2EH0Rhw9b4xUD9wMWZUM6Y4OIjzGS4xBw%2FY7wbhIhC9q8Rma67%2FOgapyHQ1eoE33CJg0V3j%2FpCAfjDLVYZAzE%2BWTYSSnovBhCVVVMnSLZA8wq3m8QaqmkzeBtPkN9Ss8tC5cQcciGN4szukrHNfriP%2BL2H%2Bgm4%2FQoiSduc3bxhkAC2mTVPfodtqSAqptkDW2KIHskqng9YwFjoBL4ZjklO7j4iRps5c5DgjGaTErqHOTxbgFgpmmiediPSiHcT1ZTJNKe7ySe4%2BbPzXooVSE3DfucsvMQiupkAOsHeaKVp6HLy%2FmSdiTV5%2Fnzst%2F30dbzZhXLCwbdIkpxOewYw0HlM8A4F2rykQYk8gS8Jr1lW4TuLdvXWaVj2rBSzk3nFkxAC05Rxq6avyGjE0h9Z%2F1XbXUVEvGISoGEl5N12jJrV3MtDq7R32XNg9b1790n2RpBDgr%2F%2BmCbp3VAfiU0OEDrWAEx%2FuL2nvMACyHtDwwgTaMVjxFxz2qBtMTGQal5vl%2BA2yFG9jgYaLvFNqaTLTgx7UoTk8vtEwls7GzAY6pgE8%2F%2ByZ1vxWHFKSZCykjOD%2BA%2BLZnG3bFFdsYGc9DtIVHd4KJo%2FPi7fj4b7cJHngsQ0eJUE0kpgQdItySvZyOvEpZrlVWPsoplvXaRVlqF5IUKXKi7d8W0H7PS2okO0TSNyPdbk%2BAy7NW3y2z8bUQ%2FCYfyhOctV47fot9RuPAQeMSTwjOEIhCFuQqqRvYwgwVHqHZldM%2BJQx45ND3Nb0UH%2Fl1k%2BXxkL4&X-Amz-Signature=514122f2444a02c4832ef6b1c7243624abfa00b618f4f39a6d6e2fb0e49ecdd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RP3YNCYQ%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T133631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIAfDqANNeTwVjX%2B2adK%2F%2Fh97smJZcRJT8kcr65w3ibyYAiEA02E1JlvSOf%2FaujrhdgDfzhLtKN9PqomcClX10bSITk4q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDMOuLXk%2BzrmaKw214CrcAzEKheHC8qllu%2BY%2BZD1zUREiGCbYzTGJOGuaGp5pNRODJI%2FkpXG52KLqj1mR2ncfdveBegwZHjEnGvQZwNWBWUvW6nu7eo%2BHHF2uPlqmw9hhasrLpiE2jf4kpPvQzBirKuA29XrTRTn%2FJo7MQwv1ZQ%2BLGT%2FQQEuYXynQ483hiRYPwrx1ZnVkVDrWfwn2%2Fg9x%2FkAa0GUhpc8rn5h2TZqF5pfVKX9qQl0uJi1uQ9BkIYhhI96RXP0Rlpgiq3w3qVWgo62bsdZz3Ygjgv%2FizK5P4UeahmtXKVqdMbNKLSPX02unKS7UoUaedOpSQ5zs02xFl0wgFj%2BDgDoNmUWAzCN%2BZ2B1P2MsJQEPNRq5vzSIa9LwLWzS9GFEPM8RIGlD0KsEASOppaGa%2Fpu5dk7O%2FJ4Y8wJCVFS7BQhIUBi7EEk6w41tMAa3WZA%2ByyRZsYh9sBpJR%2B618bEIP%2Fgi3ni3KS%2BVbf6m36ibv5A2s%2F79bYcbEjX2V2g4m%2BpfVVHQmtQwIsXWtLHmUpjKTdBm6BPyijxiVnvPo7zOaFY3QCeYxK%2BUSBFvN26pnF%2FAj7mBA%2BnwFpm5xQwGIOjyffkwYmA9TBgaKJaQwKgaoVfBpaTZ3zBvMe242fOXdDYtNsUDEw0wMJvOxswGOqUBCGWU%2F2wRPlbqn6FtPjD%2BpQHmmyM%2Buckm7pGlv1r3geNcfD%2BOrTRoBLuJPPPRjY%2Be7uLCQ%2FAHwM8c7aGk2p6j%2FPvbdrXBNTAZSh%2BA9dieGYTWhzvdEbe%2FWTGJlVyH6p8BrTdw4fhR4crpv9EIAy5BnoVCSO4tADAXy7bKcmhpvYo4M0isBQxqMTaVjHAuA02DgRZ3ztslBwFqpbyExMLhnjUdjaPA&X-Amz-Signature=5489cab3e72e1dcba8f32dc2ac127e8830e77a8bbc7a9f7e09670abd4e2acd6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

