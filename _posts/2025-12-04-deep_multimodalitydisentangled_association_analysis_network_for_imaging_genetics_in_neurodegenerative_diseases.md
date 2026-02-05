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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STNBTWCG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQC2zQWROw9rn7DEP4OUHeSW4kNVP8L0HjcSHl2VcAUrawIgc9KtfFhzLDaNIkDKTkHAuV2Dg4PkrnUxSEuR9TG2vHwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNyfuvMNmF4jxhZ6%2FyrcA9FYeT%2BB1IgMGhrOc%2BrONyYo6tRe9TetPTQqjvzSge6yNGwmpCbI5arWcbKzZafHJOL8qmu8nRt5ykyEjuWlBr%2FTL2w0KpwqAfIm%2F8czxQUhblrHvoIivLjVJ9O7ay0Hg%2F3pfEobq29zg9lmRb3b57Qk%2FboDOV%2BOdSiTspHa840EIFn%2BZYXgGGuCkRBMb%2FMApMscq9I6uP3EzbTqy6LKJ0CrpQy8MMz5ThYMHyGeGufbrb1eARFvpPnLF%2FoZxY8jafNlhSfO4%2B8OTnl3YfqM5BsoKdEHN%2FiKaEuPA3D1syJE5iaXVNVn%2BxLDHckGx10FV9A9Q1Mqr2jXeuZx2cobXNCftzps1r5WjcEITKoftsHBUhu%2F5BfvhkV%2BQgLd%2BgJd%2B0da%2BXWJCzYG%2B%2Fw4lWHG9uApTdItheu%2BHfcIJTvB88iMgBzgtJF6GrWSuqjVN3P26L2xkMqC60%2B8Xd1LbFC%2FQalwh40aZdV1yGpP6gcx7UdCgqRye0Grr5MCUemNQYXB4fpVkm3%2FwfD%2Fn%2BQOUEpgOsXjiqTWlpNfK643J%2F%2F9ssZU4CQKxZ4tryI%2FXdZpQ3QRv%2Bo6QuJaBfax7uJ1WrsZi4akTMibaioUDyKTLH5juJEogDtvLYdCP2NG3wYfMM6KlMwGOqUByI0Mx6RcWqY218VU1DIecH1%2F5hB94fMzgdcfCkUBtGbnEDMkJ1neXnRf2g3EOKSHOyJ%2FGisYKQSWYATpDaBy03l3v6E5vSmKvBxD33Ui9Nob1HoyksYkpCqOGO6NSaqLBCgkeiiSKZ%2FNcmgf8pe9z%2FCaBAdGD6pY2qnO72Qzpde5lDkN14XowpCnxj%2BdjTM2qvwhD6TMR1eJV5Vx5%2FICH1PSKZnS&X-Amz-Signature=dd3da961381a655606bda9e58b8cd1902c83e7ca232c66b268dcdfc50c500aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STNBTWCG%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQC2zQWROw9rn7DEP4OUHeSW4kNVP8L0HjcSHl2VcAUrawIgc9KtfFhzLDaNIkDKTkHAuV2Dg4PkrnUxSEuR9TG2vHwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNyfuvMNmF4jxhZ6%2FyrcA9FYeT%2BB1IgMGhrOc%2BrONyYo6tRe9TetPTQqjvzSge6yNGwmpCbI5arWcbKzZafHJOL8qmu8nRt5ykyEjuWlBr%2FTL2w0KpwqAfIm%2F8czxQUhblrHvoIivLjVJ9O7ay0Hg%2F3pfEobq29zg9lmRb3b57Qk%2FboDOV%2BOdSiTspHa840EIFn%2BZYXgGGuCkRBMb%2FMApMscq9I6uP3EzbTqy6LKJ0CrpQy8MMz5ThYMHyGeGufbrb1eARFvpPnLF%2FoZxY8jafNlhSfO4%2B8OTnl3YfqM5BsoKdEHN%2FiKaEuPA3D1syJE5iaXVNVn%2BxLDHckGx10FV9A9Q1Mqr2jXeuZx2cobXNCftzps1r5WjcEITKoftsHBUhu%2F5BfvhkV%2BQgLd%2BgJd%2B0da%2BXWJCzYG%2B%2Fw4lWHG9uApTdItheu%2BHfcIJTvB88iMgBzgtJF6GrWSuqjVN3P26L2xkMqC60%2B8Xd1LbFC%2FQalwh40aZdV1yGpP6gcx7UdCgqRye0Grr5MCUemNQYXB4fpVkm3%2FwfD%2Fn%2BQOUEpgOsXjiqTWlpNfK643J%2F%2F9ssZU4CQKxZ4tryI%2FXdZpQ3QRv%2Bo6QuJaBfax7uJ1WrsZi4akTMibaioUDyKTLH5juJEogDtvLYdCP2NG3wYfMM6KlMwGOqUByI0Mx6RcWqY218VU1DIecH1%2F5hB94fMzgdcfCkUBtGbnEDMkJ1neXnRf2g3EOKSHOyJ%2FGisYKQSWYATpDaBy03l3v6E5vSmKvBxD33Ui9Nob1HoyksYkpCqOGO6NSaqLBCgkeiiSKZ%2FNcmgf8pe9z%2FCaBAdGD6pY2qnO72Qzpde5lDkN14XowpCnxj%2BdjTM2qvwhD6TMR1eJV5Vx5%2FICH1PSKZnS&X-Amz-Signature=dd3da961381a655606bda9e58b8cd1902c83e7ca232c66b268dcdfc50c500aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC5MHXPX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDwZelrntp12%2BnWoCJThYPkQjbcMZ7fsV7tPWJNQkrwvQIgSM246wgNemDCxRfGo%2Bc3IF5d%2B6zJFTcmJ9BCc4CD8Zsq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDCeqCiEji7bS6OGLeyrcA69v2LqBW96lnIYIXsdTp8VzLtdueSocD%2BO%2FGkGB9rqEJ3Lo38cGgmeYhRdVjTslmAiz7K2jabI1inVPsQsEj2X1I8Z1TKhUUbJoxAl0%2BQYheraZb3%2B9rJ%2Bdurz%2FDJ2tqrxruNH6PwPoXY0h546TdEafJOk29vZUTSLjoH4hh%2BDJVec29GTZ28MzX8um2lQl7u8iVTgikCNR7s1SllEXqL74t8sCv65Joy0En1lhqcekYxvhqM3UDgk%2FmERyrigTyj5nPH2WNPCaLOvWf%2FzqTFDX3TKWRJx4SmsDPAZ958AGJahBr3VEjkPW%2BBfvI7SLmY3xafGXwkAoFpPuT1jlalH6GowUWkj%2BljovAGedl%2BDt6v%2BvMSWjU9WG29KtzBkbrnHSlKCw7jgzkxpIbfUCVb8ItavHSciM6xG4HQAf5sN6%2Fine3CHPtAHRL8L20lhXmgSdAF7mYBMhvPuOsv%2B2RJTJy%2FqJ4ViXdkATPIG0GfwEl%2FnCI%2Bt3xEQg35vfPIqT5t0mDV5FNhdcULJvZ%2Fpc2F1v3YoWWEWczRcIIxBsW5kVY%2B8w%2Bx5fANiiCZoNFgY9Ln39d5g%2FWdIXoiXP%2FKVY5E1ils8Cr4zutFUjJIM%2BVahqZROEUWvLnwSmtAb1MKSKlMwGOqUBj38tjdxTQT46F8zM22CvGzxLueiRZtg8SscmCGAOfw3cs5yydX1uHq0EQMRWtHDNisirL%2Fw6iKovqwvbmFb8aDope66W9fyHY6Tmx32EOB4PHNEG39QRXMegXErA5d9JkPEUL2Pi0%2FGj3TkHUUk5kNOk%2FnMn2u3T9I86Ba4uZXL5BjOgSH%2BdelwTwVNb0M564%2BXpc7B%2F6SxCTPcPfI%2F3ujVZIaWL&X-Amz-Signature=0f9037f753c8248c23448b26241b1d254acc874ca9a8d3a976935f0a5a14a9bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEKQZONL%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGQJwBGEFcQe28OK5ePs%2BcZx6rDGfh5yG9qC6LvtLzWxAiEAqXrePaB74MIZPVv5svS7M%2FFiuqy1LeT2dtWDbZogSPEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDCm0a%2BMioVNg%2BVJA1ircAy5f4dTVTRJiIdbA4mM0B0qXf1hHq%2BbmpgjixFdZy4wRcF8fagnDdYtV6XZLIcK5rAwRNCMQlBpjFM0x%2BoEhYOOR%2BOlh2iwV70TBh8pZzhb6zkZb5jvXgdl48wwFkMzWFbcfxKNQFfJlovFj3qIiOrdxp4n0fKUCv%2Fg166kYql4fVyL8f3Te1oibZuO3ecUdSBOLF5IRt8sf1a8zaTKAhfY%2BQ8tfziNu6OlBBL7BTo8nKqM%2B6XDunGECpSb%2Bb%2FEp%2By0Ofh6d2YYUDvBSUjyncr7py6p3rCu1%2FAxMcZYqwBZFB%2FuCVPMT6p14bam1QkAAEaJkzD2l1AGjCtdSwCs2XvqfWpiaUqLOPKFQtnpFxBOK%2FvMf46qe4vGemRDEH8VYqhMnk1QtLeayqbVS%2FIaS7fGHz%2BpvexQfdCo7GEI%2BO5os3Uoe8B7H4LiE9BADjqL2x1efm7k7pBpOY95g%2B6BVZbedWCM%2FPiTtt%2Fu6hs9x8fiL%2Fvt1FU5ojlNn3cIF5h9KOxvPcCnzf4ucaa6qS6P85dybjdV2kaRnSQgVFO1oiTwP9w0Wfopip35DX23ToPE0I%2FYsA0AQm3k9bXrMY5hGmuXKJZ%2BRvvOwaFhOwQ5v6IGf%2Bpg1EK5Z7pACjkxmMM%2BKlMwGOqUBvGl3K%2FkRCmXYfQGQxTLcYPASF5Bc4cG%2BUnPuCfcAHABv9y2GdErkWfjX3B%2Brabw0BnCHEx7JdCzgIjJbRXamRiRfI1V0LDs2zIgc%2F6AMyREh2Eq7E5%2BfoxdctaJHJLNVDyRp4vJ4lbsLR6rzPyKKm0Qyjrt7j08Ut0JqHlfrmYXZCwzFMxaXG1VuWg1YsYndFky0z%2FJ9B%2F1NEsXm6lOaDhzIZkFY&X-Amz-Signature=1805d581a23e1583b67c97a629deca78d920bf5298082a498b63bc27f8aa0400&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEKQZONL%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGQJwBGEFcQe28OK5ePs%2BcZx6rDGfh5yG9qC6LvtLzWxAiEAqXrePaB74MIZPVv5svS7M%2FFiuqy1LeT2dtWDbZogSPEq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDCm0a%2BMioVNg%2BVJA1ircAy5f4dTVTRJiIdbA4mM0B0qXf1hHq%2BbmpgjixFdZy4wRcF8fagnDdYtV6XZLIcK5rAwRNCMQlBpjFM0x%2BoEhYOOR%2BOlh2iwV70TBh8pZzhb6zkZb5jvXgdl48wwFkMzWFbcfxKNQFfJlovFj3qIiOrdxp4n0fKUCv%2Fg166kYql4fVyL8f3Te1oibZuO3ecUdSBOLF5IRt8sf1a8zaTKAhfY%2BQ8tfziNu6OlBBL7BTo8nKqM%2B6XDunGECpSb%2Bb%2FEp%2By0Ofh6d2YYUDvBSUjyncr7py6p3rCu1%2FAxMcZYqwBZFB%2FuCVPMT6p14bam1QkAAEaJkzD2l1AGjCtdSwCs2XvqfWpiaUqLOPKFQtnpFxBOK%2FvMf46qe4vGemRDEH8VYqhMnk1QtLeayqbVS%2FIaS7fGHz%2BpvexQfdCo7GEI%2BO5os3Uoe8B7H4LiE9BADjqL2x1efm7k7pBpOY95g%2B6BVZbedWCM%2FPiTtt%2Fu6hs9x8fiL%2Fvt1FU5ojlNn3cIF5h9KOxvPcCnzf4ucaa6qS6P85dybjdV2kaRnSQgVFO1oiTwP9w0Wfopip35DX23ToPE0I%2FYsA0AQm3k9bXrMY5hGmuXKJZ%2BRvvOwaFhOwQ5v6IGf%2Bpg1EK5Z7pACjkxmMM%2BKlMwGOqUBvGl3K%2FkRCmXYfQGQxTLcYPASF5Bc4cG%2BUnPuCfcAHABv9y2GdErkWfjX3B%2Brabw0BnCHEx7JdCzgIjJbRXamRiRfI1V0LDs2zIgc%2F6AMyREh2Eq7E5%2BfoxdctaJHJLNVDyRp4vJ4lbsLR6rzPyKKm0Qyjrt7j08Ut0JqHlfrmYXZCwzFMxaXG1VuWg1YsYndFky0z%2FJ9B%2F1NEsXm6lOaDhzIZkFY&X-Amz-Signature=f85aea8d6ff6003b897bd58930d6e8f0e3fc8bfff3f467225f01dfc1e281d6cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI56QCRV%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIEv25MQYhoWxbx9D6%2FoVyZ9TkCJY2gaK1lK9BtLJldojAiAEqYyJTZ29o3qrj7nnrFnuF%2BYq5SxaJVzS40iAy9UBiSr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMDP6CeyJyEZxXe0ZPKtwDF%2FRE2ee2qQMhf1x9p7GgJWLbViyN33hD0QKLxiee97z%2Fhm9Meztu9rsdJt4MEgV9De07ihaChdyXWedoAKaSev00enQ7k0s%2FcmXRwyL2gEQxDnQYyCMBkaQkk%2BZHRxNMCN%2Fa3sBjcvqq1DufPyixa2deoaNJcTpK4ImZmYguOk9T2lcsATUrxFu9UYjbkGMN9NEX79WwJqGRo1J56Ss4CGVWeXXqmTvMPBmiLv4F4q8ecDGar%2FmChNH4TpoQjFtANCpqfwUYLym8hW6FD0QzidXFD3OaiMM6BpKL5oWiALXiq5vFDEaHyN33n%2BwoKQgfpWF2LYRI5cYxvW7YabqBlPhmbccq85TkNwTgfbqeFf%2BDNkHOPTX45AkbN6NfyWM08OUZKVPcb3nLzqd8xlONklImmJvQuST8KeXu%2FZiwuZEYSROtCqx1YrLgffBtnf%2FsjFdga9Z8caL%2F1UY%2Buh%2Fx%2FBN%2F6bc2%2FsRspn1odYLnNtwjqHQ2gRsq35l8VFTNpolazkz5wjEXbccKUYImHQeu3AZRbaPDEZR%2FsooXwRGuxH%2Fn3mRRn9dYCDZcl9CJz2QI%2FhsmODzwdZJwlNY01DSIGAw2pQ1MVC%2B%2FLZacSIwKmn6Id%2FY41VEpL3gH1j8wzYqUzAY6pgH9kXhlQbYceW4wEOmlthfWjOszdM0BytSRUjriewpQHQudA27twiPkHtxwDEzPjg7yGfEY66raaP%2BUUKgBuv2Aogrsk5Mv4SyEagQO7JxeA7V1hUt4rxmC%2B8%2BKE8kUlRQPLkkj8guUJ7qpPvwLr1ZddWI8ngRyUeyZAokuWCalZ9RY6drzo2GM%2FYBTTU38bcX3XcFEDvcQo5CuykeN%2FSvlDi7GZ7ro&X-Amz-Signature=a6883280fbb893db62fe4a2a82c176812cedfc59141ad9e98db560478e21f2b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662362AVQ5%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCID5mJKyIjNeaBYd%2BwEBDKZj5RAdYk%2B4Oc%2FfuqGLXjni%2BAiBg7bd3JaFGDsSOr6KjOHaHt6da04cyQV0Nu%2Bmc%2FMDnDCr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMDdywDpwkLinq9saUKtwDZYj7%2Bez1LWf1NTYsY4zci4QTsfysk06gnyrBWLI0xQ4kYecvIb6iFy4kWpwVv2spGPbR8ysr7PEr9qpQLNHjAPxq6W0wOHPtz15a8%2Fths0ffanwonUq%2Fjw%2F%2BS00zud7KduiGFtCpZTl7k75paYDB2nIyze8hOqfxoMsQjI7YA3CVfWgWyRktwbmxyDirVoei4t0%2F48VQYFG4UJUqxdKUSTGXJGj05Z5M2cKEO%2FMwlp%2FgzoB3rQY1%2FpLwmRRCbcLR%2F%2FqAurVNdiw19HYkBlJ3jjOSMowW1mF2EuJOLgFOx7NhgisZRMdnLx8RKeiGwW61EzJohC5GeBhQIM7k8XtdTO54kgUX1OZNdeuS9pECFD8oYFMk%2BGHlPkDG%2BN%2F25OUu%2BxPClQacPYAeKkQJDvIJiiJkFXXwumUro2igT2eu3m6TPWClh04WeDNRyoiayEYFfOF%2FwwOmzZ8xGRNbv3DdOykp%2F7Yy3EOXFUjKYe80iqCCRBUby8AREMaXsKbbwWiMcuRW%2BCEoVGFT%2FL0K47MOd6WgeJpmJchj9BL0KsH3zL3JS982pQdz7miaRNI7W2so%2F3kaefWuEHDqOJglbpjceh8fQzfoecejIWxvx3brO1uOGKUYXT0S3ODzdtMw64uUzAY6pgGlY4BDwWAPXTFXgBd4OY3GVEGnwLzpeI6N6FaXRxMMpvcIazwa0iy0OfS9Cs96IQq1UJoOWAS3a8%2Fh0yO939vBA%2BO29Ab%2FluYV361qNvYLfqZbqeXYOAgbzjcZa6fQfd4w%2BHp2pVMqlZaDITYv2hkM3hiojRkyhPj8VSiUFQPVZrgHN9bL2lKn1gx%2Bb7FrAeOPnSvsS4jAjHBVKl5zAmRzdSYYrE%2Fw&X-Amz-Signature=8c52e5ce0eff9bec66dacd87fbe349d518bb8a47ef130d2e3299cea5a638cc0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCCGG3NX%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIH6VfDMeNb8t94rZKTp8I%2BGybp1mOO7TobkQJZKD5OxKAiA7lcBKktEjJiH6YMdjmitm1aD%2BCJnAxZO8nqx1R%2FqV3Sr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIMQFAMkaDsc61cFD0tKtwDN1kspBYOlg%2Ftck8fNvO2c33gl29ecXARnUu9wN%2B3982MdRA3Vp6imbEsIVRUYwMLES%2F01y7pO76qF2wocFYut20WBaF2X%2FUUIS9x1gQI%2FeZh%2BaeBs28j2GV0bGCejvwy07HliyHcdRjVlQG8yF3XmtG1MwcGOfMpIgW8z9T7ZBos%2Brem0rJwCizVpy%2FDrPyTPbU3y3ST2njaVP2ERiQV7tvta5Zz1xcBrQ6QjWVkWnA%2FUjBgjwYMQ8IihZmc%2FX0nu8zh3zb%2FObHmFL4k0T7zcX%2BA4Ar46zb9Znmi6xi03S4WejIF1k6EQJwCqpl%2B9xpj8JQPAyR0G%2FXYymqGglDe7n3vBhitxGaQLfWrqHM6Ax9%2BVB0%2F%2BT31PEaCFPX1NoyeIB11hxs7mK5BnH5Yl0elwK5x2qYQSnXmTo5lrr9LNkObjI9vFMqqYrHYWklY1i4JYzr5o%2B0ItfSLjRaOy0yASmi0ALHm0ccshnozoBOaTRz0P3rkVZ4HN76b2692aR0BrFWsl1322Ac8K5LqnFL9AQg7DoHosiSE8IKYCGzX3rd8LMc6W2%2ByCE2lULkgFWU0%2FvW3hcnVmNKGDB%2FH1ckbyuKmC8WoQ2Mv9nN7iz9ec33ynvUFF232getAYnowz4qUzAY6pgE5C3P7Iov4MjIQ8pHgeLmjNQU%2FKByC6YGh6sMWoCR2gTp8XH84cvaa1dkloGrdfjZQUiZaUlRioGY6Ob%2FwRC4ZinOyjp39ulKKTrXDGHYZ00dZjsPFYPRJxjQWaB8sxy2nUk62084C4gsB0pL%2BiNKnBCExjtqCC9d4WYxvbT09vGssolJXnspJ6lpmUIAeLFIYYhKGgGSsuM%2FEoNcbnnzV95tcgnf%2F&X-Amz-Signature=1b0ddd0179ef337151fac33be4be04771bd428f8124f6ca360701cd34315b869&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMOWOVMQ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCg4k4sHQtkjoWkVvB%2Bn6O9NdGYWQc1Y3X5O4%2FIReqVYwIgVDfHQxmWvdsIIBbUSJief61HMcSbTietVieE5X%2FEDr8q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNZ1xrboQqo%2FX7dcqyrcA0fpR3zu7oBM%2BGOnuw8A7TSjuTvRjK18on788bhyMlequopC0I9NiSR328WtbxB8%2BEY9noWCECnKIZm9rBrs3OuHk6LMcrso1Al12df3fAhm6VtNnS77MUwpLxcMIR6q034JU1hDcSNPtGlgVsZN8YLaFrR0bIEhLDbqdvhV0tUQXKUNUdQz0x0ieKCQo8qsrn3gwf4lTmcJLETldkFC%2BnjDZrIJ1vcVOrRILzSKkhYqSKJRdPLEBMDRWEA6S6NjjRjnegoIPcddKiOROa3OKOL8xt1m%2FCQNTWXBeqGFA61xbGCrjgdFOpyMNs8LlEQqaxilSV0MtYf%2F6yytDs6%2BIfP9gLxWSdbF4lnbBHVfnA7pNXodQ2T66Tfmso0QDUVKLUv3q96vWsdX8lKQXdloDuBidqVsHjvoyvR%2B8SRzFYyrS2tJz3tbNNw%2Bw1%2BvWZkYqHdcY5XXhTRYzyBOB7ozR4Lss2dm%2FBaopAcn9ZeW%2FuqzJgeQ8L17HbTVHg6UnvAuZGVyPo8wqAFw0squTvE5RqzjsXsfzPlzPvwlq0MBKoy4cGJkvCkckLGrpJyb70gn7%2BXS26b%2BLM%2FtbcvLGcNH82bib64oDgdqOXtRTCGkoh2Aj52G3JqiW2YjJOn6MK2LlMwGOqUBXzASqtUE7IxVBaUbnnfOxWcYfoK%2BoE%2FJut%2BOKsm5HYPfZG1BZH7ZspmHBdPL4AHhs5wtqhcHp5CSHKHkxC3aNRAHM%2Fvpvz%2BN1WQDDMm2DahksXCUUgTFxsxUiGHkLrXnlopcuG55GU%2Bo4poT8l5LNt4llKzQoJQJ%2BX4FaXyf1BvuC0frV8Cg4lwFlM8s1hlbEks2eQRK9bdjya8PGTjDJxhKIf25&X-Amz-Signature=3145e34d869f13d8739658782569b5beca3a6ffc758a99d0e039fa53168cf495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMOWOVMQ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCg4k4sHQtkjoWkVvB%2Bn6O9NdGYWQc1Y3X5O4%2FIReqVYwIgVDfHQxmWvdsIIBbUSJief61HMcSbTietVieE5X%2FEDr8q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDNZ1xrboQqo%2FX7dcqyrcA0fpR3zu7oBM%2BGOnuw8A7TSjuTvRjK18on788bhyMlequopC0I9NiSR328WtbxB8%2BEY9noWCECnKIZm9rBrs3OuHk6LMcrso1Al12df3fAhm6VtNnS77MUwpLxcMIR6q034JU1hDcSNPtGlgVsZN8YLaFrR0bIEhLDbqdvhV0tUQXKUNUdQz0x0ieKCQo8qsrn3gwf4lTmcJLETldkFC%2BnjDZrIJ1vcVOrRILzSKkhYqSKJRdPLEBMDRWEA6S6NjjRjnegoIPcddKiOROa3OKOL8xt1m%2FCQNTWXBeqGFA61xbGCrjgdFOpyMNs8LlEQqaxilSV0MtYf%2F6yytDs6%2BIfP9gLxWSdbF4lnbBHVfnA7pNXodQ2T66Tfmso0QDUVKLUv3q96vWsdX8lKQXdloDuBidqVsHjvoyvR%2B8SRzFYyrS2tJz3tbNNw%2Bw1%2BvWZkYqHdcY5XXhTRYzyBOB7ozR4Lss2dm%2FBaopAcn9ZeW%2FuqzJgeQ8L17HbTVHg6UnvAuZGVyPo8wqAFw0squTvE5RqzjsXsfzPlzPvwlq0MBKoy4cGJkvCkckLGrpJyb70gn7%2BXS26b%2BLM%2FtbcvLGcNH82bib64oDgdqOXtRTCGkoh2Aj52G3JqiW2YjJOn6MK2LlMwGOqUBXzASqtUE7IxVBaUbnnfOxWcYfoK%2BoE%2FJut%2BOKsm5HYPfZG1BZH7ZspmHBdPL4AHhs5wtqhcHp5CSHKHkxC3aNRAHM%2Fvpvz%2BN1WQDDMm2DahksXCUUgTFxsxUiGHkLrXnlopcuG55GU%2Bo4poT8l5LNt4llKzQoJQJ%2BX4FaXyf1BvuC0frV8Cg4lwFlM8s1hlbEks2eQRK9bdjya8PGTjDJxhKIf25&X-Amz-Signature=9144902b2ede61b94eecf05fa2d3e63fcc7921b575320175c6b4dcdd7a1f829e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DPRKMT2%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJGMEQCIFfXl3lEhv7Y7jN%2F2zPSLjT6yOUAVvKZC4h9zKwK%2FClvAiAK9xefePjvOWtudAjsU%2BulCdnstjOt%2FKmRnGnoh2iM0Sr%2FAwg2EAAaDDYzNzQyMzE4MzgwNSIM0cxAUm7dr%2FecJpKNKtwDkRlwBTzqOnidrgVA7SMEuI76bI76nF%2BXIPOuQLSZbhJifgPSe%2FzTzvixlTCZl2xSMlYDBPTJgwK%2Bo1vyqxaqrkpDKXR1l%2FHO3QTkEY3Z4yknW3tbNRhsxS2tkDGXdlKmZk%2B2mQcUNB%2FaWzHHFDXRHHuD6jqzDa5HIoSCuLWQ8Hm3o8rCglYWusDXpum5N3rZUybdsc94VfYdnn1weLkzR%2Bjm9oFR%2FTOiQ7GxWs0rdQybaaLTUBv3rjuEMCJFPq7JlZTfYoDni%2F3qIifFm3wXmGPoFn%2BjtHS5SCqzuEnu9MBV5KUz87SNvy19HIxZWKiDA4ZqmrvAn2bsBxuh03zdhH2QzRIbhOsN0i58ankvRDp9XZ%2Bliv0bU97xwvTUsNrF%2FFVDIKQtjwRqRgVTUwAhibL9po063kYcuu90UqiYAfHjPmxmq%2FGIeiRIJr%2BM2XN63weqqRQStHgB7M%2F3FDHf1OB1DV0%2BUOhO5xciIe6oxpomMBLyf3Zn2ZsC7zyvfRfOQw1pDKCHQinkqMaKdg1pzoEN3QGz1M5Ty0tofY0dDK6SM8xmhr6E9k0WQL8xAiveWq8gce87toyWMJjwxROOVTf%2FUhpXzCNrQ%2BTBA5xE6gZBSg2d5oXZXMzHWzUw8YqUzAY6pgFmb1MMKXO0sDs9weJpyfHc8paz%2BPF6uAcd%2Bpd9dO%2FGCJueQ6YnKxbwgnI3F5yIkv7a%2F3UFQvTDySvTbh9BaGNAVZJRs9yRlPOvtv7iNmXlVlnFwlTszkpxzyaASQhWQ63NF7QE58OuEiF4%2FaMeB8nTtAhlJX3zaOPiBB2zWSAxod9wTwrY%2BB0NIdcHoA9zavBw4xeD3Kc32PC2aHt82pdB2CfpIriA&X-Amz-Signature=9203c4ddc64988a153870bc51401b4854b65e55e202e9f4f2228b32aae21284d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STJILU7B%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDHYmSxwmQxDXRBPh8%2F2dVzrJMzdxmKCiFiYfDE67w1dgIgK%2BwZPtJxDealnak4C%2BKBjJN%2BwFthYHT4hnQpa3DBUlUq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDOZCMykflri8z0ifeircAzbecRSGuwvYmJWHxmHvGmerlV6xMG7uhB%2BPDexV%2BXr0QoUDyY8vy%2FxgZKJ4bU7JgK8ECnvPsMSP%2FVAvo3uSIyH0JGFAD2KcUimeghdF6KLgvWH%2FvJfjK2e%2F5t8qdD%2BJcwVZODxAdbYKZ%2Fyd%2F%2FFa2l0shQUV%2B5EW8EVUXjf9clNCQqqprKPWaP2bfBGgOIhCc7VxxgkygEzt%2FjwW0%2FuAFhV9sFVqcGiPAMlBX%2FPjpfgNLId9c%2FcMAzVynHTd%2FLr2Jcb8AAcqEZeECCP9%2FwJhA3VmB6%2BxfqetEdcJJMKtvv9h5Y9%2FK80EXZyuXcuHHHC34Ba%2BAdfynQ2qGCw6EY1%2FshoSztminfcGRnpk9lbDZIF4U0bdU7VCahOdtiFuiTmCwrSbANEhzzwCAmnS3U%2FyqqY%2Fi6WESUq9SACAs8UDq7TV8ieJ7XTB3NKtpIGmJSU6BUwekkFXcCLxxKH5Vq1S4KJaKctfrLVs4hizekJKHEH9m0Bt56ayJ5d%2BB8iQ6%2F26ygjHhEaSe244Xa3fIFtqlwJc%2BGXw5Pe9XLknUZlU3T4IZ9Km1TdY6b6q%2BH9f0ZUPEthEjViTt8eBJXGyz3eLnvscPWGl2IESUzDcplAI7wLOUWRWXA9sAEiyW7XMMOyKlMwGOqUBpDevK%2BhspYhmLFuiuXdL3PElGw%2FQ7RzUbmXL2C13pdRv0aUz1srnV07QhWX%2FeO874KWmir1IXM8BD4Tt%2BLdxLPjHl4rmFRe%2F4z9M2g9jgI2%2B%2BxncPgE1fbAhqEmoC5kZNrRp2ujICo6RpUEJQOUsPmZSSbKW0GYplCPQ1ufGHaFl8Z9Q%2FunQ%2BrHPM4amlNRMcChhwZYgvNfMyOYADXQAXfjW5OdK&X-Amz-Signature=118555525627f9e93727db2b7bfdb865e770c3941972e231998932a7ad6e8d7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STJILU7B%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQDHYmSxwmQxDXRBPh8%2F2dVzrJMzdxmKCiFiYfDE67w1dgIgK%2BwZPtJxDealnak4C%2BKBjJN%2BwFthYHT4hnQpa3DBUlUq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDOZCMykflri8z0ifeircAzbecRSGuwvYmJWHxmHvGmerlV6xMG7uhB%2BPDexV%2BXr0QoUDyY8vy%2FxgZKJ4bU7JgK8ECnvPsMSP%2FVAvo3uSIyH0JGFAD2KcUimeghdF6KLgvWH%2FvJfjK2e%2F5t8qdD%2BJcwVZODxAdbYKZ%2Fyd%2F%2FFa2l0shQUV%2B5EW8EVUXjf9clNCQqqprKPWaP2bfBGgOIhCc7VxxgkygEzt%2FjwW0%2FuAFhV9sFVqcGiPAMlBX%2FPjpfgNLId9c%2FcMAzVynHTd%2FLr2Jcb8AAcqEZeECCP9%2FwJhA3VmB6%2BxfqetEdcJJMKtvv9h5Y9%2FK80EXZyuXcuHHHC34Ba%2BAdfynQ2qGCw6EY1%2FshoSztminfcGRnpk9lbDZIF4U0bdU7VCahOdtiFuiTmCwrSbANEhzzwCAmnS3U%2FyqqY%2Fi6WESUq9SACAs8UDq7TV8ieJ7XTB3NKtpIGmJSU6BUwekkFXcCLxxKH5Vq1S4KJaKctfrLVs4hizekJKHEH9m0Bt56ayJ5d%2BB8iQ6%2F26ygjHhEaSe244Xa3fIFtqlwJc%2BGXw5Pe9XLknUZlU3T4IZ9Km1TdY6b6q%2BH9f0ZUPEthEjViTt8eBJXGyz3eLnvscPWGl2IESUzDcplAI7wLOUWRWXA9sAEiyW7XMMOyKlMwGOqUBpDevK%2BhspYhmLFuiuXdL3PElGw%2FQ7RzUbmXL2C13pdRv0aUz1srnV07QhWX%2FeO874KWmir1IXM8BD4Tt%2BLdxLPjHl4rmFRe%2F4z9M2g9jgI2%2B%2BxncPgE1fbAhqEmoC5kZNrRp2ujICo6RpUEJQOUsPmZSSbKW0GYplCPQ1ufGHaFl8Z9Q%2FunQ%2BrHPM4amlNRMcChhwZYgvNfMyOYADXQAXfjW5OdK&X-Amz-Signature=118555525627f9e93727db2b7bfdb865e770c3941972e231998932a7ad6e8d7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2GIYWYL%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T211655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCICrlG6oHAvrd0adh7vLOHRtvkcHQGeecIxhxXlqdWh3jAiEAnsQ6lG7jlPEzClXf8yi7kFGoPO5n5bdJFe9LwQN%2B45Aq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDFO3vM9WmqCQS%2FtY6yrcA5T6weNmrzBN%2FZZMnzf3gReGWc2mGreXjPuR0sKSCPJrNqKj83Qq2uZvoPgaw7V0GSgNI%2BQdAEW7QP60TFuOU%2FogX%2BnHC%2FZcCaMTxP0Q3PqGI%2FUJA8SmsXgFWdsIR0hUiWOovHyrMHQ7W44gEQTKBuqp94xLx1%2FJxaZtVpTkEgUlzAkgDe2gLo9tSrWk%2F0DNafC0OXKmKyonhlQm%2BAukj54GGC7F%2FGHT95JMNacN9oaEeibTqBJGBgCacjq%2BMaPbkUsFUQrCh6f2C3aQMVTA6dnz2F%2F5bLyhHAqolaT3qeMhshcuj%2BNoxSxPTU5btMNkA2CoIdYhS854jUTVT0OeurwWonpD1ZzjwUwoYu8bef%2FqfucAeFlIGRABkQU2bDH%2FsJLmOujRA%2FrSs55SNSBG8H%2BB5A3MLqudwUWoZsvBJFFpuERYANaZqXspGCc8UM7%2FLe2JjXOUZpTiN%2F4ENhExlmDX8OzNeDe022qzTaJuP85%2FyoMGJIyTBc50G4s1R4VymXNpK8ziSThdGJHMG8GTehd6sq5dgVKB2w4v94D%2B2DEfzhOn4smIDc%2FDJuxmEcg2QT4sqwmwAhR9uPq%2B2yWsBPyoYnmSmMGDi8Fsdsn1KA9uKXFlx5DbDSTlgrb9MOiKlMwGOqUB9gd4x%2Fi302Xrv%2Bq3x2j3uXQNh%2B2dkFCw4YBF3u3NZjbBl1p7T8q5%2FoyCxss6F2ScQRgvbJkvGrBsWSVV51cv0u8l2fpbeWjXtpeGDN%2F1qn1dSVGdYthCPYpK6MUagYLkfmZFb8iURAzRnYVfX2gb842U1lQ5%2BPdFgMHba7wxU3ZFmEtLveC5PdNnJRXxX5vvo5oWxM76B41dPbcmXCxi5oBe3tRV&X-Amz-Signature=e8776a7c9b554866e3ae5534728ca0b4e9a31734163da3a049bb7b3e12794ffe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

