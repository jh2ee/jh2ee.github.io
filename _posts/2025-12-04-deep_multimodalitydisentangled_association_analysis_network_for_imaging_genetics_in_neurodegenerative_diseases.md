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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNQ24B4B%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQD33X10A36tUv0eYi%2F34ILV7WRBJ6GbPTsxbLrXWul5ZwIhAL7btC3wfMrwle%2FTCd6ku7WfHTnM4ratZKIotPebbjrQKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtyGAa1ph5cqlkpIcq3APafMAy1%2Fq9BhZmPy%2FTfga3LGkz8XV2dxBi916ND1EUdupz8cANvVRwbQumqZ0czQvFopi3LOEfLAFei%2BOTrTx8iTfpC0YQ8zv%2BVASXcJr53dy1Q2V3QhO3M73CLHGjUYC6UcYQ8N7loOevT9DAX1d499O0%2FVaeW8q8ZD49vq7jx5qXDfGVA76zRxcAdME8KJ2E7ymWdWpu%2BclGwZeWzhbEZomhw871rx5DOtfWTMW1gtq7s3RRRyfajguhczQp48A%2FdIk8lfwkZ4OYkevJnrQOG%2FCRRSWICNY1%2BejQc8NEeO0%2FwjO1BgiJ6o7%2BnC%2FMQOBaCZCEBMKEXkOC%2BruNgG7va%2FdMQYLBGIfgVqFAGMXvyBPpsjZjSZ6YdsiXSfonjK22jFlA5odbUmlS3fxujwCcrsav5HvQhPymfUsKpTMcroHUvIAIRbjknRI9VtU39wfbnqk5X8VB7iJIoeczpn2VBV83y8SeupQpIQjEFLBzHpAbh95knmwrdUJkMtOCAOgsD3xBTDT2wTLmJzW2offc7DLzwU%2Fq4QN%2B2VEqGtqSmARhplzfUIbdcVrnFbA88EiZ3mG6XkDnMQ2Msnx8h7vY6XFGO9M75mPV0u64iz%2FdWj3nToJocw9RgK%2FL%2BjDMlJrOBjqkAZdF4JSvacvLQNxItIhSielEQtqszHI5684HhW1uoFV3Q83aZimkR0ENUNfGvaHb1MfKkpfYC%2FgkBkm0VWJyRQlxxtPXqorD0Msa8mpb%2Fasa2bvOQLyy9azDOCGlaAHwrHdEsC6f4Si9Te%2BMgZqoCETltWVeDLUMAw6cCrkwdYqlS3cb8UoYBZ2nH6xGmWVJDGTyQJymWofzbXLbioCmJX5L0V1M&X-Amz-Signature=3e041ae01021a9ba3b4b5ed41dd9edb09c471ef46e7e8cae3ce011fc5c3b111b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNQ24B4B%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQD33X10A36tUv0eYi%2F34ILV7WRBJ6GbPTsxbLrXWul5ZwIhAL7btC3wfMrwle%2FTCd6ku7WfHTnM4ratZKIotPebbjrQKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtyGAa1ph5cqlkpIcq3APafMAy1%2Fq9BhZmPy%2FTfga3LGkz8XV2dxBi916ND1EUdupz8cANvVRwbQumqZ0czQvFopi3LOEfLAFei%2BOTrTx8iTfpC0YQ8zv%2BVASXcJr53dy1Q2V3QhO3M73CLHGjUYC6UcYQ8N7loOevT9DAX1d499O0%2FVaeW8q8ZD49vq7jx5qXDfGVA76zRxcAdME8KJ2E7ymWdWpu%2BclGwZeWzhbEZomhw871rx5DOtfWTMW1gtq7s3RRRyfajguhczQp48A%2FdIk8lfwkZ4OYkevJnrQOG%2FCRRSWICNY1%2BejQc8NEeO0%2FwjO1BgiJ6o7%2BnC%2FMQOBaCZCEBMKEXkOC%2BruNgG7va%2FdMQYLBGIfgVqFAGMXvyBPpsjZjSZ6YdsiXSfonjK22jFlA5odbUmlS3fxujwCcrsav5HvQhPymfUsKpTMcroHUvIAIRbjknRI9VtU39wfbnqk5X8VB7iJIoeczpn2VBV83y8SeupQpIQjEFLBzHpAbh95knmwrdUJkMtOCAOgsD3xBTDT2wTLmJzW2offc7DLzwU%2Fq4QN%2B2VEqGtqSmARhplzfUIbdcVrnFbA88EiZ3mG6XkDnMQ2Msnx8h7vY6XFGO9M75mPV0u64iz%2FdWj3nToJocw9RgK%2FL%2BjDMlJrOBjqkAZdF4JSvacvLQNxItIhSielEQtqszHI5684HhW1uoFV3Q83aZimkR0ENUNfGvaHb1MfKkpfYC%2FgkBkm0VWJyRQlxxtPXqorD0Msa8mpb%2Fasa2bvOQLyy9azDOCGlaAHwrHdEsC6f4Si9Te%2BMgZqoCETltWVeDLUMAw6cCrkwdYqlS3cb8UoYBZ2nH6xGmWVJDGTyQJymWofzbXLbioCmJX5L0V1M&X-Amz-Signature=3e041ae01021a9ba3b4b5ed41dd9edb09c471ef46e7e8cae3ce011fc5c3b111b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VK6XOWS3%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQCYp2Sy5C0AcvCQVAjKwLVEYBlIp%2FtLcFztBhh2nhK5AgIgLxixAqW3imuBNd624egdFakYBpUlDptJSY4sSyeiUVQqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKNt5nQqQ2YtkfstXSrcA2jgMUuiygkZDM8R3O%2FdMDwuwAMTrY6jnEOBHx%2FZDRu4YFUpDU%2FtreqgWkZIhifVFvYEELiR10Rit9Xbfi2ViG2FAn145FeV5GI6PPoTgHwaM7BIFAZxy7X%2B3AmGjj3dvgJYTd%2FZ6%2Fd202MKd3A7c2906gHeaO7QnVJeTw5%2F9%2BpifFhbjvpYfnJVSg2JYgrMHIWK%2Bs78mlyDtTss0BqaCFThQ%2B6EHg%2B8h7sRgrqynIRI5vyut1rw87bsl4UY3hIVqdPHb5vxtzVBZTQAgIpTVnSuB8hDo8zCRdx2TiyFzZ7vpa5wnTy3c0W1463w2AZWfIHAwmpnAysB9j5P5ZEK%2FRQw4k0KV8dbbTgJ3WiTIp4ySe7lSU1p%2FjIZnBDQY9B3n22p4K5xeZ8DtOvjEWJANi7LiuNg4X4jv5ohxD6UGRUzdZABdUPKnuhZrVrnJpSiAOmuu9c8W6RgwvfQpN%2FrAVcvzRdESKSNvqtivOyFVD5IozG1QP4zrHvthlAog7sDSHS1NDR77HyxFbCTtO7Val53HGUGFobVq9BRBGHMlDB0brkZHbMJhhR16arPG%2FwjkxebPqX0KS9Xhq0qk0Y5fIpIrjaHdzhNBCqdpVh3yochFbwCALi6pymfzOjMMP%2BUms4GOqUBZpf3%2FdRWlPAEbWqEr5s%2Bw%2FlHwoq6bEyMlbsu2%2FwoxHOEFSuYpTv1A5IsZlPdGiK0J0bWAY%2FSojTRGjS2KcBbUVOvOvJK53TltpJcpfgugIwPavnvXIgAMF2AOW8xoqQFNhONjunAvKmwRchhOoXtKG1kbLVROeXJxViUsUd6mZFLz9kVjzycgp2VThYZl3rOdoIhihHpPiNMyED4xLUfJeRfsym%2B&X-Amz-Signature=f2f1dd9ef17e0e73bddc0e2fe81bfca3083af64bf7cb30eb84516463489c84fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXGLY675%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIDnwlN%2BY1hCZc1GDMXzGaWRK4jnCiwW%2FgUDJ%2F%2BJ9xZodAiEA%2F6uwIsNaEr%2BcqSXP%2BHLWBrE9DzU%2FLKkA%2BXzxEhLXVNYqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMEWVftnUZmQU25wwircA2g1ugnP2apSUNil%2FbplqodfQz434WtT1AXo7zkdlLKC57T4P14YtN1nNNIdrPmZBV0tYrbHFRTUIfJruKujM%2FFnhsjCHbLwmGiGTty%2Bw3DaGJVWtlTdsvxU24qyendik4N6xc5rVWKZLKjVIHr8UmoRRNnHXkQDTErY1RRgP%2FU9r4rLHczsEIbV9VcZwMBCmiBJd%2FVpNiXJjrVYOY53OJ46MegVhoe2IdqSi1xU2MF7L57px5fM7z%2BK02VadVS5baRAkrxp8mnHBZBrOVrwjgY4t1EXfTXA7RXNps9ndlxSj8n7T7SNAndS34lPn2ObGWCrsE%2F41DAoEnyccnRt7yRnMBmMDh%2BxFQ%2FaSQsZWrW7vMg7JklG7Ik%2FpcFty6rik0bZUxeLlRuJ%2Fznv4BZwR7gn3ulagNoMKrOrn2B5YCVhHYjBi6WzCGB%2B1OhhlEGcz1yeIoBWlTWrYJpSe44so8R%2FDSHLD06SWKjew%2B1fLswgfwhAdzNVsbYJJxEMHmq7CV9%2BlRZDfo2dN0OxyqMZeGqqc%2BrR2Ry6paqReLLmlEqGDE%2BNtjuKdzAah7By0b3%2Byi4BwN7iKO8zhQrFpr4ZWN9czXhgPjQNa%2BbTQLxiusx17dLgmTgNn4NCESEAMM6Tms4GOqUBW88TXXGNDOtJyFhFHtL6eh%2FmAk3k3boQI4%2FOLgn0%2BRen2hrUTdOfjYre%2BqV3G8e9wUhEBA8fzrsXE%2FZTwwfXL1B91wotKySmti3E80Wi2ioaCr2lfPLZglQCEf4f9%2FCCVWEkHENucuFHgZkfp4gw7D1VaYNC7MIOiwvD4tAxqrr08kNc5%2B0n4zO35u3UoksmiFwC0q0d2viBdRKondJUZHFa0%2BuI&X-Amz-Signature=53acd733adc0fa07fc34170ef1b2cea907d97645956aaf1f5e7040d1ac01e3d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXGLY675%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIDnwlN%2BY1hCZc1GDMXzGaWRK4jnCiwW%2FgUDJ%2F%2BJ9xZodAiEA%2F6uwIsNaEr%2BcqSXP%2BHLWBrE9DzU%2FLKkA%2BXzxEhLXVNYqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMEWVftnUZmQU25wwircA2g1ugnP2apSUNil%2FbplqodfQz434WtT1AXo7zkdlLKC57T4P14YtN1nNNIdrPmZBV0tYrbHFRTUIfJruKujM%2FFnhsjCHbLwmGiGTty%2Bw3DaGJVWtlTdsvxU24qyendik4N6xc5rVWKZLKjVIHr8UmoRRNnHXkQDTErY1RRgP%2FU9r4rLHczsEIbV9VcZwMBCmiBJd%2FVpNiXJjrVYOY53OJ46MegVhoe2IdqSi1xU2MF7L57px5fM7z%2BK02VadVS5baRAkrxp8mnHBZBrOVrwjgY4t1EXfTXA7RXNps9ndlxSj8n7T7SNAndS34lPn2ObGWCrsE%2F41DAoEnyccnRt7yRnMBmMDh%2BxFQ%2FaSQsZWrW7vMg7JklG7Ik%2FpcFty6rik0bZUxeLlRuJ%2Fznv4BZwR7gn3ulagNoMKrOrn2B5YCVhHYjBi6WzCGB%2B1OhhlEGcz1yeIoBWlTWrYJpSe44so8R%2FDSHLD06SWKjew%2B1fLswgfwhAdzNVsbYJJxEMHmq7CV9%2BlRZDfo2dN0OxyqMZeGqqc%2BrR2Ry6paqReLLmlEqGDE%2BNtjuKdzAah7By0b3%2Byi4BwN7iKO8zhQrFpr4ZWN9czXhgPjQNa%2BbTQLxiusx17dLgmTgNn4NCESEAMM6Tms4GOqUBW88TXXGNDOtJyFhFHtL6eh%2FmAk3k3boQI4%2FOLgn0%2BRen2hrUTdOfjYre%2BqV3G8e9wUhEBA8fzrsXE%2FZTwwfXL1B91wotKySmti3E80Wi2ioaCr2lfPLZglQCEf4f9%2FCCVWEkHENucuFHgZkfp4gw7D1VaYNC7MIOiwvD4tAxqrr08kNc5%2B0n4zO35u3UoksmiFwC0q0d2viBdRKondJUZHFa0%2BuI&X-Amz-Signature=e7ace81a5dc5f3f3e0e4fb0707b714929d769188dda81b3eb7cadd4f20363979&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664UQJ22S%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJIMEYCIQCCWVkSa3OOvVaOS1gsFKxv1SGPlcgz7mjKPudfgtZ7qgIhAIEpo9Fw3ARu9yGFU7ywcPO2bipY%2FbVk1ufOn69IOSJoKogECN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwqq7P75Zz6JvjuUaQq3APt5LEahTGuxB7uCkggkKVozGzJgaGAJLSz5Dg2VVktE25LDHnGZ598fqm3nZH9ku4XDwozJ8zXIGzsq1HR2L5FBKx2DxKh4Nua%2B%2ByfaJJC%2FlgJestDc5v4PxmO8ddtWrrI16ck7rQWTKSZKlfyIWdUWpFrJq0wt%2BTUjEZ7KQC6Y%2FnuU8KkimyeECkp0UtFM%2BzoC5rHolry93g5KvHuJ%2FqF6HXEGf%2B65x95Ce9SD4%2B%2FuRIo0ykKfnpt9sUSBgD1BqzXS9r9rDK5Ifwr7OYANt9wu%2FD4jeYjeoJ7SVdIFviTUgDbD5UJswCFKG7a6t99ncjP7a6BQSVoaP2s0DNBP4q4hzIiK1gbncktk13HCbNgccmNWI82Q%2BdVJCNF6D%2FdRAcRH0Y9XWS82DhdMD2LSlk0I%2BSYdsPdg4OIJq6GzPCI5Egk%2FFsAZEFtSoBVxrIZdZpMWxk8xViRJKYu4ka1Y4AVdD36IYvtFlMRcvPvhwkaK187v9Rgt%2Bc1peJ79LNPvCudNFbVwXBrxrHKFXZs%2B0ds7A01YsmCXh2NKO%2FXTJimHFxLxLHB5wCwapoJcpz1klsA8IQOjLTarAPDifQC61aw1oPYsoec94I4Dchi9gheNw%2Ffulkeyj%2FY%2F9%2FBUDCDlZrOBjqkAaUX8alPA7DmRLJI2posHZCSv7GiL2LehDmq%2Ba4yCHZ2DB7iYJ95L%2FpdFnew17UKZe7k6YwZT0D83yTDoFEktPEfvqx8vE4pgMQaLh0na4pG%2Bid3kMgK3ujDr016%2BKLpXmceJ4TkWGUydvmQeLYwja49vQUUvjKGFgksjrRWRR7JLu0OsbIYwls27zQ9sTF9Ezgp3zKyxZiW6cA1qStd5g92umk0&X-Amz-Signature=9ce605f238135f16a27ecbe51a05f47c09b54ee8c91a6b0463958f4cca62c09a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWSR5IMA%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIGMXi2Fvc12t7%2FbjX3yv4p1de6DM%2Bag4royZHamWOGX5AiEAznVUmQ8cCxVDYZM%2BjsifeDm0s%2FpTj1rIpOht2ATlTd0qiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM5Gm%2B5AydPckh0sqyrcA%2B6o8wvASkuHaDZoqxsIqFrz77zBd%2BPNyx7lGEO5%2FeU9oWrY%2FJ8Y%2BRMOpxcrz%2Fn38dZ688HUk%2ByTjhWlC0VcKjXBGipkVFLTlkdZsvjCe%2FXWO5z0XOr5ysE4otbYtMDkuBcSd3I5mvpKr%2Bcbclt8l4DCf5Q3BHP6W5jyf%2BFFcxYx9KNFG7Igh78DskUfM7NUetFR%2F3uJEDQwLZMmqn1nfsO5nT0q85lh6t4gEaFcDezuatGERyJjeYIry2FXDd7NPvRb95p2OygYJZkv5Q4rHmFXAPmNpsXcc%2Bi7FJ1hOVtAASp9672GRfAntb%2FqLGHNIdB00vxO4s198Zy%2F9GaYtkD2J9NtUEoXDimHGqTANa9QqDnYIrRPEvcxeyvtaXBbOvg9FzJsDYwKc%2FMpEiwofuzBqeSRz%2FR6sajVsJWYu2gPkD%2BiQpaPum6TAaVJvsS3MCkmGCm%2BOBoUaAwLwws5L4Br4YTqD06kYJK%2FePQl3Dd6fs%2BnFV5lhLBzd6xKMzyyzHGBmrJG3UV7CkGnzwqsYUwytKvLsvv%2Bdbvc7OFCj%2FQWMeSnXHEfXRwL7XoElWh1GAMrs%2FIwl9neKwQQ7RqdNk38bzCQDVpGJGke411Hb9lqY26ChCb%2Bg7KpdiD1MJCUms4GOqUBmxeF3%2BvFodB0aM6Gbq1rokwmwh8Ww0d%2BCGry99oMKX4DqbwIqK1JRcwuM2j3vFjFj6SCnqu%2F0rE8oCKA39lNYyDKha0MuhLnvwqM5U%2Fk%2FnIWGje2JIvn1v6knSNresxcGV4nqAS9%2FN3YZxv%2FF%2FCiVyjd1pPg%2FkOhp%2FDS6%2BchVWghTad3OOXFTngoUW9sqtmWuMqfgh9m6fmVjuJJ7%2Foc4wPuQLZv&X-Amz-Signature=cf08041a6b6c36745e51917a87d71cba51f2ecacffc960002203052f25ad2f12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665J4GUD3I%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIC6px%2FRLH79Kfve3%2F0ewD8EAUSarG%2BW0x8YOMMe5rgJ7AiAF74IkKfOojVkebm9ULncJNuuAEHfGeZlV%2BeiW%2BXQk1iqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMT191q3NXvw%2B%2B%2Bjs8KtwDE6jyjkhv0QRGQmDEZ66HetU8PgY%2FxCGjcDBP4xYSdGA7%2BBt8k%2BOXKckF5MbUhVnAo8olXEEMIMgmKw9AABvTi4wy9ycAnpskI4%2FTuEsU564aN9Kb6fq4z0C3UsvPSsfT0IM%2BTYGTIp8SzwmO%2Bhvt7Y2w9K3v8fe6BmmskcsLHMPKOItJMJGR7%2FG6BdBf90cgkP%2F5O5K3TCrkGYQDfiBAWKP9XjgdT5IZ4dheEBmhhtEdIFlg5dtwuCn87Kx9BIvf0v%2FkW%2BDWiRHXrvdJUnVimlFEnHAImnKEEFCieq2%2BwGGEqKlvbTRQuOIBJzQobyPSzKnvX%2BrHPWlUrrGcMxP6f0SpZ03wdvchAqgCZ0VmzonOt3%2B1biVVE5RHb%2BcvtEYwdBxSF3l5MBhrnF3W%2FC85NVaaUOo3Q3puUGEMqM38X74YziwuodUJ0NNJNSKJ9rTV2GnzjXOoOMxhPv5Nuas5MLPbqXbIiz2jnU%2FbdxztWDVW4u23AAxar0rA1slWsc2dEenvxVb0L5dqN3kLlmuKv7XjURKw77eOkkIi2PpVzvMoDku0GQTjXSMxw6kLtnQYyEuZEzGbkboBQzsG39HkJ6egNYJI6lzzyqQL8s3HALNKrZoMJfrXcxcpGg8wopOazgY6pgEz4aLfA8rA1K%2BkUXTiQPQlmTcZoM7%2FAfzgMTU3%2FqFHctO7Cj3%2B6iq92pIwF6DHIy%2FVTMmhtn3pKamcnhx5ay147tgnEabAdfF6Ixkh3XjhV2aFZqDurr88C5wFmuCLqBg1sRsGFJEBFfOIBHQ8EbY67ksPk%2Bg2DpvL7y7sJ0SQpWWUX5LijVTW5wL0JtF%2Bkx63l1siJLLoDffDsd6X1dNUyGnvOqOV&X-Amz-Signature=83424ce810bd7ad02a1a8b01fce3e17bdd4de459799b201a6553a52167e4aa5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WTK4JWX%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIDUc0OUNUPLeao%2F3bQK9hlG8ZmBzahPMiyh4D5EbhoAvAiAxQMPFsNS%2FiVfnDQ%2BAAVI9UYu8n9CeNkv4nZWgeC4EWyqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJDYMmivrS1ui%2BWF6KtwDODjWebvjYO0tTXZMIL1%2B%2Fgk0%2BJy%2BXEVXTVRCWQzZqS9YweSgLjuTwdn2juWEEmxcsFUesTMJGKczaS2gL7VVg5FNjYNlbXOB3fRZ%2BWJS36iCAdrnCV%2FT6qsW%2FbhvoQcPwp6sMAfOuwNWyJUKxqE0%2FyB9E51EH7TU2ZXv5r5U7ttYrmwbrKMOTGAglBk7LwxgXLzlEUA9hF7KdwJwOGoYbuAur45Y7V2hfYVYeIYY5WKUG%2Bdx%2BUrm9yplQ%2FfCUHn8pUkrSae2bUNe6vvxzG5%2FjKk02CHVgDcFFLaAYPM%2Fa%2FY0lOa1mE2gmnfgHkfLRHYW31rjB8B3Tj7JyeMfcscWwlDvYNxRDw%2FzC%2FtjF7uJY1FaflESRZn6bSA2SCPtCzNjuSFml3bvS5maxZ5vMxvtoOZPH1%2F%2FvC8U6hS6oY9Kd4ubdJFhkycBiayDdSE6pfc%2FMQ8rgHGd%2B6Mdgpm29wRHYZ0aH%2B0OU%2FySgisw9kKrlPEfLsZ8F0ID7BdoZVXq4ue5fbm5smr8G3V78%2FPzjavP0ihH5P6DS%2FU0vQ0K716n55vT%2FkmUMKsjeNH9mHLDzSS8Jz%2B0%2Fuw5PcoM1KSq5JFv1YX9WhSbroY7TwYLEBOcHJPfqp5Px6T5Skosj2ww2pSazgY6pgHoHx05iPYzPXXAC5VHXz8IvEg9sdx3TpS1hGWt0IIl%2FQ3koaHsp16KtzMLRWch72uyF%2FU8WkPjiLeFyd%2FS9SmXCu1mhCWKbkCmOAs4zHeAFxvK3fPL5Tt16OxEyixQAjtT%2B2GkN%2F9HiEpLG9OLQrNCc9uvUfY3Rh20ThyhMDA8gq05d7DbC2Q7zUzZszBb3S7c01tv6kNUSGCezPUt4MrTaWA9ywxb&X-Amz-Signature=b695f0ffa761ed687699f74910a30a244111266fa4cfc545790e1434f9753b6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WTK4JWX%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIDUc0OUNUPLeao%2F3bQK9hlG8ZmBzahPMiyh4D5EbhoAvAiAxQMPFsNS%2FiVfnDQ%2BAAVI9UYu8n9CeNkv4nZWgeC4EWyqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJDYMmivrS1ui%2BWF6KtwDODjWebvjYO0tTXZMIL1%2B%2Fgk0%2BJy%2BXEVXTVRCWQzZqS9YweSgLjuTwdn2juWEEmxcsFUesTMJGKczaS2gL7VVg5FNjYNlbXOB3fRZ%2BWJS36iCAdrnCV%2FT6qsW%2FbhvoQcPwp6sMAfOuwNWyJUKxqE0%2FyB9E51EH7TU2ZXv5r5U7ttYrmwbrKMOTGAglBk7LwxgXLzlEUA9hF7KdwJwOGoYbuAur45Y7V2hfYVYeIYY5WKUG%2Bdx%2BUrm9yplQ%2FfCUHn8pUkrSae2bUNe6vvxzG5%2FjKk02CHVgDcFFLaAYPM%2Fa%2FY0lOa1mE2gmnfgHkfLRHYW31rjB8B3Tj7JyeMfcscWwlDvYNxRDw%2FzC%2FtjF7uJY1FaflESRZn6bSA2SCPtCzNjuSFml3bvS5maxZ5vMxvtoOZPH1%2F%2FvC8U6hS6oY9Kd4ubdJFhkycBiayDdSE6pfc%2FMQ8rgHGd%2B6Mdgpm29wRHYZ0aH%2B0OU%2FySgisw9kKrlPEfLsZ8F0ID7BdoZVXq4ue5fbm5smr8G3V78%2FPzjavP0ihH5P6DS%2FU0vQ0K716n55vT%2FkmUMKsjeNH9mHLDzSS8Jz%2B0%2Fuw5PcoM1KSq5JFv1YX9WhSbroY7TwYLEBOcHJPfqp5Px6T5Skosj2ww2pSazgY6pgHoHx05iPYzPXXAC5VHXz8IvEg9sdx3TpS1hGWt0IIl%2FQ3koaHsp16KtzMLRWch72uyF%2FU8WkPjiLeFyd%2FS9SmXCu1mhCWKbkCmOAs4zHeAFxvK3fPL5Tt16OxEyixQAjtT%2B2GkN%2F9HiEpLG9OLQrNCc9uvUfY3Rh20ThyhMDA8gq05d7DbC2Q7zUzZszBb3S7c01tv6kNUSGCezPUt4MrTaWA9ywxb&X-Amz-Signature=e6b9259c6434c63f1ccae9b4ca661b6633da6238839b979c96a6a6c921810e14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVMIQMAD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQCeulA0r57b6ivFYdBChfpAqJ8T7RMXXoUqTuQTnPsOKwIgY%2B3H1QRGDOL7hDznPV9eULBeUASIDGodwByhCv56dEAqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMivDFMIKyux03ubayrcAxQUzfwVQesyLm7tdOOeS3CsJUKi7z1ISnwox6W3gJBvj%2BkvzpFR%2BgRYB371J1TR6OFjpUT6L10mzhTvdr68NiAf3t1B5wClw2jEj%2FOcMOgSr4yBw%2Fhbsrp8aLvYDAOdQeFZ3k%2FpxDt31%2BpJVM%2FHFF%2BrVCm51fl3RpVZOG8cS9bJdcEZjop8y8PWZ0m6Ao9G2ZQuiQFLZH%2BUNlZNen4E%2FRWGHMInN6hTWLEovcwP08niT8mAalIghWW74Ypyro%2FBMdqAUWHoYNsf52aQVSLxn3aCzjWM%2BNNoFaAvGZwB8EjNwnyupogSwiSS5TVGIzKyhmHCph4Q3irMnz2dSwwaI2J%2FLP%2Fyeg8GHM2ED%2FuBCRd%2B7ZmZ1dfPjpQD5MmKnS0wrImfOCCrF74dE0zTFp8y7IuQuUmH7Xnr8BKtsFOAjJKvaPE9Js9jeib9RD%2BTBoV%2F0DWM0hEr0fcYhnAoPXO4wpWNSgk9V9ypUDKGDgymbrOjlj%2FZ5FMV15DluB8mlErykeKbP%2FFVJMjaC0WOWQDhFKWqMcweVxT0%2FCVjS03uYve3FVA7xzRMbJ%2FdMnswfxmT6CwQIkxEb03GXt%2BQ%2FtxWuo0aCcR2QJIfwkiXZfLzUfY2nbxDV1OrmyRgQCQZMIqUms4GOqUBbSU9j9agilL8WOSaFx9S%2FxqR9aiKdOxjZYgGISikWiix%2FfLMS4V1me8teAFSj%2FAESPODqXe3Pl0qGqBGGzNSv%2BqQJv3HWkhvchnmP610lKB4%2FYxPKU0eMhGeHcNeioQjisXv8eUQQJCOFJkZtx3l4%2FkQt1JbUMdZ%2B3olVdBBuufP597wB%2Bz3Fx6nJPgYo7Xm3VAM74HNGij2sLU1CFbiH8i92oBd&X-Amz-Signature=c8347d412df382755d1eca4e193e7c330bfe19e8c59ed3ee374e4e6bef65ba78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3GNPOHG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIChNBYhP9olEwyLM7yMSu8qRP5AjB7krDfsNFzsdRNJ7AiEAtCL9C4VjJXXt5MObz5YWJeFDBx9A6OWc8wi2u38pLAQqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFeto7c%2F44nSyT2lwyrcA2MpPGzQ3RwcyO0gYZX%2FSETzCkfeckH5xDzq%2BRC4worFYOxHfNSokH%2BZIp8RK%2Ft%2FhmvfemIQJ%2Bk0OINsT6l%2FC9dfY0BlR3C1AWemIm5HqIBAOdRSuWg2SUQmmaFaXDB9IfRtKgfN4UGBbWjDnbjWkVErNDihVK8NVaJBPua4YDbaOOtXDu3S10yblI9Rhro29IUwIk9TB1MllKd9Yl8h%2BjvOl3s3FAHTqLxbuQBemOvOyH8OVGFPh8fERtweSu0EIwYxloK18VlAUb3n7r04wCWkRQEbtKawUBzkIIXdtHOCwxBZV0CjDmqQWJbj7bd6UsqWJ%2Blj9ziiSSVFTq5cPrsUWf4J9ZWDn6xHk5lEsz1yZplfFQylcEU5yjBL297SCsL1AwVjTjIV28pazbpruuwNslQKy1%2BnhjH%2FkIVi6lehYsfJHIrYabOq6WVRlSvudn0g7e1RUsmaZdIc3ASIHmLqQV3flLZxxCyuv5TCPIvgpdJ80FnFVzWhoF3XAwen%2Bm90wdO2zNbaPvPslm23RY3I0SMRuvNnrV9zPEMVWoAArCgQAozByfrYyDpJririDZn8ogasjuePyjcVZ3ifsCjGOC3NVJuBhhuPZmPkvaMFchKHwytVA%2BT9N94XMO6Tms4GOqUBtYrrDU%2BTC1iYIHespQizolkeuARKstImsor2B%2BbWGoZ26lAL9fIqZL7BbOljnEZsHV1lP8p6PSrfy8kENiE5gg3hI9NUixnCpBbTG7jto%2BL2DRXjjIwpKKESjm831k2TW5QQcWHJThswxxXHhyT25ZNWU6oVCF0lmGx3uAIeUwXrHIXAdd6LTbtRLkQfGRLka08xvxWslqC67aMRBiNaZRSN2Wsk&X-Amz-Signature=f68e462439a18a691dd2b24a6f8a386a4c37232dfb939617809b2792408f6f15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3GNPOHG%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIChNBYhP9olEwyLM7yMSu8qRP5AjB7krDfsNFzsdRNJ7AiEAtCL9C4VjJXXt5MObz5YWJeFDBx9A6OWc8wi2u38pLAQqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFeto7c%2F44nSyT2lwyrcA2MpPGzQ3RwcyO0gYZX%2FSETzCkfeckH5xDzq%2BRC4worFYOxHfNSokH%2BZIp8RK%2Ft%2FhmvfemIQJ%2Bk0OINsT6l%2FC9dfY0BlR3C1AWemIm5HqIBAOdRSuWg2SUQmmaFaXDB9IfRtKgfN4UGBbWjDnbjWkVErNDihVK8NVaJBPua4YDbaOOtXDu3S10yblI9Rhro29IUwIk9TB1MllKd9Yl8h%2BjvOl3s3FAHTqLxbuQBemOvOyH8OVGFPh8fERtweSu0EIwYxloK18VlAUb3n7r04wCWkRQEbtKawUBzkIIXdtHOCwxBZV0CjDmqQWJbj7bd6UsqWJ%2Blj9ziiSSVFTq5cPrsUWf4J9ZWDn6xHk5lEsz1yZplfFQylcEU5yjBL297SCsL1AwVjTjIV28pazbpruuwNslQKy1%2BnhjH%2FkIVi6lehYsfJHIrYabOq6WVRlSvudn0g7e1RUsmaZdIc3ASIHmLqQV3flLZxxCyuv5TCPIvgpdJ80FnFVzWhoF3XAwen%2Bm90wdO2zNbaPvPslm23RY3I0SMRuvNnrV9zPEMVWoAArCgQAozByfrYyDpJririDZn8ogasjuePyjcVZ3ifsCjGOC3NVJuBhhuPZmPkvaMFchKHwytVA%2BT9N94XMO6Tms4GOqUBtYrrDU%2BTC1iYIHespQizolkeuARKstImsor2B%2BbWGoZ26lAL9fIqZL7BbOljnEZsHV1lP8p6PSrfy8kENiE5gg3hI9NUixnCpBbTG7jto%2BL2DRXjjIwpKKESjm831k2TW5QQcWHJThswxxXHhyT25ZNWU6oVCF0lmGx3uAIeUwXrHIXAdd6LTbtRLkQfGRLka08xvxWslqC67aMRBiNaZRSN2Wsk&X-Amz-Signature=f68e462439a18a691dd2b24a6f8a386a4c37232dfb939617809b2792408f6f15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFPVEDEN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T140113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJHMEUCIQDsIQZpHmzfoXZT9n46cKAmJijilxdqkZ7pqy3%2BnOZLegIgPlGD0ffsMSpb5lyGxRUE8XJvRn7TTiZNr%2FgkadTBgRkqiAQI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIIQmWFc7a2gT6C1KircA95pPq2VSJIbB%2FNAwMHvSZiP2yZrxa1%2BofE34iDZIYaoNaVFXhQXs4yO%2FtAahpCQybu%2BIGO0rMeRXV0Zq789KZM6e8lM8gwnZPQD4QyWlQOArc2iHC4jf%2BGOanlzH7mgsbcirDqKLGsXk5Ti%2BFfR%2FZtwHUfv%2B6Kd5IysVa0gWghhBGTkav4oyaerjqZ1ppDOsbTOncby3FRDMt7apEF6pRkLmLYwmZ16by4xoYmjs83L3wCAKUYGX5uJ2Etmi3g4DG7cHrWpvzw8uGRZjMp68Q0l70h5DgpfP7ZE7UsIhqnd0nTkUUtO7MnYhYT1wXVBXIpvr3sz1Y2E6L%2FOBpnCIxGAG1aJ%2Bpo0I4uO6%2BqZJUJmApSUTVPEM%2BUvRKl2TtbH2YEQnTMtCcpM%2BDtA07mGlXAbzxo6KlfgGYQmYMyA2W%2FafI3jU3%2FkcnvJQbIT2OqHeG7UYEYploRG6UsJMV49XkjhIV4CmXf889gWP6b7XGUc0njLz5ok6RvyywR49gePq8YJasZwcX%2FTbMJ2h4GWq%2FzbicdeNW%2Fu8d0HsW8aW%2Bg%2FsTSUrC3TISoSjuLBeavIWQVfC2LdtUgee1Mwq8rN4lXNafl2eT61ZszPSS%2B4476wKae35tSJhyc54klIMO6Ums4GOqUBU6vh5mDUez7uvLIkStqkWUn2w6mfrhvc0w%2BIkJ1Y4lMATadWL%2F7uwSNRYgbIqRMFY12dhlQ7LN8l%2FfdBBh72yASZq2eMEUOnpnMprxW7uQQkfjvXZjtzkpvLLn0lUtQKBlx9VaRJF4NKMOroXyMaYpA9agzyqYN05%2B%2FRi6u%2B0wku4%2BjRR%2FnUXj9y2LhE4D%2BZQKhbMUixb3%2BTzd2ZfrfLffJHr1Ly&X-Amz-Signature=9438b5b6325e74ff5d4c7e04fe6c0fd03f4ced9c5828c9ab1f116e9f52a46c55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

