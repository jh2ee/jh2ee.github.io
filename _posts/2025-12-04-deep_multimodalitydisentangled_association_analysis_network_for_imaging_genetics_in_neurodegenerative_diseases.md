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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666R32VE46%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC02B%2B8VZ%2FRbK006GGQ%2BEVd3EfQEikgAjUoe3zArkTDKQIhANNUXhJgys6QmzC5yRKqhVAh51%2BqTRU0%2F7cIacirQYgQKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyC1oSUVj0wn%2BQa%2BsEq3AOXG4%2B4RLQX%2BWyEbsZLDcUYzW3eZszeCbCXiOhIHEQ6suuZOCQH%2BqVIeTMHlnc6ybArkRPxwwiX%2BTSRrB%2FVuUZw20OJWhnZUj6mn79bE41HrJ7R9gk0L0Ir8DGowmc6q%2Fvwh3BmvYkPuRDdu4TWnS%2FHXeW4Exvf%2BhDKOu7Hn5x3gsOfj1EIqB2dsfMTm71OPbvW7ATn6ZwuuJb3vDZ%2BIGwWk0EaHtizLt90888pn5rrY2Nxa4hC8OgKVzcOL20YbYsZXErzUEqpZnFFRKZKvGdzjakChJMZQs2iHyPQKPk3IPjh3x%2F4PlHDmzzjMN%2BwTDGyQVEoI100U4q0nmYywX98Vs3pOmZsVl%2FqJt73k5RFc9PFlX8eacfKLnFh9AQCMaO7mKmoFhAY%2F%2Fr%2BjPF1EjZoRekPjZLPdysqfjm8ZETrjjIhWHQXA36KQ7%2BFY1PNTWeOWx7CBuPFeGmoKu2IKD0sOcsoIOdJWmeufO%2FLxqdZtYG1Z5mjesp%2BxYiO%2F40LDSRAkgGmo08nHP1D1dPBYhXW0eu9Q%2BL0C%2BjbV5PvwXHmlnFfxRe8GF%2FkcugTy0DSxcRGWRU11Nv8mQOOjijnjmLFAVRs7a%2BpFumvbXfjgkOz%2F2Fb1XonLEYaOHdR8DDo0K7PBjqkAUl7J5eUQe2X5KjWyFFcGkXtmz7kPqoCiv2dGMQ9%2BgWTqZKUgeYwKwqRIiDzTuvnC1as4N00AJ4KMHTPHRfObPuzCErVT%2FWJUI25AfL3EqjOB5vG%2Brs4ChZBCFgkdgikoKEcB8xbXGqG%2B3LrpStyg2nz7ldOyaqZQdFwxNN2wRnwXEC6%2Fsa0YKIDf8qbZzHH82RIgy8vrTG5S8OzaEE0hLs3p2Ub&X-Amz-Signature=7a33cfb961e025801a41570b5968fa23ca855a014e5be1363b7cc89dcac5a6a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666R32VE46%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC02B%2B8VZ%2FRbK006GGQ%2BEVd3EfQEikgAjUoe3zArkTDKQIhANNUXhJgys6QmzC5yRKqhVAh51%2BqTRU0%2F7cIacirQYgQKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyC1oSUVj0wn%2BQa%2BsEq3AOXG4%2B4RLQX%2BWyEbsZLDcUYzW3eZszeCbCXiOhIHEQ6suuZOCQH%2BqVIeTMHlnc6ybArkRPxwwiX%2BTSRrB%2FVuUZw20OJWhnZUj6mn79bE41HrJ7R9gk0L0Ir8DGowmc6q%2Fvwh3BmvYkPuRDdu4TWnS%2FHXeW4Exvf%2BhDKOu7Hn5x3gsOfj1EIqB2dsfMTm71OPbvW7ATn6ZwuuJb3vDZ%2BIGwWk0EaHtizLt90888pn5rrY2Nxa4hC8OgKVzcOL20YbYsZXErzUEqpZnFFRKZKvGdzjakChJMZQs2iHyPQKPk3IPjh3x%2F4PlHDmzzjMN%2BwTDGyQVEoI100U4q0nmYywX98Vs3pOmZsVl%2FqJt73k5RFc9PFlX8eacfKLnFh9AQCMaO7mKmoFhAY%2F%2Fr%2BjPF1EjZoRekPjZLPdysqfjm8ZETrjjIhWHQXA36KQ7%2BFY1PNTWeOWx7CBuPFeGmoKu2IKD0sOcsoIOdJWmeufO%2FLxqdZtYG1Z5mjesp%2BxYiO%2F40LDSRAkgGmo08nHP1D1dPBYhXW0eu9Q%2BL0C%2BjbV5PvwXHmlnFfxRe8GF%2FkcugTy0DSxcRGWRU11Nv8mQOOjijnjmLFAVRs7a%2BpFumvbXfjgkOz%2F2Fb1XonLEYaOHdR8DDo0K7PBjqkAUl7J5eUQe2X5KjWyFFcGkXtmz7kPqoCiv2dGMQ9%2BgWTqZKUgeYwKwqRIiDzTuvnC1as4N00AJ4KMHTPHRfObPuzCErVT%2FWJUI25AfL3EqjOB5vG%2Brs4ChZBCFgkdgikoKEcB8xbXGqG%2B3LrpStyg2nz7ldOyaqZQdFwxNN2wRnwXEC6%2Fsa0YKIDf8qbZzHH82RIgy8vrTG5S8OzaEE0hLs3p2Ub&X-Amz-Signature=7a33cfb961e025801a41570b5968fa23ca855a014e5be1363b7cc89dcac5a6a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666U3O7L6L%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTuXXnI3Cn0Po%2Bb5LrMutzEhCdsgXmGPK%2F5yv1he9XygIhALxNmBiEqxfEM7ZJvPQNwwP0OpsNsTbs9JgxFhEKxJURKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyUs56hAUynhBr1Ufgq3AOr0%2BJDYRNTzWLcNNs5jEJAGaLv7DcQX6HQh%2Fb7w7DwoYDwsXFk4bM7KmFEVwmiHlo5a8nVfVHeSFUGMoYqgbwC%2BclHSjsFVbNTgRO3juwhGF25adNu9OLlMpVQHpueD3OxrBdL0h6BwN20DpZYkBkKC7UzKQR1LSNQFRYoskqromSlsQ%2B%2FAR5Cz3v4HFKcZJUi7eXP7SkmQ7HHItZwAXDbgvXyi0vWlIIecJFMuG64jifjy1jRymgsyU0hNb7Qa5st%2FU8DLzz%2BLH7IVwIPS2pdmM4XaiYFUiGxsVr6dgA4CCzRLHpeRfd05RrEpyh19MXZSj15Lq5mSTt%2BkA9OLFG0iC%2F22bz69RfBg2XL0bl7PiHMj1zlA1q6ggQbnRO%2FZZndMoR07XVP41JYBgM8NcA9MayTReosDyLD7pR57B%2BRkDLyHgjKuOT8kInbud6a8aOvSch4O4CNEhbGunFAXatDow%2B%2BIrAeh%2BO%2BAe1vh%2BGkSh%2B5gVBYp9l2jYp%2B2HBDmgHRzKsP00LtRmoX6KXb6vfBQTO6dPTpeh21vyrYB29sojVfY6nvKbcTiEcHbywg9NCgV2WD8BEUaqxC2jXCaVOjzfVwhCrMXkE610ccwIaOSo%2BvZdC3XsvYO%2Bas%2BzDG0q7PBjqkAVEOHY47T6XoRbDKireqUvS8%2FJJOPkEBxyiqLkxpzBZ%2BbmbUql3Aehm%2Fpz%2BoIq7dXd%2BHXJjU%2BiojmvjkBcKSj1gF%2FJwlNjjFANq9O48m1DhPVbQbizMCuEzqUNTLiwQqWrToJiw6q4MqGMxopTKFW8tpZCbd1IySlRoafZ5O4Cw7kC68OOQfvBbfNhVL7UgwkAynDQdrRVWzjI1ijMUQ4zS6t9rw&X-Amz-Signature=8bae2108c23378c554537cd9d808650ba44e5c37475e135ebfefe3c5c312c559&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRPJWQJO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA0c7B0ocaaGQ4tMGmqeJEw4bX%2FGPdnlCqp1IxIJeul%2FAiBmbGI2Baw%2BYdDFB5L9NmBWW53uAQx9la9FJ1UQrrGULSqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyinnOIEhY%2FnZP5B8KtwDQ1VvCJLI1jAWs0M7lUAyD9Pqt082sEyV1vGoGMbBOpy2SnTl0QDqfhRx1YkLABzIwd2ALGY0dNLnsT8DM2pBI6nCvaquGpPOVi5LrZU3EvpwZLlyEwEjDKGjAfwOeejBJv6iH31wetYTrrYmomPSm1%2F8%2BPk50ThoP68OP9UQzhLK%2FJ9UasACc%2FEQ%2BTkCPHWGUdBaoR%2BT9y%2Bgiq9yTTDzg8WjLFNmysLtvjImKPBgX4GtZDhLkAZLRxYMnuvBia7jDJwwXf5LPMYImjEnH%2FFDShddNEIfKRuJExNbOrC%2FtS0sFN%2FMKyBBsvkBq843Fn9mXztDRvP7hk6n9RhL1RsS9Z9fLizShs3xdI4nGq07bkWsvTgBaU73R1ccxQq3UIpMPhMc5JFYGSVQ9gXdA2w4SOUvKJ%2FVpBmKjY3%2BWmmJnttJPQwT1%2Bqlk%2F0o2AH5f29Qy3d04%2FlvOqPusvE%2BrUBg8FHDstOLTWTmm84G4mTjfV35oS29mwRtvuU8wuqRCeRFd8b1BGuOY2ihGEAK5ShoSBZy%2FSqHkjMdrrW%2BqzM3rCixdkJAbfotQ%2B66VlU0i%2FH1cYU5Lgrpf9IdSpzZyatBYhAt2p%2BF3YCkfn15yxf9%2FmUjl%2BqhI0NQnj0SAwYw%2BtCuzwY6pgGg2GbM2QDwOlYr8BK9VUTEMtKZmsB5%2Fep%2Fr347VdlXPVedPWN45T9gYgE2ADZ6XYYCEJq6eThjHba3qGOvuDKUm6uMT8myG91zgL5Eg3XenTIR1TrK%2BjgsCv77sFnVgLQj6hgPt%2BAnxF1N47PIsZCOCw35%2FA%2BSRPgXFJFgIzeUCPYI1mhKOTNYhjjQBj2wnWeCB0yWrQH0hxaOR4bNYivryKruICdK&X-Amz-Signature=5ddcedf9066f0ccb9cb3ecac48fd26fdbe16c63f3aac700c40b5b4686497a152&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRPJWQJO%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA0c7B0ocaaGQ4tMGmqeJEw4bX%2FGPdnlCqp1IxIJeul%2FAiBmbGI2Baw%2BYdDFB5L9NmBWW53uAQx9la9FJ1UQrrGULSqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyinnOIEhY%2FnZP5B8KtwDQ1VvCJLI1jAWs0M7lUAyD9Pqt082sEyV1vGoGMbBOpy2SnTl0QDqfhRx1YkLABzIwd2ALGY0dNLnsT8DM2pBI6nCvaquGpPOVi5LrZU3EvpwZLlyEwEjDKGjAfwOeejBJv6iH31wetYTrrYmomPSm1%2F8%2BPk50ThoP68OP9UQzhLK%2FJ9UasACc%2FEQ%2BTkCPHWGUdBaoR%2BT9y%2Bgiq9yTTDzg8WjLFNmysLtvjImKPBgX4GtZDhLkAZLRxYMnuvBia7jDJwwXf5LPMYImjEnH%2FFDShddNEIfKRuJExNbOrC%2FtS0sFN%2FMKyBBsvkBq843Fn9mXztDRvP7hk6n9RhL1RsS9Z9fLizShs3xdI4nGq07bkWsvTgBaU73R1ccxQq3UIpMPhMc5JFYGSVQ9gXdA2w4SOUvKJ%2FVpBmKjY3%2BWmmJnttJPQwT1%2Bqlk%2F0o2AH5f29Qy3d04%2FlvOqPusvE%2BrUBg8FHDstOLTWTmm84G4mTjfV35oS29mwRtvuU8wuqRCeRFd8b1BGuOY2ihGEAK5ShoSBZy%2FSqHkjMdrrW%2BqzM3rCixdkJAbfotQ%2B66VlU0i%2FH1cYU5Lgrpf9IdSpzZyatBYhAt2p%2BF3YCkfn15yxf9%2FmUjl%2BqhI0NQnj0SAwYw%2BtCuzwY6pgGg2GbM2QDwOlYr8BK9VUTEMtKZmsB5%2Fep%2Fr347VdlXPVedPWN45T9gYgE2ADZ6XYYCEJq6eThjHba3qGOvuDKUm6uMT8myG91zgL5Eg3XenTIR1TrK%2BjgsCv77sFnVgLQj6hgPt%2BAnxF1N47PIsZCOCw35%2FA%2BSRPgXFJFgIzeUCPYI1mhKOTNYhjjQBj2wnWeCB0yWrQH0hxaOR4bNYivryKruICdK&X-Amz-Signature=f0bb06d2c8ecba627856c70dc3c8a784ee730021bf91f6cbe8db71da96dadba9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664ABEP25%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICvRqi2jepTonT%2BT%2F4LWI6BCheVDDDlQzifDqWvTBRgWAiEAxsivcP0U%2BoCDEfUYmntQEZ6PpdmdK82ldEOOssHvVr8qiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCaeGcbLpkAOGMQheCrcA8AW7mwHSCi14P001jPLtw0tK7z%2BtcJ7QFd9dmd2no4zTrQUbMwSMcWPes3CqRVVcRth7F9m%2BsoElijiQVF%2B9XDZeH8ZKFlX9zy4f5zkuqpcUEtWhaDlMNH90G4LPbuyH9AXVvweCC1nV5DE9e1bMSe8z1ZuGE3Dsf40wGDlqXR8WUBePfAzwRXG88LX3PxAiI3g51XrezW0otYaWUHQRuakiKfrgRfLhx%2BCX5VgDZTlvcTM6GhzZT0rDf%2BQbHZhnFKLN0RfDZO0m1zqqu1P0fzZJwMhsC%2FEJwCM7H2p8X8EjjZMenICa9XP7JrH1vjZTYRIX%2BcJCowjARNipKZM3ax2fnHDl32Sf4DGnquHMCrOw2e6UDf%2FDF7QEN1Z5JrL1CL08k648QpXCtAOxXfpg%2Bxn4aqFnLyL%2FPFXtTtK2%2FLQ6i3aDnTXJisc4DOY24VyOlijefOHiGBROyJlMkN2rK%2FrBp9ac8Z3ZpvP7E8vCnpt5zZ%2Bb8xtt2CEtGyaD%2BTjgmRT2bVfMGH7Ou7YHVpuY%2FQmxERoEL%2FQcO422vJlPlLh53rmB9pepFQpkU6NeBZNJ5wDAjf%2B5TM5K4PORThzLupDtq2zSiHp6omlv2TVTHe5vkwiM0qKR8Iyr5urMPnQrs8GOqUBrn5egmlPkDFkaA2GnICR4TL667ARnsY%2BB55OWiIqruPwewE01AYkpxVkMZ%2BiBT6W7fioMx4VX%2FWJeNDRaZK4zxSv2UFBHnUevPOqceiuRMDYRjBQ%2B8P1RVjPwL50M1Nv1hGT2sgbvKBB9WkFjOndUnLqONBWEeHEDFxBg%2B%2FK9GLdkJMmyWiSXFpgNGofx9JLt9avZe%2FBR5ArR5UhJXvvkBjNXHYY&X-Amz-Signature=ce07fb1de62abbf164fd1507e108e659f8b12bc619b4c4c02eb18e0b48dbb979&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AXVEXCA%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCteBA2NzAvG3WnDQjUoqS%2F%2FTv7d3IeR%2BTKyQ1%2FAZbSAAIhANoes0GS%2FhbJd4u%2FA5EbXiHZct7EQD5eRQmny7lclhUyKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgymS6Bi2R%2FU%2Bacgf7cq3AMSrBube02PpqIj45mKBb3S%2FXjSv8X%2BqBsw8wdwuAoL771d9yxqTTm5ImnIZ0yBEPHuadSf7UPf3Kuor7GjHg1QLtS2bKLQwYQ5ykzVcSD6Hf8USp2PotV8kVQHLb1MbHDzhGAhghknQniEqDFIhk5u%2BNRFFQ%2BjMkF7h9HzcUiqBXfkiffgKPo5LLiwyHdTzLAWAjkeK5KJQ4i1trwA2k%2F43c9K5neVuWJ8WNhdZuHhXcwzFV0opo954GCa0KoMFWHZc%2F2YY7DCUz0%2Bw3m%2Fk%2Frkz61lpqemMJnYIg8uVky3koAGDgLS7QWklWMKPbSozYv4VI6uUQ83Ic4e5y%2B8dn7B2i4a2crrxAgM1%2Bn38OMHwkOtu5X3aSO2lcdCzmbLfHGwqzmbPN%2B9katv1FaSTvPPF%2B%2Fc2mS2T26quTgn%2BpxKsdZwxnnOPB53cIGubPZX%2B0%2Fbmp5UGI63CztE%2BsZiTpZzux4P8FQ7KVx2r%2BxnSEwwlVOU61sc1jGWmb6LE%2Ft4NpaleSqy0Sc%2BV0t9fYT4%2Bj1IvRbSjwzUNigfa8Hhu8jhnKEOa3hcz3B2wOm%2Fs5%2F0xSVZVChOXfg6LYUbvcwUH9MWMYZuzIEgcvBYY%2Bd%2FfiTeIZC%2B0BAeZFwF1DorXzDI0K7PBjqkATBKY%2FlQDtsi705HPnxKeYRLLUSxb%2B7gb8ugWVE18UltplQ8Pih2FPPP1GxZCjbD43twzV6D39RePo0pxn9jwgnMwZAxpZ9ACbli5ZYdHkV92LrZg8sHqJW%2FTzeCSXhaDg4fCxccJJ5I80Mtn9DFKmLIdtoA6Wh9WvaZaWlv5EmQiwil0%2BFitsZSq1nFwRkkC5AmZESRbBNieSibRT9wXphISCXg&X-Amz-Signature=4fd8f4252e8ef6e0701c712376bc1277aed103f3a14cfda84beb10b47447102a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BAUDAMU%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjiebeu5RwR4sWOTbKViLuUbfYVabUGoVKUo9BiAVaaQIhALoaSxyItfexrhqRrlJFrjyU2ind0p8mWWdZkCRnvMOoKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igycq92VwUrbOIWJwacq3ANW%2FvobnUirklaQwYi5qwrFQ18gLdvXL%2BCgLLCAFyqYFGD4gk7nblLljMp34IypwyOv0onV2hR00%2BCb4hHvukd2coDS0qVmRLRO37owoc%2FGt8Bl9nXdTvxWMfNunLqdHUq%2FUEKPkbobiQYLpc%2BOPLgQZTj6cAYtHRVQm58u%2FhqL9qobAh%2F1CDLXggvIX5UKtef55f0Nc0iDiW1QWT38MM7DuK7WbdS%2Bcp3BVGMgThQ%2Bgd23vlo2PDfKddu7ONrsAkdTsuMndeoGlJsvIXu%2FvBfnEHnXMWgDf9FUt2HP8uPojql4BDReADHjkBFnSJ05A14gOVPEcCHVZa09VTDRNlR3QXix%2BrmN4fOWeEdS3OO1LfgElLnwGT4Hk7X7YHosTIoK78AjKAymTBRua54MVtmok6DZ9Z61bV5yAt780eRj%2BZjMT5q0PEn3ulPjOzj%2Fsp0%2FBx5UzZtj5O52LR36tJu1pij%2FYppY6%2FJCOkxLIm4qXTNLTW0AO8vPKvCP%2FoLg8PO6DgsmW9wZ3%2BBQJTmYJI6PIcqa8KTm3E2OF12IC3nJiqAG4V2EIVggmyk%2Fe4Jxc4GqDpnNockz8%2FwH%2BFketFG2bULVXLafRXRiYHtoIGg71eZZ8eXwrnBJdNHoETDv0q7PBjqkAQCOWUKH5F1IeuCDau3pSDgYaPioCGjK3JaSxma1RMTdw2td5qE3dy7siYWAbT8F%2FVl%2BCNXCJwiQ2GkrYTRJJoUTUHF9kjZyzsD7lojNk3eStnMqed2tquNMVJGPMeWGwv%2B%2BsSsV3RuMVivIOwmSWKTqSGEoZrlfbbSejVY3Orp65WYXzr66T%2FtxtfjtNLXI4s9pl2jeFDE3BIT55alK2DStA0%2F6&X-Amz-Signature=35d599c1227d84264f0899aaa88b87e46a41ce59a51b5097e56f9b37fbd20950&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFW2T6I4%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDX%2FQqD5mla0598g%2FcJHgn69czvuHmYXaRtNUEk8hweVQIhAMEVTG9aK2EDMcR0IMGLS75OZ8P2FA%2Bma5v%2BY267oFbZKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztVMW3EtoImV%2FZbiQq3APs4pYgFD9P3L5MRcB251wPzheSvD7pw%2FMAG3TxI6njoFS1KUwX1z5Lr02U2S%2F2GqgV9azfQRm3HePjXEmmT0eTw9mQUF9Z%2FYdozrF7aD8DutUAyL6C64MjZ1GSRWSwyYWup6BH1AICNC8Akkjl8eRnRS%2B5OA9mpeM3wgfVLxra%2BKmGDlLKovg%2FNq%2FIoq%2FZPDHeCjOP4dAyybDg2OOwMK3HK7XVV9JRTbCp0utTxJi2DYv83xz2CueT5zEC4eLpayacWklDGuO6JkHBrOOk6TXZfDVOH6uebd%2FGeXWrc%2B1AIAkHUEpjWnhUTztgQzILNP14FjwkXfziatWwvzdbT43Er%2FnZIfEgMtk3NrKhh1T6F%2FHikxYvpgOQypanDvdf3qo%2BGIcb9QPseM5LdPGCbuXRgmt6q0yJiiLg%2FoOQuEJmyw5PKU613FIIwnBQw4O7WDJfKdiVmlwMciZFrfm4qvBAl3Vd4i1W9ihXiqgsT1CgOYiZKRqlOy3WRCH3SP5A2k%2F2sKdPwOzi%2FHGvcJL92btlGlXFeRtfZB9axTy06PEpCl2GueWS69ovKyvpHZuE2OVM6lkCuFnTslQNMSc6lcuGdPEoXi%2FfRT3fPlhQa4SxQlhBxTCDNyuaxDMfBjCG067PBjqkAWmERNKQmLjzybPmqiMMDf5R6LZxM28Ow2WZBtr%2Bjkp2GifRgdv47VMFghWwKi02%2FIpeYMuUnDIGslmL56IBfi1F%2FnPZtlAfKC9NwYt3yvJzGtevDjauGkm8msyJZ8GVIF2qW2tXRe9DbmpkEQnNzkesWdXb%2BvLIg1n9uxLiT3P1jo6EBimmIFsIxbUVTmkLT1jU87CHV%2FuVdMyCYFTNuQKoe%2BtZ&X-Amz-Signature=60d2d0fedc4c31023728af1fd57cfd730693e065d907ccda2abd8f1ffdf64e1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFW2T6I4%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDX%2FQqD5mla0598g%2FcJHgn69czvuHmYXaRtNUEk8hweVQIhAMEVTG9aK2EDMcR0IMGLS75OZ8P2FA%2Bma5v%2BY267oFbZKogECIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztVMW3EtoImV%2FZbiQq3APs4pYgFD9P3L5MRcB251wPzheSvD7pw%2FMAG3TxI6njoFS1KUwX1z5Lr02U2S%2F2GqgV9azfQRm3HePjXEmmT0eTw9mQUF9Z%2FYdozrF7aD8DutUAyL6C64MjZ1GSRWSwyYWup6BH1AICNC8Akkjl8eRnRS%2B5OA9mpeM3wgfVLxra%2BKmGDlLKovg%2FNq%2FIoq%2FZPDHeCjOP4dAyybDg2OOwMK3HK7XVV9JRTbCp0utTxJi2DYv83xz2CueT5zEC4eLpayacWklDGuO6JkHBrOOk6TXZfDVOH6uebd%2FGeXWrc%2B1AIAkHUEpjWnhUTztgQzILNP14FjwkXfziatWwvzdbT43Er%2FnZIfEgMtk3NrKhh1T6F%2FHikxYvpgOQypanDvdf3qo%2BGIcb9QPseM5LdPGCbuXRgmt6q0yJiiLg%2FoOQuEJmyw5PKU613FIIwnBQw4O7WDJfKdiVmlwMciZFrfm4qvBAl3Vd4i1W9ihXiqgsT1CgOYiZKRqlOy3WRCH3SP5A2k%2F2sKdPwOzi%2FHGvcJL92btlGlXFeRtfZB9axTy06PEpCl2GueWS69ovKyvpHZuE2OVM6lkCuFnTslQNMSc6lcuGdPEoXi%2FfRT3fPlhQa4SxQlhBxTCDNyuaxDMfBjCG067PBjqkAWmERNKQmLjzybPmqiMMDf5R6LZxM28Ow2WZBtr%2Bjkp2GifRgdv47VMFghWwKi02%2FIpeYMuUnDIGslmL56IBfi1F%2FnPZtlAfKC9NwYt3yvJzGtevDjauGkm8msyJZ8GVIF2qW2tXRe9DbmpkEQnNzkesWdXb%2BvLIg1n9uxLiT3P1jo6EBimmIFsIxbUVTmkLT1jU87CHV%2FuVdMyCYFTNuQKoe%2BtZ&X-Amz-Signature=326c45bb068b3cf69dbcfe36ffcde0e0a084c75e925682e79a1f8d0f15f53137&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HNZOPXA%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICt9BrsiPzpsqJyFEoo4xXpFIEuuBMtSlPUdqRd%2BfQerAiBdD9%2Fn7sfl5oLaKlkfpdjVXNqHXYsueOc%2BSKoixTmo2CqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpPIHv5OJ37PsSTiCKtwDbTLj5umxKJ72J6TcYKemzh9IzhthYt5OM4sXp9M4hvqz39hDBt7g66JaT6aNX4LirGnvAWRXJxhn1LUf4dgwKpEIpr%2FuVFO7myYcmzm0Sc1xxjLyJhTZjbCfGc0puAqCGRCMXzoIdLfrGfC9%2FGjg6Q4GNZCvWUZuJfWpCzgT66gwJx1png%2B2eZmH4Pdk27N40cIHF8sS8%2FBNu0IVTxkqpTxXj9MFlHzBe4a6xaFJDx60xONGcxoJBuMEKI2UNRUmDFHMOoXeq4XZib3w2nBCevXGfbySWRXk%2BARq1O7oP6J3O8nK0yAZcF56%2Bz9jTdpK0ttq4YpsM8PISffDtul44ZMiinHbTRk4rQm89JLFJB%2BbWduaDpS%2BoEfg5g7pF5FXgvUwjQ0XowTidzxPXw24RietmzaYjQYz7YttXt8NfOwDjSrysnB0LS0Rcw2iZCfzesLWWDHQCLCBMjdxnY1eLkpcIXfwMfzUCnA3kyLMMz0JZCLDZxWpZatrxmNpxs6ecK14nNcCev1z3eyI4pFPDwh%2B87GFe1rKwb9cNNt4t7E4a5%2Fjw8jMrLWz6Z1lAsWKl2iR5BM7pOj%2Ff8ZhjXbJHPO1DfyMx%2BzvphkfoKiGOhaxie0BK7%2B5HE2JEUow29KuzwY6pgFxPFtbe9Bc0P%2FA%2BvqbNJDjQQHrV%2BSJssooA3QpE93%2BuOPbqYJ%2FoSESquuBNiorRqKsz%2BsFv1EY6fx8Ei3Iz%2Fk0ZCTAg285U0IJMZDIbEOmY0Cvy5YnzW3Kf3McIxfmuuFQyRY8C%2BdlFQ%2FLvQ31QI4ndN1jFR6vLEMESPxSuR2cADnpWAMMfJhAxX2GMwP4sUX9LZ1vq%2BLrSX7vGY%2FbzCuVUjsXh3RJ&X-Amz-Signature=02a303ccc8c1c9724c6587b58d9d25a09444dd97f96d20f8f987885a87f3f228&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626QOYB35%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA80YykLzqzrq%2FpmCu91pHckWjKMcNBSc7pXDOtz%2BOTNAiAgZspdU7tpcSBM2muAlMfKf506x7cSQqtXfeEk41%2BAECqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqzxUa25wNreXhuquKtwDxss7HkSjFfk2sU0Ancc2EYIpdYTjYGs%2FhEeqtVpswJNDyra%2BzNiQbpq3rrHrxddAP%2FXgStAWuLpD9N%2Blx9ymvQ%2FY0E2FEstuqUBT5RkEqj4vl7RnxYpnuxSY78TUEWUn9ELqlmRg0o07x3XMAPaymA82JILQmEuYclFkvFXoXwyq8sB5HKNPHtWYhvTkipQOddeaUO1t%2FGGjFEeX2KUqo8STPviuRAgHV2092y5DE9I5IqV%2FMGf7XIdHCeHXLufJFhGtiuew0edhpaAmZW4gpKG2hzNs0lgoo2PW9oD4PSMWNRXHX5ZQrNfvcZwcXClGQW%2BYJgRtR17ruqbpwxlE4BUgs3bmk%2BHSNt0NBsYLBF32gvX2JeV7APTzhvkMk1udg9qVNDEHQhZ%2FMvohpWnN%2BFo9OQeYRmFw8N0UuNVAo%2FcF887WkUWsqxCEly6b2TdPy3b0WS4UzC2QmfyTGHaT6KYi2wozobk86ATIhOy6UWXvucUUUB3jRzU3y%2FsiuDDgETfbcUfKZwAIg9D0EUlKpJQw5g47jDtdrVpKCpTYnTkVYvchgKFwBLGdm1ueV5Hcvbxqg3ei8yImeZBiDPHz0%2BMt1SoTDXZ55ULhmepaeYWO13L2MeGeoDZLI4ow29KuzwY6pgEiDkkEBTAsd2X3H4p5A8cXuYmmzJ9Qbh%2BQp6JUYQKhAZgJpe0o3rQzQvOr7Wjmt%2FU7SN8kh2yF%2BQhJ%2F56K8u4BxA6r2OTznxYeVbjypxUTZwMV76pONX5gGXUDZw%2BfEmXDLTewsC%2F3fbSxiz5F%2BHxQ4blLaT1xXopnYC1rMPy0l3mTjzN0nyGrM68e%2BfkePyaLUDbZfig5q%2BjV6Qd6SqkdeqN8UTdB&X-Amz-Signature=413c0cde7c3439f82b8c041897dc52245e6b2369c9b6acf8e86349a3949702d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626QOYB35%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA80YykLzqzrq%2FpmCu91pHckWjKMcNBSc7pXDOtz%2BOTNAiAgZspdU7tpcSBM2muAlMfKf506x7cSQqtXfeEk41%2BAECqIBAiD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqzxUa25wNreXhuquKtwDxss7HkSjFfk2sU0Ancc2EYIpdYTjYGs%2FhEeqtVpswJNDyra%2BzNiQbpq3rrHrxddAP%2FXgStAWuLpD9N%2Blx9ymvQ%2FY0E2FEstuqUBT5RkEqj4vl7RnxYpnuxSY78TUEWUn9ELqlmRg0o07x3XMAPaymA82JILQmEuYclFkvFXoXwyq8sB5HKNPHtWYhvTkipQOddeaUO1t%2FGGjFEeX2KUqo8STPviuRAgHV2092y5DE9I5IqV%2FMGf7XIdHCeHXLufJFhGtiuew0edhpaAmZW4gpKG2hzNs0lgoo2PW9oD4PSMWNRXHX5ZQrNfvcZwcXClGQW%2BYJgRtR17ruqbpwxlE4BUgs3bmk%2BHSNt0NBsYLBF32gvX2JeV7APTzhvkMk1udg9qVNDEHQhZ%2FMvohpWnN%2BFo9OQeYRmFw8N0UuNVAo%2FcF887WkUWsqxCEly6b2TdPy3b0WS4UzC2QmfyTGHaT6KYi2wozobk86ATIhOy6UWXvucUUUB3jRzU3y%2FsiuDDgETfbcUfKZwAIg9D0EUlKpJQw5g47jDtdrVpKCpTYnTkVYvchgKFwBLGdm1ueV5Hcvbxqg3ei8yImeZBiDPHz0%2BMt1SoTDXZ55ULhmepaeYWO13L2MeGeoDZLI4ow29KuzwY6pgEiDkkEBTAsd2X3H4p5A8cXuYmmzJ9Qbh%2BQp6JUYQKhAZgJpe0o3rQzQvOr7Wjmt%2FU7SN8kh2yF%2BQhJ%2F56K8u4BxA6r2OTznxYeVbjypxUTZwMV76pONX5gGXUDZw%2BfEmXDLTewsC%2F3fbSxiz5F%2BHxQ4blLaT1xXopnYC1rMPy0l3mTjzN0nyGrM68e%2BfkePyaLUDbZfig5q%2BjV6Qd6SqkdeqN8UTdB&X-Amz-Signature=413c0cde7c3439f82b8c041897dc52245e6b2369c9b6acf8e86349a3949702d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673LPBM2H%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T174046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGUoiYoyjaxZQviic2ve2GjrXqNRuCPp12ZSGLI1mB7fAiEAhzLDDZJlWmYdI9BrdarQQQs6CsVHNIcbnslKZvuexJAqiAQIg%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC8zKRjNW9tDNiKU%2FyrcA5XWlpaGzqk7Gp05xg%2Ft%2F4uaVfTkkAI%2FCCtsKXHHCnr2WLgYvSU4sAoFk5n9NoukFkHDNdnRraQTmdAtdpJu04WhtTmZx6YTTIrdIetr6rceiidl%2FZRTEr%2BU8yZwZzPXhakdih%2BhJjXSMQmL5VtDlSDMg5k6oK4hpszoNf71g1rRR6sd%2BZvbPA5eowi40%2BAy%2BxK%2BiPaXc4CUc97e796dGkLyg1f4ec51ZEQ7FDfCFFZSfqLDthRInymLQSrctTkm5rF06uy1R3mCnv%2B21NdXRoddi%2FYmG1dSeuzJiRFG8TxTdmaLbuEBxQH8OFQzJxvm3Wf95j%2Bxh2%2BJGGpUjEZzuGi6Cbus2iOunT%2BqhOHcccvrtLx9e7jFZureJXBopwgIOm2v80DRQNKqdjp8oQr0cKFswOsMukHh1WpqZeGJYC8ZIXHAw%2FzAS%2FMtQLi9q3BDZLG%2F%2FrzL2NSrTG%2F8XOWD7B9evbdvPhhDdHppQtPk8X%2Fw%2Fph6k9zaXC86O9ClevHz87Oo1xKGhHeDgwacn5DLJ3LdLw8VvNnamdZiQYQXeRqUjhFFTickIMlVH%2FySv2ey3V3DUB8DVOtVVf1oQkrh8fNb4oB%2FG7CA5s7HSifi4pMPN8EFmatO3pJQoHlBMLjQrs8GOqUBdfsxkyo%2BuJWPdt4aeWcCCB1yjkwwU2dE8D9ns3YE6ZUmeWgVFvGuDFPl%2FTUm7tQPQ7ijzHOmBSZf27EoP38%2FWhR4qPbBOUssfBLyyinSBNxAip0Zfb9VEs0OalVRmWeywlTNmFgUh16c6r7qOKe3kGubwfqJzBKAf76KEu8ZoRp2Y444lJQI0ZD%2FhOmYz3HesyRjlw%2Bq%2BwkSuC17nSfs8eExU9We&X-Amz-Signature=22972396969afd5c20a6aeb6fa8f827c5fb32cf3607c87482c68023ec1b2c603&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

