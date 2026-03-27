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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3CIYBUN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCLL0AC0bppe8ztblwdqRl35t0ZTd%2Fs2FdQZ9F5xSTlTgIhAMZBqM%2Bd6%2BzEQnl50U6G5ngU3HvWY0yvJOFVlmfg0B%2FhKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwN5n0zf8yzPWqICA4q3ANbBAxs7DmAsji33z7S1z0aBHKz9huAeXo5shptHtQREYBBDa5Bq10WjPx0yBPBhCL45jPg4riUIFOBXKakIiwHTNunPIteQa0BUOAubtjq9wL58OHonsP%2F0V6Vv0%2FIMo7HhMIBmRsJmQOYljEYjUSLE%2BKixAEqunkoLSDhuCl%2FLG0QXeuInN%2BgouVMdSoEtCEFiHkvBVsGYfmkEiR9ba2qC%2Bw3Ml1EaWai04dg2vTAUS3ey%2BMbX3g0rFzpXKRxwSeokV2Nl679bKOtQt1Ky2erNr2pA09AUZoR3AHvXbuYROF7sgyXUGMJt647Ol6VYyl%2FezjpTY1jQVxt9BMF1ADPh4kIzwBso1rrwmuDZAHn24CNg8h6VIguwM7GfH2qoRaX8BmJRcVd%2B%2FEMTWorU2iLYjOfW6Z5VCWGpUq4P0qKzVpC1%2F3LUWQ1cEibii1MnAYmpxmQ7Y0FIHKII2xuLBEOuS6Qn1SJaRL0av3kFomKB0HFNvyOuGsWpQhBtI3BWzOm2%2FLndrDzBkRtkeUvTA2ma%2FwjwUmF1fsE9Jo04K1K%2B9XEqdDxxqWDqnh9qxAJ8EXuaUaEaf0qF4arb3IXvK9I1IJFYZXHtlf0z4ziXzR6IFP97Lg5R%2BzHoAtWrTD%2FqJvOBjqkAb%2FL0kTjuImcwP6sBtRqtmBXfB3HFpKX4q92vUjPB4VcsgCDva6i6ErM%2BGLKBSJedb5zidw981oNwktVeAzrKnCWRSYQhDz0Np3YPRAW7D7h0iKxIijUAYdDFmvHc8d28eR6OAMDH%2BSf%2BUuHLiADow9G3ZDAUa4WMmqmujxwKLm98peZdGxKpN2kVbv9K0LS7alxJ5DTEBgJ%2FZ7oFIkus3Gkf6zK&X-Amz-Signature=98f55d2013143048862094f50806c954c56d45f4a7199e4afe01783af4114ee4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3CIYBUN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCLL0AC0bppe8ztblwdqRl35t0ZTd%2Fs2FdQZ9F5xSTlTgIhAMZBqM%2Bd6%2BzEQnl50U6G5ngU3HvWY0yvJOFVlmfg0B%2FhKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwN5n0zf8yzPWqICA4q3ANbBAxs7DmAsji33z7S1z0aBHKz9huAeXo5shptHtQREYBBDa5Bq10WjPx0yBPBhCL45jPg4riUIFOBXKakIiwHTNunPIteQa0BUOAubtjq9wL58OHonsP%2F0V6Vv0%2FIMo7HhMIBmRsJmQOYljEYjUSLE%2BKixAEqunkoLSDhuCl%2FLG0QXeuInN%2BgouVMdSoEtCEFiHkvBVsGYfmkEiR9ba2qC%2Bw3Ml1EaWai04dg2vTAUS3ey%2BMbX3g0rFzpXKRxwSeokV2Nl679bKOtQt1Ky2erNr2pA09AUZoR3AHvXbuYROF7sgyXUGMJt647Ol6VYyl%2FezjpTY1jQVxt9BMF1ADPh4kIzwBso1rrwmuDZAHn24CNg8h6VIguwM7GfH2qoRaX8BmJRcVd%2B%2FEMTWorU2iLYjOfW6Z5VCWGpUq4P0qKzVpC1%2F3LUWQ1cEibii1MnAYmpxmQ7Y0FIHKII2xuLBEOuS6Qn1SJaRL0av3kFomKB0HFNvyOuGsWpQhBtI3BWzOm2%2FLndrDzBkRtkeUvTA2ma%2FwjwUmF1fsE9Jo04K1K%2B9XEqdDxxqWDqnh9qxAJ8EXuaUaEaf0qF4arb3IXvK9I1IJFYZXHtlf0z4ziXzR6IFP97Lg5R%2BzHoAtWrTD%2FqJvOBjqkAb%2FL0kTjuImcwP6sBtRqtmBXfB3HFpKX4q92vUjPB4VcsgCDva6i6ErM%2BGLKBSJedb5zidw981oNwktVeAzrKnCWRSYQhDz0Np3YPRAW7D7h0iKxIijUAYdDFmvHc8d28eR6OAMDH%2BSf%2BUuHLiADow9G3ZDAUa4WMmqmujxwKLm98peZdGxKpN2kVbv9K0LS7alxJ5DTEBgJ%2FZ7oFIkus3Gkf6zK&X-Amz-Signature=98f55d2013143048862094f50806c954c56d45f4a7199e4afe01783af4114ee4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QJRLMN5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCm12ZYT85URK%2BFwbwk%2BoeXgXtthBDAM9X%2Bitx%2BL7%2FLUQIhAPVQWcv%2FJDuySTP3jrr0qwZYxI%2BT4OBaHsE0SXo707vcKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwst8UvIQkbEDc2R2oq3AOOIcJMHrPK0QPNVPLP%2BjMyNn804sWW%2Bvt0bbL9X%2F6%2BuhRjVbGAvz07flDS%2F7vvaYHknBDG6uXI2%2BwSrEgwUwAceUOH8p7Z0cbJjxIlIaJeCHVpvofYO%2F1zH7Vit%2FGQyAhZFPhyZB2EeyQlrorVZJlth2tVNVxCCNjjpoc5lHmU%2Fywcucdhl5A8o1d6DyQQTmR1RCYafGTOZLcVKp4DNSpFUQ%2FfTJv0twvaMSQa1q8FcW3eO1ecmMDZmjGT%2BzP25Oxf6vXpj2GXTLa2I%2FH8saYyCtm1BQ69ddNAtvhwW6u4AODIfNcQSJXLrbA4cJooawizL550vmwOQN%2Fp6MOM6DFk2%2FceNux52%2FeVSQ%2F6RL6404mTXnJRxzG4t3u6uVoD33PxySNtyRX2zWpfmOkRzWtzcR7jF5TCJZ5glptydn1r4Ozc0N6pefC0%2Fs%2BER1bGrqQfEinEYXGtWzibFIm9Cgo6rbSLvFWOcHZdyQ%2BU2lNwQPprD9bCpOnc9dH1A0kRciHf5Mvqoir72XVUvZXZql78urwEk15QRIm%2Ft8L7fSBs%2F0AbRO5jssNx1kDQIPEvV6Hj0dJf%2BsECnivpdbXWdmgMmwL5kKGxO2l4pW5tbfba7Qzfv32O%2F27l9%2BCXyzDkqpvOBjqkAUuVO%2F%2FbrwSCPEicCnK9m0BdBRAj%2F6dW%2BAEl8coGYXE0Z52Kx0jkPtLiQi9tc%2BYdxa45EsdRouZa1cYOF23KKAwKiapP2SkJ1Qny69RTE%2BeAfJPq14zcLzp19kHZR26%2BDk%2FGhv%2F9NaE9nLuKs3kI5UekZ7lN5aCl3%2FHc0Ly6FwtoWM7WsQZNbyeTH4qCm8lP97AvP17mGYUF5NpgAKpUtioQTlSA&X-Amz-Signature=3804db68d8a6a367c62add60539ff593492f4a94357fd0df0b284f0a4ba28e37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SRHHEZS%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIGrc7LSJylpnBykdINRD9DLlbQQMFYRYvx44vmygcIBJAiEAsHmatyj3WraUY7T4cent9GYaBykb3OMKHC%2FSA%2BibamkqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK3Y7zMOSWzfEl6ioCrcAySGii0%2FLYoNu1mU7cDK00U36alpIHfqgTvNF6ElQWLOSWnrlQ3J8a5uMXiF9ADzeHc5k6MK24XoN%2FgYzKpJJyOKPZtBX24106TLn5EQMpL9TeJ1p0EZfp%2F8Hlas6XHOpV41a6B0Ns6ZVQSHxoJzXMcTIkbWDOymMluj%2F0ta6amlfVbMkXof60mlj5%2BaAWc7dh%2B%2Fj5Nu9ZdXqaJpKdLjtfaIHwcoAjfIHe47dgUaTQjOjTmFg2dqFnG6ymGQvgbdgjqgZozftEuvlISO5mRDqIvJAcoNXjWvJP5lmaARDnEPmKu72%2Bz9DB6PSYZkoLVJyrqgCXPvMgpN9ZVSXLRaMRZw%2BXL8G0fhkOd%2FKQoIusMlmy1k%2B1QUwR4oph8Vm9tHcCDIMoyZb%2FPSx8Y%2Fj%2BNaCFILkzS9v44GO8Ct8bkx8zz4KbENiOaqwQ1IE0dyAVKmGIWjuTrj4YhTosBgTT0ip%2BDY4pzgWs8D77gH7l%2FX3oVIU1EJgi2UG7HCWgzOoHgqN5q30a6xzo4t6zMTlM15P5IkeDpr6lR3SkE98Y8p%2BFvOFKgx7Qza76vN8E6CiQ20NJoBzPiymaL2TOZBV7Kw7PfvQjp1lWA59VaIY2cvQ37INf%2FjDxuxvcg%2FdtqrMJWqm84GOqUBLYTfkCRkfFJSa68VRn%2B8qUZlpvZ6VgzRLK2pG53QOdpQnPuKvYZzoUBGuUs%2F7fAL6Cqa96X5wn8tsNEj3ZodRL9iUr%2BZeZN2Ihj%2BPuqt3V%2B9%2BfjFBd5AVBhaygZKZRHQZgrmxvBn9GJ%2B3p1dG9gYbqvdMTeSzL1U5%2BG4znUxwJXYQfAIL2%2B50BHiPCWeLrkkXM8IMSDm%2FC9u215yyVDmBS8OjLeP&X-Amz-Signature=b93994bd4a800af8d57d652a39849d8749a1a30bacfc5dd1a3e0fd6123e948db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SRHHEZS%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIGrc7LSJylpnBykdINRD9DLlbQQMFYRYvx44vmygcIBJAiEAsHmatyj3WraUY7T4cent9GYaBykb3OMKHC%2FSA%2BibamkqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK3Y7zMOSWzfEl6ioCrcAySGii0%2FLYoNu1mU7cDK00U36alpIHfqgTvNF6ElQWLOSWnrlQ3J8a5uMXiF9ADzeHc5k6MK24XoN%2FgYzKpJJyOKPZtBX24106TLn5EQMpL9TeJ1p0EZfp%2F8Hlas6XHOpV41a6B0Ns6ZVQSHxoJzXMcTIkbWDOymMluj%2F0ta6amlfVbMkXof60mlj5%2BaAWc7dh%2B%2Fj5Nu9ZdXqaJpKdLjtfaIHwcoAjfIHe47dgUaTQjOjTmFg2dqFnG6ymGQvgbdgjqgZozftEuvlISO5mRDqIvJAcoNXjWvJP5lmaARDnEPmKu72%2Bz9DB6PSYZkoLVJyrqgCXPvMgpN9ZVSXLRaMRZw%2BXL8G0fhkOd%2FKQoIusMlmy1k%2B1QUwR4oph8Vm9tHcCDIMoyZb%2FPSx8Y%2Fj%2BNaCFILkzS9v44GO8Ct8bkx8zz4KbENiOaqwQ1IE0dyAVKmGIWjuTrj4YhTosBgTT0ip%2BDY4pzgWs8D77gH7l%2FX3oVIU1EJgi2UG7HCWgzOoHgqN5q30a6xzo4t6zMTlM15P5IkeDpr6lR3SkE98Y8p%2BFvOFKgx7Qza76vN8E6CiQ20NJoBzPiymaL2TOZBV7Kw7PfvQjp1lWA59VaIY2cvQ37INf%2FjDxuxvcg%2FdtqrMJWqm84GOqUBLYTfkCRkfFJSa68VRn%2B8qUZlpvZ6VgzRLK2pG53QOdpQnPuKvYZzoUBGuUs%2F7fAL6Cqa96X5wn8tsNEj3ZodRL9iUr%2BZeZN2Ihj%2BPuqt3V%2B9%2BfjFBd5AVBhaygZKZRHQZgrmxvBn9GJ%2B3p1dG9gYbqvdMTeSzL1U5%2BG4znUxwJXYQfAIL2%2B50BHiPCWeLrkkXM8IMSDm%2FC9u215yyVDmBS8OjLeP&X-Amz-Signature=db8155c7b3d30bf3c7c44aad86b73befe4878a31a0924e1756db3965be61f435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHFOVXNW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIHeYpYSkB%2ByZ6VWhsKd6EYbRJkLyxU9rnZtNWeItfUKwAiEA6GJLvzCjzXcF5xx2xiddQoZqfA%2FkFpD2tw3%2BXGbnMIYqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPaBPUJXG7%2FU5N5HVCrcA3oAvC4v4PH72SRjVGOXSgv6M822ckr%2FN7b%2FF3a12y88BuGNUw9EN7PUSc1xsf5wuDXd4l1j6IBus8VWwJjExxl%2F8SZ7DL1aZ4AXtwyQ%2BkachKKM5qGvzSbKYIUlCOocCzUnxgfSH3CkXYrXCo3W%2B5wRSygMZI1IhlSwLsZ86kLsZS52sUDaHSIGHjofae42M8we5baqU3RZCyWXKo5H3eILndooflgE35h5r%2BQYU2%2Fbf9akajIKx8YeIaWxFI2QANX45YpYKvgQcfzSOjyLAi%2FcA4Fh%2FbEDPbnVUlWwBa4HCIIJyD83TA5HJ25kAUeYrGOrI2yIaZCzNMWWeV7sV8hBjB53AB4HTdvuo5pyFyM7Ttph7GBFWsVOx4ULExY1eBUkKF41ay0B0VLEF7IyQtDmEvAzHSN1Eq1OiMhZvgKP4jp%2FxtEkaoB%2Bc9IthmJgVf5bE11V4vYyiZYoKxu0%2BHdAbX3zuCi77C%2FdGDR2r9IU0oTpAPXXFHp1NIIQMVVxHX5qpKsY87lgyszeMbfAfVb57aTrn2yCv%2Fq%2BgmZGFma5qPG19SIr8CYeL2K4W2GMixjBsJVzeDEnFcKAoy2y0Abc%2FnxAY9w9umbsjeU%2FIZRLCgiOkIZLQ5Z6R2wMMKaom84GOqUBbQfplYb6LkH1RWqxxv83qy3iPAvdoqYyE%2Bqkmchno0L0tWg8PxbmDWhKZaxKCYHJcVzI4paLjCyzTLHaBOCljCSuJlIuHdwQjTeidQ11K56FEu0kJx6FY3iFqRfejVIA9XdB%2Fk0fQmltS8gEigaQYAHcpbwOp2NtO2LxT%2B4hzl6Kawnyzs5kbBLqi97J0mOJW%2BQFB4vSOhAHGeDiRXe7MuEJcRQM&X-Amz-Signature=f06748bf621e20f40104798f28c4b3500c01f5f82a0797cf798a8a57f99c2b4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EGB6URX%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIFa0OFakXivTxVapWEQ5QIKUSN0HmuuqNX32%2FB3bI6KJAiBPXpH3L9uXM%2BBHT%2Bt8%2BSqVJ1BVjRRLGQL2P6X1yqeZ1iqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMavE0N2QWtsamVmoiKtwD40xCta6YyTz%2F5h5rGyg8ZVGuSc0VdSlI5ktQhmRITj4hmSfy3GFq6wcrIaVArV%2FO0HQtFnghXZkpEZcWo%2BnYokZjGMTTeWs3J0v4Mcxqm0O9k%2FXlgXGNhBCZBcPmmFjvX2E2Ms%2BLaqmpN1Xsoq0M8Rw6NXTpMI9CAt6K%2BiDQTmR9hIDM0lh7gBYBpH4oByFXc%2BjeqkfPq%2FPVN%2FND%2FKerBdT9MRpBTZqYWqgaxPbuX1ZmKwWELK94c5MN8KCts86Amx4H38RHolexzsA%2BqS82iYOeI7dI574xO6Ai02cy%2B3GRy7Sk3AJgdFChnP8SyYpP4rPSlbNf7srV0cDrkHR8lm3McVHjNBsqPUcZZjAXav2BWKee8UTYAHZPfbQb3RfPpYu1XQ2kSIlqxdUT0nGQztpxqUAKzSFIFgPBG%2FEmmRXEdV8YzbyLAOYPG67E6H8BQm7NblWUqxqe8PGQXrXQniLSfbg6cccEnPwCTonnFEUsbVeyyY3gic6TcuxUa17Km1sQqZ%2BlrPGzV1VPxK%2FEr9sM4Iaerz0HOxGDcKwraLNNTdLP0ET%2F4KInUS2B7X6nbW5z1q6A6%2FMZdQPe%2FpwfhEoIHHMr%2BFnGMlCYIaVrqSUIfUOf4zGBTnSzpX8wjambzgY6pgGQeJ8u90afMNDN5SMiQg1ezBRFzBfIzEMu6wu1uv8V9S7ygmgWyyR4mR8shaXd%2FtOHUsK%2BWjdPIeidjEw6%2FKMdPiIwFseQw2hgOA0TOHrIwFQZEETDJpXeY1x2F%2F82oQPOWM9YihI5j%2Boe9feX8%2FGRUBQ6jc3OkC%2Favm8OUj3DaqSclu6BnVQ9%2BrKZEN8VmUjrpQ%2F7laZi8OlP5QvCDLTlf1Hn3k9c&X-Amz-Signature=e2805fa449e2fedb855c2fe813f9d38bad4c1862030a0b7659e61a0f78f14004&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGKO3EEP%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCICOUMVn0TgFRg%2FNRhJCIgekQf4m%2Bu7yHrsVvcmB7iAi5AiA9Pt0n2bNslOsyTy%2BPtW4y6tvRLkQ6LWk4QlxTAtJAbyqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2F1aJ3g7nE2WhLepxKtwDDJu5AVPK%2By%2BtzYsbBIwiu%2BK9DGccBbW5GPFArD52NFDj0iJ2xybrObE3Dx8h2bhaq5G8pA10FfMcdzrumGstgK0DVF1%2F5r6ZAqalfbifB3WrgbeubOv7jmCv3zLYM2aWXmm4HGDIP1DAmwxs3Az3Vqd7pQxNOP7fPEyYHhQcLpceQDUZw7eT3MBnaYAJYGqtgZUBfPVV8Mv9%2B5WjZEPJCiXhSch7E52%2B3U6MQTnqMVwgiGwA20J56mqLB3cpodnkglu%2FKTfcT%2FCymipW7bktSZD6Z62nRS%2BT9n4h36CvFt2f8gUtwfEOqQpM2NklHlibcF6KsaICsgBku80jZj9FVMFkb4rkYGzpca639aSHzzVvS34%2B0qUL2u%2BBhrVRi5KGs4jbYDJ97vk7mBGIe5q0u5XCcoSWhA5EqY7vWBHcNC0J%2FxYFov3nwNqLefGp2vE2ukOmwVVZe0DoHdIhkzX%2BX4DlTp2RE93K3ewIsLWmM4aHWipuzM2w2z0b7R5IT6%2FLIzrBSypCIRD%2ByfZMYSkFgTihGhwZAjFMCeHZZkueR2a2nC0WjPillvPxxdnd8Xwy5u8E64GNoV6WmyeL399llUcVL6Ju2FU5hLcFiZ8IgqNj7ikH3njLyvzoCsYw0KibzgY6pgHr5LFFbvdexoQ5Yh5cCBWHBxbbHok18Zv%2FOe5tlhjg66b1rbNdMeVBMa0TrvEyC%2Fw3HHRb5kl8gz8WWt74wS3VG7wLBw2iH6zqvRfw8xEY4qqH6Btow64OXpVqLkYv7VoanKh8mxE3wjDqa7i9INtD3VpfXdZHR8xrluIHUaVrgEjM6t2B2xS6%2BGD5%2F6jD9wkJ5Py8ZSKN34aKKUYPaQ7oz3VibstE&X-Amz-Signature=8e6d2f7933cb8f6c16cf56f5b8bd99b21239c7f9e9b49ee43a9c61b6104ed945&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCOYCBXE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQDPTTpqjCpstPi4ubkz4XDOzMW%2BwcRSD3ri1zvvPukoLgIgXzdqGIs5ro%2FjDnCGXK5gNTGxtZQMi3IM93rrVGl%2FPdYqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL4xhwnwNltfmMYXCSrcA97gAkRKQN1JhVkh2h789U7sC298wZGMfTTqlU3qzT9hPStCaCbWOaW2mgsJS%2B1UZuRqkSTXPElz5a1bCOmFtKZFt47LY2E9mO6PsQ%2FQkS5LduPQsJ28cllhgv%2FKnGCW3HhLzcJiLTiBfdS9U47T%2FdUIqvx75QTM0Z57rW3LVQUKg97PYFu9mt8lWEC8sF68%2B7HOYEfk3Nqj3mh6QC2gXY%2BGkjfrFkdcfbwEDEsNFBDQwEzT%2FMgFWJYMrTIgG3xThuagAydihoniZuz4AF1vvv8%2Bm%2Fc7qBrc8qgiO9FiZqxGcTDgJqc8%2FbQ0pglfpg5ctSK3siSUzbKaUz6tMNdV41X5DY3GNLxzcQFk0PGoSDp3qRdiTpQmzktqP2dvFwRv7P5rsLdPDOV8kn9A2u%2Fkm%2Bn3N569hQzZRsqkwtzTakqzdpA3it%2Bn%2BctHxHN45pA%2B6o1omHCklwaT5ePFwWcDyG%2FJmGC7TjIWj2cPmUGu90xltXb9i15ky8Vqpfgdptr6aLGpn2Aj6JgAWrSneCTQoJG6aaY3RNADVID4heYfYcrOtEpQhQFi8z3PDVWHL%2BEAoeyrU8SiExsl%2BkHmODBrDowdYVr6qHBvRNOUrtHn7vyDoYX28KZa%2B0GR3ZFEMOSom84GOqUB50eWRl0%2FcrMroYK4s7ITiNYX%2B4bu4ROJe3XMIGhn8qnpM3TFvh4OpNZbf%2F8b0De3cbYrFk4rViBGKfqhpEZxeuF%2FN17K8PDKtOznKZSiKckqRXBN4JLDwffZArIKW5XwO%2FDtc%2FFA1usRtGOYOr%2ByQSjsmr6NlcQ3PFCaK325wJlZx9sXurBaW0cD0Lm5YOZ7aUBEAvxt0VQ9V8MCZF3%2BZ8wZqrlQ&X-Amz-Signature=68e9707398475d9fbe0ba7884cde6028b68f523174ad1e77ad4523107b784560&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCOYCBXE%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202229Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQDPTTpqjCpstPi4ubkz4XDOzMW%2BwcRSD3ri1zvvPukoLgIgXzdqGIs5ro%2FjDnCGXK5gNTGxtZQMi3IM93rrVGl%2FPdYqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL4xhwnwNltfmMYXCSrcA97gAkRKQN1JhVkh2h789U7sC298wZGMfTTqlU3qzT9hPStCaCbWOaW2mgsJS%2B1UZuRqkSTXPElz5a1bCOmFtKZFt47LY2E9mO6PsQ%2FQkS5LduPQsJ28cllhgv%2FKnGCW3HhLzcJiLTiBfdS9U47T%2FdUIqvx75QTM0Z57rW3LVQUKg97PYFu9mt8lWEC8sF68%2B7HOYEfk3Nqj3mh6QC2gXY%2BGkjfrFkdcfbwEDEsNFBDQwEzT%2FMgFWJYMrTIgG3xThuagAydihoniZuz4AF1vvv8%2Bm%2Fc7qBrc8qgiO9FiZqxGcTDgJqc8%2FbQ0pglfpg5ctSK3siSUzbKaUz6tMNdV41X5DY3GNLxzcQFk0PGoSDp3qRdiTpQmzktqP2dvFwRv7P5rsLdPDOV8kn9A2u%2Fkm%2Bn3N569hQzZRsqkwtzTakqzdpA3it%2Bn%2BctHxHN45pA%2B6o1omHCklwaT5ePFwWcDyG%2FJmGC7TjIWj2cPmUGu90xltXb9i15ky8Vqpfgdptr6aLGpn2Aj6JgAWrSneCTQoJG6aaY3RNADVID4heYfYcrOtEpQhQFi8z3PDVWHL%2BEAoeyrU8SiExsl%2BkHmODBrDowdYVr6qHBvRNOUrtHn7vyDoYX28KZa%2B0GR3ZFEMOSom84GOqUB50eWRl0%2FcrMroYK4s7ITiNYX%2B4bu4ROJe3XMIGhn8qnpM3TFvh4OpNZbf%2F8b0De3cbYrFk4rViBGKfqhpEZxeuF%2FN17K8PDKtOznKZSiKckqRXBN4JLDwffZArIKW5XwO%2FDtc%2FFA1usRtGOYOr%2ByQSjsmr6NlcQ3PFCaK325wJlZx9sXurBaW0cD0Lm5YOZ7aUBEAvxt0VQ9V8MCZF3%2BZ8wZqrlQ&X-Amz-Signature=1c0134aa17071fb0f7589fb558559549476fbf2f9b3ce7f6d48de6721241ff8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQONQA3A%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIBp8NxZuEJOYHA47FZwDNfEdRUp2Vgc5sX2qg5UAbVvFAiEAzhaS9wkUnKvYTC%2BwfzBUNYAbhV4noyWV7hoPrP8QSngqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDENj26EwCJ4Mkw9QjSrcA4CVbcX1M60EwXy6SDqgPiMDNlEgtriFY4xF41Zba6Uebmkw77yPZtgnWDqYRDzplYEpIuKDKcA31F%2FyejuEyi%2BDao%2FUl9JW7Kma2Ecm%2BkMt8b2kIdrrYGgkfVBYK3MpZ1wjTLy9wFVcN370ovy4vqoqo0T5to43ODFlTqQH%2BB7glkYdyWgTaL3EtGcrV8sMko8Re9uu6npHobIMhkR19a8D9xXoW1LFpJ%2B2f9e04wpNDmEWiR%2FckMV7MlOSn420ViG6S8YxHBxji4vkOVAlbKQyRU22%2BjpnKyhQHrkSra6tDgrPS0IqAaHeXMI3EwqxiRFIewv7zUbZrVTrFDyEhzkuICwK%2FNQj0kWFeB%2Fn51vWhCQygwrKmBaXybW5uiFMTQinaFfkF0aWq8sVz8CBMAZaDV%2FuvCsfeElcglnIDca2g4nKxMF9HHjkmO8UeRgLwOqV8n0OrcE8UUeC3KdEPiW67VcyYMNHkaovLKq%2Bm2zA%2BXGapvSK4ypnO261sTJw3Rt3MQAW1WVp821Mx7ypevHtv%2BgYObDo0OYUVyPcLRWc8aSvNcGHuzR8MmUkMTpgqXFtXO5nEyNDE%2FqKrWUMxPP%2Ba%2B5j8Iv26Hleb1VGol7Rn%2F6XsNl3wCOkTf9gMOSqm84GOqUBZ8259bE4ETwx74o3QwCP6ocQ5z9M3C3wixnwJ%2FRgt9OThqdt%2FqdBaSIratcayGYlvfa2ZGc9KysNoK8V0L7Rq88v7u5PrvpfsUeWtIyc94c%2FiUztPU5ThHYwLLv49l%2F8ujNTAIQbmm8JdA0r6%2BtxdUaTdLvRA84W9YVQc9J7lyzmWJst%2B%2FNQkEpBK0eNR21rserk6E7tyM8SrjpbXsQRIso7JpaI&X-Amz-Signature=136faa2dcf23b0141d172f66603d793350f3f7c2ec074eae06c64effb369d08e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YP6EKS5U%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQCU5IqouN%2BX9uk%2B3wOYkNSzg5dcbM2hT2SWoX4yW43HpgIgc1npaLCPm5UqrePRLCHrYVxA9gKdhUf1f4xeIeHgshwqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHxRazBT2v7X%2FzEr%2BSrcAwTi8teWjIE7DZHaPUAtedorjxCg1gLGZl8X5jwjGr7qY3c0Hu%2FuFILlKRpH59Gsj7i%2F0LGxp4jt0ti3rdsDTE%2BhszlE7d3CLnVyTuEfWsOCGw9HYYQc%2B5dstlfyRpH7kBCcHFNzdUUVNXBuqOHUyZd8Rc2mmCeMM1QEVKmb80kvUFchpgUyhWA9aMy6qDaJdr%2FGZk3oUGz8noEPG4vt7W1w%2BeSMqyymu4FR6A8p1dj1g1DomeZQcamj%2FkCKJdXnxJ8CweHroa7HqMvoMckGd2reOvfoTD3wkrRobDfLgr%2B%2BYHLjZviwSZxrieo2iJN%2F9pzAVwb%2B7ziAiEWkBp6qPprHruwRkfwAtcVCChJyGjlataw4U%2BVydamxFaKDfvuZC9Np5PZ1rnhuc5lb4Os4gsRy6QxFXopKpx9VNzyGg8K4e2wwyNKoFcpWWuIC1BTAm8J26DZBcDS4wG7GqRlXaox2n%2FQcOByTyByzX7esNxv9b18YycIgQvvYrF8HzV8VMp0%2ByocT7K0Ak6KaNY29c3bMXjf1O0%2BVy8l4GVJzyuTflZTr66RJ8y83vheqcYTtA33vCIzcgThBIenQTdrGsKXoLkcW%2FYCEDiFcppKubQudhMoWKmzfpvOMkuGiMPSom84GOqUBW2hybOtrrIB3ZD%2F%2F3lccIzdGbNNhAS5qznz1MTmLx%2FPEW%2FCpWuZcuovXvy6mjmPdWkb7TLTDoXW5n2vRybo0Gkry9M8PFB5hiDUCaQrWn0QiIkiO%2BjrJ0%2FMNARdO2zcR2p8qg4ZU5baQybWk1qShSFQNifzRj%2Fx4KB6%2FZd0k8ZqqFnshu9IcdnmygfMwk%2FatqxwD%2FqWw7SST%2B8dzdRwBvm%2FIa8vk&X-Amz-Signature=a37ab97e5c58fa4ac45facbdf6a5bfd240d018aea9eaccddc27e8c48fbe5b6b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YP6EKS5U%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIQCU5IqouN%2BX9uk%2B3wOYkNSzg5dcbM2hT2SWoX4yW43HpgIgc1npaLCPm5UqrePRLCHrYVxA9gKdhUf1f4xeIeHgshwqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHxRazBT2v7X%2FzEr%2BSrcAwTi8teWjIE7DZHaPUAtedorjxCg1gLGZl8X5jwjGr7qY3c0Hu%2FuFILlKRpH59Gsj7i%2F0LGxp4jt0ti3rdsDTE%2BhszlE7d3CLnVyTuEfWsOCGw9HYYQc%2B5dstlfyRpH7kBCcHFNzdUUVNXBuqOHUyZd8Rc2mmCeMM1QEVKmb80kvUFchpgUyhWA9aMy6qDaJdr%2FGZk3oUGz8noEPG4vt7W1w%2BeSMqyymu4FR6A8p1dj1g1DomeZQcamj%2FkCKJdXnxJ8CweHroa7HqMvoMckGd2reOvfoTD3wkrRobDfLgr%2B%2BYHLjZviwSZxrieo2iJN%2F9pzAVwb%2B7ziAiEWkBp6qPprHruwRkfwAtcVCChJyGjlataw4U%2BVydamxFaKDfvuZC9Np5PZ1rnhuc5lb4Os4gsRy6QxFXopKpx9VNzyGg8K4e2wwyNKoFcpWWuIC1BTAm8J26DZBcDS4wG7GqRlXaox2n%2FQcOByTyByzX7esNxv9b18YycIgQvvYrF8HzV8VMp0%2ByocT7K0Ak6KaNY29c3bMXjf1O0%2BVy8l4GVJzyuTflZTr66RJ8y83vheqcYTtA33vCIzcgThBIenQTdrGsKXoLkcW%2FYCEDiFcppKubQudhMoWKmzfpvOMkuGiMPSom84GOqUBW2hybOtrrIB3ZD%2F%2F3lccIzdGbNNhAS5qznz1MTmLx%2FPEW%2FCpWuZcuovXvy6mjmPdWkb7TLTDoXW5n2vRybo0Gkry9M8PFB5hiDUCaQrWn0QiIkiO%2BjrJ0%2FMNARdO2zcR2p8qg4ZU5baQybWk1qShSFQNifzRj%2Fx4KB6%2FZd0k8ZqqFnshu9IcdnmygfMwk%2FatqxwD%2FqWw7SST%2B8dzdRwBvm%2FIa8vk&X-Amz-Signature=a37ab97e5c58fa4ac45facbdf6a5bfd240d018aea9eaccddc27e8c48fbe5b6b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LZZXNBR%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T202232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCy4HlQ2HFL%2BSNOYkxZjgXiYcbS8MkIUHtc9euWHzDGrQIhAJdEhX83p0e8VC%2F%2F2%2BD8hLIF7h9pTsc0cjEyT3dM2%2FXzKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoivWbBNy3iFmoMFoq3AOeAdnFEMmSc%2BeK2l57dOtWXTi9zZqrrqHbL8MhRBKcXbt0LFz8nXDihcbKxYcNaust%2BkU%2Fz%2BTEPRXNVdUzOR2wGTsq9Gx5jW0OfbcEfpEMJqyC2Wbg8maX9AvcYrQ%2B4hFvzAgcWos2YBbfVhnI4X7g9cz3Sp5mFLdPScWsa2d0Ngdqbg4wN1eKfnwxZ6ydkX1%2FJV9Kf3oFRXstpN31KhI6p4R57ZNBc2o049WvyysFdN%2F4geJjaPaXAr3MGvwCebs3UE8Y5PPOtQ86W7h0SbX5t4P0t2%2Bb9V25w%2BJndbfFzAAF79OsWtq6x2hbkOC%2FFN9kgygS7PFYKLnJDoYp70UrvC1Gf%2BhtwVimGkPF0AptvWW0Sbn%2FPI78OP0LQNmlZuYn9AL14uSbjfflKVS6YYdnc9Ru3sKBDtsQbCajsBWDQTQ5Tm295ruO9FQbRiXIRQcnggUivIUH7Lf5hxRXvDrPmIwiPO7iNhewEJRe0SVeCY1tU6PRxsEPYZ64Nm9yG4MCuuhcV85ze9LRZEg4qEIGkIthFTrhPlN4nGSZiT72mt9xyZTkN3O%2FzDCti8WCWZBhRfcRV82rHLiv5XvZfP4KO4bOl9gwgKJ1ngZAZmfgT2Scto%2BtwhSHetWlFTCvqJvOBjqkAZAkGKhB5icZ1z2HZzSxYQCm64eOur7G8%2FB2gNTAmkuoC5SDbZqQov2IoRxcafkx1xrk2ovJRVfcCVjy%2BT0Y%2FDUTTbn6p4W3CqnMrDteZXeuzSoW%2Fq0qtbl%2FGMKGBC8W8Rsx7PcunOeb9DFJJUwyOzYvNgkYN9qbzHz%2Fi1LY1M1cAy7tW1SIfZbBGmMhKQ3kMKQudzq2UED5J%2F0Xe1N2RQnMefLT&X-Amz-Signature=d53747aac8bdcc0e1a59140ad28601e0fee7ba7248c9e928de0c8259fa1d880d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

