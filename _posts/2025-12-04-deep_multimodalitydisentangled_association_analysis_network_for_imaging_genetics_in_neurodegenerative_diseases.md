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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJKCXMZJ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICg0hO7k8Y9KHjwmM6IY4BVDa%2BxKjnZzV00B0B4HAeZQAiBScgHYoO8AzQna76Ns7JTrttAdYwGqLoN6jZv197b04ir%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIMc65PaMPYB8NUK4BUKtwDarlYVkppmVOzMO4aFGQYtGRron5wva%2FfgIQvp7BopUov0bj9M33LqFtbP7TTygdHdmgiuDMhduotB7wwgU%2FQBPOXSdMKT34lTph%2BoTaIFxY3qCGXm8QgfKOhXtQaokanwwzYeQu2rAR%2Fsw4PsUAJyz2s8kCGNMLJIQQaJzd4UKInIaaESq02ld%2BNYay2NAeU%2BkDTh%2Bwf3q2%2B6LUoMc%2FaknZBSG1VFbmoyCGN%2BjGgV9WNXYWdMhrr5Jt%2BUWUwrw9sokzakcO19WLebz0m4bBFMz6fuYRQZkTrB0O2Ee6dhj1R8oF3yXmSRw97PxBOY%2FuJxgo5B1Sxu0lLkWl0iOOtzhkAmuzU58dQxsyn2ziE6NopCgdigsz4%2B3G5lZV8LfCKxjUXRpr57C5885eS1PlRfI0oWz3gFAsmM42hK7WUqLnsX1yFV2Tikk0r1bPzD3XjueTBBL5nAfE1zd%2FUEYs2sQGVFTRfh9sOz1PJVNdgDYkoVv%2Fb15B%2FIx%2BMAGd10j0iyJKjhZ79YS%2Bo9v8SVYQ0jsVuEbcNuurbe7Y6byCQB%2Fwi6U3QtVsTzCZ80BO1hBdzALnE9jnv60%2BGn4bciqmOwLGmUqbnVSgt5eeEB7O8ZTX8OGWdrIg6Fd6dImQwsIWMzQY6pgE6FaX6Q2CL8C5gSgQr6xreQeEBGi4i%2BuvRhk%2Br%2Fd7r4qfMFFEETIYygRszVY4kbqsde0es%2F8lHq1DxBorj4AdVUG%2FFA%2BlBjBViT1T82XZalhHtMP%2FmyPY4cMXnqSvSHr%2FcqEYGlKAaMHuvdQHoopRHxtALY6WGIF9UCJsHED1ozS4UA9kJ5E6BZFGK29vZAzd70y3F0mV5wP4QqJxi0QjMhih95Da9&X-Amz-Signature=e8e82770bd8c5cbf14bd53a66e4c2f1bf475de8a3e47cbb91a0a04bbaf280c76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJKCXMZJ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICg0hO7k8Y9KHjwmM6IY4BVDa%2BxKjnZzV00B0B4HAeZQAiBScgHYoO8AzQna76Ns7JTrttAdYwGqLoN6jZv197b04ir%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIMc65PaMPYB8NUK4BUKtwDarlYVkppmVOzMO4aFGQYtGRron5wva%2FfgIQvp7BopUov0bj9M33LqFtbP7TTygdHdmgiuDMhduotB7wwgU%2FQBPOXSdMKT34lTph%2BoTaIFxY3qCGXm8QgfKOhXtQaokanwwzYeQu2rAR%2Fsw4PsUAJyz2s8kCGNMLJIQQaJzd4UKInIaaESq02ld%2BNYay2NAeU%2BkDTh%2Bwf3q2%2B6LUoMc%2FaknZBSG1VFbmoyCGN%2BjGgV9WNXYWdMhrr5Jt%2BUWUwrw9sokzakcO19WLebz0m4bBFMz6fuYRQZkTrB0O2Ee6dhj1R8oF3yXmSRw97PxBOY%2FuJxgo5B1Sxu0lLkWl0iOOtzhkAmuzU58dQxsyn2ziE6NopCgdigsz4%2B3G5lZV8LfCKxjUXRpr57C5885eS1PlRfI0oWz3gFAsmM42hK7WUqLnsX1yFV2Tikk0r1bPzD3XjueTBBL5nAfE1zd%2FUEYs2sQGVFTRfh9sOz1PJVNdgDYkoVv%2Fb15B%2FIx%2BMAGd10j0iyJKjhZ79YS%2Bo9v8SVYQ0jsVuEbcNuurbe7Y6byCQB%2Fwi6U3QtVsTzCZ80BO1hBdzALnE9jnv60%2BGn4bciqmOwLGmUqbnVSgt5eeEB7O8ZTX8OGWdrIg6Fd6dImQwsIWMzQY6pgE6FaX6Q2CL8C5gSgQr6xreQeEBGi4i%2BuvRhk%2Br%2Fd7r4qfMFFEETIYygRszVY4kbqsde0es%2F8lHq1DxBorj4AdVUG%2FFA%2BlBjBViT1T82XZalhHtMP%2FmyPY4cMXnqSvSHr%2FcqEYGlKAaMHuvdQHoopRHxtALY6WGIF9UCJsHED1ozS4UA9kJ5E6BZFGK29vZAzd70y3F0mV5wP4QqJxi0QjMhih95Da9&X-Amz-Signature=e8e82770bd8c5cbf14bd53a66e4c2f1bf475de8a3e47cbb91a0a04bbaf280c76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV7ST3T2%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH0w2stKc9hvpYCC6gBqsgK02tB3DBNbsoqjI%2BDQwTNFAiEAhfacOZOSTKd4%2FV0RKGSR2yYtfz32VX8HNSOHqbxJCgEq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDC3us0ICrS%2BYrnIYaSrcAzAcFxZZvtNxI4Xj0l6juxTGi4PyurOrs4zLpftCjf4GtQGYn6Infz31Bu6PqwIV65XLgJkVgLckv2dan8ob3ql1eV6Vus9ngOgJxtRhH3FbRAD8kDek2jumCmuLRV2lCeriecqmV7PWhZKZMXGoh7%2FuHUhsUS96TPGl762PZJSQn1jj6IQIS5THOFt%2FUy2hV4X7y%2FfbqtwC2EmdbDUWlsLYn0yxyakSioeuqz7yi4Lxcc0wJ8Y07gqIBTSDaMznt9igffsJtSOCv9nsnutPsI9mPRyVNSqxIPn7N2zDzaqTjnTpOHytDxW%2F78XGTMQQLa3OKtgDe%2Fjmn8BYHVvJmfBCbHyxlk3iClsHtXTElwIMLlOkqTMrnBHDqUZclRW5wq%2BB0C52BXvzyFyuqnZTRtXqKGTS3uwdbmuYG5EP7XEWddU6H8p5IghHCWT%2FSKgjPXKaM5sbfChIKzVXL1drQhlMgEzngGBMKcoozWC4EA%2BSlh5jsq%2F7jwpv7lYoNyaZFhofgrYf3tNOHR5kcjlvFso0jvly1w4LvEp4xYPYyj15dJYYNcGo3diK8uDAGAZ0uTjneP4HofNJ2mgha6GvGgdHuXai4Sj5Dx2m8%2FYQCnfVCY4bwjeINhQqhgxfMPeWjM0GOqUBvN3JAkKERSitZNaIkxAgiOaXnOR0vSf2QRbuRMyNSQ0fHgFuXMPcHIAmgQd14Je0NHrQdT%2F2cww5RlO5OqCKdwSxTWoFV4%2FR1p%2Fk73FdJoMVswsqo6c1YNH0sNfIDNKQwFJuRP4rEjqt8v3oG35ULZh4s06OyQXnod1TsrVOnLDwe3409XxjR4E67s1C1hj55tlozhd6%2Be4mF2DyT2vEw%2BzRoClE&X-Amz-Signature=05cdaad460c64f9b9d140803bb16d2624795dc791ba4205d70c5ba77f027f7c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNXRUYFK%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBTOiKjHFvfJjqmYnNyCewF00uS8QHUwsr2KSmi609bsAiAota%2Bg0IEg3vGPvx5gX768lIaBY2%2B43hUMB2vLdcAToir%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMaU4t%2FEuFsq8tu8kgKtwDwm2XEg%2BTpQqq0NdSz%2Byd4fnfxrdanbq%2F6BLoTG4iNJ4HgZ4j8JGrMf0XFnYhqH9tESAWCpsjXuR%2BDqpxP29bo46czruwY6dxzVo9CrIFJG5neJABzBF2mRBEfI%2FXt2eIO98u%2FS4S0vyEu4qwVNg8riN9MKeuUb3H8%2FVeThMgGo4TPIxdAPJDzYCcg5iL8aeK45082pCUlBfsroWi9NZJ8AKCHtmEHAvDPXIeAviHaEU3aVW0gTykxUuC6LcTjSIburDhMUh8ssD7joLKsB4aGfmzXG7iHknA8KhL3YtvkaeXcwDaMmmRyPQS7PKuh5xwJO6uiljWJ9V9kz68CyHRig3r%2BU50Z%2BUcXv4JRho8Bo6GyqalruA13b719AD2ThA3r9oR%2Bkrvy8XhY9lnlicxmY6yIdGm8UtdqFC3TF6J%2BZnyTFKB%2BSrcfDsGAsvY1P02DkohRUVj7Itf91lN3dtimEZw6oFkU1dOOHEyUTkpYIaxFhclsmRXrNCQQNxx19qFIRpb0g6A0z52pWYVefQozVBf%2B%2FMx7iGAgz73iUblAm2VX3tWkP1IbuYwoOa0KK1k2QW5w6ngw18Rkb6P2UWg56CZz6O3mPiGHsC4yb3ZTxKUn5UesKEdOKmdOUUw1amLzQY6pgFC9W7RaQGwqlDHlnDkHgxS5yfDXUClNZ7ohqgK3mFG5hbtPjzZ%2BPr4hIXmsIz%2B7zjJfuzLXvkwoNDhJA76RFt5V7qEXjxg1vLw7ghicmlY5jpLASpnzFYhMxJhkfHMPGv%2Fc2ISqNEKUxfYF%2BQSFWWWI8KfQ%2FhK5tNSWUrTYzD6iKFtnl1R6p9i5%2Fksgzse9IwvPsYxzmzhEEM4AdKPeJXfUkZsQW5K&X-Amz-Signature=1faa328d7e607eb6cd65db64cc0dc5e2104975e6612de9eaa963ab0abdf0427b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNXRUYFK%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBTOiKjHFvfJjqmYnNyCewF00uS8QHUwsr2KSmi609bsAiAota%2Bg0IEg3vGPvx5gX768lIaBY2%2B43hUMB2vLdcAToir%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMaU4t%2FEuFsq8tu8kgKtwDwm2XEg%2BTpQqq0NdSz%2Byd4fnfxrdanbq%2F6BLoTG4iNJ4HgZ4j8JGrMf0XFnYhqH9tESAWCpsjXuR%2BDqpxP29bo46czruwY6dxzVo9CrIFJG5neJABzBF2mRBEfI%2FXt2eIO98u%2FS4S0vyEu4qwVNg8riN9MKeuUb3H8%2FVeThMgGo4TPIxdAPJDzYCcg5iL8aeK45082pCUlBfsroWi9NZJ8AKCHtmEHAvDPXIeAviHaEU3aVW0gTykxUuC6LcTjSIburDhMUh8ssD7joLKsB4aGfmzXG7iHknA8KhL3YtvkaeXcwDaMmmRyPQS7PKuh5xwJO6uiljWJ9V9kz68CyHRig3r%2BU50Z%2BUcXv4JRho8Bo6GyqalruA13b719AD2ThA3r9oR%2Bkrvy8XhY9lnlicxmY6yIdGm8UtdqFC3TF6J%2BZnyTFKB%2BSrcfDsGAsvY1P02DkohRUVj7Itf91lN3dtimEZw6oFkU1dOOHEyUTkpYIaxFhclsmRXrNCQQNxx19qFIRpb0g6A0z52pWYVefQozVBf%2B%2FMx7iGAgz73iUblAm2VX3tWkP1IbuYwoOa0KK1k2QW5w6ngw18Rkb6P2UWg56CZz6O3mPiGHsC4yb3ZTxKUn5UesKEdOKmdOUUw1amLzQY6pgFC9W7RaQGwqlDHlnDkHgxS5yfDXUClNZ7ohqgK3mFG5hbtPjzZ%2BPr4hIXmsIz%2B7zjJfuzLXvkwoNDhJA76RFt5V7qEXjxg1vLw7ghicmlY5jpLASpnzFYhMxJhkfHMPGv%2Fc2ISqNEKUxfYF%2BQSFWWWI8KfQ%2FhK5tNSWUrTYzD6iKFtnl1R6p9i5%2Fksgzse9IwvPsYxzmzhEEM4AdKPeJXfUkZsQW5K&X-Amz-Signature=76453c873128b6794a515698c1451ec384adb14ccabbbdd1aece6837dc018f07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV7ST3T2%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH0w2stKc9hvpYCC6gBqsgK02tB3DBNbsoqjI%2BDQwTNFAiEAhfacOZOSTKd4%2FV0RKGSR2yYtfz32VX8HNSOHqbxJCgEq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDC3us0ICrS%2BYrnIYaSrcAzAcFxZZvtNxI4Xj0l6juxTGi4PyurOrs4zLpftCjf4GtQGYn6Infz31Bu6PqwIV65XLgJkVgLckv2dan8ob3ql1eV6Vus9ngOgJxtRhH3FbRAD8kDek2jumCmuLRV2lCeriecqmV7PWhZKZMXGoh7%2FuHUhsUS96TPGl762PZJSQn1jj6IQIS5THOFt%2FUy2hV4X7y%2FfbqtwC2EmdbDUWlsLYn0yxyakSioeuqz7yi4Lxcc0wJ8Y07gqIBTSDaMznt9igffsJtSOCv9nsnutPsI9mPRyVNSqxIPn7N2zDzaqTjnTpOHytDxW%2F78XGTMQQLa3OKtgDe%2Fjmn8BYHVvJmfBCbHyxlk3iClsHtXTElwIMLlOkqTMrnBHDqUZclRW5wq%2BB0C52BXvzyFyuqnZTRtXqKGTS3uwdbmuYG5EP7XEWddU6H8p5IghHCWT%2FSKgjPXKaM5sbfChIKzVXL1drQhlMgEzngGBMKcoozWC4EA%2BSlh5jsq%2F7jwpv7lYoNyaZFhofgrYf3tNOHR5kcjlvFso0jvly1w4LvEp4xYPYyj15dJYYNcGo3diK8uDAGAZ0uTjneP4HofNJ2mgha6GvGgdHuXai4Sj5Dx2m8%2FYQCnfVCY4bwjeINhQqhgxfMPeWjM0GOqUBvN3JAkKERSitZNaIkxAgiOaXnOR0vSf2QRbuRMyNSQ0fHgFuXMPcHIAmgQd14Je0NHrQdT%2F2cww5RlO5OqCKdwSxTWoFV4%2FR1p%2Fk73FdJoMVswsqo6c1YNH0sNfIDNKQwFJuRP4rEjqt8v3oG35ULZh4s06OyQXnod1TsrVOnLDwe3409XxjR4E67s1C1hj55tlozhd6%2Be4mF2DyT2vEw%2BzRoClE&X-Amz-Signature=d2834ac7a51cd3de20829a28a6b8b1bc7815d5e2daf5c37ad540a8a818c94144&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSEEPZIA%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCuqLJy2DFKFl9kYJhUldtOQ%2BVuyRi%2BpIDqlKRufnL%2F4QIgOWs9NcfIHZaTut7pNhAz0MXGZTqR5SL62jyu5dxl3soq%2FwMIWRAAGgw2Mzc0MjMxODM4MDUiDByRqiT%2BCN0GUMyMmCrcA6UiI%2Bul4lYYqldUal291U98bn%2FkjtrqnBBTDk2IJuzBNQqHASUHuvHywNRUpmO5ZwygleVDpCWT%2FTPy7P7RsyfVrvcjmJ4od0kUk68XDPCjwMbOY%2F0XjZqVx7YRthbXHUtmg%2Fc6kdINc%2BB9D%2Fk%2B7E4Tej5XHeYoHcqkuSlEfPcccCQjBK7P0%2BAlEiywtOXpl9cRkZ0ChyNSTPWnZV1uo5Lv5LhCGx%2FGx%2FYE19%2B%2BP3IBXEq95ZCCItiBOLgmm9AHHVqGZfJFYPtreB99MbUuKDbjfD15MmQXnB0DulDbdiikmk%2BoYqj7naRPRTDiLgB41u1wwMZuu%2FIeMQN7ehLYefbR4mX%2BX%2FkKwofLDdmLN9H0HI2Ww79MmitNpUI7fSuX2r6EBOnhm1T38cLcV0lMJ7Layuqx%2Bl29FyZ%2BQRnY3nGe%2BlxRSpaDH68947aix9v1%2BzC9Ivu1ofPPNqmQ9NMjWysOfuMAPejoFbh7E0xJgL6znIUM8n8NwN2eM%2FksFu5mgHUnkuMzDKjoM3usgcPhfGmIVwLMtorU1SY8jM7mjoVHpV%2FBjT3eGtwxN%2FGqY4asNTi%2BfrihvX50sM1g8pFTKXgCK5dbMTkIOPwJo0kDyM694WxrkDMgKoTWHIYOMK6UjM0GOqUBiEztu%2B55LqkH7%2Bt9a8pu8agYnTWparRrU6LDUOjtB%2FDnVrhLm2LMEozXfUs9v0XAcg78AXRmFboquVcbcwgtNyjgZK0dIOA4oXEwZZv%2FULobs2lmBmn6hUQwOmuhohsc%2BYxF0TYgdj1pVzt8HMDZpP0ru9inUkjNLFeSMAUjbvxDR%2FgnVN%2BZ0t5n5vU8bS2xyBBItpvXrNepuWmTm2%2FHa9yhuU2t&X-Amz-Signature=a39e6a88c67bc4b4066a304ca186c8a21b4adc4704eaa465bd84d3c6bb71bcef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RGQMMVU%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBUK5Iwt%2BWertYTFMiOiCLR%2FWYBFRmfTfjKnIzuFsorpAiBLoeJF0lRUjh3BSZkXSA46wxOlQw9vEnz8ou4eqbeEiyr%2FAwhYEAAaDDYzNzQyMzE4MzgwNSIMyffLZLG2LpIWUYRrKtwDvcZJ2omGNMFyzIMvYqnTqKkh%2BCX0BOEDRp4B03AtAP7fGPXB%2FG157hEMCJmk6uh9GtLXU1pKanpOn%2BY1aD%2BNV7W4G2ZVPECtGEfZSjzCXd%2FvkMFkO900PURfiUcLxJjLKPtp0%2FUxHSDw6FzA85VY3qOoS5DKNg8pFy5NoytVPJVptwfuulJkUGdPHSo9q7%2FP2GLoYRHzEkGV8%2BiMCm%2Fb5QeOHFlhnHx5MqwBp%2BQzfAnsSyBZQn4ThwdpoP721vq8gSABmh07TxOdqZ2%2FcnWlt9uL%2Bb%2BtlKRrV%2BTEFIpqiluaeu184NHhmT5Uaj4exq0YgQKicQJQRqMRFUSi7c8TSM%2BJN1RkbFymXTRMc10mvOWiDoqP3MoySWd%2FPA2EOTJZH37nnYfzgk7%2FFYNzIH7Fxk123NS6ZjpDOitWN%2BcnOVeF%2BU%2B4MqRtcu39UzQgMPYhOps%2B6CzM%2FEEUaV3IEkG9iF0rrirUXDHveDomuOrrpNugtA4Y10Y3Ptn5Ktntb1QP6JNUQ8f4ZV7LtDQ3zT4QrCwdyq7KBISnGs%2BUzJoNFCihFVbUgSyqUMdbCzDM7Qqj5RTRAtD%2FcUQEZJdFtyRQRE0%2F0828tq%2B5GUPiuyvyZFAnTN%2FdwhLu652f7tEw14mMzQY6pgFnj3IMEdlmpGbrKJsfC2%2F93a2JLVn7xSbfxq8r%2FlVGA9AAK4OqEdXeJOuGzqXZFBN7JyXgr2STNbbtq3AgvYDcreLns7nZwt7BLvpm2sdFJFOUYcI0flbs9eoN2VwxDDmFxURSgl7vmIfqZDp1jfOS2xx4DSWmH6VHH%2F1CqkGtNQuRpTQOQFrKSdoWsfW6vBzwQ4%2B6TKH6reJpCycRmm%2B0hdzxLPS8&X-Amz-Signature=0da99c4b992671e4ecfa4333ca67b79debebcb9cf0040aa87a717092027f5c8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIGMVFA2%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWEF4MYTWaPcVPbQdq94IBY549RbW8SPoi1pEruFAd1AIgWGBNNySMcEi6kuSwSSikUYAGKERWprji3D0TXkMjNt0q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDKqmbumiS52cOB8FsyrcAxIJjp1AVNdDePwChuJ8mh1YkLhWsu1ySlhQc%2Fgilak2g%2B1WJwrv3tIrue1PorzaWUEDlgeKVuZ5hIjebLeJabrbNPdkJXeaMWSzTL4TK3Pl1Gbze8INGZ9d9w3Uffx9eOnIQ7lWkCSgFrzaZDoKppdkoq7eUe73L3yxf5RK9rATExiFBPDu%2B%2BInjZ28Q7848pZNXXL3jseJAGrVANEIKGSSbJc6mdE2REoLOn5MfECJoKaeQZSZnU5Ikn2%2FGKojL0vyiqBItj2AgCR3g%2BbHKoAICgcfYf1jNn9Q%2FLdm7fjVzHRChmoFZ46bQK8l1tuLSzJmQe4SUVzfEA%2Fm5SwcKS4swoFFOHIFOIjqhR82FD5MZALWqhA2Yargj959IV6Klx0X15IdsVn9M%2B0MXZ9s%2FG%2BpqJ94iHRVDl0IP7SwKaLsh3%2FvEms6pYmrrwAC8aQCBUHntA9laDMt3W8B5tVOb5yLEp4zch6StgBYohLwuyhjlzmzKyUcRk583BCPFgJfYzt%2FvFyPgtPT2ayRS%2BlVDitQ4PxjfVZ08FPzSzij3g5oCZc4FHFH8qZINmhXw91urkbv33FK%2FyfiT0oCzPtQQUbKH1cOXYe48llE%2BM%2FCJMAeuYMN5gD43uOrIxLpMJzEi80GOqUBTJzYV3MjRRySVW92dpWCLavNxVVjXt3q%2BNXwGElSCHTrhlNeDIXiEZhpk0fPBeglK2hXG8%2BA2MpQMyiju6DAT6JczJsYmOAtlyquCadDFrFuFpBao79MQIIfXfKU0ldXoqWOujuoejx3Vh4I7QnQdiYzvfaP5C9s7ps%2FKFi4Z0QbvOindtOwc5S8Y260pQ9IBMes%2Frku9oMzd6ZUmtQKYicNg6wW&X-Amz-Signature=7dc9113b78e0c152fbb527d6e72dfec2cf951b9f4bd53661af707fb35569bb47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIGMVFA2%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWEF4MYTWaPcVPbQdq94IBY549RbW8SPoi1pEruFAd1AIgWGBNNySMcEi6kuSwSSikUYAGKERWprji3D0TXkMjNt0q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDKqmbumiS52cOB8FsyrcAxIJjp1AVNdDePwChuJ8mh1YkLhWsu1ySlhQc%2Fgilak2g%2B1WJwrv3tIrue1PorzaWUEDlgeKVuZ5hIjebLeJabrbNPdkJXeaMWSzTL4TK3Pl1Gbze8INGZ9d9w3Uffx9eOnIQ7lWkCSgFrzaZDoKppdkoq7eUe73L3yxf5RK9rATExiFBPDu%2B%2BInjZ28Q7848pZNXXL3jseJAGrVANEIKGSSbJc6mdE2REoLOn5MfECJoKaeQZSZnU5Ikn2%2FGKojL0vyiqBItj2AgCR3g%2BbHKoAICgcfYf1jNn9Q%2FLdm7fjVzHRChmoFZ46bQK8l1tuLSzJmQe4SUVzfEA%2Fm5SwcKS4swoFFOHIFOIjqhR82FD5MZALWqhA2Yargj959IV6Klx0X15IdsVn9M%2B0MXZ9s%2FG%2BpqJ94iHRVDl0IP7SwKaLsh3%2FvEms6pYmrrwAC8aQCBUHntA9laDMt3W8B5tVOb5yLEp4zch6StgBYohLwuyhjlzmzKyUcRk583BCPFgJfYzt%2FvFyPgtPT2ayRS%2BlVDitQ4PxjfVZ08FPzSzij3g5oCZc4FHFH8qZINmhXw91urkbv33FK%2FyfiT0oCzPtQQUbKH1cOXYe48llE%2BM%2FCJMAeuYMN5gD43uOrIxLpMJzEi80GOqUBTJzYV3MjRRySVW92dpWCLavNxVVjXt3q%2BNXwGElSCHTrhlNeDIXiEZhpk0fPBeglK2hXG8%2BA2MpQMyiju6DAT6JczJsYmOAtlyquCadDFrFuFpBao79MQIIfXfKU0ldXoqWOujuoejx3Vh4I7QnQdiYzvfaP5C9s7ps%2FKFi4Z0QbvOindtOwc5S8Y260pQ9IBMes%2Frku9oMzd6ZUmtQKYicNg6wW&X-Amz-Signature=14f20b017c1b72e0792eec4b5c77b29512f96b32e7ebe01aa586fb702f383bda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647AXIQMG%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0tmp33QgC1vgW7Wf%2BqBiRYj7%2BA7O%2FSbF%2F594iw6BrkwIhALVO8O2t8O3d3AEL06LnU5bwFFghaoUKYFBb2CepMbY1Kv8DCFgQABoMNjM3NDIzMTgzODA1IgwlMgKkgjPLjFqajIcq3ANXzmJh0R7HpPXX7EYno8pNR5ktPYt2KapQrunLrqOy3BmSEG95LGtWJLxhbYIXru2pv9N1FBA4HdxIJoiyDZBx%2B3fiiC%2BMTqqb%2FyXKevMTMzZtFmYDpYiQ5ZCmcu2toBjL7TZabcPCGiF5u1Iplhalg5Y%2BbeozMWd0RBh6waSBtVziCEGsS570rFljLyGrYRAGvt3HM0OB8RvOozCZgf4GkGQWyQtMrQ9yScX7d5aIJBnfzFBPSiEo1Z0SF%2FqpaUqig%2FRqN%2BmFTgA6mVUNpY6v8WsiDTsraJo7tXGD6Vs6%2B8fW%2BTU8FOuMWJo%2FMcS9RrP8WubjKkdWQ9bVbRexkW2SVZ1o3fHpkYDnCxk8WyTfvMG5TYsYHIBiZK2OnYeVg%2B3O7ja85t1JKQTQpTUU4WHnw9a8%2F0NhdqaCb3jmTJ5XWTsgA%2BpGKp%2FfucgIY8g5ZzFp1MzD4jVRbsocfLAK67%2BwGR9QJn8HF2SLEIbzvb3o7aGfbRTwpyZ7esheIfiTfWXLlCXfZa6PBfC7D4oI1wEZ6fpZYGCGLO7qZBUemcVopP7Iu87ZuJfYAERWRXKSioN5Xt9K%2BbSoonPCp60uo4W%2BgOc0WdKK8IItohsTDbmEXjAUsGmyGYpqcNSe7TD7iYzNBjqkAVeHDmeVT5y69nqNZgtATEsOQLSDbi6gbBZDIKNR1p3SmdTu24WGaSbbL%2FS5nDCGNTANI2F5Ln7xXOJOE6aD3CTk%2BcMGbqEEtOOym1TuxBuUnydmWx0geqK0cx05p9PVGp4hx%2FmsAOaJ3Ov4MbdoNOg7y%2Fw75smM%2B84XhM2vNZX2LPdl1WI70ChYneRbqV6nDkU3N03WJoff3fIJTg%2Fs3op9I%2FWj&X-Amz-Signature=e7f4402f2c4717a3d761e6e583229bb13f8cbe7022ea35299f3b375f39211cbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637HOODDS%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCopPd7U6HlnrkTdCOImph5wDmbtKmuJL3Y6Tj06WNdowIhALHHsyhXAPgnf92xOSsZGSFTug9zcghciACysBAav7FqKv8DCFgQABoMNjM3NDIzMTgzODA1IgwXGM7MPBQxhdY%2B2ioq3AOJxwiF3NxgqIFijESymWP4chV5nUOwl70L%2B16%2BY8xxkiQMr1Nvu3G3sd5TE%2BJlFQcC7oc3Zny9u6Btid7QVP0O3UBH4G1Dh0OsPvDLVGkPw440F2G%2BD9Zn%2BtMEVh4FGUJ6DrrcEL3fnb4fqdjU%2BX4UHz5bsL%2FxemHFFfjorKpMplE7xuioNnYfy%2FREjtL1csbozgDREghN%2FSG3LVJVbnn4httJPjQSPjLFR5xhbas25VkJzxhVjkO%2BnWNnurCJ0A%2FlatpaM9YOSSflOnbEyuyP5Qf5wT98a8Rr1LLJM56p27oMHAvNwyvsC%2FbYTfJrNVnleadU2B6mbroYhpXQqKX8vUEUzE%2BS%2B9QVxiDVsxi%2FBdE3YbUySkfZDlYEHZZMhIM0XHi8AtTXdTP57JlqOKtgPAzmdRf59gSrHOwM5z5uDsOVKwpv8YPkclPTMDAJsuMpSwGHQdQRCCJ2JbTZwQS9zlLx520KkN0wlhwZCFKBqZdjKNoM9naOW5Clxo5qakAzsVF1K9cyw%2FRIgDEMkB1wgFdvxGpSstuqYoMA25B79EjAJdHgTCLo9bqO48hCHxCF21APRyAGwDinGxjEMGgEdJ%2BCWYCWKK5hNDX3NNUoLEFSNrJIUzdnTAEM2DD7g4zNBjqkAc1x7gTnX2PNTSsm7%2F7bWv47HGf5qou9h53KXdhtpb9Zy8j6MY4LwIiXDx808GYBCBdRhursHExNI21ez0aAuPsnmpTHJn9ED1IKPEcSokVSaQWgmX20QEVbIDR%2FizdoKbE022%2BPxOvzM0K%2BcB91R%2FyTeb9ZJFjLJ3eUiuuLxZXup6IWTDky50dtFhbOJBqS9pisHZcugQZrEZkoUumBpFlE%2FHA3&X-Amz-Signature=7ec6b10d4097eca61695e6f2933c7ec3884f6ad4580fd30d50903ad60e21dc1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637HOODDS%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCopPd7U6HlnrkTdCOImph5wDmbtKmuJL3Y6Tj06WNdowIhALHHsyhXAPgnf92xOSsZGSFTug9zcghciACysBAav7FqKv8DCFgQABoMNjM3NDIzMTgzODA1IgwXGM7MPBQxhdY%2B2ioq3AOJxwiF3NxgqIFijESymWP4chV5nUOwl70L%2B16%2BY8xxkiQMr1Nvu3G3sd5TE%2BJlFQcC7oc3Zny9u6Btid7QVP0O3UBH4G1Dh0OsPvDLVGkPw440F2G%2BD9Zn%2BtMEVh4FGUJ6DrrcEL3fnb4fqdjU%2BX4UHz5bsL%2FxemHFFfjorKpMplE7xuioNnYfy%2FREjtL1csbozgDREghN%2FSG3LVJVbnn4httJPjQSPjLFR5xhbas25VkJzxhVjkO%2BnWNnurCJ0A%2FlatpaM9YOSSflOnbEyuyP5Qf5wT98a8Rr1LLJM56p27oMHAvNwyvsC%2FbYTfJrNVnleadU2B6mbroYhpXQqKX8vUEUzE%2BS%2B9QVxiDVsxi%2FBdE3YbUySkfZDlYEHZZMhIM0XHi8AtTXdTP57JlqOKtgPAzmdRf59gSrHOwM5z5uDsOVKwpv8YPkclPTMDAJsuMpSwGHQdQRCCJ2JbTZwQS9zlLx520KkN0wlhwZCFKBqZdjKNoM9naOW5Clxo5qakAzsVF1K9cyw%2FRIgDEMkB1wgFdvxGpSstuqYoMA25B79EjAJdHgTCLo9bqO48hCHxCF21APRyAGwDinGxjEMGgEdJ%2BCWYCWKK5hNDX3NNUoLEFSNrJIUzdnTAEM2DD7g4zNBjqkAc1x7gTnX2PNTSsm7%2F7bWv47HGf5qou9h53KXdhtpb9Zy8j6MY4LwIiXDx808GYBCBdRhursHExNI21ez0aAuPsnmpTHJn9ED1IKPEcSokVSaQWgmX20QEVbIDR%2FizdoKbE022%2BPxOvzM0K%2BcB91R%2FyTeb9ZJFjLJ3eUiuuLxZXup6IWTDky50dtFhbOJBqS9pisHZcugQZrEZkoUumBpFlE%2FHA3&X-Amz-Signature=7ec6b10d4097eca61695e6f2933c7ec3884f6ad4580fd30d50903ad60e21dc1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNIMEDLM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T160104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDG0u2cgdElRDEJTBNsjd60tL031n8sfjKvo3yQomfS0QIhAPsERqRk6JUrYRkpUdbVBCUreiktqQNJXVICPfUBPjYGKv8DCFcQABoMNjM3NDIzMTgzODA1IgznSKrUlFvAkzCwBSgq3AMqKREslYXxkcCDifhd7CtJvdwMfERgyWpo1QK56UTY0N6PWdTvBnuZRSiV2Bc4Ky3Y1EAU49mHX2M8hJrw4zLgcfBJToOCzP6Ut%2BgCFIAR0ffIQvD6WDZzlGpr8lYzFx1RwMzX%2BxSJemC5hNGtm0i7%2FrSjGkhCv0eeOEwvtTvNrPzvOA4w%2BNzh%2B6I8GyfJt9efRyOVIIuCm7pa9fTb6fzpHCQH1b0H5j0qcZh3DmuJEJ08z6dr4V2b%2FxTN4%2Bz5J3qmclwsoZ3gpoN%2FnkGTkLkZ0yMz3R%2BE3gSp4FiYT6HMToruacWqRBJ8DVejUKsPz3huVLpe2cbWnBZzYY8Hxki1bsyfrLhAxqiq9Tayl9gNnZQCuL2bF0MmgZlxnrBFGWQWZ%2F0ZIhzwQoIX0pPIoFO%2FSJQPUZV15e01HFtmGZjoVSls1Qj3fnATkfEUHFAprqeardj3erb4o%2Bymp2TGIjw9ArksTz%2BJBtk%2BMrm7gMehL2GOEdWIqyb1OYsslx1B5CoNT3UlZq4d%2Bvn%2FFGZ1usrXypDfXuYKMiXpI6t9cBfQijnp0vwIXaRkOtBN%2BpSNscc6sUv55D%2B9JPbbtpbTdN7uglUDhoQhRVsMCwi33JzmbA%2FUmxGHpiEKp97CfjD38ovNBjqkASfTJ%2F3%2FiUHaDbNIeyPahrF9oec2q1BwMaZ%2Fvhu8gFxBzw9lmcW9%2BUnKfoME3enoGxeGDfspw1aaxQUU1PT1XeBk5lWyQFxTDkQR9O8U9PSnuuELq1P8RXHejE%2B7Vuhjc4j0p2yxWLAGqnYWVFMcid5%2FFtJ%2FMRPphcwlIR3rVBVr3xxBaMgqU3Xz7r4eE86j6V8OJD280HFPeuv7C%2B788XxfLDzi&X-Amz-Signature=d913ea4457dc22eafc6e7db9fa3cb89dddefb757bd87e52b35e5fdac7cc8989b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

