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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHRIXSSO%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQDgAeV4FK%2BT%2BLJAoxtiP2xEqvgSfljiL3Ko2pLux%2FeEDwIgTjFUR0XuERgH71rRLS8Zhgb6u8mEOffetj2k6X6rJjcqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB4K9lJu9JTfdB1bKCrcA35R5WnYFjVE0vesnyjq5S85q8EMIa48hXlUcs2yfbH7RwFyGIQoDO0Fm91XFp8De%2FLQxm9dz5OyfP%2BdrW7aMziNQ7eS96f7etT6fZjvoQQCXvwTbXq0TZ6ocyahMhBN1gVBw6Wdz1ieXlNY1Lz6QDAc0OZsaDHOabKNJdErYra3THMggnSpfS3fyHpz4yQgcwyYJIXTX9qzibkiTIR%2B3BLjLp4V4a6nDbfaRImTqL6uA8vkxf4pH0NcMq%2Fu4ZuFNX6YpSAKYg5kL4iycLEwC5k7zeE%2BxfUXw%2FGGtJidtiBYbXaACi%2B1gcXHCL1z0%2Bp%2FurrJi8dbx%2BdNMAJGGUIb%2BxbqoeJf6LJEGAU5Bw7pCQjZDr9zN38%2BFLYBdIZhowVkHQeX6y0j9D0ypcVVN2K90KviCIXCKuuWFFP8VVwkq7l6Ilna%2FEAN9OiJL%2FprmrJjW6L%2FweQkGjhQL9ekQ6JtI6HYkfNrM9UL%2F0aIl2GHgYmdC8tu1w6GFo5SN2kgPRKZJbPRq%2F4j%2F6EXrScqk9lPWXRPRSRW7pzxBKZQEFdLNGQ%2FGKQWf4i%2BUJsOD%2B5SNEpRZeoR2byCRqOG9ihTeF30RygO5YkqRnWP9ZH059kXPNyO32Jy4KI%2FCBIRzehDMNbUyc8GOqUBdhbx3sft4ccFngH1YUP6fG32%2F3A78BIbU%2F1QvGhAd1DnODpPQU1b9nVnw%2BB0VfkJPDLM0NA%2FUecxyMQZ%2F6qeJ%2Fe%2BAoSQnKPEbliGSsTRmnrxGdqeUC8UXXznxTzamIh%2FrXTG0zbpB6Mt3MImcx%2FehuSZtw7Wxs7wrNQV4ZrR7xNXWXU5yOMuk3yfxOkzeVlBFovF8Xb4XFFNcbjIQdnWwxQXM1Nb&X-Amz-Signature=e3380e348398903ceffd8dd0d4061303c0b6f31a6040743980fb8699ec0966b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHRIXSSO%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQDgAeV4FK%2BT%2BLJAoxtiP2xEqvgSfljiL3Ko2pLux%2FeEDwIgTjFUR0XuERgH71rRLS8Zhgb6u8mEOffetj2k6X6rJjcqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB4K9lJu9JTfdB1bKCrcA35R5WnYFjVE0vesnyjq5S85q8EMIa48hXlUcs2yfbH7RwFyGIQoDO0Fm91XFp8De%2FLQxm9dz5OyfP%2BdrW7aMziNQ7eS96f7etT6fZjvoQQCXvwTbXq0TZ6ocyahMhBN1gVBw6Wdz1ieXlNY1Lz6QDAc0OZsaDHOabKNJdErYra3THMggnSpfS3fyHpz4yQgcwyYJIXTX9qzibkiTIR%2B3BLjLp4V4a6nDbfaRImTqL6uA8vkxf4pH0NcMq%2Fu4ZuFNX6YpSAKYg5kL4iycLEwC5k7zeE%2BxfUXw%2FGGtJidtiBYbXaACi%2B1gcXHCL1z0%2Bp%2FurrJi8dbx%2BdNMAJGGUIb%2BxbqoeJf6LJEGAU5Bw7pCQjZDr9zN38%2BFLYBdIZhowVkHQeX6y0j9D0ypcVVN2K90KviCIXCKuuWFFP8VVwkq7l6Ilna%2FEAN9OiJL%2FprmrJjW6L%2FweQkGjhQL9ekQ6JtI6HYkfNrM9UL%2F0aIl2GHgYmdC8tu1w6GFo5SN2kgPRKZJbPRq%2F4j%2F6EXrScqk9lPWXRPRSRW7pzxBKZQEFdLNGQ%2FGKQWf4i%2BUJsOD%2B5SNEpRZeoR2byCRqOG9ihTeF30RygO5YkqRnWP9ZH059kXPNyO32Jy4KI%2FCBIRzehDMNbUyc8GOqUBdhbx3sft4ccFngH1YUP6fG32%2F3A78BIbU%2F1QvGhAd1DnODpPQU1b9nVnw%2BB0VfkJPDLM0NA%2FUecxyMQZ%2F6qeJ%2Fe%2BAoSQnKPEbliGSsTRmnrxGdqeUC8UXXznxTzamIh%2FrXTG0zbpB6Mt3MImcx%2FehuSZtw7Wxs7wrNQV4ZrR7xNXWXU5yOMuk3yfxOkzeVlBFovF8Xb4XFFNcbjIQdnWwxQXM1Nb&X-Amz-Signature=e3380e348398903ceffd8dd0d4061303c0b6f31a6040743980fb8699ec0966b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5OEKH6I%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIF0ncfKEX4YA%2FbWKvH0f%2BIeuBP9aKRukrYEyGV0mqaowAiBfzlcLa%2FnVTkRbve7ya7FDhIHdVluh2JWbK2Z8GneqgCqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5XThc43ChKl01bUhKtwDPEmYW%2BVGcTz%2FUJ0mSbXx4dCRSwNDUmX1V8m7H8wwnBIFZ4VBpG%2FZhU17LRxJiqDF96HqX%2BfirpfnGUEPTOzLdgVXD8IDZ3708HT%2BtRNMrmXoEIkEohEIiD3mIbtZEH77MbH6ougUkep3FfPWoi7tpX3NhvmWFr1iWd13X%2BthZ3cbKFBXaSDPJjrFszCfZ%2BTsH5WzsrVT4pu9P17V%2B59JpdZ3X%2BaF1q138uY3Wdf4vFdGnTt1jeLPeePUELC8bS0CAMYay24L7IrHlqordLDeXxpqpp4whUqlEsgFlESIdM5KKyCQR8EVahFJyF62GIG%2FeBa30lUboUCWILGjhXGXn8Eus2rtSeWEYBCdpldviYMtKHq9QiZTfG5Cq9JZHR7Y1cavUnEIt0vWf4JJk4CUT7JyX4t2mNIu9uAZPYiIek9Q1CdK5sCrH8Jhinq4P10l6%2FjSNgWsgLvVhkSgAeeMwV7%2BDjD3nTpnbuRPIbjGpAI3v9t%2Bg29ZGCyh0%2B7tEOr4sI99iG365uGvYrltWsnSarkoPprMN6L5diHelfkTXhG9TzhCa3VNonfsUmycGuChFV19rCoX0dBPRgBpDzt646MTZ%2F%2FRFy6qKBHuGJPYsXu6LGs40wkKOwGAlBQw0NPJzwY6pgFfUe2y%2FYH2y1torttE6YF8Shy1bPJIA7EvBRmTGSKpFSAUIIrkgrOfRBIeUmeqekCYpb0w50HkaIsqJw3U5uZC4qN4R5d%2BXbkdJShJrZ7gDo5IH5jzNI366cr9tw%2FJ6%2FzOmTqTsfnRhVbsc6VCr2vgIYXBOtJjP2efyvhIovfF%2F8WmslkkwaTRRN80uGf1Od2OU5IdcJ9EHgWLNfM25YySQigf8nP4&X-Amz-Signature=27122cbd3abfb5c940bc0109d67b28a661b0e5716a89b77442ede6c8593bfa0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWTEOMLH%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIEyqKeOS0KkLWLa6wctqzLzDPn0vdcScL5vV6nL2vTKNAiEAkY0TcLE9MZi5lQFwdFY3dE%2BPT%2B5xJJ7p0l%2BHTUOcmN8qiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCn%2BhAx%2BhhICWubfNSrcA0FGP%2BXokl8Tqqc3ourxQoigjt1KD27WWKOAPueVbesT5qTpD5D3%2FNCH%2Bm5zxSqqh9Kb%2BBFXxHAynfy%2F8NGiyO6UfWDA6qNXVeKujESHfmiNAUYowggaL8ZgTrOGkF1HZDmTm88A4rk%2BN%2Fpd0jlc8nE6rTyJrIXJ05ozNR5D3o9ljIbODlfbFzncTUGp2k6qDgvknu5BBCeVpXAIxoCbDjT6TxMy9ntF0qqaAA4Q46%2FBLCDShqhlLvYVLYsiFHMFdHWmQtt0nN4zxISyXBFpMTD4lqCOHuH4vpwEjni1msdy10YdGVJG%2BNVKvzOKYCHw2a5JCXqFhV%2BtL58TDpnQikj%2B0pO5p%2B%2F%2Fp8fQxi5FvmMO85Jg2UQGxkIQ2yveCiYZ1S%2BZ58IMeh66i3R4BHyuIYQoDeVlEX7u%2FJtTr4f74rNSitn%2F5cn196Rce%2BZ1A4A0bpowor7ZlOdtwBUXW9aJkrlZ4csleOhdNOIUwEXd4UmmNmLCQx2c58pDLEldjiZInWMmAc%2B9B7n%2BLa6You92%2FTHcAoXSHQWbj6Y1MVrSrBbFsRHcZldrA1L9YBeldqSgf%2Fg5eomBMYSO5JSjrk%2FB26bCXtR5sXCD8yxvdFc6osviy9yBopCK%2FO7H1vMKMKjWyc8GOqUB2XCEm5RU4fKRcHF3EQabKAOK%2Fpi9zRZX7iR1rmANjfmVz7yxxo8wBQE0ovDHA5mZljtKle6ClJGe8eKQm9Uv4shQYMR0grD1lyc8nZNnOfjJ1wuB5yT3GRgX0DxQmu5GwTi6x0QVV%2B8wy7QQmFluf157Xq%2BN5WHgDAbM%2BKqVzKBK%2FmvwwmvhzmMWgbW%2FQPUjRqDnQMrCL%2B90yp7GcMYNNMb7cOi8&X-Amz-Signature=707e57d6b4ef6dc5acfa3b317df369401453a8e18fb0f00a259b8e9160f00607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWTEOMLH%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIEyqKeOS0KkLWLa6wctqzLzDPn0vdcScL5vV6nL2vTKNAiEAkY0TcLE9MZi5lQFwdFY3dE%2BPT%2B5xJJ7p0l%2BHTUOcmN8qiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCn%2BhAx%2BhhICWubfNSrcA0FGP%2BXokl8Tqqc3ourxQoigjt1KD27WWKOAPueVbesT5qTpD5D3%2FNCH%2Bm5zxSqqh9Kb%2BBFXxHAynfy%2F8NGiyO6UfWDA6qNXVeKujESHfmiNAUYowggaL8ZgTrOGkF1HZDmTm88A4rk%2BN%2Fpd0jlc8nE6rTyJrIXJ05ozNR5D3o9ljIbODlfbFzncTUGp2k6qDgvknu5BBCeVpXAIxoCbDjT6TxMy9ntF0qqaAA4Q46%2FBLCDShqhlLvYVLYsiFHMFdHWmQtt0nN4zxISyXBFpMTD4lqCOHuH4vpwEjni1msdy10YdGVJG%2BNVKvzOKYCHw2a5JCXqFhV%2BtL58TDpnQikj%2B0pO5p%2B%2F%2Fp8fQxi5FvmMO85Jg2UQGxkIQ2yveCiYZ1S%2BZ58IMeh66i3R4BHyuIYQoDeVlEX7u%2FJtTr4f74rNSitn%2F5cn196Rce%2BZ1A4A0bpowor7ZlOdtwBUXW9aJkrlZ4csleOhdNOIUwEXd4UmmNmLCQx2c58pDLEldjiZInWMmAc%2B9B7n%2BLa6You92%2FTHcAoXSHQWbj6Y1MVrSrBbFsRHcZldrA1L9YBeldqSgf%2Fg5eomBMYSO5JSjrk%2FB26bCXtR5sXCD8yxvdFc6osviy9yBopCK%2FO7H1vMKMKjWyc8GOqUB2XCEm5RU4fKRcHF3EQabKAOK%2Fpi9zRZX7iR1rmANjfmVz7yxxo8wBQE0ovDHA5mZljtKle6ClJGe8eKQm9Uv4shQYMR0grD1lyc8nZNnOfjJ1wuB5yT3GRgX0DxQmu5GwTi6x0QVV%2B8wy7QQmFluf157Xq%2BN5WHgDAbM%2BKqVzKBK%2FmvwwmvhzmMWgbW%2FQPUjRqDnQMrCL%2B90yp7GcMYNNMb7cOi8&X-Amz-Signature=fd5c1592e993e971b7b17bc602e837b29b09bb79e35bd77bcb7e97cd46cb664e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7WDC3BG%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQDTY1YI2yGv1Cv4VQIYDsdTvX3k31lztVMDXKbcmDmMnAIgXxYg%2BoG5Zpm%2FKZGw9TvWsIsv3oEEsFyALldgh6FtVaMqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOs0uO84StNzq5x36ircAxwnlGwOhBmEwNzT1CBE86deQmCVRbYQjj1YSm4m9ZAVltUYTa0pTcRcMRj3BRDQcLZwkRxWZSxHBPZnK1TrC9CuOUlEa8ToPgbkbqr3q4o0i62mei3bJofRSdzRWDpPCzH4giMIV4Yn8Jna8WfNWBkrkAnhJbtS5LGbFy6cecsF4GxW8MZQlDzIMeJA%2FgL30fltmuvc%2Fm53GF3G1ZYNL8pSzKwcm6%2BjoM3nXdIWWQKzV2QiHOc0mVXvbKH03fFpstK0UsGcZJ5XLzPo3J2SO8aYz6be%2BAN2jcw4Seowh6CL9pET6ilPXR6TirRK1dsnTWxiCCqt43dck5AQmSSeKbJyhg38OvYdx9uu1up4c5WB1R6wDmc89KxaqhUV0LWnyvvU7JslVHWJgHFsuN4m01vnXMURwV3fBuJZ9DxM98KtjkrergXyvo5f02yebnq065IS5e0d8IZytqzvHVqfgPWhkcebC04qQgxOXwBW365z9sDtgIGfT2iCxC%2B3LEcEYoFToOaONkoOWNDnfRdyaatQz2s4SolsomuAFs4rbgtG0%2F%2Fjio32phhGasGyqZa8%2Fhz86gPBbrZHaK7doMs%2Biwk3xxXmUDlthBNUcmM3gytU%2FA9WpPrp9MCQSJvEMMHTyc8GOqUBZGvZE6soe7f021cvvYPt2HfzLxN2p4aH%2BzlVNENwaLCFxiyOG1jVybNz5WOuI%2B9IRs8zEnhr%2FPldE%2FkhfQdHe33LOPEvQTwaBtkB%2Ft93DCvoHtJvWqfmjQ5ZcTXNipyok1nv5noQe%2F7n8HwF6Owy20zL7jPT96OixDKOZEm7JD%2FGkonjZB79u3iKlyauWqA7PjbEyla4TD8mXTpwlj45tCyO30F4&X-Amz-Signature=8a7f98bcfaa543e59536f0e15cf7551c7fbac1c71a2e460264c3a5b4a8070fc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDRUMRWU%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQD5%2FGH%2BFU1rZoUJsM4Cd0TcytDe0Oa9C%2BAT5ABBBf7XUgIgfQUgtiWGAAb1McMiGKfiPYcDlbg9P8EIgv8A950e76QqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHDCwgTwAj5bDdie1ircA6c3iq9D6oHguBJ8JlcEC8LFQ6QCXmAqCbcyGTmYUMo8KFPjiNnNSiO7ItXi8FVvtPouDmsIDVZwGNB6eb37HLydgrg5jDkTd9jHGdxIwvbPEUXcWxoiLayU%2BYdwLF6gypahhnFFHa6O8kKjgn0Zla7OQeNsX5vNH%2BsFxdGjx18eCyhLDFbEc%2FWQHRFj0vkHVXnZs7w03XjMrOzI%2FWk7vyofPxPS7pT5aaHC%2FOiknmXYHV3dnTI4kYD9eH9fOWkp3Z7EM2IYwbAgabs%2FnZnHuIdvkNYdm568H1eJl3F4nmBgPHIsTeNgpNlT59zpriUbTnlhhHj%2FXEUD8bJp%2FJr155smx0NX6ALND0qxN72t%2BIeRt62CLi%2FE067MwGp6BQMAwlHsqkLGXMS8VXVXLJYzcz6qccer77AqAEW2atj%2BxRkePp9Zj7sh4BjztH%2BwdleuXaeQNkIXIQZBTZ05EVVncVJa9d9rb4PHCBxGtbHZhv20ZwUNe9if37FzQ14%2FXWOxNNsU%2FWh4xhZ1y8oSdkCtHykYHzpB5k2uaLsgBgtTsFBb9Ckv97F9ov4veusOj70iB6UfuJsp5nREkjij5uKuA3HcTkOazHzv%2BzzPTcA9sO9yqwcaKtNfCiJg7Y5YMMrVyc8GOqUB%2BhzRPo1jk2F39v8c58R9%2BWPu%2FzRcG5w08fZyPqaL6eNYSFV%2BwALFHBDN0wK4TinWWZgRJ0AabwXyYh4QcWjbTaU3jALToVi2LxqW9ywRZ7CuM7XTriP%2Fz9LpoJ3RseDoRH85%2BAx1BZSPbvjgo8j73oh0bJYMdakb4p%2F8LkCjk3I7k%2FBnKNOFbzgmlGS6wROh96PLsv%2FZL7dP1BStV0A%2FRAVvP8ro&X-Amz-Signature=ae10a26c3a30f00af5f9ee8dde93e62de177a064b2c80947faae8dbb28a9ad90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEW6NCSP%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQDJuoNBej%2FaAXrKqWk6QNxIWLoyLPJFHdTja8LHkTNfzAIhAKaShqMzvOuSCRPZSbvkk%2FVF%2BrCuRbiCtooTorcuZzhPKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIrDKzJeYoH5%2B318Mq3APJDX%2F6E1gaHe1k%2B8eAuiQdGHRau9A6UsLMr03TSunHJY38iZYam%2FKkGceeqioeVblgHgS4pNekvpXrmcbzjxhtPJ%2FfV%2FP2qWozv2vwqF6w6X2YT5vEGIPz1AlARiiaBhRdNys10XkCYEpg1tqizlcrxZMh8swPp5ZXtUheRaPSw9Gl20E45f0majn11LHCiZSjGrsTbfMaJONA2d372B4V%2Fmrc7oDAOLttb6LDCH6JjRgvVzVjRHxzNsXQA6GfjfLeAj4Wy3z2Xj9qiDs4J2c9vj6IOqnI55fYUIA%2BVbsPwi47fZFsEl27wT9LqXhZBSMbE9fG%2BHfHDC2ewahicv6Egt%2FfItZF2ImuSqEx7w2m3PXgbDxp8oyAmLeT4GigWnXfFNnEqLsRoMosKQBhKOhR%2BF4cmIQAGmkmZEQ7WhRe1IoSSE6ljeG1sQjcQuaXk9hPDtks%2BZZ0IWZFGK6hmrlbNyq2KMZw0LirU30KD5jIxcQ3Yb5FMrgqiBXLGHPJ8cYPYvstBJa60G1zBCZBAOek0VQVmel2IOhPO0sbi3i9RlhqdrQHTVguK0ru4oJ6CYcupjVuDwV6mW4dG7Xo1GKvGqophtnq23rdRg1J5YPCC1p4rY5%2Bf1jUQtR0kDCL1MnPBjqkASfcXb4mV%2BleRPj6Pnq2fy%2F10T7mLJBRnP7koUaAIw7GHFMykPxuhyyfPrs4kB%2F0OyEiV%2FAl9NrQMnhGnVWC0hzRRsQXi8CefTnlxZHIQkUnnvFwOzKnpzHvlTy16t9Z1sdn47Y8wNHkNo7PmUyxw3W3VVcLT%2BEhzECGwSMlvCrOgq393Dkf554h11LJipE%2FD1kdynPy4gRW9WliIln1Hrq2KaK1&X-Amz-Signature=81e0dd23a9616d3b6e93d28fdb6e6e4077fe1b8ec7c8fd8c9aad71de5c068fa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RI5HWQOF%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIGlra%2Fa21%2Bh9VWjMXbcvX75gkAu2Jup%2BbBZNG3AF%2B%2BAYAiAmzNVVwwIJGcjM3XSJfz0kX8nkucnwD66cdMxT%2FgEo4CqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0%2Bmhy%2BcLor%2BlAXbyKtwDcoZlNsx505s0LsyWSGW7zUE6kTL6EN7iAEXGrHvJb5AiFM4DK7d8EJSjZYDL3Mv%2Fj1GE63NP66s4buIAt9CHNK%2Bz3OxAVNjGJ01ga9PHboZIYsqFjo1kH%2Bce6wywddXMg95%2FmMErohCM%2BSW1l%2BpPEJvxK6%2BSy4RTBVs12Q%2BFQmUFudjoX0gErcvgttQEuuxmuX7M9wTv48YBKKVp6%2FF6xmZ%2FnVQGujlsbSwOsyiTfhib9618Y%2BgD6KxrzzAXQ6mZ9yHcCjIVl3G4fdxh4aomhli3o6qzze3KKZDeOFQQkXrBaZ9nPWU52SsYJewz4A7%2FW9XfbHYBdENqHUMtJFgNi5TyUq%2BnRZ1e4yueY%2Fdc9obSmhCRbHEIq2qrGip66ximLnytRjy0X4mT%2BvnszOsv3QJemPGU8atfCDzhWCx3iNYF5PIoZcyJf4m0Kl4Ac9EkAZqDVKtctpepARC%2FXpVh4WGw4GD%2BtpZDZnK95bnQEtBvG5tKo%2BH%2Blk%2Fj4YyRT%2FiF507S9nLIFps9pGJyHWYPTF9PFz9PRMVL%2BMU8mXyHq2fmQ%2F%2FQiH55C8gNPQZgt8ZpY36vPSYhYZ5Y5bbHuNxpgve5wafv%2FHrlOiciM7yRo4vOet0N%2FCa1k5tezoAwzdXJzwY6pgFxgBxEOib6SrejRKbL%2BP4qxQCzoaqkKF0FBpn2OiGS1sABta5qQB2hEFn%2B4r2HumAM2XOgKtkdc313Xo4GQbGSP9ALKjUD%2BtHCSstT0Y1KxFtI8hLW8dRXBwZNO49l0eNBdgpvaAS3nWHTziVswrDKeHy6ctTLi8T31diJknp14TxAUZBl%2BxgesjMz4yEhf1Nk2DOtY4cwuQD7OLfnFh71oXAB5urX&X-Amz-Signature=db326ea9393bc92c4ef2d1d92e8adb08638ff1f6ee2cac0cdc9d3d59172e86cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RI5HWQOF%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIGlra%2Fa21%2Bh9VWjMXbcvX75gkAu2Jup%2BbBZNG3AF%2B%2BAYAiAmzNVVwwIJGcjM3XSJfz0kX8nkucnwD66cdMxT%2FgEo4CqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0%2Bmhy%2BcLor%2BlAXbyKtwDcoZlNsx505s0LsyWSGW7zUE6kTL6EN7iAEXGrHvJb5AiFM4DK7d8EJSjZYDL3Mv%2Fj1GE63NP66s4buIAt9CHNK%2Bz3OxAVNjGJ01ga9PHboZIYsqFjo1kH%2Bce6wywddXMg95%2FmMErohCM%2BSW1l%2BpPEJvxK6%2BSy4RTBVs12Q%2BFQmUFudjoX0gErcvgttQEuuxmuX7M9wTv48YBKKVp6%2FF6xmZ%2FnVQGujlsbSwOsyiTfhib9618Y%2BgD6KxrzzAXQ6mZ9yHcCjIVl3G4fdxh4aomhli3o6qzze3KKZDeOFQQkXrBaZ9nPWU52SsYJewz4A7%2FW9XfbHYBdENqHUMtJFgNi5TyUq%2BnRZ1e4yueY%2Fdc9obSmhCRbHEIq2qrGip66ximLnytRjy0X4mT%2BvnszOsv3QJemPGU8atfCDzhWCx3iNYF5PIoZcyJf4m0Kl4Ac9EkAZqDVKtctpepARC%2FXpVh4WGw4GD%2BtpZDZnK95bnQEtBvG5tKo%2BH%2Blk%2Fj4YyRT%2FiF507S9nLIFps9pGJyHWYPTF9PFz9PRMVL%2BMU8mXyHq2fmQ%2F%2FQiH55C8gNPQZgt8ZpY36vPSYhYZ5Y5bbHuNxpgve5wafv%2FHrlOiciM7yRo4vOet0N%2FCa1k5tezoAwzdXJzwY6pgFxgBxEOib6SrejRKbL%2BP4qxQCzoaqkKF0FBpn2OiGS1sABta5qQB2hEFn%2B4r2HumAM2XOgKtkdc313Xo4GQbGSP9ALKjUD%2BtHCSstT0Y1KxFtI8hLW8dRXBwZNO49l0eNBdgpvaAS3nWHTziVswrDKeHy6ctTLi8T31diJknp14TxAUZBl%2BxgesjMz4yEhf1Nk2DOtY4cwuQD7OLfnFh71oXAB5urX&X-Amz-Signature=55c28a3c70d451015ca48c8f5b1b4cbd7552d8b114cf5426538a72e5c4f4a00f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663W5SGPU7%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCPBZulU2ydEJDxXVyZ93mMv0PzDZ58e5QZzdxdcW3z%2FwIga0HLJCj2JOQciMpGdfoZI53j8zgqtqLTBfKniZ6%2BZ7QqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF9Rk0mXcYiYyVM%2F8CrcAzPiDhDnbKViTJxPuoBrJgJ4Fo9B9mrSnVXYkt2NJVojy%2Fgx9kZlcBlja6A%2FQ5dZnhMhlNr324QmvALI4xie4305ycUjPnwm4Oqbj5fwMs%2FrvtkcF6ygmrUNIuA4a8zJ8%2BWYiDS%2FIQkfZfbpsSSYuCt%2FVBE3QJJGEQgkjCfOU0O%2Bc4zggS9d6sytPSvoFZ3px9tqF%2FfejpaUCeG2pjf1A1qrVWu05fKPWL150Ii7X93BYjA%2BXrCjl6lGoIwvUzgD7HrcF%2FASS4TPQgWp5rtGkFNpJddDe%2BMYGSF7Et2fIRENxv3BwUwqmVM0YczQatST9vZEJVQc91l%2FrTPafWqdJ6pxDQP1KlS7ICBbBqGzzlWIIJQzyZvuTqyu144rpsZhRGI%2FXhPAPeDarWjQY39nLSzdqWNrEJZZvsefn1%2F6VZtlChZcdeaXLbMdWEkWcqoLMd2eKNNo%2Fg6yRgaZN5dqTu6%2F4SMstbs3N1HGShuczaYUodD7OTOxEeC%2B%2F%2FB4v9HiWDzNiJxbDYee5Pcm7%2BSj9uI8XBYpXkTCRb9l5rsuHnAQmziUcRcShYQyQA7xiGrvJQSbmgtLoxXnlM9eSl%2Bz3tkQUyuDNvaiz7S4LjiCcuxYiOx54pYANErg69EEMIrUyc8GOqUBuyaWuUGjp0LiVs0peft1TvFeyocMJHvVYXUo5qTN5Wx6fDS9Tjdjpc%2F741ngiAn%2B035cgQR7X9hVb5VT%2BMgePBf5V7dxj4xPApyP8Wt%2ByB7ltXf%2BMVBTjoDqcSGmQGNuA2sEbJPNiDjSAWm%2BrdiwqU%2Fc9l9Fi6ihyZ7bjlPbEor0jVuqIna4ZgaGfo6JiVnhhfZ6NIWIN4a3Q%2B%2Bn8LUXBkKq8Tq9&X-Amz-Signature=9409b3c13dabae8eb6776b4d19a301b3bc4f3903bacacc4e5376fcb353643ca2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664VXWJX5%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIEoqPfxpZ44mkh%2FfF4CyLYOpOStRWKBAAVBHIcLpZfLYAiEA1wrdQdhup7kgVe9bYMryAEzN3lvW0ZAN7ShJtVtsGckqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHLqNibHuHXnwj4jJyrcA5%2FQberfJHzK%2F3b5ZHCOK3%2FL%2BDcQNBmordbGxr0PbrNYzEIUJCtH4eBc5kkEPpRlBzwpwefNDy%2FXKdUM519%2FuxVJsZK%2FNsBFDOZ4RqMzVg7IKA%2Fc%2BITJgractwYRCsKhh5mMLDt86XBDH1B4u7xkp2shpSU0QQkYv0Tc2n%2FwnmTfc1VnVtK9Pd7oERPz4uHLWrJdWHiq7L5loYhfx8he1%2FUMmgsjGmnMrHGZpwS5khA9QQEoDzu4U9md4VK5CC4N1hji9u%2FwWEeQ5Te9ENuAq0TOlIhGBO5mbgKyIcQ3RAJ4oNF3x3rsf5LkQDyKd7lAGVpp4d%2FK3U%2BAHF%2FWXtiKxsdK9rSHtkRESzoV21k50ESbqioEeaI0uiGrlX8b8ynoVhbWITiNJqEIuUxWX59UxMR3MZXSiamVSS5aS4Mhff%2F2wsxS134xElCtTEvF7RvVnvv3%2BwCx3iBonuDbSihMdSDSmsfpcCIgwMA9wWLBBueGgq%2FTgKwch5iZzncB1Q3tpDThs%2BhLRDVB6coYrUiY6J1doQ87%2BS7kQO%2FD224mWJ8075bw2o2OHebl4P73Uyzh0UIgb3aq1%2FqFIMB6kV6tmDjkHvcpw0qNkZQSup8AOMXifQRfcdK8RJkUoS54MKXVyc8GOqUBWrNL76bLypRUIwQ3WpMFc%2FnW9UR2a7%2FCEfO45Jy1SXCxB9p%2BZBxuiFFWz8yE%2BT0%2BJmb0S7YEVlcPCvmFkuFTdK5tpyQZY8m5D1GKwIRspZmpbD8JH1IevQ9X2S83aQs0%2Br5CWki1f0BovXTxvEQf6g%2FmmjfAbIPOYeQJq6wGteea6aq3cuKR%2BE3hRJm4xONOqkfOpk3wcIXdD8Kjb0QlelbJTWpz&X-Amz-Signature=21a01c1bf55d0edc15fedd7b7477d64470bbf2d07cc2cef8aa103a4aac1179ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664VXWJX5%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIEoqPfxpZ44mkh%2FfF4CyLYOpOStRWKBAAVBHIcLpZfLYAiEA1wrdQdhup7kgVe9bYMryAEzN3lvW0ZAN7ShJtVtsGckqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHLqNibHuHXnwj4jJyrcA5%2FQberfJHzK%2F3b5ZHCOK3%2FL%2BDcQNBmordbGxr0PbrNYzEIUJCtH4eBc5kkEPpRlBzwpwefNDy%2FXKdUM519%2FuxVJsZK%2FNsBFDOZ4RqMzVg7IKA%2Fc%2BITJgractwYRCsKhh5mMLDt86XBDH1B4u7xkp2shpSU0QQkYv0Tc2n%2FwnmTfc1VnVtK9Pd7oERPz4uHLWrJdWHiq7L5loYhfx8he1%2FUMmgsjGmnMrHGZpwS5khA9QQEoDzu4U9md4VK5CC4N1hji9u%2FwWEeQ5Te9ENuAq0TOlIhGBO5mbgKyIcQ3RAJ4oNF3x3rsf5LkQDyKd7lAGVpp4d%2FK3U%2BAHF%2FWXtiKxsdK9rSHtkRESzoV21k50ESbqioEeaI0uiGrlX8b8ynoVhbWITiNJqEIuUxWX59UxMR3MZXSiamVSS5aS4Mhff%2F2wsxS134xElCtTEvF7RvVnvv3%2BwCx3iBonuDbSihMdSDSmsfpcCIgwMA9wWLBBueGgq%2FTgKwch5iZzncB1Q3tpDThs%2BhLRDVB6coYrUiY6J1doQ87%2BS7kQO%2FD224mWJ8075bw2o2OHebl4P73Uyzh0UIgb3aq1%2FqFIMB6kV6tmDjkHvcpw0qNkZQSup8AOMXifQRfcdK8RJkUoS54MKXVyc8GOqUBWrNL76bLypRUIwQ3WpMFc%2FnW9UR2a7%2FCEfO45Jy1SXCxB9p%2BZBxuiFFWz8yE%2BT0%2BJmb0S7YEVlcPCvmFkuFTdK5tpyQZY8m5D1GKwIRspZmpbD8JH1IevQ9X2S83aQs0%2Br5CWki1f0BovXTxvEQf6g%2FmmjfAbIPOYeQJq6wGteea6aq3cuKR%2BE3hRJm4xONOqkfOpk3wcIXdD8Kjb0QlelbJTWpz&X-Amz-Signature=21a01c1bf55d0edc15fedd7b7477d64470bbf2d07cc2cef8aa103a4aac1179ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4QQ3YOL%2F20260429%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260429T214714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQCbXNASIYgT545UaiX7MmW%2BFQmf0fe4wqAL%2BjEFWTLzngIhAMI%2F5%2F8Afl8Hf%2BDlOh0vYxWxnkdqHvjXA9OkHsWFKjukKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2FF9v%2FUu4sBxhwSp4q3ANtwJupoX5Tqd23x8gcRVl3pWmr2QxRgU0YJhHCfM5nUkJzJeN9hrIetdZLhGCcD9onMZUyGYAmOTGQ9D66VPJkDgb%2FQWx6Njk6cdHfK4B2d5Zeq3MlCyg4E%2BxlOnrUJpNKgGwZeblaJOnx%2BxkFstMsQmLKMSQ8lsqmTK2VzMuTouI6c8%2BiTm2RMLsZP5TFJE7ua8n3JYyQ%2Bmc4x89Hen2Y80tUHLTTbHcfn8%2Fih533VzKLpC451J9vpEjbp6rPHyr8qaMRJRCA879G%2Ffzmok0uTDfnyt419oBx1%2BAm2PFR8Ben42sAyYxpsHN26bC1yLYP6AQr2LqsTmxj0Fvy5v84BvmjHR66won72k%2FKGRNpm7RBUXjQcV%2F5i060u7DHXTs0PiM4agcXrCPmxOIsJilrFZLcs7%2BH1cUFWDMPXHCNgL%2BZsjQzn5VgBKRwtPCQr9qbud7fYd%2Fq0KnL52e8xMVj3H3mULyv5F2qGCzOKzwNDmvSTyWTcd5WFXcwg9%2FiRibLQUeT88QlFX3d27yGwqgzqoQrkFZ8uOVXizEpYMNOmB7p10xGkT05Lva3DGI6UMqPAcDyjagPKT%2BFCbYstlQ38Lo4k91G7RUxmcfKIwy%2BwcY3yUD%2F%2B0%2BvKNWlHjDa08nPBjqkAWhexvX7OTCX0Si3OoGin8h5Vm7jxJ0RcHmSSydu25UL5xI%2B3gBEW5KV%2FK75yULBh0QVHrH6OzMyClNPAkQIGmH0SYy54ROJvFcV99tksrjPnvPo5ONURcap310334kWkoz9%2BgWOVN0qAFjLfKQPnBOrb%2BF4ZAGwEJ8MSa%2F0jZW6JrpEJqtFjH9hnXF01fJ%2FlkBcvfn28aJYl4bA%2FSNL5kgyzSoY&X-Amz-Signature=9eef8da8a1f163aa6a649b8e6a6dc5c53eaae3ce542080ba497ad0814073ac20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

