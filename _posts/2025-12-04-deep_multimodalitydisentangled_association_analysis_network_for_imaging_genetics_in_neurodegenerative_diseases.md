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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWOSY243%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDTq5UFJfKEuzBKY58Mj5jAAhjX8pmzdqs%2BX1xYkdXhCQIgUqqrRviGAetuFkwNEU4c8AnSNhFn7DOF7ZukTkBxa70q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDGisSYJgCRbKt%2BW4tCrcA329oMckJvQTwErUBC3FzCFcMvCoIXMBeOA2Lrja0DPkfVMx0Nr9YWjAp8ftwsRGOVsjMixH176asVSNgc6qUrmfaw9hG4w8bQwQv6Wm7JbfoqE7CyIUnZmQ03ldihpG%2F26RjaUKEUaMipBFgnbvZcdc%2FXu6ZTCEB3UhqrP%2Bn3Z7M%2FSong8mzTIYSHjZKabdzE5gO4VSTo8g0dNRKVINZxOlfuHVT9zBLlwQ5bWsu0A%2BIW8voAccihaJQJY0zFpywv1lMLa55dXbMEhCVyNhD5YRz%2BzKIE%2F6sAWZAPEfdFAWy8DQlbeqOvvTNfGbiQt3%2FIkbgPInjKxhD%2Feeg9eKnL2gYrJEF4Tm3hCMSUOrIUZNwiOcsMEPwyP5YUVcjV%2Fx58PiH5LS5Bt2tqwluxUKcBPw4v2aJ%2FupZbUo0tvzIhu2RYcfdXWN4vgwYkXx2yuWQX7oGVF%2FiLWqUJYTpzrzFmbournaIfnHuYth27bB5kgeFGGywZHR0MDYt27CHFjmWGukLY7I9BzimV9%2FKJKdqHAofCxUkCTvY8lhO5bqIPd3lFevodwslwyZjtjcGH3L85JqtzVRQLSKmmkJVM6DeF5IGcKLe0z%2Fe3wJOrKIzpKuCPvDp0X2GmsYCie1MKbo2s4GOqUB63eV3syJkQilgrk6J40OHwieV57BXekjOilvVq5gFWG8aO5gfz3DvXqYOYeDKWbFl%2FGZiSWUhlTKQi6VWBxjaykahl5arVMraVNBZufbhokTC67oduk9CZbvnho%2Fo96GTel%2Bb%2BMHIXij2KBJQ9fESH%2FGGk569QtPtior3Sg0iwmt8MbKF4WitJqKkM7LhArbdsFMvxZIvj6Z36B2pMRV%2Fws3sdaG&X-Amz-Signature=ca9efac1b1437f0714c242900f3731a8fb0eb346bad72f541f8a3efd80803594&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWOSY243%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDTq5UFJfKEuzBKY58Mj5jAAhjX8pmzdqs%2BX1xYkdXhCQIgUqqrRviGAetuFkwNEU4c8AnSNhFn7DOF7ZukTkBxa70q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDGisSYJgCRbKt%2BW4tCrcA329oMckJvQTwErUBC3FzCFcMvCoIXMBeOA2Lrja0DPkfVMx0Nr9YWjAp8ftwsRGOVsjMixH176asVSNgc6qUrmfaw9hG4w8bQwQv6Wm7JbfoqE7CyIUnZmQ03ldihpG%2F26RjaUKEUaMipBFgnbvZcdc%2FXu6ZTCEB3UhqrP%2Bn3Z7M%2FSong8mzTIYSHjZKabdzE5gO4VSTo8g0dNRKVINZxOlfuHVT9zBLlwQ5bWsu0A%2BIW8voAccihaJQJY0zFpywv1lMLa55dXbMEhCVyNhD5YRz%2BzKIE%2F6sAWZAPEfdFAWy8DQlbeqOvvTNfGbiQt3%2FIkbgPInjKxhD%2Feeg9eKnL2gYrJEF4Tm3hCMSUOrIUZNwiOcsMEPwyP5YUVcjV%2Fx58PiH5LS5Bt2tqwluxUKcBPw4v2aJ%2FupZbUo0tvzIhu2RYcfdXWN4vgwYkXx2yuWQX7oGVF%2FiLWqUJYTpzrzFmbournaIfnHuYth27bB5kgeFGGywZHR0MDYt27CHFjmWGukLY7I9BzimV9%2FKJKdqHAofCxUkCTvY8lhO5bqIPd3lFevodwslwyZjtjcGH3L85JqtzVRQLSKmmkJVM6DeF5IGcKLe0z%2Fe3wJOrKIzpKuCPvDp0X2GmsYCie1MKbo2s4GOqUB63eV3syJkQilgrk6J40OHwieV57BXekjOilvVq5gFWG8aO5gfz3DvXqYOYeDKWbFl%2FGZiSWUhlTKQi6VWBxjaykahl5arVMraVNBZufbhokTC67oduk9CZbvnho%2Fo96GTel%2Bb%2BMHIXij2KBJQ9fESH%2FGGk569QtPtior3Sg0iwmt8MbKF4WitJqKkM7LhArbdsFMvxZIvj6Z36B2pMRV%2Fws3sdaG&X-Amz-Signature=ca9efac1b1437f0714c242900f3731a8fb0eb346bad72f541f8a3efd80803594&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPV6EK7I%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDdct14wxl%2FNS%2FSebRz%2BoxclX1rwXaM1HzQUGWWb8b7WAIgXCcGHqZJrFFaamyzaSFmLjSUyyDZeN3SN7BqNs9SvqAq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDA9b8OxxWKzsF13gKCrcA0bDd9vHD%2F2djjnNdeS5SyXts5c%2BWxVboCdU3mg2gjmfqig1MYKVDAjyi3%2BXVOec1ahwr5rdLyOqicZpV6qljea%2BFTK8tJu0Lnr6ToaWTmBvR4GJSvS0Ba0hM%2BsPd%2Fqp1lxq%2F9vDZ9zbjKCiQSwEOhMWuSW64u9RvGY8vPu5JQ483sh6McptcCMi3hJRpXtse1arftgjzglBFuRORmEBAYsOO4Ml5OcPMi834icF1KEstORALCi%2B7Mmtcsk0TAzITB8uTb1txppMg7rsB3%2F8CF6UpD3wp71Ht%2BAiOiA8TDKHHGywWRhqVMQ8gDlD0VlANrwwY5Q5yBXLozR2cV0CK50gxe%2FNVSsVtGBuT3w%2BkWcSRqoTbiDyJ2jdMtLHliGcFcFaPllweNd9ryDyqB%2Fphy2D5EaLJzkFINaM6f9Wrm0JcU8h%2Bm%2BNyAfQShX9SII7SW3gF61iNuAQGlbcgW1lSVs6cPVJwnzr3VRgPuX2kh%2FvLwvm4k2Zst3LlCj3f0hha8JJL%2BMLDpKzNC86f5OxB7NFbP6K5KBmyX1%2BHzAA7k%2BaOLmPPmFHqIDhBeBcTJXZ1VPVKP89AekBMMosFJCotf3kIdUX%2FyoBrG6kuKqOPA9n%2FrwmyrBs6lH0FtfMMKjo2s4GOqUBXgh493PJQZRkiYrufZAnk%2BcRzm8owsoA%2BF6Kx3TRReWh1bSn7YxLVKJ0BjmrTzuO4inH42ALhfxRUzgnA6DAP6W1Sk5orWuKhYaWADvYx7dHcpSlsUUEM2rWFtk0g6cZX6ew7dIQyt%2FoSC%2BmuYD2GFNgxEk4QywuSq72E4NtfB%2BadJROO2%2FDzEHD9xG2mw2Qy80lKxD9bQV%2Fg%2FO6L8J2m44sEkkF&X-Amz-Signature=05edc190849f5b0441c6995fb132cae632a3aae4f34c5d4b75d24ab3238cc1eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GE5QD53%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDzjMNPCvJJikDtbIWf9ru71drNrEeu1fSsCXZ0E0ZtsQIhAKpRtRIh5BH3xVoPKZcuCYyYMqd4hvo%2F3PZGRozyOcGkKv8DCAUQABoMNjM3NDIzMTgzODA1Igw1Oz81PSKKNyFufPcq3AMjqKhfN1Kf6Bl6zAasbhs2IkBvO0EVCJjFsWjiDQUMSDev07AtswP181Bqg0PNNGlAjdMNPMK0%2F4WGIFJCNpLDc7DMtnjAIUujOvc1E0Hbv3UkWccdnFl1cY3a34NzWPvbiTEvde%2BYXHEBDBEGl9xCR7Z97t8asBNmXok7bXoWzDPk00sxRIrKTrKHZ5Ogl42Pc%2FTpIa2NNx0WFYlRRGbUsNU7pJhLlGPjTJE6rqtOf5cdR8TxH%2Bgejf2L%2FMSjAKDVdmkgcVejnDhYRBa6ZjhxQoglblje%2Bo4mkkHPTzNQYbbU7DaKbTYQKDJEhv8U9vlZc6oWvrcuww07%2F7oqWfhinkYDWgpwuYrxBKK95SbDD2y5I9uQ0psAo8Y%2BhvDZJ9fo13BMx0h4LdS%2BJFMNypTnCalr59%2BGXy9diXdZQZpDAnELjFPMAEYZzYvmZtVt9HJc7yoTVI1dut1F%2B%2Bdv%2F4L0EgPiMgK6yYYn74jz3rxIfRAq6jz2riZxV1M%2BeYs99UopJh0WDKperAREbOG8tHbgSxoPJCFLvX2lDGiIIla%2BgHr8PnR06RQAoeCry4xBHwIn9UVgkG5fgg3dNTaHlItfJFx9wJmZXBitOfVBD%2BWz1000RB6Yfe4Q0dUYmjCN6NrOBjqkAY2Zx5iuYMz8tXvMAmvphE5tpZUgyw1EAd1xpqarTwDcKhnMRPoziTTs2ESON1F42c6BrclTyn%2FbOrhxI2h1BrbheO0VgfWvqrx2zgQFeauvLO9TdsTHZ0w2uFNX8fGXcQ0XV4zgpjxjqTwojCAOI%2BznSeyAtoUWJ8q69ZYBkPEoZCaNreLpbXR4C6l7tCUDBB%2F%2F6GmBYk5tnyUQCdWhs3OXD5jO&X-Amz-Signature=aeb50db086083546ca52d96a2a2a2b076c90bc525a1f89f459279b39b6c8b80b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GE5QD53%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDzjMNPCvJJikDtbIWf9ru71drNrEeu1fSsCXZ0E0ZtsQIhAKpRtRIh5BH3xVoPKZcuCYyYMqd4hvo%2F3PZGRozyOcGkKv8DCAUQABoMNjM3NDIzMTgzODA1Igw1Oz81PSKKNyFufPcq3AMjqKhfN1Kf6Bl6zAasbhs2IkBvO0EVCJjFsWjiDQUMSDev07AtswP181Bqg0PNNGlAjdMNPMK0%2F4WGIFJCNpLDc7DMtnjAIUujOvc1E0Hbv3UkWccdnFl1cY3a34NzWPvbiTEvde%2BYXHEBDBEGl9xCR7Z97t8asBNmXok7bXoWzDPk00sxRIrKTrKHZ5Ogl42Pc%2FTpIa2NNx0WFYlRRGbUsNU7pJhLlGPjTJE6rqtOf5cdR8TxH%2Bgejf2L%2FMSjAKDVdmkgcVejnDhYRBa6ZjhxQoglblje%2Bo4mkkHPTzNQYbbU7DaKbTYQKDJEhv8U9vlZc6oWvrcuww07%2F7oqWfhinkYDWgpwuYrxBKK95SbDD2y5I9uQ0psAo8Y%2BhvDZJ9fo13BMx0h4LdS%2BJFMNypTnCalr59%2BGXy9diXdZQZpDAnELjFPMAEYZzYvmZtVt9HJc7yoTVI1dut1F%2B%2Bdv%2F4L0EgPiMgK6yYYn74jz3rxIfRAq6jz2riZxV1M%2BeYs99UopJh0WDKperAREbOG8tHbgSxoPJCFLvX2lDGiIIla%2BgHr8PnR06RQAoeCry4xBHwIn9UVgkG5fgg3dNTaHlItfJFx9wJmZXBitOfVBD%2BWz1000RB6Yfe4Q0dUYmjCN6NrOBjqkAY2Zx5iuYMz8tXvMAmvphE5tpZUgyw1EAd1xpqarTwDcKhnMRPoziTTs2ESON1F42c6BrclTyn%2FbOrhxI2h1BrbheO0VgfWvqrx2zgQFeauvLO9TdsTHZ0w2uFNX8fGXcQ0XV4zgpjxjqTwojCAOI%2BznSeyAtoUWJ8q69ZYBkPEoZCaNreLpbXR4C6l7tCUDBB%2F%2F6GmBYk5tnyUQCdWhs3OXD5jO&X-Amz-Signature=6f3f4ed0a5a041a8b82038d313ed75be6b581bc15c42acd8a382de176d99a825&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XUDRW47%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDiORQt5it5Jr59psoHecLUB1OuunzrI3lA20dAn9YupwIhALSUFt3hgy6atiJP334y%2FUYFpG%2B6mUPaLKEIuDpKaps%2BKv8DCAUQABoMNjM3NDIzMTgzODA1IgxVDkn2%2F%2BXgalhPyeUq3APtPisGDaoOFQhLxv1VOjenExybHmqRu1nIOLjYGrqRvyFX4%2FFY8x5e3vKyWyXuLE%2F2%2F%2BaeBF7UZFlCYS6TniNao7EJqOPkCjbEfrZFdRM%2BS77%2FYCmvr0SlzyUAMDdogwAkhvVrhFx7i6WoD83xYMyBqWJv7oB7t2%2FZvK8bVvnfxykVGImySobIXsh84rjjIAS0DJdWQ9OWaCJf1X%2Ffn6mrAFnaZI9tXzNOSaxcc2lCQtfqg4Ib5RHNZg8qgVgD59OiZc0QWyxvlQYT5rd92VpXIOvxCv9xEhYNCLbJkW11BF%2FYAovd4CpCnPa%2FnG7nmXPYPtluw7c4GvVdBolZZFp31kFsaw6fajxJhn314Yr2UATa6%2FXjlpcbGHFjMgJWXKZUiCzrd485cAvo%2FNyBaUtezjeWIxC2qcdOZgoaYIcxkBEESgSTyRGOuJHemMehPBjpOctLbUAEPgsOIuSLkOC3TgpZro53yady0lzXSKKijyRLKQbpZwVovadI6RAvrUgE3Mk5wNqUvUIB%2BDhku3F82rNQ%2BNVWHa0%2Fkzybpl0Q8qqpTOg0EisWu008xejrs45WsB9iEbYSulTThNRYRzZAfk6Rvb0wUbrgvkUCqLCOUoGUtBaFw5RqxgOhOjDM59rOBjqkAY1hW1OoWNTIyAxGnvNzG63DhNnfiw4JIzF%2BxYRCpl7kCpPurw4uhpb4VTQOFbMV4wEv5v0CJD%2FsOa4azu87Wy5QOk960BUhMlx7MWWx%2B2vQYDtzF5mxd4LQQdlkEUOfnqD5Jx3N6o%2FVBlVu%2BIzFsLjMuzMalyv7HgrhidmPONNDkJJIdSD9zg%2F2yIfKXJailVVrkHSo5jYCjkdgF73y7LS2OCGi&X-Amz-Signature=287d9fe61e36838978a07df20563a3dab54b80b60cf7b1add55379998eb741fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCCWPG24%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIBAW8u6Ffwz3ITRrd8RPf80bkDejnGkw1Er1z%2BvYS%2FxnAiEA%2BIMnek8RDNxbsORBiYIHHkKfyMJFxFo7HVya%2FpXJ6RQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJuj24j%2BoAs0H1EU0SrcAzH2KIEUfu7oZn92B6DJAjO2X3t93JVOm2fQEWoJaK0SqTKDtMF82OnPOn6WvFwcYLNKyRQlomDdNaO13BrzVPpqh4dO1nCJcJFwZp%2FWsBqb7XVUBnfKDAd2gRSCA%2FLbQeNLSJHuQo6ifPJ3SiUX0wmHE8T7rkMREAUUgj6is%2FlnQ9TLnbTM2OdqjlISh8bi5fsfFPO9471zgBcFGPfFE648i4N4DoQRGGXpZHjZsTtFBa96Yv%2BF9ob32fTop4uoi4QQ81gVLDm%2FGuh6KBv1Rbh3mWjs8gDf68MOPKQwwXKQoGs7BFAskrZ1tOETpULWdkPsSEMg2ZB%2BKh3sxgq6bwkqUNsJyTAtoAMBVdGmOznZ7MlItMauu3Vesobbj7%2FA14gESuR1hnYN%2BFk7HMTdKalLu2ruYpV3SyQJmP3%2FlMidvxbMzI5cBwWGBhcHNGTa2jawwkRNDM7NDMcqRyHseJHmeHAQJ6taWo2kmIhbtgFBuN2%2B8K7HExQL%2FNQ%2BYHPKgdbb7kjXzMnZz1JFZ%2FqCMqkMtwx1S7nWlZuEDMX7wcLsqBgPSXS7dIU76XrdSsSxVh0Y2QEE%2BNYdoZa1wZfVpEb3ItcSU1NoAigfQ%2FQldYGRYrsg6PEKkDX1L%2Bd%2BMMXo2s4GOqUBSLd9vVadBZlLjYcNn8W2wi%2FKbI3A2rR%2Fi49Cig%2BWPbpSDycWaRatni6kw0VoGYQA7tGPXKCzUAIOCJihcARA%2BNG2mUImsIBt1i1pvPy1C3D9JOPceKUmZ5CBO44nzNifo1Dwxxv1%2BmZodvMbV4hUiv3qQ6SYSBAxYKx7cGGCepyRDC8Go5KByZY%2FRRSYTpqWG58PDzEcKkF4M94p%2BMYpp9v0yBNK&X-Amz-Signature=60668f71c5b6c933b6f15173ce653bf30886b51d35e923bc94e1bcbc8c1b0aa1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7UPYRFI%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIFiBBjxuskcYdsKg2subBrh7zasJ%2BOUeZQhY4ycAlWdwAiEAkkRNcoEVdz%2BPU3nOVtd5HDw5kdUxNimCnulD1BGSoUkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDABbljqxWCDquMcHAyrcA6UOE%2BMnVIrWFD5G9aX6%2Fk8IvbDaAhtrZ1GdE5ZhKXMeI2gf01%2FxzkzisEpREVYGM%2F1t2DH8ApOYnvlvCElvmRru9m%2BPDEAw2JO6YdFPChchFAs5Y12mvgsPUjJqCd1C5GWx%2FyoFW967bLyYQrU7%2F%2B%2B50cvIIs9hBbHsMe6%2B0rKUxaLMJbKuUA7BlYATitSvEFKFA7Agcjnoxu9%2BWVFUVkjj19miJiU5%2BeE35oMufAppHkbc4Soe4BaLf65tezxcxR9BZeLTJSF88244VGxLgFzVyPlly1DIirz14oyy%2FoKSXKrbPk8auurJc%2FggWCw%2FfGzyhWhymdX9P1FEHAKUq%2B9BbUOmMHq%2BAadhSZAMJQeD%2F6H%2B0b5MvcXW1GUS3Ag7jcKdRsJA23eHG58x32g8CRlyuN01i8siaV%2FGl8sBC2k6ZFtBpXV2Rc%2FMbHpzzsm6SkB92iTRIMzz2D%2BoW2LOf7L5QKQumjisNNfb%2F9DElke3ar49FwOtGyQA9SWRKUD4S%2BnFzP%2BNtMZeo4SSd61k6f1dqgyxewAaRbhu6HvWiTwXq6nkYnuWjdXuDAqMhJOkef%2FMRq3H5Qa0B2hCqaCehg8H76S%2BiDokLDBFG%2FcAmudCq3jJpcvg%2FhAmCheJMI7m2s4GOqUBmIeXDjcnpFVI5iGG2jpOpwm%2BBkkSodYlVKZTWwT%2Fjg7%2FRmEnb6xT1oTKq9wITE8%2BoRwj%2Fid7ZgvOLdjTh46EWlL81k7mMP7tsuq1C07o9qjfd%2FO8hrE1siGRX5doSBx36jvqN38iE40nALlQw3l1kRwqCvbvM2%2F2dXeuCrYoPYrPLzpD%2BVHryMbzuyLuT1iS7WhfLtahpIxT23ebniThhHmsHVGr&X-Amz-Signature=b58b4f6cbad3577d6856b35b113baec61e5a1ddc99f671112a100348719cbdbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGL2LOJA%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDa73G0xZSPm1D%2FOHrRYqgAn5Mhh3En%2FXwXSig4z5BLNQIgBZHNisdtkE4p5MO7GnbUdmSNwdL4tC9hVPMqdhl2MeQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJSdVfpxJyplNiQxLSrcA10gdPpQqzJIQsR5uDRMxcCSPegM7vRoS3asXbDi7EngJAyF8cqMgh1AbmA4goAqaT8XZlXloEOtpATjKvX5TOdrVsOl%2FDpdNKMMwJmOGur9QiIt4Q%2BAYsKDnOlWey%2B3IxCmPanYJSPIR4DGyZ2kPtSzo4omt02atsV0%2F3aTWQoq%2F%2BOrscLUpDmgoOxP7%2Fc0YUTUMk3hx1zbRhkqr2pQJRtiQNPF8ol8kCw8X%2F8Fbsn7IliEhjLXUvh0MkeKrHDxM%2FIod9viRAt0HkFCmiuf9XpiNS0d0wr93dYpAWbKkjO2HvbY2%2FT5mSiewH0UX4P4tIQD3ssYq2mZoIvS59QhXxjxMDqByeMMW9K82PMbDNl%2BA1Qqsdjru51EDtIYKwV7tVPiRbVTjmh8JP3%2BUmj0%2FreMMPbwmnoICtYsZ3S24N%2F2vT6olrD2lAv5JlKWuDQqGMPOWIszxnlIwqu1Co2zsovS7WjZM7%2BTPBlEVDIhFWMf4lXhxZFVbDyldd6m7w%2BH8O8LhoxaXWeGNwjUOqsWaDcSzvHUAnjWkRIYg7AcF%2BmIeiUk1bttmX2fAlewJFviGKKon%2B%2FjKf2ntYwu19T7NLcfVJK1m%2BOeBiU5cSn03IdHEE6PGDFnA6ClqJz3MKnm2s4GOqUBluyRA1hEet8XTpI%2FzW2y99Td7zH2WbazyydZ%2BDRuZlwBHRiSBpd%2B7AioIORZzRbL6nt8rhVO6EwC2HRPXIOnxq7jmSC74k83ZH6D9aMOP7BMhPenAfkn5bTKT6l%2BdwbMIcYvZaM4De%2BMzVh1norTUKw85c%2B3OPXEn0Y2BBtLSYCnPDpiCBPeQMpu1R2BFHC%2F%2BGEtPFvajdsk04uj%2Bde6w2SjuvY7&X-Amz-Signature=cb8d6e65ab6b6712332e360a292cd99f59b42ab6ce95150434e4e9df38d7b39a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGL2LOJA%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDa73G0xZSPm1D%2FOHrRYqgAn5Mhh3En%2FXwXSig4z5BLNQIgBZHNisdtkE4p5MO7GnbUdmSNwdL4tC9hVPMqdhl2MeQq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJSdVfpxJyplNiQxLSrcA10gdPpQqzJIQsR5uDRMxcCSPegM7vRoS3asXbDi7EngJAyF8cqMgh1AbmA4goAqaT8XZlXloEOtpATjKvX5TOdrVsOl%2FDpdNKMMwJmOGur9QiIt4Q%2BAYsKDnOlWey%2B3IxCmPanYJSPIR4DGyZ2kPtSzo4omt02atsV0%2F3aTWQoq%2F%2BOrscLUpDmgoOxP7%2Fc0YUTUMk3hx1zbRhkqr2pQJRtiQNPF8ol8kCw8X%2F8Fbsn7IliEhjLXUvh0MkeKrHDxM%2FIod9viRAt0HkFCmiuf9XpiNS0d0wr93dYpAWbKkjO2HvbY2%2FT5mSiewH0UX4P4tIQD3ssYq2mZoIvS59QhXxjxMDqByeMMW9K82PMbDNl%2BA1Qqsdjru51EDtIYKwV7tVPiRbVTjmh8JP3%2BUmj0%2FreMMPbwmnoICtYsZ3S24N%2F2vT6olrD2lAv5JlKWuDQqGMPOWIszxnlIwqu1Co2zsovS7WjZM7%2BTPBlEVDIhFWMf4lXhxZFVbDyldd6m7w%2BH8O8LhoxaXWeGNwjUOqsWaDcSzvHUAnjWkRIYg7AcF%2BmIeiUk1bttmX2fAlewJFviGKKon%2B%2FjKf2ntYwu19T7NLcfVJK1m%2BOeBiU5cSn03IdHEE6PGDFnA6ClqJz3MKnm2s4GOqUBluyRA1hEet8XTpI%2FzW2y99Td7zH2WbazyydZ%2BDRuZlwBHRiSBpd%2B7AioIORZzRbL6nt8rhVO6EwC2HRPXIOnxq7jmSC74k83ZH6D9aMOP7BMhPenAfkn5bTKT6l%2BdwbMIcYvZaM4De%2BMzVh1norTUKw85c%2B3OPXEn0Y2BBtLSYCnPDpiCBPeQMpu1R2BFHC%2F%2BGEtPFvajdsk04uj%2Bde6w2SjuvY7&X-Amz-Signature=adc6f985aeb0cb6473fc89610ffda4e379aa70135fc520e22e0ebcba9ec47837&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627U5FD2X%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIFZBjmiDQqPKUf08FQu9MDqQeFOx4UblELBjbesmRPNoAiASEUoq1OHzBDrVNeg0rBEjCpy%2F7VZdi5n5emE0dlOFZSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMCheElPhtYPhf9NdoKtwD0khI2q%2B6O3sFeYeM1djnWTt7YrTWOW1zgrzV9ekC7nNdeDjjw7w0Ek27vipEmVTXX5e5Qm61njMfrAMQL8HMtWbI7%2FShMA8xLAiqWpooouDoR%2BvUQaUPlhDWm%2FbweQ6oJQjEwV75MPgxKmftbdWPKlXrfRX8%2F646Q1oO9doedpJugrE2%2FzV7W2rEX%2Fb1DzDy%2FWcBWCYLnljH6hMWou%2BKXFB0HOPojpYxSBQ6g2BYb3O9cKxHlvVgwA6AZsIs6cWgY%2BJvYj3dYs1hXyxslAq%2F%2BR5vzWr45tqso7oy98LwbSeff6oun500O0WMt%2B%2Bk1jXU2pOhMjcrWYjwbIYjQ%2Fh7%2B8O%2BoFnGVCA6w8BBKiO81N85BJof9c2nxVOZJlJgFgVSzmT%2FFs8BXRPCAkjGCaoynLGZao0lD%2FbLP47k%2BfWDB%2F7TuqLF2E177VXYoC%2Bj3Y2PoSoLalKvYLOxyGCW46NxEg8a4Li1WEIgEmv4VGKXe8GopUEPadLKEY6l6VNUxsGIK7Ekzj9RZBQONTMfeyDJ0JF68e1CHyV0u6pGKdC0jdrnOLYePFUDPLQ8ihipK90gTeXG6By%2F7Xva7uP%2BrD0Fq53GWdTp2EmojOj%2Bbl6JG0JBIkgBdvcENjeLwfIwlunazgY6pgEYoUSM6kfm4VB5iAu7dPpwJCP4JhtDGFHnCWrJVyHJPSbSJ7%2F3Zkyoh5N2h3%2FFgKBEpZ8jSfoiC9lcSWOiPfA%2BDCrqiuOIBELM%2Badd6cweWKOqX99Pjal9FMZ2D17GdgqQXBfupopKA6C6uTYjalt11TCYYFD22w2AP6NPRiUZMX5bghe9q7jeyalptsQtr1dUiHODhTmNgw2nv8uxHyfaoReoL8vX&X-Amz-Signature=9f57691f6eddb93776f7aebbc96c149d7223eaab15b2a9d99ca85ebb58d6292a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWWNCUCE%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDW4OBAp7p0DlMEy%2BYJG%2BdWvicI3uL%2BM1ExRH%2B3q%2FAiXAIhAImTpcxVCoFb7%2Fo46QEf%2BwCgtyRrpNrTAvgPD9H4fTK4Kv8DCAYQABoMNjM3NDIzMTgzODA1IgxFzIwkQFOn71UKu8Iq3AOnpP5jKThsgBU2UuhAFEs6WaH5rOvVu9Zk9hakm%2BGPYALUYw%2FhmppPjKk1bZ%2FI5742%2Bu03EO50Z4gmkjrE8F3XRRXEf8u9hG%2FNi1HydtS9G1RIxUrw0WmJCKbtSVidmfxtLcSngrQhKHf%2FKSWDDLthtbLiTFbYwYadJqMst%2BNcE1FbnfbwnO3vZfvgh9c375qMnmiJk%2FPwoR%2ByJ%2Fx4zK%2F4%2F%2FAuYH5%2BveN5BakamaSXMjl04rvFPnAIzKTV7u%2FkK%2F7AOn7otKRBfd0YY9DAFB%2FueRMyn%2BcsQt9CG2dyZcH7N07%2B%2Ff8MAWW%2BrVFHBRWN8ClsrX7mz22g4Z%2B2ImohaejNPsHlq2HB6aY00ajoHmwi8Xjqr1iu1%2BqE5t1cHpfuByaAI41XGcJj9qXtGvqcpludyIvdlGzNWUi3Q0b8VDKJoZ2ZCoaC6FWaKOHGZqaKDyLiXVnZul8YcXrupm0Z%2BBGuVyX1YlXBbWC1XwXnpAeqTyLU8ciVxWMhplPSupsco%2Fu%2F6LvQgT8U%2F7xtamVgiFB3TExOrTL8JyjkGsCcgDBzA3W55Ba3LcCokbwBGmngns5c%2FcGZmMLeXNu1%2FAeK2ovynk%2Bpdj1bmGaGYgET%2FkakJcbxQgBIUtULglpJKTDrhdvOBjqkAWshMpodKcFcrczITBm%2FmtaiymCI%2FX34ExeYMxP8OwP4%2F2%2BArLkzB2MSmr6Jr45mg2oB957YCC812v5RowErwMuxaOPz8guySMf7LOdt2sy8b%2FvO7XQxkGgJLyjeDq98ZTFrEUdw1aXcrgZ%2FjA1pO2RZNKTgdM8oZrfjHjD%2FVnj4cqntMtwqMTTStTHTQ30ri0RXCwt1icIvY2q0CM5AFCZJY6r9&X-Amz-Signature=e19f3b76d435eac02bc24f5d8454f02c8171194cfd54646784a3697cabe7d12b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWWNCUCE%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDW4OBAp7p0DlMEy%2BYJG%2BdWvicI3uL%2BM1ExRH%2B3q%2FAiXAIhAImTpcxVCoFb7%2Fo46QEf%2BwCgtyRrpNrTAvgPD9H4fTK4Kv8DCAYQABoMNjM3NDIzMTgzODA1IgxFzIwkQFOn71UKu8Iq3AOnpP5jKThsgBU2UuhAFEs6WaH5rOvVu9Zk9hakm%2BGPYALUYw%2FhmppPjKk1bZ%2FI5742%2Bu03EO50Z4gmkjrE8F3XRRXEf8u9hG%2FNi1HydtS9G1RIxUrw0WmJCKbtSVidmfxtLcSngrQhKHf%2FKSWDDLthtbLiTFbYwYadJqMst%2BNcE1FbnfbwnO3vZfvgh9c375qMnmiJk%2FPwoR%2ByJ%2Fx4zK%2F4%2F%2FAuYH5%2BveN5BakamaSXMjl04rvFPnAIzKTV7u%2FkK%2F7AOn7otKRBfd0YY9DAFB%2FueRMyn%2BcsQt9CG2dyZcH7N07%2B%2Ff8MAWW%2BrVFHBRWN8ClsrX7mz22g4Z%2B2ImohaejNPsHlq2HB6aY00ajoHmwi8Xjqr1iu1%2BqE5t1cHpfuByaAI41XGcJj9qXtGvqcpludyIvdlGzNWUi3Q0b8VDKJoZ2ZCoaC6FWaKOHGZqaKDyLiXVnZul8YcXrupm0Z%2BBGuVyX1YlXBbWC1XwXnpAeqTyLU8ciVxWMhplPSupsco%2Fu%2F6LvQgT8U%2F7xtamVgiFB3TExOrTL8JyjkGsCcgDBzA3W55Ba3LcCokbwBGmngns5c%2FcGZmMLeXNu1%2FAeK2ovynk%2Bpdj1bmGaGYgET%2FkakJcbxQgBIUtULglpJKTDrhdvOBjqkAWshMpodKcFcrczITBm%2FmtaiymCI%2FX34ExeYMxP8OwP4%2F2%2BArLkzB2MSmr6Jr45mg2oB957YCC812v5RowErwMuxaOPz8guySMf7LOdt2sy8b%2FvO7XQxkGgJLyjeDq98ZTFrEUdw1aXcrgZ%2FjA1pO2RZNKTgdM8oZrfjHjD%2FVnj4cqntMtwqMTTStTHTQ30ri0RXCwt1icIvY2q0CM5AFCZJY6r9&X-Amz-Signature=e19f3b76d435eac02bc24f5d8454f02c8171194cfd54646784a3697cabe7d12b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBLSYL5R%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T213204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDiqnKnmUZ4jOV0FGXg1KZTJkJInD5aFKjabpvlEmcs3wIhAN95A8ovCm3HWXiRoFBUtRJzTw4Qea3p9oFky4tLLhT3Kv8DCAUQABoMNjM3NDIzMTgzODA1IgyaHylZGhtlfdA5spMq3ANp%2Fax3fAUgfhV%2F3cyEmELcIn6%2FZof5AkdGWD7xgfwMrpX2Zsxrp3bIgM8aR%2BsctWRLAH1O6ikcPHm0ABs2UGv6qtcDAw40EWYIMgJG1EgveUAI4Ikz9cCzu6VLdNZfK8xL4CCQNhaOAPh2Ps3Xueg1ki84rV5gWw5mVfLsxtfZTCROQa3eW63hgjZAWr6%2BFpJ1wCp7r4R2XVAU8y9PeStEh0CGII8Jf3gQsuNoMQXl0QkHpKKrgONtHNmKtLFki3EmECDDAhFL8cIEsIw%2Ba%2F31CqcsGwbrl04QIQOgFJHPqtDeqbGz%2F9Gs4w5wMdMaxfXf2C1zjeXvnodrZpEdDCDEwava4GQP%2FMpGJ7Z%2BU8V%2B%2FOAOQSe9O4mXTSSH8CIlIsVdD%2FBRUGbIsSxLs9jOc6Jx%2BP80xwq3iX2RHGsrDMAD0GyhGedl2OIif89L0Sh%2BeaFMhHY8RcijA7B2Gpc0Uacyr1ozHtxNS3ZD2%2BgLRX7SOUI3yXqsxT%2F%2FEY133ZVw6xSCwEc4FxQ%2BSBn4IDDgrj4ES2D9Q1TOD0TF0KepN67IOak40RJy2AVYF%2BY71%2BqfxdmEY6rkbucaaqSx2CSHryqO3JCLUFr4wPLXtbapHLDnRGXQNMW9njyCJnGcZzD26NrOBjqkAWQj81x3p5aS%2FFxK3U%2BybrydZOJH%2BPHNqVbImDRYlFlAcJ9541Q4x64yDzyf5X6rpQZ%2BfBsa6Sr2BH4sKazt%2FhyzK2ldfl5KIdI0pwOAsNFyWk8x6mV4zlL866pn2qCv82BtQHg54v2KM8472E7864al7Dnf6bF286txtj5jkK1XYtwBFWIffVIRPcyzI7DL72KuCcWyJLN2qPYuvdgia6DrDB6s&X-Amz-Signature=6cb3e44f7fb987166762ba84f34e12c932fb4c84a0b73b540e543cf7fca16a0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

