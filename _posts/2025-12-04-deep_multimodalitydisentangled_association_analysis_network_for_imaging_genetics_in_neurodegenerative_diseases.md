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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGTBJGDH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQDiY5lVoKByCV%2BuJsZ4SE%2F82EjmdmhIcNXE5tevDqI6VQIgKPtG4s09DwlOl9umXk52Na33jxHLmuY4fxxG282mNgkq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDFMV0bI%2BiwwE0mn%2BqCrcAyyjG474iDuXNBQlxz6OF6PY3Ixc7DFgEbVyQpCu0rxUNCp3XYta0Hy0Z%2FD0NMOYeSEn7cRG9TcliwoNWP9IfYtnZiPW%2Bo6HThOsGoq4RBeCrPlGjDO2kAnscR66iz%2FqgoaGpIhScoSthO7MZZmc7QTDjS%2FEbSZvbvJz2A7L1zIW5UWHUbv1OHJO8qRC83digUVWryxJwIyUB2tubevRBQMIPOAW0%2F854JoIgqarjwUw54LddMKLBBli4NIQFSXX%2FegE6Iy%2FfLF04ZpUBlLWzdI%2BXcTKIuyA6xnOQuxxONC3KpoAXuajrGMzm4QtHf%2FOHsYnFUQKVy%2FKtpOIvmlZJmz3jHxEWnU2%2B%2Bzbyjdyvw2DkgaUSVKcyeAplmVIcc2HEaDO%2B72%2FE17Xz9TUqWn7Y13US8YM60sKoBzKvvLHeySHu4dh3XT%2FpUwDw7qBYOb60ASLw9vIm4dfYXD7QMUJto9RJXsVjOMcaQ5s6pUrLyYb70huJX0Z%2F%2BfKxl3a%2FZTi6Dpph5SWAvM5SnhiKsjpeL9EMyBWjPdVKZ5LGveyNaweGFWkqvhV6SqjwEBUkEINpaSDVyC3H3Bx8TsBrqBFZHtJL3VCCFBSzjK5v%2FIDcnoOdlb9gUJJuneipRImMK7ims8GOqUBP%2BdxfExAflpmYMIBXnGGFaC0iOdz1I7koSNguTJaxq%2FirOfbuAg1obpgNdSLk8rI8aWMjbN1Af0JTSxZknMVhijSkHBKCeDTPSS%2FRDKicOrv16bAnh8fDf5WefigjHyEgMW0yvwF2YZsyoqhUKSo4pgzL44tWeCbofVby3Xxe5OZuRiBeQ6UUX6%2FbfVxRyVPhGUT4smrrml%2FlsjJy9%2F2GlYVByGs&X-Amz-Signature=541b33dfe01436e44f3e42656c1489a115869d98125e5f409b5bcca49e4b5ab2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGTBJGDH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQDiY5lVoKByCV%2BuJsZ4SE%2F82EjmdmhIcNXE5tevDqI6VQIgKPtG4s09DwlOl9umXk52Na33jxHLmuY4fxxG282mNgkq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDFMV0bI%2BiwwE0mn%2BqCrcAyyjG474iDuXNBQlxz6OF6PY3Ixc7DFgEbVyQpCu0rxUNCp3XYta0Hy0Z%2FD0NMOYeSEn7cRG9TcliwoNWP9IfYtnZiPW%2Bo6HThOsGoq4RBeCrPlGjDO2kAnscR66iz%2FqgoaGpIhScoSthO7MZZmc7QTDjS%2FEbSZvbvJz2A7L1zIW5UWHUbv1OHJO8qRC83digUVWryxJwIyUB2tubevRBQMIPOAW0%2F854JoIgqarjwUw54LddMKLBBli4NIQFSXX%2FegE6Iy%2FfLF04ZpUBlLWzdI%2BXcTKIuyA6xnOQuxxONC3KpoAXuajrGMzm4QtHf%2FOHsYnFUQKVy%2FKtpOIvmlZJmz3jHxEWnU2%2B%2Bzbyjdyvw2DkgaUSVKcyeAplmVIcc2HEaDO%2B72%2FE17Xz9TUqWn7Y13US8YM60sKoBzKvvLHeySHu4dh3XT%2FpUwDw7qBYOb60ASLw9vIm4dfYXD7QMUJto9RJXsVjOMcaQ5s6pUrLyYb70huJX0Z%2F%2BfKxl3a%2FZTi6Dpph5SWAvM5SnhiKsjpeL9EMyBWjPdVKZ5LGveyNaweGFWkqvhV6SqjwEBUkEINpaSDVyC3H3Bx8TsBrqBFZHtJL3VCCFBSzjK5v%2FIDcnoOdlb9gUJJuneipRImMK7ims8GOqUBP%2BdxfExAflpmYMIBXnGGFaC0iOdz1I7koSNguTJaxq%2FirOfbuAg1obpgNdSLk8rI8aWMjbN1Af0JTSxZknMVhijSkHBKCeDTPSS%2FRDKicOrv16bAnh8fDf5WefigjHyEgMW0yvwF2YZsyoqhUKSo4pgzL44tWeCbofVby3Xxe5OZuRiBeQ6UUX6%2FbfVxRyVPhGUT4smrrml%2FlsjJy9%2F2GlYVByGs&X-Amz-Signature=541b33dfe01436e44f3e42656c1489a115869d98125e5f409b5bcca49e4b5ab2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYKQQQZW%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIFSVnknRRQZakpJyx6uYd9u1VEUjwLVF0jFt4IlzjsvTAiEApa%2Fh40HrgoltwEXmjx2G%2BbpM0LbTAH3V1bTG0gsKUx4q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDDdpZWbJbBQBp4y%2BnyrcA95txVkv2%2F7btWe6Qh1avyZgdux6GvPk7LOFx7BlqVdTCUdkTxM1Zu220jYuoV82VAKin8QhFoVe%2FHM9IqUMpV%2F5EjcQi6xFFBbxMR5fg1BUt%2FWOOgHqQkzdgWpd26oJw6%2FkDXt8vSNFkEpGUjiPk6B3w8yuN25L%2Fns01OYy3MA%2BBU5ANGym4T4s2oNWGG%2Fu2N0EaSi2nIPM6wNAW9hezxVFMckGy2Js8oU%2FzufdZvPoa1xoNxxxaspugQA5N1zUpgwkeB7ixoCq4MIAt3OAh3WQBkftsY0lUp72jVCgVSKUQK6sIISk478m229MRbomorEMqcrfNOIL%2Fgm9J1gNGslU4jeHyoNJEN%2FUrVelknEfeUQ%2BzQ9bpD1Qfx1Uc0LGdd9yw1BHJo1mOlpz6BT9nkq7PQqNWHQ0G9I7JijI%2BRPw8KJFeQdoLjzRHagMK70LZ9E4Kcmt3h3iUZHu3Z8Y%2BnkppPGPTZH70k7%2F6jiCSxHXp9XxkrscSV0T8TYqhpwMkNzpl4WAiyOyqPMbZNlK4GaU7nGMLEr3IBJyo77C7WZoDZrD35pg%2F84vLp6GuKiJHLCXTvhHwxn6%2F%2BSlPUlqurNpHXBs2hVGovMxx0lIBi%2F7jJixQiLcoa33HHb6MPbjms8GOqUB5PLvO3jRTo2DFnQ8eQAqqpjvFUvhYU9H5j%2B%2FSQ%2FxeDsHzI6jnh6d%2FC2pzYWIAFqPuDmoaui4oj%2BjxjPc35Zav7wI%2BQZ4tihBX4UVpMHtSR%2FQLw%2B0eSLf4%2FoB%2FBhaKa5UdRRYeViGMZ55hKL25Ee8M47M%2F45RNNBLEBQ%2FN9CgImtahUPgs%2FQJMtQ4lXjo0NqsdkVc5c65XO%2BYapbIj91hWC48vGb0&X-Amz-Signature=fc37ef4117362923c2086644e9fb9a3a6c15fc596c2d095dd7c009aeab13bf14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQNJZPA6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDiRu%2BgmuRyuI5Ty4cdapceQXTEr%2Bd4y12j5bzGBXkuJAIhAIDEuALl9jwMJCKLy4VF5JT2FuqTg86abGBCTmbK1IwSKv8DCCgQABoMNjM3NDIzMTgzODA1IgzvhycLGRC1qPC6el8q3AMxxrcW8mBJVXrpoZUWDXRAF4oRBY8yFnXfZ0dRj98uuxNQM0iwRuxpzZwHIpVx%2Bmr7j%2FyUd0A3hSmDpZCWKbHT2vGS1iQD8hFJlpCHNRYGzvfJh%2FZD2PRkuzJyQKdk9yqG5rIWTLk8Y3nGFToRTTYvTxCBiff%2F2GEnfzRDlGeY0x2owIZSuN5vy%2BQpYUBOzxww5LXou3QsWqkIHdIWjTEO1CvIt53XyrAerr170l5woxJh1Z9BL%2FVn0TWMk2ZthoZkE6jawhklSJUv%2BbCSj%2BvslT1S4N5WZuN6hF%2Be91mKJyYHbc1pM76OJ%2BYeHFLY0VsdkBO%2B9ZxUmftXAUda1jpuK3CLfYywXsjrH%2B%2BZ%2FB6Nxk359ssjbP%2F2g8eq5Zbe5zoaOmdDy7ZJbdwueUS7kIDm%2BbnPaLZdzNNg%2B6xaDYrf%2Fg5%2BEbHzY9OGgqdksxiKUj7EuDesVWRoHP6QBoozO4rKcxwO6PaWrxV%2FbaFwe%2Bth2BGL4U2o9hHaZ7cSYMG4aBDNs8X0iVfT44iGw1NBSv1UzXixxdFoLen95gswtDvhvES6y50qLyjXxgD8uXEOIMepNny4tZlLunbL3we0XO3cbFZTHtrCRAj5FtVkyshH1zuxuGSpoICskk93dzD145rPBjqkAYx21zN%2F2COyD5LOdBkpK0Ufk53pM6W6GKyaYzVG9aESzhRn6ERpAN3vQhQnK6yuC4vdp05xCeXQctRh9pTN1XrqsJO4meHcdb4q24bYUeYdlPwGWaZ%2B9oyQ7MpRP4hyun5oalXqXj1IqkX7IGn3hUIqgehSnmfCBXoZjbohQ%2F3%2BHxizMjM9lKFBcTBt5WiFaZ8QkTaoQn4hucDReTvEeqKCwlbD&X-Amz-Signature=8a37c30ade358c3c2aab067ee296427700d1da868031035431769b79eee2c929&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQNJZPA6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQDiRu%2BgmuRyuI5Ty4cdapceQXTEr%2Bd4y12j5bzGBXkuJAIhAIDEuALl9jwMJCKLy4VF5JT2FuqTg86abGBCTmbK1IwSKv8DCCgQABoMNjM3NDIzMTgzODA1IgzvhycLGRC1qPC6el8q3AMxxrcW8mBJVXrpoZUWDXRAF4oRBY8yFnXfZ0dRj98uuxNQM0iwRuxpzZwHIpVx%2Bmr7j%2FyUd0A3hSmDpZCWKbHT2vGS1iQD8hFJlpCHNRYGzvfJh%2FZD2PRkuzJyQKdk9yqG5rIWTLk8Y3nGFToRTTYvTxCBiff%2F2GEnfzRDlGeY0x2owIZSuN5vy%2BQpYUBOzxww5LXou3QsWqkIHdIWjTEO1CvIt53XyrAerr170l5woxJh1Z9BL%2FVn0TWMk2ZthoZkE6jawhklSJUv%2BbCSj%2BvslT1S4N5WZuN6hF%2Be91mKJyYHbc1pM76OJ%2BYeHFLY0VsdkBO%2B9ZxUmftXAUda1jpuK3CLfYywXsjrH%2B%2BZ%2FB6Nxk359ssjbP%2F2g8eq5Zbe5zoaOmdDy7ZJbdwueUS7kIDm%2BbnPaLZdzNNg%2B6xaDYrf%2Fg5%2BEbHzY9OGgqdksxiKUj7EuDesVWRoHP6QBoozO4rKcxwO6PaWrxV%2FbaFwe%2Bth2BGL4U2o9hHaZ7cSYMG4aBDNs8X0iVfT44iGw1NBSv1UzXixxdFoLen95gswtDvhvES6y50qLyjXxgD8uXEOIMepNny4tZlLunbL3we0XO3cbFZTHtrCRAj5FtVkyshH1zuxuGSpoICskk93dzD145rPBjqkAYx21zN%2F2COyD5LOdBkpK0Ufk53pM6W6GKyaYzVG9aESzhRn6ERpAN3vQhQnK6yuC4vdp05xCeXQctRh9pTN1XrqsJO4meHcdb4q24bYUeYdlPwGWaZ%2B9oyQ7MpRP4hyun5oalXqXj1IqkX7IGn3hUIqgehSnmfCBXoZjbohQ%2F3%2BHxizMjM9lKFBcTBt5WiFaZ8QkTaoQn4hucDReTvEeqKCwlbD&X-Amz-Signature=0c50711ded171abe46641a07703cc009d5a652b7e6ad935859a21cb4c1870de7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRDJAR5H%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCICf7b4FntadtD8k4G9kB7H2q67ow5JBRurgd4RJtvWrnAiEA%2BxTxhxfS2hvjIXCLiV9iZHMDIU%2FNG0DcF%2FE7%2FKQmdocq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDO5IvycU1%2BSd1kTJ6yrcA5RePW8AEzYpqvH8mnyGYAn%2FylL2wEAbKy2vXpfgEieWseprzydTvpIEvCbs6MdG6jCsNM8rnWFqLwrpvNJoI5zHN15wLGANv0coVYK0QsGX7Ah5yJnS5UNMA6deoN6xIYMXsdcdkVvoCOq3qDwJkSUGnarpBn5LJivvBHPjsOnGRIukgP%2BfXsowSk58x88iUcgbm6PnvwbOl4hGLlUt%2BV4Er%2FYU8X87bDq5RH5YfnKZSP7k98VVJhDXUtAThbA%2F4hsyTEbpiAYDys829e%2BST5yYyjHaXVkN8EST2wJoMP7nkZisNWglCphlAYBkcApaYH8pW3bMZpyaXrYEiDTzZBe3RBLeRzKPQa%2Bd4hE8PRgBvLnex0rUdngOwW7dcoLpF3rEYWg6i4wXTgUbfC37xURu4Mxl9HoypJqeiwabDdglh9F6HgOijh0BC8Ogwlw5mFPv6B3bk6SlQPRPyznEjZL5K5oUnfDJqhowkX7o36LbAUOguc3KG1zvuZ%2BPXnkhSuRc0jPBvca0dPfB9Ifc62Npkr07Lrn5cq%2B2xWYtzohFg2WwUDqhjh2izmqVvPgj8BgGdae2Fd9e8u2Imt%2BgTUMq2eVsXi0v8j24zPEfqdm8EB1OocDqbm2zp03vMNzjms8GOqUBBMFHkIJ1OqymP0C5hahToWoJnxq1b%2Bg4V7Pf3QGh%2FG7xmzSuy4f78LMbwfnKNuE6whWj0zs%2B%2FHoc2QubQVIBQg5Zb7y7ZZQSqff%2FCLMOsBSMjlwTnbsbq9pJVaW6RSLCjLywlWfAMRF9WHux0FC9isUjvN115hlOowpW3%2B9cQWwhjZhkPs2oHgggvbQRj3WZ69GI5n2cSzXjdcsMls9Ktmo%2FAxlj&X-Amz-Signature=47c96d92c66be931fdd1106b9a991c86b9860cb19ced3ca889c6f25b0e91d4c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ7R4RAN%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIFqZIfcsykEkZ%2FQhoNU%2BpYqveOCA%2FzwkTtr4QK2GMqjWAiEAsiUA%2BbXt1ks61iWF40euu4eUW8%2F6S9Y6E4%2BkOmZEDNEq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDNq9n9Kbf6V2wY4RjCrcA99kKhMz%2BibDDsFNyjNL2yaUh8tGuUuzJMqHFmXdhW7feS6mk1NekrUQ51z1Mstv5w1hqmb1t%2FkXXSgyJFqhN5qBjYkTwDbNSFbiBmjuYPFI3gG9CMpic8gTPXfsY2BFhidjCS88MV0kDLfJxJu7I1tMFXFfOXFvqRAS9xkjZZXooEexHeeetWedjGtlFypLi%2BLnML8vVPf6Xe2rE%2F220CPaSZDHo2ldroCCeSLOMpTXff%2Bid2BmCTfdVXP%2FvFS3yyUohEUQwtQ8qA4ZB8dlogUgq4O8PHI0V%2B1V7EFTDZvRXJDYBxIh82%2B%2B6JAWOHm7MpEnU4d0aMJdgPI5WUxgjT5N7cd61AZRkNNJA1JWj5fRp61ZTw4QgmPMLILeQTD%2BJ6%2Bg5PG%2BswvThMCf1JIm5v970rjcgIjnIlZ7LrfRkkc6%2BheyznbPDfkRZ0ogXz5HEBDOobnXQYNIMs9p2fy0%2BreQA3%2FFncQxRnu4ezD4IBD6Ttn%2FxOvk4lUfCALQalV9CK2fLMCzqmvOd0j2biYokasFIiAupuLGkfqeFzRJWkeNFJkiIsSUXjH98Xxt4EhyngyeEisg1ZHAhuMaUKSd5oTpEBykAij%2BT2x3FdJX%2Fwle5BY3UpY2ISn%2B9kC6MMjjms8GOqUBIQjeP1aDcldeF%2FcHKeM3tH8Jk65Lj2ME%2FmTlpD%2F24N3BlExzu0smdP3FSkm3WH7v2h%2B2W9hkzqJuUm0WqZsp%2BkDrwFQYX14Nx7lsmqMrWzLB9t2H8mtOss8Ahzm6c585gVqkYJZVYlBM3tvA42fMrYe2lmp5sZBoouDXEIN%2BSliOBBSPXP57C2pM60BW35QGmnkpedz7WRkAjBa9pUD6XWnfPBUE&X-Amz-Signature=92fdfbfa617d059383a99eedc1b8711bf7db44280219e720e25a1d5a039aefce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN7IOAEX%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIF%2Fr7Dm8QaXyC5XPIKqKtf6G0MvnfLDkmCaE9gPOe8RAAiA1QJXULNxkhxEmfcUDLsiCitQ%2FQGIerblLjFkH33TuiCr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMTv1uUaQjme%2BGAF3DKtwD7UiKDbMdr686V0%2Bs6Z0gOlBD6Q7CAL0QdBtMz0Sq%2BphUw9u%2Bcup50EckyJ1GFylZa%2FTOu46zuJzL9Cuv7RE8TXhwljw3lb8FCEpDfd22llk0fAajSchLMyyyfIGD18KwlK1v08rivLKQMx71M1ZmrRVkIguuKBOsodWyYglkNLQl0WjMIKU%2BuberkuRRCSVVIePfDze8aawnKed19lZeCd2XVwjQ%2FHs1kZHZbVmu0AIIFv45ofbHt%2FVPaz2JbGHp7glWo99xWMjAvgFxFSlWyPFcDFaACV4ruX3%2F1jl2Uz4UPIJm4taF0KyMVnScovUSzYpe49f1%2BxdF2pnEd%2BnD1H27MKl1IBC0BJRVn0WRh7Hi7Uej8wNo1L6K9jovARuaOEv70VYfwK1J75ONOKOuIf6tBi9g%2BjdHKcr%2F7y0Gcmv%2BnkLXJY3AbEEn%2FIqmkLykWVYJCIEOtaBfvZLJz%2FFJsFyObq29%2B2z9nyxtzlqzu%2FIRTeAEhLvw%2BvOiDAcAjHSBFg6DTBopX1oDz80Fmfr3%2FE4LXzhqFvRf8%2B1Mt9TJptUfrVlDdYwUW7OsZYinA3JnpPLXJ2njWTXkf4dKLtmyILSZJ4Gs1zp9IRfv6ThkdCSYtn%2F37II9FxlFtAswjOSazwY6pgE%2FNKUIeFIe1augrNJRLmNx6R999tJtEShgX5MqBXXjpI1BuaiCJsyS0S1%2BwfaL88avm5%2BmJt1Xrj5jolVtJ9Xj9PeoP80k%2FwczhA6KakwDw5rcSymVKOvueaWFXOitm8hclZoGYKz%2BLNHuqF73MhnBQhEWXV5X2yKSrTUGcAM3Ih00zMIXK0WJhWEH8sPCRCNGsStYFR3qV1CVTEi6Tc%2FIJu4b0whB&X-Amz-Signature=21e88c04cd624d734edb447e205006826a269159af7b4dc640fad34a77441b25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FRZ2V7S%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCa4b830it36kK2HhizCBwhifqRNqQDmVVta4jw1WKzxgIgGqhQ5Xw2c0FCWRmpDKMi681viHfPWJRX%2B4B9ssZQniAq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDNrlfT5JyKO%2BopgygircA6aZSiR0AYMGt%2FgJBmZg4f2J504IjYB%2BdXxNJ%2FxT6Xg5FVmJNIwm7%2BlKIQo%2FYmqpoZevoCZQkoCFnUD7r%2FUKiFThpnL6ZVeowNeiHkATEfWksdP%2FKAm18l7OG%2B%2FAm38B9vBabYyYOoVfBy3nCxn3yhRuuLmip%2FTeggxnCDjKpZia9r1QjVCIzPzamAsU6ZYTQRQYCXEiFRJobmLOq1MH9UHhs5Iduh%2FuuMOvF4WtbrSkVzpr8sgeH81lQJmqUHLXIEGdWnb4bw7RV%2B3CeLUKvYwcXTUjEI8%2Bmb2DyWKRTE5pJMhZ12BZWaBruo%2Ba2AWBzOXpBWTGw9ZDivfQN1y9z5Q1LMl4KFG6EGMRtNusn88O55FASZTB5K%2F53ERyBHtt22wtzXgCthdJ%2FTVPtI6gc8CfkTF7vkpE2c%2BvdDSnZ82StE0ntsT85oFcdkUdMOZHEH9qyDOMApZfCwzPjJ2msm4QXulpM2sbzHX4ppsON3593sQbYH%2FGRWmUsBEUscKkKdX53KVSIX2ZqoI5K2zUVF8Hhmw9%2BUkBg%2B4c2TgzlruCeH%2BvMM%2FqwowEcJUCkhNs4nocthz%2FRsxk3lAfeOyskmltRvGitmRaRrV9600k%2Bby8h5711f2JyYClRaoDMKLhms8GOqUB4Mu7JVG8DcqEDEXhPEg3OyTzltcyoLPSujMe1Cq%2F%2FyGA%2B0o54xy0Z750HL5gukH1ZHMzSxJXXHi6Et8NjuMlKcAfs850Cs4BCZaQgxJXj%2F3nfBdDaqJpG66mOagl36iiQwMF0Ez4ErXK2K6h89%2FnsJjnEQl2vZYy0DpJNyAtgbzEtD25f7D9pfSA4l732txy%2BFFhRpdwyzjeJCkjuebMfkH03KPF&X-Amz-Signature=11cb779d73ebb845f2474ca311d4eee26678d9c59f54d32d0645a3953e123093&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FRZ2V7S%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCa4b830it36kK2HhizCBwhifqRNqQDmVVta4jw1WKzxgIgGqhQ5Xw2c0FCWRmpDKMi681viHfPWJRX%2B4B9ssZQniAq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDNrlfT5JyKO%2BopgygircA6aZSiR0AYMGt%2FgJBmZg4f2J504IjYB%2BdXxNJ%2FxT6Xg5FVmJNIwm7%2BlKIQo%2FYmqpoZevoCZQkoCFnUD7r%2FUKiFThpnL6ZVeowNeiHkATEfWksdP%2FKAm18l7OG%2B%2FAm38B9vBabYyYOoVfBy3nCxn3yhRuuLmip%2FTeggxnCDjKpZia9r1QjVCIzPzamAsU6ZYTQRQYCXEiFRJobmLOq1MH9UHhs5Iduh%2FuuMOvF4WtbrSkVzpr8sgeH81lQJmqUHLXIEGdWnb4bw7RV%2B3CeLUKvYwcXTUjEI8%2Bmb2DyWKRTE5pJMhZ12BZWaBruo%2Ba2AWBzOXpBWTGw9ZDivfQN1y9z5Q1LMl4KFG6EGMRtNusn88O55FASZTB5K%2F53ERyBHtt22wtzXgCthdJ%2FTVPtI6gc8CfkTF7vkpE2c%2BvdDSnZ82StE0ntsT85oFcdkUdMOZHEH9qyDOMApZfCwzPjJ2msm4QXulpM2sbzHX4ppsON3593sQbYH%2FGRWmUsBEUscKkKdX53KVSIX2ZqoI5K2zUVF8Hhmw9%2BUkBg%2B4c2TgzlruCeH%2BvMM%2FqwowEcJUCkhNs4nocthz%2FRsxk3lAfeOyskmltRvGitmRaRrV9600k%2Bby8h5711f2JyYClRaoDMKLhms8GOqUB4Mu7JVG8DcqEDEXhPEg3OyTzltcyoLPSujMe1Cq%2F%2FyGA%2B0o54xy0Z750HL5gukH1ZHMzSxJXXHi6Et8NjuMlKcAfs850Cs4BCZaQgxJXj%2F3nfBdDaqJpG66mOagl36iiQwMF0Ez4ErXK2K6h89%2FnsJjnEQl2vZYy0DpJNyAtgbzEtD25f7D9pfSA4l732txy%2BFFhRpdwyzjeJCkjuebMfkH03KPF&X-Amz-Signature=06eeb87f3bcdc3e6ddc7612a58c200233a4a432a61bc23b220590c97641d21ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6WU4AS6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIBLYPSppxJ7Xmmo8hGX5KHlKhmaRM6oEvytsiZ67po10AiBxJ8ox%2FEWqM%2BHmWuWUyjoOZwwt6psmBgPglp%2BqFPTL7Cr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMeC3c4sMT7KF83r5OKtwDlETsc4CFjFBlw%2BEHVXmdMKIdPBXkiF0eC1Yik9qcrtL0Vtrw0HrFREhKRpa9k87mqi1fxGZQi7ENXb1UBov7p6HAunD1wkIw2Reb%2BGNzoXU4XYE7WaxihrXrPAl91geyJdSm151kiYwHJpPOXQ1w1JJwKktQ2JwUbaJtuHf9eJxqUub5AKvXFcMzvK9xRIw%2BTsszQFmQuZB7AWpf%2FrIXLq0jlTvZHpi%2BKaf0XxqoyxB%2BUBZZ7w5SP82%2Fmjykb5FEHUPsSzHRV%2BQ9CYhR0LQ%2Bqcuo8LeaW%2FKuI23mJ%2FZZ6L8vEB1vpon%2F6WZL5kKYU19%2Fm%2Fv%2FidpeIOMfxfc%2FUCluyP4Q8vakqjmH80oo5szjNsao2EMIFCOAPttw%2BmxjDY4Ezafa1gG0Lkkj1Gb9t54Ydslv7hiy3OfbWRriavoFZ1OQsEeolOoywFFnaPZnFOWZq2RqQhX47jNQEBiqbm%2BEDfhiU7gaJ7BILb7yfW8lSNfIljA7vQ2qpbkrodVb3bOabZMvc2SV61Gg6wWFRMbZkL%2BTKlRErZQnUME2o%2BBioENImao0H21NbSQEGWSjHhhSvsDLmXJ8zGhAKOcgaOsKGbXqN7u6XFM1DjLGmETwtduQnmG1buBmsHThOvMwsOOazwY6pgHSo7R%2FIaIzA%2FVtNpsxm6B12f9dAnSpDOGLpJag4OL6b7en5SP9nq96O7XFI9DDeiqMShEy%2FOWwJ71IKrN1zaEcMOULuwzuoPTVjbRg6R9gJJhaYHiefBlo%2F2wNopBhKz0nHM3yS2G26JQL4OXsdoM3u0JRU6GEEZKRCP1ZpoFMtutzttKeKjJIZHZ5yMQsKb5qUtAsGMwuCRqXIOVqnDdveGAcz0fq&X-Amz-Signature=f66f41623d9fd4300fe97624c434589b231c9d9fce76426c8166a91e627bb3ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632TIV55E%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIQD%2B8WX9%2FI9oBi1a5K%2FMiRb85nwIUNfyYKq%2BMHvHpoScJAIfFGoH7vj91psw4Wdvr8eGMHK4ZNDgLi5KdiuN6XWehCr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMsGBw5FRincKKpSNjKtwDrvndgBWdG9MFVJsgKYrmPsVvnK2Thhlf8fmFDh3mS75fVAwa8lnQNucV3%2BzoohQeyqv4ZCvjyMCjjfOv0DQomsJ8PIe4e95P6J6pZu0X6lTiQdTo8S80dP8oQSYuXddmPJdBmKVIjmTZlKJkZcW8Kn8cyzEeSDY9Fv1LXf72kwBxQXhKGOp4zg5JlO%2BQakaiIZk%2BnhuUlugxWywzwfFP%2FirCBLMRJ3MYni3e1D%2FvLfyF%2FjSKxQrugWlIvA%2F5FUJo5JSeGNeYcVM%2FR6SWAhQqlkK7RWNzp3gKjGf6hKq3MUfUQfjeqsxLgLpDet%2F36uddKRSgp5jyX4Q%2BpZmtB5YW1Oe5ZItOqta9PwfHTPfmBOlzuXZtQoP3l1b8uuJYvH7N3fd3XNVz3X9Y7Q4KuX1ziNLDQNjxbg1%2BacrrDGOzRBJARaWGBrlzo98o7rk3c%2FkwuJ%2BZVkSBa5looW0Pdj3gmYjNcmFQ%2Fzzm3H5QOXoPQUnoHINGOQSOE%2FvqVfuufsJ8jLvkDFB3qPRiErcg1gGFhT9c0dIBiVR8PIo1SMKsld3TEwcz8BicRm%2Ba0cEZGi2G4SzOMYW1BR%2B7WV8My0poES4M%2Fa7PB16oUJvxK7NrLi78K1kVJWIwrqZddNAw9eGazwY6pgEB9c6HVXnGgGZnrrBJ0tClWGRVROAWsLpd8qJAxRkLDnHaQErFBVD1GBw3VtEvU%2FU%2Ft9U2nC0zngMVjuaZGFEOSxT0jVpW6xP1z3KuQNfUz4f%2BOSf6xxgXh6vXbk4J3JYibsyYwFRnyMqiIuZ27KBJv%2FqJDoOo32BMI7GV9NduV0hmQYl2p%2FX%2BTOF9a95ZFeyc2MbteZ8g0pxphjiPh21nDY0S4wK%2F&X-Amz-Signature=3c5dc45e775c46f552c120da6b578714f40a3cf8c663f8cb92c646d2ea7389f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632TIV55E%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIQD%2B8WX9%2FI9oBi1a5K%2FMiRb85nwIUNfyYKq%2BMHvHpoScJAIfFGoH7vj91psw4Wdvr8eGMHK4ZNDgLi5KdiuN6XWehCr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMsGBw5FRincKKpSNjKtwDrvndgBWdG9MFVJsgKYrmPsVvnK2Thhlf8fmFDh3mS75fVAwa8lnQNucV3%2BzoohQeyqv4ZCvjyMCjjfOv0DQomsJ8PIe4e95P6J6pZu0X6lTiQdTo8S80dP8oQSYuXddmPJdBmKVIjmTZlKJkZcW8Kn8cyzEeSDY9Fv1LXf72kwBxQXhKGOp4zg5JlO%2BQakaiIZk%2BnhuUlugxWywzwfFP%2FirCBLMRJ3MYni3e1D%2FvLfyF%2FjSKxQrugWlIvA%2F5FUJo5JSeGNeYcVM%2FR6SWAhQqlkK7RWNzp3gKjGf6hKq3MUfUQfjeqsxLgLpDet%2F36uddKRSgp5jyX4Q%2BpZmtB5YW1Oe5ZItOqta9PwfHTPfmBOlzuXZtQoP3l1b8uuJYvH7N3fd3XNVz3X9Y7Q4KuX1ziNLDQNjxbg1%2BacrrDGOzRBJARaWGBrlzo98o7rk3c%2FkwuJ%2BZVkSBa5looW0Pdj3gmYjNcmFQ%2Fzzm3H5QOXoPQUnoHINGOQSOE%2FvqVfuufsJ8jLvkDFB3qPRiErcg1gGFhT9c0dIBiVR8PIo1SMKsld3TEwcz8BicRm%2Ba0cEZGi2G4SzOMYW1BR%2B7WV8My0poES4M%2Fa7PB16oUJvxK7NrLi78K1kVJWIwrqZddNAw9eGazwY6pgEB9c6HVXnGgGZnrrBJ0tClWGRVROAWsLpd8qJAxRkLDnHaQErFBVD1GBw3VtEvU%2FU%2Ft9U2nC0zngMVjuaZGFEOSxT0jVpW6xP1z3KuQNfUz4f%2BOSf6xxgXh6vXbk4J3JYibsyYwFRnyMqiIuZ27KBJv%2FqJDoOo32BMI7GV9NduV0hmQYl2p%2FX%2BTOF9a95ZFeyc2MbteZ8g0pxphjiPh21nDY0S4wK%2F&X-Amz-Signature=3c5dc45e775c46f552c120da6b578714f40a3cf8c663f8cb92c646d2ea7389f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC2QQE72%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T233101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCpCutPjA%2BrrTfHwnXYA%2FA5Jat9Trr4OISjK%2BGMEeD5GQIgV8mSmNPG3m09mg5cysRE1pBZc9XuPMPJO50wywn4%2FK0q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDArxjrFn4PwQaeo06yrcAxewooEL7SWQMzC7pRuy1XMmBmNgA0JwzEp4IDDlY2pwysO4tirXzoIkyWerOxFB3OATlamiygBzk%2FX2cN1PWLTlQEJJsMT0Jnb3UlQHBTuGEnOT5TMYeMCAtWQOPx6eroGH90JdkJFeggl5K4KPQIyPvhy6nIVj8T2OnkO1s%2FVg3PXemR%2FydGlaf9BDoqXAY5m%2FNzIM2C2hfXhPjDOtVUN7huJFDmAQPezRdhTKNNMpwN90MlYsN64z4wa3SkFX7YwwY3wDfcoCZupoxFP7vMqVi9%2F5PqmYjT39TppeaYA1S7WZ9E%2FbJEqmVxHR4uTCKZBBW3ThcRND9hH2MVLE8HCxdXq3Bhz69WHJRnXs%2FSByqEY0toD8mhLPR5bWRBUt3Bkd%2FMMw%2BD9HUpNK1tJG7VlUFgbzIYDf0W17X0eCVWE3fhrrUCkDA8%2FoNuBvJsAxsMlc8xEVXSTUSgAh0BT3U8Z7dlolKl47kkuTtZvgYyo83xNRMW3HNoABbBn8NaNHyL2Z6FatoCHWmhtzzzG5duhiTiUMoJdNuTl5q%2FGcJA%2Bl88sKvMrxQgjFL8cpV5pmRP9kkoqQWHx9iWWKNIrBtnrAp4sHjySMratA7ZfibndE0iS1boMiyxzaMtYNMK%2Fjms8GOqUB8%2BFBrndhoJuXMYkAQmUqy8YcrsopeIaRn6rPlNfd2C4bXdeMjeXRkv7SkBAnoFWpeYn1c1h6UcgpcPPC7lmP%2Brj%2BYk3WKMbSLlARTtGxTZBIZPpPj2ModZJpbh5I6xNcUx7xRsbk2FkqqhPNXoDtFFVkSJ02trkk9K%2F2djj21em8JCf5y%2FI1EvFD%2BrumPlUIQd3aTd2mfeEHsyRwB6TqieYU5xNR&X-Amz-Signature=e706fa9296c770f6a37c293671580c73e64362cf501fa54200d01ffeedbc3d52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

