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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RM42BRQK%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCLDll%2BAtWBRS9x0L%2FFlGlFv0IFPgHDswIjFdrp%2B1FXnQIgPcIm2%2BOcqkRvTX7gHh%2BWgeHU96jjj930SbnPR%2Bpm6V0qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAJd1aTBqZ%2Ff5FjO3CrcAzSH4RPQgPzq%2FxFi9LT45ojpbilxKcHbjMVdbBosuY1G1LC8d2jeNDVjSuw2APYtO51gbB33mFacwdVx0g3iPe5yo0tRnrc%2BnLV5Bn0pSw25%2Fd6kHbPyWaLVBAWQpv4EPqCaQ76T%2F8JTyeKqkEYE7NQXK%2BtNTZ2PFQvVRpEuWl887zNZViuqa9q0JpmiGTyyd6ZEDRHGt5W24e%2FyBz47QaWL5tPAKDCuw%2BZ8Uvn6%2FZqU%2Fgo2v2avNpzXdh3NM91i9NGK64aB85UYXJ6HzmYchUQUoqbm21hTP8b689t7ok7UnCWBVu%2FgHzWxx2WJ1NQZE9L%2FCbHRQL44ljDLXVsoky9nTRcBJiiZMhKkGDTFq3a5suCsHZc%2FgK%2FiiFvrGLeZCkjoGvrvRHoB%2FuF9IFy51FPiXvZ4ido7r%2BDWEMRv4ftzScDtAwFQoPDZ6ViXjrE7LzgiCkDUo6%2FvHNMkAfTZGIzrrUSP4k1DICZQp%2BbU%2BmUMnsXWQ6MzYV%2BylGs9YkIUyCNGs1p3d6nr0QALbyHPWcuDZ3EDYy31Nioi5Qg6TfGIbVoAlZaNyn7kJG2pp5zbg8UzTUwqRcrjqZycYe1sicpkbk8%2FEaEHjcZTTmuRtMWYF7f%2BADR6h4HaSmuAMKzZnc4GOqUB0Rxh%2Bmy8LMPQPa3burPdc8P9lc98wqyXCn53zXqwUuCNbvQCMyB9Loi%2F3YfY6Cuu82Bs6TkmTw6xfs%2F5kl%2FAyAbSzzo7lNbKkgxLspHJWwsSZfP0NuAfq46TFid064bxKwQe7S8KnBdFgP5R19XTkXWwN0%2BTX35TG5gOElLF5JJ18E1aKiACG0vLyBR9qBNRb%2FEUa5OBCB47c59vCdm27pz5Z50G&X-Amz-Signature=de3515c96e33419263b8da817a33f5aecbfdb060c480b3769f85f1463145c578&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RM42BRQK%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCLDll%2BAtWBRS9x0L%2FFlGlFv0IFPgHDswIjFdrp%2B1FXnQIgPcIm2%2BOcqkRvTX7gHh%2BWgeHU96jjj930SbnPR%2Bpm6V0qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAJd1aTBqZ%2Ff5FjO3CrcAzSH4RPQgPzq%2FxFi9LT45ojpbilxKcHbjMVdbBosuY1G1LC8d2jeNDVjSuw2APYtO51gbB33mFacwdVx0g3iPe5yo0tRnrc%2BnLV5Bn0pSw25%2Fd6kHbPyWaLVBAWQpv4EPqCaQ76T%2F8JTyeKqkEYE7NQXK%2BtNTZ2PFQvVRpEuWl887zNZViuqa9q0JpmiGTyyd6ZEDRHGt5W24e%2FyBz47QaWL5tPAKDCuw%2BZ8Uvn6%2FZqU%2Fgo2v2avNpzXdh3NM91i9NGK64aB85UYXJ6HzmYchUQUoqbm21hTP8b689t7ok7UnCWBVu%2FgHzWxx2WJ1NQZE9L%2FCbHRQL44ljDLXVsoky9nTRcBJiiZMhKkGDTFq3a5suCsHZc%2FgK%2FiiFvrGLeZCkjoGvrvRHoB%2FuF9IFy51FPiXvZ4ido7r%2BDWEMRv4ftzScDtAwFQoPDZ6ViXjrE7LzgiCkDUo6%2FvHNMkAfTZGIzrrUSP4k1DICZQp%2BbU%2BmUMnsXWQ6MzYV%2BylGs9YkIUyCNGs1p3d6nr0QALbyHPWcuDZ3EDYy31Nioi5Qg6TfGIbVoAlZaNyn7kJG2pp5zbg8UzTUwqRcrjqZycYe1sicpkbk8%2FEaEHjcZTTmuRtMWYF7f%2BADR6h4HaSmuAMKzZnc4GOqUB0Rxh%2Bmy8LMPQPa3burPdc8P9lc98wqyXCn53zXqwUuCNbvQCMyB9Loi%2F3YfY6Cuu82Bs6TkmTw6xfs%2F5kl%2FAyAbSzzo7lNbKkgxLspHJWwsSZfP0NuAfq46TFid064bxKwQe7S8KnBdFgP5R19XTkXWwN0%2BTX35TG5gOElLF5JJ18E1aKiACG0vLyBR9qBNRb%2FEUa5OBCB47c59vCdm27pz5Z50G&X-Amz-Signature=de3515c96e33419263b8da817a33f5aecbfdb060c480b3769f85f1463145c578&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V2AYCIV%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIFUtkx789WAQTutrvMC164o00IYp4Ckk%2BFojt5qATT9CAiAftCtbjlXYKqQBMyWjVXPll4LyUaJhiaLK1KaIUb8kzSqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMz%2BvNSkJyGf5%2FgvyXKtwDWwcIj1sAp7oxF0PXFmnUtY3KLMdCfZO%2Bh3so3ZTjy7XLBZlWLsArO04drdum79qyYbVSfZt1CyoqKjrgoaZSmFjiJ5ZXbFHuJJtO5XTtWMFybCyNKocxAnbiezVxwLG7ubhLo6M0DJpKHThLj%2BnknBmAHuO5mTvc8HgLiTvFDapy0YvgvTH6l5AxZgDSWfhAbrPzNUvsGUYH%2BUD8x4V5S%2FlAc%2FEdM9G6CgtKu9xm5NhXWOmkK8zosqYe30XNGRdR7KebzggxDRAeKCktBJ11i3oZRHUlMF2qlzzxxQfphXM9EbQXTO7ZKZlygar5%2BatwugbldrB0Ap9ZtoZs8bD5yeoElIMU8sG3EaeHpYuLq4dcqqjSRU7h2rN2gQ%2BnICoIsmZO9batIR4HQPQ68ArSHuElnneBGnP1atHkNU5c5JKUI6WcKbdkmD5P0Rb0gcts5Vltcsr%2FDfj8dCoEyK7oZRQ9wRCMu0WKiE%2F7RzbnZWf6mwQOemhId8Y3xIiFgWncLeDLvfrDQzOo%2F7pCp7xpQlS1xYfsQTzHAUcMz5e0z04XtksVseUkWY%2FoIxGYK93YP4JCPQVTwfl2gK9H1tYJ1Vg9z1vf5aGr9rSPlAVQfNDVgtsiyXHFLdL82mYwsNidzgY6pgFzgsemrvv25naeQpxECMx9QnwSexkSzlBDuC2ybecCL2PCpZZUmkn5GsbpLjF%2Ff%2FZsNswmvcCKXCTyysm8nJPbIWsQLEsX2F4jR05nQ2VklJJBAIxgzGX%2Bmz7ZML1%2FQHtGmE%2BffDseBndcvLbnAaWwm6yc1gSYKZ7t0KHA9NgtvbhWnzegWPCBzMPcSJp6nuhsNBVEvf98HTnvlJ%2FRQAyxu9xqQdTW&X-Amz-Signature=73e03587aceba275ab39566dea4cd3b5433a24a2dfc706216ce027c65d3bc8e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MRCCXKJ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIB02TBqOgczTfDN%2F8%2FkySUijh3B%2BnVSXy3NmOPnGS1P5AiEA7tUEZhfNHhTn2pQEYuwJXONiyogZTDwKLksBj%2BEa5AYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBSzwu4BwjCUoTvG0ircA10lV42ymiqZ1xj0VCJKktEDGd2o3LSYX40WnMmhJ8GpHWYmCX3RwuVRRvhvg0FixkAwzYl49iVBY0qL1Oy8qvW69tXatk%2For2S%2B7JYfjoATdRC3XDC1zVUu5M6TUvkJJbzeyLyMvqIJrOegSSnSxn6ueNZ6AX1jPk%2BC8ZDNp%2F3%2Bgu4bKHTYXtkFN8A0g5AKJdHRzrwkQtyr%2B9h2UTVqU1ZaW2o0nVCbyRC1Wn4uKVRvcYvLDwWGD6msP7TCg66l6jPbBUQEzawRfl%2BBhCLm24ZYO1Q4odnE86gDO23TxwYCZDjcYqp0ZkczFacZfYNKXJtR1wSSgv5d2Uvp4rrW2iAyMkzgTvrblJq1InRsf2LpZ5OOZ0%2BLSNXMtDTsVvnmwn5WX3eSC9NbYRNyuhsNi2NTq%2BbhbvlPJVu7mzqNXMHn%2FukRKHdy%2BtVkuHO4C4NM3TJ5qJrb3r4DmAAVlxiSRIEFODFYdVSW7qDjk4mZSONt2Xj7ZisvVxVGBWsev6Qp%2F9ic8h0OLwMixebz%2BirbM6V63RicAen3qKeEZdFIl2L5DAs%2FDQXFjYFpSk23rVDvqnMuQFB%2BVsFB9P%2FlEHM8oA01az%2B1SgJzDYbbkLGeFrgtgDgvM1IQ2MCtkkFPMNbYnc4GOqUB9FKtxbcVan2boE5ipsTjs02vVgKouGCwLDqnUG0p%2B8FPEbJCAdq2ICQ2ALW2a5C5tnLFPUBX2RhMH3qk%2FJAzE3n6aimJReiBnJLzUNZOI4G7egPzSQnnf9p7S64LrnBBN9h78puLmX3HZAw5az%2BJpyGfvQf9cgkuarz8DjFFTiemi%2F%2FqTtrj46DRWtQGII0Kj21sD6mJiHzle1%2BE1wDu2SR8MiXk&X-Amz-Signature=b250f28ad642a186bc17961fc8927799f198bc69e9b286c66344971caaa6ca66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MRCCXKJ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIB02TBqOgczTfDN%2F8%2FkySUijh3B%2BnVSXy3NmOPnGS1P5AiEA7tUEZhfNHhTn2pQEYuwJXONiyogZTDwKLksBj%2BEa5AYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBSzwu4BwjCUoTvG0ircA10lV42ymiqZ1xj0VCJKktEDGd2o3LSYX40WnMmhJ8GpHWYmCX3RwuVRRvhvg0FixkAwzYl49iVBY0qL1Oy8qvW69tXatk%2For2S%2B7JYfjoATdRC3XDC1zVUu5M6TUvkJJbzeyLyMvqIJrOegSSnSxn6ueNZ6AX1jPk%2BC8ZDNp%2F3%2Bgu4bKHTYXtkFN8A0g5AKJdHRzrwkQtyr%2B9h2UTVqU1ZaW2o0nVCbyRC1Wn4uKVRvcYvLDwWGD6msP7TCg66l6jPbBUQEzawRfl%2BBhCLm24ZYO1Q4odnE86gDO23TxwYCZDjcYqp0ZkczFacZfYNKXJtR1wSSgv5d2Uvp4rrW2iAyMkzgTvrblJq1InRsf2LpZ5OOZ0%2BLSNXMtDTsVvnmwn5WX3eSC9NbYRNyuhsNi2NTq%2BbhbvlPJVu7mzqNXMHn%2FukRKHdy%2BtVkuHO4C4NM3TJ5qJrb3r4DmAAVlxiSRIEFODFYdVSW7qDjk4mZSONt2Xj7ZisvVxVGBWsev6Qp%2F9ic8h0OLwMixebz%2BirbM6V63RicAen3qKeEZdFIl2L5DAs%2FDQXFjYFpSk23rVDvqnMuQFB%2BVsFB9P%2FlEHM8oA01az%2B1SgJzDYbbkLGeFrgtgDgvM1IQ2MCtkkFPMNbYnc4GOqUB9FKtxbcVan2boE5ipsTjs02vVgKouGCwLDqnUG0p%2B8FPEbJCAdq2ICQ2ALW2a5C5tnLFPUBX2RhMH3qk%2FJAzE3n6aimJReiBnJLzUNZOI4G7egPzSQnnf9p7S64LrnBBN9h78puLmX3HZAw5az%2BJpyGfvQf9cgkuarz8DjFFTiemi%2F%2FqTtrj46DRWtQGII0Kj21sD6mJiHzle1%2BE1wDu2SR8MiXk&X-Amz-Signature=1357a9571eccbc9318cd901adc00b3b511430f9c2b369292b9cf8a80535bb144&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SBJNXSM%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQCFg05pDrU4kJ7pHQimSIBl7nvf%2Fx8sF3Q2%2BAGmwY7FPwIhAPJdOI1vUzmnFNkTNSZqZi6YW99ocVl6GhoCBU0pV7ghKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHtJmaGoyQNoAW3Isq3AMViziaXNNm5yD88o5wRE2aSzoSx5hjQtjljVyn5VBxf0jsGiw%2BVz0qj09vOhbmRehoEkK349JkU%2FTjsUAOmBu6M%2Fj%2F9%2BfE%2BdPmNW49%2BYq9lGYbXLHCVnb2BBPOT826Z0tWf59p4iZZDHRm%2F6%2BXzjh7mhAsX9FyQS0TlS72MARNRej8SypFA4C7ZvK1sQgL8n1nEP5vhIgiAaJEwAMMXPtkxGaVeeSrbLkB5v78vdQGF4tHmFKayrVXquE9fGMQKloM9jyXSfTDRk6aDgo8P2MzQY2Dex6V6ecEe0bLXGNGhJEo1d3Bm0kKZ5Dslaj0msL2jtAstmAfwXFZQWyo3wkhjAucxYRMcGm70bBUXcjAXXYRnZ%2FpM1ctizo5lUfN9yeSiStViUSXD4oj20aTYcGqg%2FwaAL0iJd6BmPFLc1vvnCiqwHAYXcyZAkqAd8q5fBD%2Fs9ZyVxM8kXPZJ314SR3mQeFk5q0V0jrOcXzEGwe8hTCpRxCTtJKgYLCKsaFRW2z3fK30Nmz6W7qlbtVvJaSFMnIUEsJoJMGdelV6NBMe%2FNhY7gkktUCFsoyKh%2Favef0lEl7epUC5ILgjpLEwxT%2FsCo4UxG7Oy0%2FWRinQKLaLfMAS9RA9X%2Bl603gaXTDU2J3OBjqkATkPbr%2F04lCtCuwvF5eTEx4WWKrGLy8jk4zlWn0UemrzmwFABuDhFdXi%2B8moLquObFNBRM%2BgwTXVvmCgvyBcQIfnyb1D3MBPAFBTM5Jgff5Oj6Fi4LnxihbJHEIUWWUSYFcJkwn%2FGFkyZpTmn9TBSVOAsfu0B1zCCglY1FgEsULTK5FsswdXjR%2B5Z7dhJgCeogmqf00U6Y%2BxSUxceENuqKLWiPRc&X-Amz-Signature=b6b4d75b12b5f4ed6e5047c1cb393611cb641f5076abc251e9f40a3aa9eb58fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMDJKRYP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIBlLIxkzmXHzT4mWSywKRD3LqvLNfstF0livOEXf7kGIAiAyG7mXbALFfFE7R1fEfIJBxUFxzTz4KIPSChDoPjIJmCqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1AhrNld9VpHv8XBFKtwDDO9mdHAQiOGUen%2BI5k%2BO5olJvf0%2BWrqHwx956sz5uVpLLWV1CB6yLGyopQIf9s5361BTEzhF36zv%2FytbIXeEuwFiUPhm7vB1isTP6D32SFXT4dOo7a7t5FDqfmqItC9SVO7iEG%2F%2BYk86cNCNUxiRnu4QTw83hJUs0D400PiHES4h8GtjhCaVQvnlQpTAjLaEKBHkEfezW6ql2RO2zUzkpo7IawbblpMnWStihHdK3%2BXGUY60gx0uMad5RrteovkRIFG8qQDFlV%2BcLDpL0NS%2B3ZfjbVTKacS4BjgXiXJhlAUmD8%2FmxC88Z%2F9DiOWrBJqZ%2FAKikZ%2Bz%2Ff3nP6dFX3GPRHDMoXiYuKoBO6H6xt3db0R%2Bi8QGpbCij%2FZyHPwEhEcFudufjhwSlMQEfksmSbQJTGsPvNxfqWTuyC0DuIeTL%2Ft7%2BSfaOJg61iN%2FsNBP1oDrvSufTrutqq%2Bp6R63rNTdDkPdB8CDx3Gr%2F58dy%2BriQdv0eUrJBCTAaBdR4uNz%2B8dQr4T15GQrlcdVPfToVlwZpJYa5n8nTOwuaLvFl1L1gFAFJBXNo5O33kNRw%2BRDUjJymWTcNc9IdwM5A%2BNzM1Yw6owjDe4LMQCuz2ozizg%2B21VgOd%2BUWCnj61iEfLAw39mdzgY6pgE4JcKB27QKZ1IdGEx1UWq2HSu1bStlyhXYk1K5OUXzWVjfjgLPJHleydNkDF1jBKZ%2Bd9Ztsv5lv9PQWHpYBy9Jc%2BCVev0cCGH2A4QTY70%2BfBD98rV7zxvqa9in3obyX0veqSjLW3wpG07gfV9o4lOPuigcCUKBmTRRSMPWjICpKRl3hdiJGUO0S%2FL5LF2r74%2FqW6XvKHYxNHlA73jsrwm3oEbci38c&X-Amz-Signature=a633d6f9a9354bbf0ce25191b900d6f876163898d26beb5602954e98a578cd3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7MQV3IQ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQC%2F5WJBgbnRaJRfClAs5ypy%2Bf3KHEq7V50u%2BahXzZXTJwIgGndVuAeXD1HwYsZ%2FN%2B1%2F1JGqIzDn4ky0mSl06Exyyg8qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMFqdheKzFNcAeTZ4ircA31tgRAvBBoszDB7EeeyzNJvNOauMlNyNNs7r81G8CMivxOeDXYRGKWbGibtPawjZeOYbCkGvdyvWwbhbDTFN7DtBaIzF44EEfZufpY0GemlQ8X%2BVjVPRNlqzYoQmnxGqRBX%2F53JgEQydCZD3JbfbitfbTOxi1asdhNeZwyTTJeceHdqJf23130FAauKCjlpt6WmPvGkDwBCAq%2FYXPpdp4Z1i14qPpUOCTII12y6C%2BN6JDj8zjUi7OMqdbF2lz71S%2Bpsg5343rnjRmNs2y6u3QPp6QdGuBXjM7B37UO6smGlPvDuLdn6KvJt%2FEBjRtmVhW05bIOnaJB3YvK0yNHZCS%2BD0rabUxL%2BcZUe1xLRZNEK6N0pRbiw3%2BpdK4MRVKYj8h9R4z8lKuN3RlW0DxnhGWmGLOJIQU6W0q8HL8OMcLJ2h5bj1jmyNXosXcYzja3hlrPFKceKrjq8TO7y0Gqot1%2FKQUbwRO83vV2NUZln5mwKZhMT1HT%2Fe0pyPHTWHKUJhhLSHGtTNL0AnjRsI3vUqm%2BvP%2F22cKDO0Fd94OHqnvJD1l6V3fG1Gyj5t1F1x1jOzMLjwjeCl0clqFGsqWLIB209S%2FeScCgaS%2BUe3Lb3DKR9gwNXPDc%2BIcUfKjGPMI7Znc4GOqUBBDAZ9rJuHAucFvX6fZR9%2FSs10dbiVlXVKk9qIxGvRb69PPO3%2F2SnAcu9ZcgC3608GR0quTwiRjuJWqsHh4xnH3rhHY70KcIzaPmKnMcbdGql7%2FJ0SAH%2BMkQn3ec%2FHshI%2FMEzcSUzfyAzbgLoGBduqdSsH30qa841IDwdvVd7E7Oy3BJub9d7%2FCWuiwlA%2B3TX5JZ7QBdNzPgNUfITAdJNB7gReYxw&X-Amz-Signature=5b40ac7dbb8cf40ffac83ca61fffc637e8e6917f6c67e1fff87f810803c2627a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NADUMKI%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQC9Bw%2B9%2FC5YPQ0jpDmkoTHB6BkDQZQ4s4oKViLMoeLuuwIgEwP8NSPVZsBs0%2FnHJA86%2BX8wmXTTP5ASnqwcCojTCDAqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDg5xQrNbOXFfjV1tCrcA40T0gzejPWdk2xnCcRXwFhZ2deiimzDbqbG33pBE%2Fs9zNlNyXI5amrPZJfkRWyDdsCrXEtjVjUqqqCN%2FQg6s%2BMkNcktlvXK0lx%2F%2FFijjZUlQMbJhVq0kNVZQyRzEWtVZ6KK5C%2Fax4OJkTVjzYcah8exyjXCP8OQVr3ZpVIfxPQx58pwllL3eKLmsjh3XLGdUaJR8FMr6GXltjpFD1COC15Lr5DbCB9WwU8imHKaRKMzJ0ZeBrbjy%2FhjotAmpOIl%2BOml%2FESWtxcj%2BBbToS4XNLilZYxshGur81WtZDBESHB%2FcOlM7RZ9l9GK9h1dCY8afBjCwdfEtTDVoYJwUFb%2BCO7xXZ7oWQ0BWAzsmX0W80EO2xzzvzTAW18frYJFPucOStcrMVuk0GWb%2FD7y8ojPdUrLWpMp%2BJFq0p%2BDPDO4eiAbX5sXRSCBnwBD5wBcbiAbnh%2Bhw29VFPdAW%2Bdhys7uckyOKC7Vpalgt01zLgSjz7ClZ11%2BenRo3ny%2B4Y26H0vbmAsKCWyu97lJCk6NZJ8iV5Xvd8SZ9AuGhyv0dS5BKdwS2UnVK5LH8N7SfCZGZIyv4L%2BMkg7qvN7RvB8fwB2aIpJCHjBkk8lwYgXudod1IRQtAOoffZlkItJbgmLyMODZnc4GOqUBnzgleR8NPJoZRu3LygtAAafxxpGiQLDki021A7pUihigv9vTrB53ZfSN%2BznIgaH3KdxxDV4PfCpQ9RqEa39K1OiJSYb%2FH6K1ygZbHYXpPS82wE8dPMggZQz%2Bmhjf2%2BnVPpeyqsrAnyhaMKKLc5UBwHD4GqwJ5sLfDCwfOi4IZedgqTnGWFTFx289va2LE5ySBOnxRXa1k6RNs2S1UmdmaSk8KJx9&X-Amz-Signature=08f70b41a36e5001718639f78bccfff12ba39e31f9ae9d5b8546115064687a5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NADUMKI%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQC9Bw%2B9%2FC5YPQ0jpDmkoTHB6BkDQZQ4s4oKViLMoeLuuwIgEwP8NSPVZsBs0%2FnHJA86%2BX8wmXTTP5ASnqwcCojTCDAqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDg5xQrNbOXFfjV1tCrcA40T0gzejPWdk2xnCcRXwFhZ2deiimzDbqbG33pBE%2Fs9zNlNyXI5amrPZJfkRWyDdsCrXEtjVjUqqqCN%2FQg6s%2BMkNcktlvXK0lx%2F%2FFijjZUlQMbJhVq0kNVZQyRzEWtVZ6KK5C%2Fax4OJkTVjzYcah8exyjXCP8OQVr3ZpVIfxPQx58pwllL3eKLmsjh3XLGdUaJR8FMr6GXltjpFD1COC15Lr5DbCB9WwU8imHKaRKMzJ0ZeBrbjy%2FhjotAmpOIl%2BOml%2FESWtxcj%2BBbToS4XNLilZYxshGur81WtZDBESHB%2FcOlM7RZ9l9GK9h1dCY8afBjCwdfEtTDVoYJwUFb%2BCO7xXZ7oWQ0BWAzsmX0W80EO2xzzvzTAW18frYJFPucOStcrMVuk0GWb%2FD7y8ojPdUrLWpMp%2BJFq0p%2BDPDO4eiAbX5sXRSCBnwBD5wBcbiAbnh%2Bhw29VFPdAW%2Bdhys7uckyOKC7Vpalgt01zLgSjz7ClZ11%2BenRo3ny%2B4Y26H0vbmAsKCWyu97lJCk6NZJ8iV5Xvd8SZ9AuGhyv0dS5BKdwS2UnVK5LH8N7SfCZGZIyv4L%2BMkg7qvN7RvB8fwB2aIpJCHjBkk8lwYgXudod1IRQtAOoffZlkItJbgmLyMODZnc4GOqUBnzgleR8NPJoZRu3LygtAAafxxpGiQLDki021A7pUihigv9vTrB53ZfSN%2BznIgaH3KdxxDV4PfCpQ9RqEa39K1OiJSYb%2FH6K1ygZbHYXpPS82wE8dPMggZQz%2Bmhjf2%2BnVPpeyqsrAnyhaMKKLc5UBwHD4GqwJ5sLfDCwfOi4IZedgqTnGWFTFx289va2LE5ySBOnxRXa1k6RNs2S1UmdmaSk8KJx9&X-Amz-Signature=0e33238b9e875f221edad35f750b6a349a8e05a921af49d519f731933e683ae3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3GVBVXG%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIHkFH%2FtdO2gT10sWJTP%2BvV%2Bw6%2FNb3jAIYsG4Lp%2BHJ3D3AiEArwfTMCTjHlRXJIogCN6LCYxgEOkgCSXhoyW7Xg5KtJUqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG37MN7opExsOMDOIircA%2BZY4TbAr8tUsch%2BVqEDsxACFsac3CCOPyR%2FLCNkrNuwkLk6fVYkUVSF0wXTM%2F2ruSeRTl9gftWnStr7kPA9KVmVIgwM4pdIRuWZJPZfBAI5AM%2FgvQGrNM8IANyCWb6%2Fe%2Fz87ODiO7%2B6NC8xp23FVg7U7Y%2BgLCstvuuNQmdKlyms7H1HLb0jX60ocIpnYESEWTxgxeknYyP0DGaEHApoX4pI5RHMek5qHhKd5E%2FaHlFey%2FS7MItd5SpKTjPlxHb346FTGBP4XqBlZa1dy0bUCzrXRt4BxEB2MDmE1IQWOErEvMDkXDs65fBc9vFRoQRlH7bDyIJMWTjEBf7HqeiBVBQx4azaQn8bz1rclq2c8OvCFB%2Bm6w9tfkxV%2BflTy4SM2iN%2FK4H1lHPIBlzokwqEiSxrtUA3CNJKIlOJ%2BSrEG%2BN4e%2BEktN7ftpAlqFYtHGGgwDJBpdGItE5JjEA300pHYBS%2BlLJQ4iLEMNX9KtshjKrquSsui%2B5ZP%2FF62BkCWxMEzGlgDNXi5q082tYYrLChdy75eITmCgOCqFNFgaIetiB6KA2I3GM0GkimXbqRPu7SIwSqi%2BBfiTgLvEo6K%2BPeVtLeMJhm1NhBY0CiDSp4w8xEic7r8B%2FIWt2EEwQPMNXYnc4GOqUBYkX2P0yczTCy0J33zG3ndJfHA4pH5A%2FRLoauSbOMoneAgkiMauxnR96hHie7z3Fy2DzWtKnSD2A2QQP9mf0aVy3Rbw%2FA%2Fp1f1NXq1VQuY9CTuVM%2Bizi6T5jvFGxdoG6D4h%2FklBkDo7SDJYIZWWQM4s13%2FLmACZsKFby4rk8T9bOlXvcH8RvUzeHtWcqMSwlDI%2FvwAbfG9BaED54zEVW6qzIA9dF3&X-Amz-Signature=30bbf21ee173127df8aabe298312551a93867fbe3ecd199bc0c3db2045541f06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZSZ24GP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQDa95CwFLBtsc%2FqkX90T5%2BPkBX%2Bck%2FeJbh%2FYXFa4oW95wIhAISNeUPKRPVl%2Bal8QUKQbo0FPJhI81XRVkWjDXms%2FftdKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw8mYHc%2FPgvb2jtJocq3ANqy93CsYEw%2FHlQc%2FTH%2FbJMBVc%2FzeHcjurNT5Lu7P%2BrQfq%2BB2AMo0I49bFys1ea8SdfSRESJa9tJdA6%2FHbo0HsKERmOIaop4pbWVAXe9i%2BNqD3d9I9ORJWGMdLHigOse0C0UZcYwRzwKYwPXDTfjtnWBt5kUuinZa1lEB%2BdiOTieGXHRkMfHoSNiAxIzNc41iXWg7Efj%2FfmjLSY%2BZs8TD16tZbkhMxvQOh55Fg8RiwA0d7dyRg0%2Bs9H7UItwxkpqp537UCJUJOVzL2vRIMgbjAzs0SJUcp%2B%2B%2FuAlwYuOjG5mdBIQHB%2FNhBpSJPqqut0xykyhsVeZOF6f5VmUqjRt7kgOFAlVtLPmXlVOHnBt0EsRgwsbSWGpLpBUl0fRyF%2FcZn0DzR9dqRiDW%2Bv%2BtL6m19wWbEqi9%2FJfcLPsVhsGXlswNCVa%2F6sCvMKVKyLWS%2F8uRw7sbonDHLJAWGyAJHk1wOHWKxtk37j2aF37A2tD3a%2BrRM5zokwwy4OaOtfYc0vx9qfBu7KvdGQtfXp%2FumWSKpusSM9am0qybfFLr5oHm%2BhRlpKYaQW2nAT%2B1Ld2F%2FDDewvMx72j%2Bmaw5z9An%2F3bRcoQfQrBtCYOy%2BWeF3goUjzSA3DGTtvJ2t6lTpSezC%2F2J3OBjqkAcNgATizb885r6GL3YCCOEUB23qpurbTREdshLSVs6DazYxt01LSCsuD9Bro6PCtSUy0kI4w3OyFv%2FABi7ineQQHRcmHn2JKiYpJtnD6mdrEjugCpJZBHFuFja4p%2FV%2FDMkHL6DNQmNGvy6dhJ0FuRFeQ8zoJM2e4rmmc%2BfdT8mHN%2FABYaIU66bCBifkpdtmOjpbg%2B10RxNtprjGPjIa6F6611Qgn&X-Amz-Signature=12d764d36a143f53727b3fc8aaca092581b8dcbc2e18b7373287f758650ee176&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZSZ24GP%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQDa95CwFLBtsc%2FqkX90T5%2BPkBX%2Bck%2FeJbh%2FYXFa4oW95wIhAISNeUPKRPVl%2Bal8QUKQbo0FPJhI81XRVkWjDXms%2FftdKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw8mYHc%2FPgvb2jtJocq3ANqy93CsYEw%2FHlQc%2FTH%2FbJMBVc%2FzeHcjurNT5Lu7P%2BrQfq%2BB2AMo0I49bFys1ea8SdfSRESJa9tJdA6%2FHbo0HsKERmOIaop4pbWVAXe9i%2BNqD3d9I9ORJWGMdLHigOse0C0UZcYwRzwKYwPXDTfjtnWBt5kUuinZa1lEB%2BdiOTieGXHRkMfHoSNiAxIzNc41iXWg7Efj%2FfmjLSY%2BZs8TD16tZbkhMxvQOh55Fg8RiwA0d7dyRg0%2Bs9H7UItwxkpqp537UCJUJOVzL2vRIMgbjAzs0SJUcp%2B%2B%2FuAlwYuOjG5mdBIQHB%2FNhBpSJPqqut0xykyhsVeZOF6f5VmUqjRt7kgOFAlVtLPmXlVOHnBt0EsRgwsbSWGpLpBUl0fRyF%2FcZn0DzR9dqRiDW%2Bv%2BtL6m19wWbEqi9%2FJfcLPsVhsGXlswNCVa%2F6sCvMKVKyLWS%2F8uRw7sbonDHLJAWGyAJHk1wOHWKxtk37j2aF37A2tD3a%2BrRM5zokwwy4OaOtfYc0vx9qfBu7KvdGQtfXp%2FumWSKpusSM9am0qybfFLr5oHm%2BhRlpKYaQW2nAT%2B1Ld2F%2FDDewvMx72j%2Bmaw5z9An%2F3bRcoQfQrBtCYOy%2BWeF3goUjzSA3DGTtvJ2t6lTpSezC%2F2J3OBjqkAcNgATizb885r6GL3YCCOEUB23qpurbTREdshLSVs6DazYxt01LSCsuD9Bro6PCtSUy0kI4w3OyFv%2FABi7ineQQHRcmHn2JKiYpJtnD6mdrEjugCpJZBHFuFja4p%2FV%2FDMkHL6DNQmNGvy6dhJ0FuRFeQ8zoJM2e4rmmc%2BfdT8mHN%2FABYaIU66bCBifkpdtmOjpbg%2B10RxNtprjGPjIa6F6611Qgn&X-Amz-Signature=12d764d36a143f53727b3fc8aaca092581b8dcbc2e18b7373287f758650ee176&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFF5JA74%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T073602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJGMEQCIDJQW1j5h3%2FaIpEbJiYkrV1vd6Hi%2BFPmEIz4NUkGk94zAiANREiy6%2FdZcpq8anbVHJXJlpx5BaI9FqJsWvLscKfQ9CqIBAjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMCqPem3CWpHwhxqhCKtwDwcf1xCSiQ3EcvmNMU%2F8Nyhu6CGQ8vfdTAin65V8b4XvDH3ukEzwJB9Snh5fR8QeAIqBZ8LmXr6P%2BFJLLP%2BL1Z7nmRmBvG09ZD9O5a4kxSlfmesupihzrNYl1ew1cR0sXQDYwwJ66YQ%2FJMDFblQT4sY8%2F7%2FKM5QB5BaEPyi%2BHLsYmPmGVLnjqcHFS%2B1g%2Fe%2F5atHNSNWfFReWGYJWApMClOj48Z6pqf3GEcwMhmC4TNq%2Fedg0hYEmpYXGMB8HeVMFZ3F425JlCf2XP3gH8jh6d3O30zDuD0vDfpg77Htf6PVJhIiagcwUhy4oIdIrZJDlXYwOppINYB5txVsVDvMQupy2QrBxOAviXJRD7PKzLNrBiK2uwr27Gs8kzI3fkCkgwQA8syiDtvNCbrfFuBrUxubdNZNouoSkQxffblQgqqLDbonVIBgHf%2FBd7xRXVhliiq6thD%2FqSfzPl3XqEQATJd6vogOPHHhufm%2B5XurORFqTDyWALL5clXpM9q7xzAXA7V1E7gRpkRo0DaLNOZGu%2FwfrMUjpOn1sDr%2BDkIiyiSLy15IL7bhrdw7L5iIH53Z%2B%2FiTObWcL8sslVIuqETzEwWOAZAZevFlPuD58XGUORmPGf%2FK97FpCmR6dqCuIwrdmdzgY6pgHjjmiSKaY2R3W69VrjJnqCGa%2B5pGksQ1slHUgzv8w2ZZ4BgNtG%2BozDtaKsgp9XJ2c0Deta0gUfZk%2FppIZhElQv%2B2Ti3MCj6i904MGpl3ZdOhFaT%2Bh6Tmlds3z%2FOyJsBbfOKjA2hnWG0nm3hUGIV%2BER2eRrmNjzTd%2BfmCJrycP%2Fj9aWWsRTu%2B3ACTevHQkjJDhF%2By01w8qqnGwXXOXwScc90bG%2BDtXU&X-Amz-Signature=5b79930ac73239cc29e2ed8d92c000874fe93e199a3a97641f33f32ffb0daa71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

