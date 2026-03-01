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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647WG5JPB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCySpZSx2mU32aTnUMeEfWNxvrLchxjDXwXA8mcFhjtDwIgNh6iAPBRNJpQiD3IJANIROzVcIlFS5%2FGyc1v7HZC170q%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDA5Iosv6o8ZILay%2BGircA2LCjliF0NQFjTAttNk5cEcxJGAM0Y5C%2BpBAgt3mIwqBih8mswYq2p0yWRCkOk2zredDOhqw5B4ddulpfEtZJF%2FK0FW4gr%2FkNBB7klA9T1XKpn%2F3XI3wzukHB%2FPeRGrpMsgg8J9uP5MvrjRCBu0TB6%2BJrpf8isIk83qKCTrfprPp%2B4EtU%2BRdxOO3wSGZPsCun%2Bm%2BDMl7WZ2o7BmdhxzMOntcmLRwZb6amgouUspZvFkiiSmwdrZvHVi4f0fNvZMJuuse6gQD0xHkY6jQGZVej5c8HZ0omoaSXXOVNRRL6WIHxUy1SeYQ92ynpp7RkA%2BTcR0KVpkOw7fbUbZ9Z26O3XyRQJUAthE1sRtHJTteNCg%2BHOfNm0h1AbdnoOMs4xrxwjy%2BDmAonFPPw0sdGMOkGTeRcSERrDnMZ9FTUEgGVi8mU9n0e6RBZtVRdWuuFX1FWpcicJfy%2F2unNUhoYTzKNgae5yAFBPTIZcjcB05KpZl5M%2BPY4HM4nEF4R9Sb29aeF4Q4fMERsQqIxeZpGt1kbBasvvRdQT27SuhEzZsoKT%2FXNyCzV8emdfGR%2BhNl%2Fs0rY4mFSq%2B9zN4nhBXTIXpLkvbNNCKtR3SGEnmsLwFGgBC9QFFIl4i0W2%2FrcbowMI6fkM0GOqUBWdZ56mTtil9eTnBEXVDPp8EwoF6TglYQ%2BQ%2FiQBamEOiO4NGBNt8J%2FbkhtknaEusJCr%2Fc2UW1TVuv3Z%2FPpj%2Bth3vXq%2BqhrsMxh6%2BJTzD9Uk%2BugMSkw8wKi%2B6h2iOrr62rr0k61aAUIQlhIRuHgsOL1TsguTDVvqpYLqffVaw0HkNvnt2IVng4smraKxEu0K6TCvWBQOZN1JAiPlvDCqTIVDrRIGLg&X-Amz-Signature=295efbc72e48828131ae1f3e37acf215b5007ced57eb9061da27e3050f2ae827&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647WG5JPB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCySpZSx2mU32aTnUMeEfWNxvrLchxjDXwXA8mcFhjtDwIgNh6iAPBRNJpQiD3IJANIROzVcIlFS5%2FGyc1v7HZC170q%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDA5Iosv6o8ZILay%2BGircA2LCjliF0NQFjTAttNk5cEcxJGAM0Y5C%2BpBAgt3mIwqBih8mswYq2p0yWRCkOk2zredDOhqw5B4ddulpfEtZJF%2FK0FW4gr%2FkNBB7klA9T1XKpn%2F3XI3wzukHB%2FPeRGrpMsgg8J9uP5MvrjRCBu0TB6%2BJrpf8isIk83qKCTrfprPp%2B4EtU%2BRdxOO3wSGZPsCun%2Bm%2BDMl7WZ2o7BmdhxzMOntcmLRwZb6amgouUspZvFkiiSmwdrZvHVi4f0fNvZMJuuse6gQD0xHkY6jQGZVej5c8HZ0omoaSXXOVNRRL6WIHxUy1SeYQ92ynpp7RkA%2BTcR0KVpkOw7fbUbZ9Z26O3XyRQJUAthE1sRtHJTteNCg%2BHOfNm0h1AbdnoOMs4xrxwjy%2BDmAonFPPw0sdGMOkGTeRcSERrDnMZ9FTUEgGVi8mU9n0e6RBZtVRdWuuFX1FWpcicJfy%2F2unNUhoYTzKNgae5yAFBPTIZcjcB05KpZl5M%2BPY4HM4nEF4R9Sb29aeF4Q4fMERsQqIxeZpGt1kbBasvvRdQT27SuhEzZsoKT%2FXNyCzV8emdfGR%2BhNl%2Fs0rY4mFSq%2B9zN4nhBXTIXpLkvbNNCKtR3SGEnmsLwFGgBC9QFFIl4i0W2%2FrcbowMI6fkM0GOqUBWdZ56mTtil9eTnBEXVDPp8EwoF6TglYQ%2BQ%2FiQBamEOiO4NGBNt8J%2FbkhtknaEusJCr%2Fc2UW1TVuv3Z%2FPpj%2Bth3vXq%2BqhrsMxh6%2BJTzD9Uk%2BugMSkw8wKi%2B6h2iOrr62rr0k61aAUIQlhIRuHgsOL1TsguTDVvqpYLqffVaw0HkNvnt2IVng4smraKxEu0K6TCvWBQOZN1JAiPlvDCqTIVDrRIGLg&X-Amz-Signature=295efbc72e48828131ae1f3e37acf215b5007ced57eb9061da27e3050f2ae827&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA3KRRTB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDwV37MQylAybeMdWIFxnE%2FLs6XmF0qY6ZOyUD4DEh9wIhAP2ufWWlx0pvUPGCKDUQcr0tRdIPDONV%2F3sg3bYfSg3EKv8DCGoQABoMNjM3NDIzMTgzODA1IgzEOh0kVTMhGvBy%2BoAq3APQk5sBFKrrn%2BzEXEhfkPdRO90SX8OakZcEBr5gdCrcx2aCYCi%2FcjHIC8L2eKG1GKuGhxMAP2dBTUghf%2FWjmNiIXA29VZKkgYrTR8JC39p7xlmTawFJKNoJrNv3gEnao99D3fn6f0a19RllBGfQDqAxPUeYfhdt9CPWm7RDG7Cs6elGqvLDLC3NHTPrFymLoNRvymJi92ecyc%2FwenAmQXmYboiooWlj9KspW2fB0BM2%2FGR%2B3sdBx3r180mD70tXnOAwiUa1zmDzu4YunmoySEhZeANWsIvI5msJbRbEEnuW8uBT67f4eGkdbT0ZR7ANxWlmg3ccC%2FzDiuNUvOczokG35v0DWVKjCDoA8yc%2Fta9Q9eTl7raBz0AE8TLmqS9dDKSveSVmDix6pcm4tV2cnKaJ74qBVQ2yBDi9R42AcxnbGOwQOH0LQ8Hg8MA39d2If2enDPv5CA6S6U0LcK1ZB%2BJTSVURsmm42UtcILy5lMVKOnfltlMFFRePR2559HrSR6mg0g9odejfRyxMcPuHe%2BUc%2B1nLpqyNWp4hmhbaEhvDyc9wswrl52A7EaOGlrJfIC%2B89ZlgBBibj%2Fq3BwKhMRfs7m4nbsSdLSeWqxxxUE40JEmptGHlM5zIqj24zjCZg5DNBjqkAX1E9LT4z5MFJzwm2dtrmUkTx0z%2FkCkFMENdwxv%2FI2Rl9X56qY9pPoQaN7NrtV1qBFMJhw%2B7%2BPWkvyMEChZ2c8hL7R1JCoa%2BcI3k1dAjEr8b9Jfceho9PTbQ%2FUGNrZm5Zkh2ZJY7%2Bzsi2CxJom%2Fn9lIc7nBKbYi2jBKH%2FfznujsqqAfJkG6%2Fbaa66vqHsErSvcJsdpiaibLTdq7YeBUZFjIwbNtG&X-Amz-Signature=4305af495e0f3021dbc43bbba4f1ad580d893bf967f1b792eab07249dcb418aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645JCQOSB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8yV%2BYE4uqMP6JwIvrNmxrlDp7SgklvjAtxJnuYvjqGAIhAMlYvo11s8zKiGntKYhX03eKrT6%2FIuWssxDbmBW74b0KKv8DCGsQABoMNjM3NDIzMTgzODA1IgwYuezP31mMNjyqSjkq3AOpCRupaasVrWoCD3y6rgvjtvy8q46dj9Oc7YwHbiDZTkLHzLUejGIGvGjvYZw%2B0HiIbubFCuKtcZFDApcyDoT8Bgy8T9EvI3OK5Q6e6MpUAk0Wp62FI6Rn6xd9lgrrYFgfvH4WfMgWIPUg4zUEBc0snLSN0UUTj5h1708JNygJ6302jTrhAjbk7Vkkc0wLWhvwDwB1wqznuFqIl%2BBO1MDWA1ycHbrg814gx4slrXucWLeoxL1cmc7rHpeZjYOGpZfRheZ7LR9bgqkbJXqWo3QVLsgNg4LwA%2FcCVWgw%2FEIZ5bpaSVJ8519LGX0xqnNOZrTPmtO%2FjFj5q8eyhfcUMT3ziFzXVeyFdp5cpqkalsZCk23Uzp80izKjorLn01VoIheI%2BVgdnTlByhJrhjv0LuSkIIZNw5eHxgIlLBrrMBVv7w5Iolywbo2ZlXU0oXTohJuh4V1aOopJy0BPGSNPl%2FpjKyeYaG1NfrpM460pLqR36x06RZ0jY5ExnEq6N0Jtg8ZSy0xqudnysgwysVVhDItr3rgqzUqGRJ4jl5Hyg5l72aiDRbGK5jx%2F2wLMPhQDU1MigRUSN5li4JUpNf1FgWSLNAwZiee7FxfjFvgTsy04s%2FEpgq59q0H1oJfYwjCdoZDNBjqkAdUwiWpTOtlp%2BzSxdfjbT%2B9x2P7S6OqQP0kyPlcXgSkaGwpnB%2B17ylFEsWCSggCZXUO9lRImfLMxIswE5xz1flGEeYpCd5Caq348JUAdiWPOKrMrpnr8Z5h3l560xGZ5Eqdf6y6N5Kgk%2F4hPTvviL76aUt9aScILO5Gjfn8yzkiHOPUp33iLQ3AsByMfrUta%2F6FtZrzUEQTI2r7oOuTfPxBZLRwZ&X-Amz-Signature=380d526416c53aa36b3ff9a57b28e0c7ed72f0b72d1ceda6c42f8a20c265a206&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645JCQOSB%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC8yV%2BYE4uqMP6JwIvrNmxrlDp7SgklvjAtxJnuYvjqGAIhAMlYvo11s8zKiGntKYhX03eKrT6%2FIuWssxDbmBW74b0KKv8DCGsQABoMNjM3NDIzMTgzODA1IgwYuezP31mMNjyqSjkq3AOpCRupaasVrWoCD3y6rgvjtvy8q46dj9Oc7YwHbiDZTkLHzLUejGIGvGjvYZw%2B0HiIbubFCuKtcZFDApcyDoT8Bgy8T9EvI3OK5Q6e6MpUAk0Wp62FI6Rn6xd9lgrrYFgfvH4WfMgWIPUg4zUEBc0snLSN0UUTj5h1708JNygJ6302jTrhAjbk7Vkkc0wLWhvwDwB1wqznuFqIl%2BBO1MDWA1ycHbrg814gx4slrXucWLeoxL1cmc7rHpeZjYOGpZfRheZ7LR9bgqkbJXqWo3QVLsgNg4LwA%2FcCVWgw%2FEIZ5bpaSVJ8519LGX0xqnNOZrTPmtO%2FjFj5q8eyhfcUMT3ziFzXVeyFdp5cpqkalsZCk23Uzp80izKjorLn01VoIheI%2BVgdnTlByhJrhjv0LuSkIIZNw5eHxgIlLBrrMBVv7w5Iolywbo2ZlXU0oXTohJuh4V1aOopJy0BPGSNPl%2FpjKyeYaG1NfrpM460pLqR36x06RZ0jY5ExnEq6N0Jtg8ZSy0xqudnysgwysVVhDItr3rgqzUqGRJ4jl5Hyg5l72aiDRbGK5jx%2F2wLMPhQDU1MigRUSN5li4JUpNf1FgWSLNAwZiee7FxfjFvgTsy04s%2FEpgq59q0H1oJfYwjCdoZDNBjqkAdUwiWpTOtlp%2BzSxdfjbT%2B9x2P7S6OqQP0kyPlcXgSkaGwpnB%2B17ylFEsWCSggCZXUO9lRImfLMxIswE5xz1flGEeYpCd5Caq348JUAdiWPOKrMrpnr8Z5h3l560xGZ5Eqdf6y6N5Kgk%2F4hPTvviL76aUt9aScILO5Gjfn8yzkiHOPUp33iLQ3AsByMfrUta%2F6FtZrzUEQTI2r7oOuTfPxBZLRwZ&X-Amz-Signature=8252a0577dd563626d878098861f4bffd2c8c538a9af19ba9ff6dd3e738a3793&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GCD6G5M%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIALtp6LnfdU%2Bwwudu2R5XEOkmRZJ4%2BBUoZxHyUwtRgabAiEA91waxTCt%2BApKCtQLhvaznqzock1ro4dI4qR6ROzFtTEq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDNP8ruXwcQaky6zIjyrcAwey5%2B5hppu4X7cK%2BEEUCRmNgtpdkFdR1xlIGWVd51XnKjTNjv03Potbrfu%2F1YqxjxKhwlhKFDYE3HEBEJf7UupViIaVYg%2BQ8E5qc89hyYHMlCLRNOrw1Ny7AhsBJIdklZfmfZ%2BvhzdYxKBUqi8Ot99g9PkNi1LLyjw9wS2QMz24MmFIevvL%2BF55bL7fy586YVOJ8xff10hqEN9hDy3c6ue2xMRVNkGHAMUuGq4i2VmOfp4cgPEMSvt1%2Bjfa2%2BXUtt17ThekGlxf5T7fBpIWodZ%2Fzf%2FqFJ5mggqqbTbP66EC5r70GuRRqFWS8495EDIX97IYRY%2Feh0ImTL1FoE53mI1FcQSjJB1PRfZpPmsZNhPu1%2FC1Nr1nopFebLd%2FMSrIcb%2Bvm10IK2GPNxgku4oByTEF9sfZi4FlR%2FpDH2TA00vK7cowsMNClXvg4I1vLYfyycZuMp1cemC%2B%2Bhjo7I9%2BEaBw3b1Hw5MZiZ3VDmPIzCJqtGDo%2F5xniJ8fRNQvDZMOmJfe3szYgGdnOGsfi0LH%2FCQb9IwHEHeMGcsOmsu0v8KG2xk5UEn0tLJ43VsFCPo9%2Fz4FKP6iuKqZHz%2FkhZp9EMbI0ZpqVn%2BKO%2FG2EJ9KtMB9jSgNqdfZLJD3HBCOMJeqkM0GOqUBEOqHxlAfGHjHkFHert8doNyWOjVQ7SnAix%2B2xuCqy48zPUNu2eXGhp02cFO45YMp840YcUetXFlL4G%2FiZluw3LgljNshYWKgBPj21yDDHQn2fJiWCTCRueFRipvBRhTskCVpxcvi%2FRnIB1DhxhvYYofODuFGiMmwA7BeWU9IFEGwaTxzPuFFOk7uIR8iZCMfM7g2UqKhGrRwxV3G%2F4SGTjfK0DG6&X-Amz-Signature=56c51d24a3681b82adabe7d5fb9488067f58c979be06f73a3e781b2e5a20d81d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOJI3TLG%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDX1CHCrGD9Fy11jXX1wLDgtLFNPdHPc584jO4ucXn5MwIgTp91y5kOPviFxRKQvmuIHLtyH33bOBBq5gQtzWKZ1OIq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDFp%2BO5DBXycqQdOQwyrcA47%2FuyDlY3IKa%2F0adp9TEY4RxLxTpHrR7vTCMzA0D0N9knVKVCfnHOOIIB81zWVaODKvSpiBA1LSR%2FaUsY8tEmH9R95%2BWir0pjHN48le%2FQe6iA3nDGeJrMT%2Bp3ZboPVihjk98vl1szXCF8843HDMI24cZEKKS1zKkbU0U6Ug6eiY7FaHZfuwsDt%2F0vc3EieiD5iSuKNqC%2Ftze8Dr2cqpgr4yHKcDTQrzdZK01zb6ar1U%2FgSLCStkh%2BXVpdw%2BMjIWx1UihcSPtfejTKq3lyWxZ7Z87iclHKi3ARskhFsjOOm0hIb1OiGjGGsQr5rxI%2FA1xzRbXvropHhZTUdZvfK51HweawCYkKqqqB91%2BpmONFhCbTetYELalCb%2BpvVVkwm7Ucmy33wSvRlaj34S9%2F2J0kNfnUISTUx2oWBYed4bxTDPYCd6ObDjTcmoKefMqH0q%2F6ga43f8I46ngMeZ8hNpfojPW%2BNtQEFE%2FZU07MOTWk0%2Fhr3aDsCFx1WevyS28Q566EVjEN77YsoNaCOfIHPncBvTYXw9gPPucQ%2F3vEtIOL0LrGzkS51%2B7UAx6LZSyhYEWMF8xK%2BIkrT%2Fg3DMfeM51LPOXDoAcHjWROUEAd4QJc4dhaUL9it82OTKTi%2FBMMLej80GOqUBsPVQaDfQTqHuVNf9eZzAh7x7sqq82qHfaDmQ1HTCaoyd8NcV9oLDvlcduCkX0jVL7cBVcvQ3Iav8%2Fejoy3YWQPFgsJUca1hZ%2BnumpO6WBxiJpJNdQBOptcY%2FGyUtLPP97Y3XUYHVq9arXB1z1BrzNf9eNY7281nTOZ7vWHJcXZ5uLLYfwS%2BDRd3vYVlTEZKaGBtySCFfLxng7n0cqmtnNiT8uGxm&X-Amz-Signature=e9c7b70a7b15007b55a5d288e351a4e10a59a24b64ad714c2188b89584bcd8df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLCHOLZK%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE3y%2F0uSpm7jIhWOF9o7I5zc6AgUSxemiLxdW%2ByjCVpLAiEA7i4zYbet7OzhPazgBSr9R%2BUttcra8xQ7MpZeLg2%2B7%2B8q%2FwMIaxAAGgw2Mzc0MjMxODM4MDUiDMWVyO4yYaG9DPFXASrcA63ic6TVHTKk7SYAKrT0Ug7H9RFDLhesMSWjV9%2F2MTpAzvSzQJYb5Waoj2fiX26L3tj626JKD4wBVEEzhVKKfPytHnycEQCR7UjnjTDIK%2F4d6pvSGnFJ6GgBrTMNm3HcyMo4z3wg%2FqSYBL59EiHv6tNdX4cckQcxG6i4c8uZNcOibzIeqPuvrwKwMhzKB33NTQK2clX%2B5rDNracul5j0LG1G2fIu18UeiMx02No9rkj8OvB7vqZxHxK86E7gyMSVyr11zDkZnxeMEgP1b1n71OcMWECyN%2BP00nxBlcn01iUsLgWC0kHeFrjYWRJ%2BC8wOoVRhvobT%2BOoUu2%2FLbwEFQ3vu5CGt4cugq3UCS4vFQUqfLagw6bap38E29vbEbCjrtXucHe1TglsGvIoikAAS0R3e7kMjw%2FSGYvMEMQOP28nbZJykoupasUCk0Pzpo84xrN1%2BGZTok89lAfjowRHr6co%2BfzJj9DB7Vzh1M6YWzntsFCCOUMmYM%2F8INvOBVILqtxe%2FSQK%2Ff2jqqGkwanDDfmVVEkHP3LlSDKMagHtmNnS10oqW7EY3i%2BRtZaztBYjyFlBXUatJtICNh%2By0DPGnZM2cQ4CpA80oT41ZWPM29Ro1I2T1%2BCtbuapEBacVMIeakM0GOqUBCwvdi1zSLNhZBnCDq6kGSs47XnhYbUdMyUgq7AInHM45C8TH0hasgUJ%2B2v5w9VPIMVs8G6Qals7CiL6BqNjnl2Dvsfi7tuKjJcxa3W81sn6jtoBQo2Xif8HstljTBRaIPdPpHZQzTXvMT9pfn2r67W94qoVC2VS3HCwxtqzZ8QdUBmhIBI8UQm%2FLSEaA71ooQEBl2DnQKlvIDByfd92ytqZHUpN%2F&X-Amz-Signature=9d11ac420d76dabab441c7188f9f09ccfa9c83a5a77fa2bbf90e02faec9af306&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAPTDJO2%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCvQ6Od9vhI2DGfNsPgs2pC5MOOqf2FRKxnrkU45PF0vgIhAPBUaTGApipgafCs8bAfo%2B7qEL3AQh8Cgp3zi%2Bx%2BrZzhKv8DCGkQABoMNjM3NDIzMTgzODA1IgwLFHv2oBr4LEljNS4q3AOwPheTvlSpSiWnZ2q4Vt2LXjAJ%2FZ2e1ND0nYXVAuVZ1IYwhAQc6q5qMoS2AEIdhUUDJJr%2BC0nSqPKebvL%2Fat9xgmOM5LWlFo5887z9MvMQx6J5z31seOyTOj1sY1ahaA0xhvGYL5w9ejdtTFYDC5OnJGdcjt%2BpB5VUo8TAZ36QQwnC%2Fgr0QVR%2Fu7uBuuYKoDPDJzAxV6O2A7hW9ddGBW8z%2BGEBJgXekrWal5DZ7PeDEzrZLH39Z7R0hWbk3DNrn6GbTaN7zF0ZZVpMFPzcNbZvFtvJLJcnRqxgLu2i7aVFN9FvpKDKHMtoNn8hHoViSJvBTAq27NEvO7yT96fIghFVf1lFknzKnfsS1IhJODFWCkJr21klhA0sy1WnkBsYX2pQgcNZxFsaNlpJ18He0qkiQebGVwi%2BiD0qxGO2SUMaNQHE6%2BveuHDarCik7cnuBl2Z2yNQhXdw5O%2F86DDBWV9yDSFlJeqgwdh8CV8rb4d%2BbqDQZCnagFRRa0FHDDD30S1HfUDm1L%2BLXGde60svEQPXlINeKm2Oht25w4MBlLq2lHmx7L7w7vWqfWdbS4oTjU8B6tzY9SebF3kMnkcykcejcANcNgwl89FfGAkSzSpoHrpTf438UbufAygwEjDL3I%2FNBjqkAZ1bSvBg09UmXwSUaO%2BdE4tIv4upmZvVRYkz0Sjao7mXU%2FZ2n8tNw1%2F3W4xLRyy%2FXFwVTmhaKMSu1xOw4StKCAbpNJ%2FnysDFdiZukQ9LidoLVgBJMA20FkjDWKn9yQa7a%2BaIn%2BfqWPbLn%2FkA%2FdfSVEyAmWOzj2xZqj0RTXxFeKUHuziAvGqoEscN6jRa%2F3ZlvI7ba4uPCT0mGmNutYFJDf119ItG&X-Amz-Signature=bfe80b917d2894266e0be0e6c97bffc7673a07508bd52f5f33022b3984ba1ae8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAPTDJO2%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCvQ6Od9vhI2DGfNsPgs2pC5MOOqf2FRKxnrkU45PF0vgIhAPBUaTGApipgafCs8bAfo%2B7qEL3AQh8Cgp3zi%2Bx%2BrZzhKv8DCGkQABoMNjM3NDIzMTgzODA1IgwLFHv2oBr4LEljNS4q3AOwPheTvlSpSiWnZ2q4Vt2LXjAJ%2FZ2e1ND0nYXVAuVZ1IYwhAQc6q5qMoS2AEIdhUUDJJr%2BC0nSqPKebvL%2Fat9xgmOM5LWlFo5887z9MvMQx6J5z31seOyTOj1sY1ahaA0xhvGYL5w9ejdtTFYDC5OnJGdcjt%2BpB5VUo8TAZ36QQwnC%2Fgr0QVR%2Fu7uBuuYKoDPDJzAxV6O2A7hW9ddGBW8z%2BGEBJgXekrWal5DZ7PeDEzrZLH39Z7R0hWbk3DNrn6GbTaN7zF0ZZVpMFPzcNbZvFtvJLJcnRqxgLu2i7aVFN9FvpKDKHMtoNn8hHoViSJvBTAq27NEvO7yT96fIghFVf1lFknzKnfsS1IhJODFWCkJr21klhA0sy1WnkBsYX2pQgcNZxFsaNlpJ18He0qkiQebGVwi%2BiD0qxGO2SUMaNQHE6%2BveuHDarCik7cnuBl2Z2yNQhXdw5O%2F86DDBWV9yDSFlJeqgwdh8CV8rb4d%2BbqDQZCnagFRRa0FHDDD30S1HfUDm1L%2BLXGde60svEQPXlINeKm2Oht25w4MBlLq2lHmx7L7w7vWqfWdbS4oTjU8B6tzY9SebF3kMnkcykcejcANcNgwl89FfGAkSzSpoHrpTf438UbufAygwEjDL3I%2FNBjqkAZ1bSvBg09UmXwSUaO%2BdE4tIv4upmZvVRYkz0Sjao7mXU%2FZ2n8tNw1%2F3W4xLRyy%2FXFwVTmhaKMSu1xOw4StKCAbpNJ%2FnysDFdiZukQ9LidoLVgBJMA20FkjDWKn9yQa7a%2BaIn%2BfqWPbLn%2FkA%2FdfSVEyAmWOzj2xZqj0RTXxFeKUHuziAvGqoEscN6jRa%2F3ZlvI7ba4uPCT0mGmNutYFJDf119ItG&X-Amz-Signature=9ac89021ea74bc1ce66e973a17114c2e21a24104eb29949e2a37d0fa2b56cbc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XX5CH34U%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCOBNw4KqTiOQyC57PnB%2F8HG7mAoLMzAG79rvmHYzodCgIhANfr5dNwHj6zAUZrtAPKtc63M2IFq%2BMgFWzCGXFHJbTOKv8DCGkQABoMNjM3NDIzMTgzODA1IgyQuV3puFAL%2BNdVHe4q3AP%2BYFTHf4KXtQn34UH4zZMCXqLUktxLPRVrbnDA6eVc%2BsdNvxLToEcQOfgSkJdb5GtR4rpR90A4aXP5YwVTB8KU5zxHuQk3BMovq3DNwUagQcW7r1Di%2Blu5xYSz%2BkkmDQzTXcGpGr0jfM%2BIHP12qDMoV7Qm5QIAYBr3XhUUw2YCOQFwDCurRJrBiknxDn1sE6tAmmPndi3zhLejPboNkyZHlyBqK22DC9MVRYxPWbV8sBZzKdNiSypNMsDHzh294KptwthkjCPiPEOvND8r7Uvsjvb4Az193ktxYSZRqYKyV5EqBkJFo2CC1FJCXp%2B%2FcB0kwqCJ4SVpzOR2Uzm%2FQWaeb2JQxQ%2FoW9KSCYHVgN%2FOFCLT8lXyZDUUPlSqCe2317UMfTfJ3fKkMiIRBFUwywUySjKiF60MNd56pgTh0bHiJupAkAhixThcRxH9Fj9CP7detL1b8nSfJTZakDXI%2Fg4Le119ZUuzOqbsU1WXYLHmd5XGrwNMav7ECups0FVV%2F8KEe1DF%2BiXAR4sCy7YNt6WX3C2qiAE%2FFtA5miBphVkO0jk%2Fom7mrwMdUAucdKOy6mI5a%2FQKbdq2htCbSdIgzUW7eyzud%2FW67xXDqMEpW5GXd1DT9V3NEXIAdDlFXjCY4Y%2FNBjqkARpPHq4HWKOqRD5JjOqNksWGE9IBPSqcC5O4EPeAzgrYygZEH1VslWd6LPQ2mt0H%2F8IMHXocpCr7wNvITvF1x2egqegkqXGmfSwyXIAKoL%2BYQqwR4Ar6arKS1P58TY%2Fw1uppUaatiKwtdpl73VVtIbVp4Fe16kLNImPfak849nGeHn1TwfmPvnfQfTT9jqSN8kBmP8p73nAFOCfuTXOIa%2B2gtCdr&X-Amz-Signature=144dd8290ffdec7c8778dfa6f4809b9905c6d43c49cb0974c08c8e7a6d5591d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662T5LYCIE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID%2B2SEwvBOGui%2FR5D%2BGWkmAc2Q3mHfwqejBccMC8tr7OAiAQ74noErgCM%2B%2FmYMXM4ZHnbiK4j7Hx4%2BHFDWyupfkcXyr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIM03%2FcQ%2FmivF42WvxkKtwD1C3%2Fts3%2BXLiZHt6SCnvkjEm7zMHCbFkVVpZth1jAk%2FFmy%2BzIGuZZinghoWEfCRuR01DaT2cXXRBqDosfJ5a%2FlBf8o%2F9Z6BrJ5cy9%2FnUYTIhQd9OJVH096WAR%2FZ5Tq0OF1WbNmEoIRab65yMKDj60zykgJAuNQOdtKQUbhDDm4%2Fw0igSgZIrDObuo%2FO%2BiwuRtFvdMWKrqnaXU%2BGRzixom6L%2F6JPEFp0yO5G6tzMrDZSbxu%2F2eWp7YfIGdvdRdT%2FtThaDyUYwCd3YV6gqZxJkWVLhuK4%2FE3GzlxyGeEpKgTnmRs1%2BUilGU7KnFyirtCthpzaCKuh%2BV3oTW7zZQI4Xz9QUBm75W8v2AykW0zZnhqTTQk7E2GL%2FefeAgaoAixheBNI8HlQQPMzoRxTAXI0M4QVDwuNZNBWzf8TkpkqZ41Pnvr78OFoIIZ%2FPU%2FYfYbM91RMH9vN9VakwiJg2hskoLGS2yd%2BZObQmAaKfbXMHLlfHOTNUC7%2BfHlg8Z2c24XNX32du%2FIdRd1preU8K1zvVuiqvOdcCsHIFcr4f3lkGACpw7DZOZI79ARZJHcLw8y0d2dtPc6DVHDSXGorMsDjF%2F3trcTGFKQXGEycbLyTF5pBAU6rtWSBHoCGY9dqYwzMuQzQY6pgEj3XsGP%2FMWURSDojlLV5P0d700gpTS0dy0YQ8Uga%2F6Xy%2FPLAhwK5hEPCOfgo3pyCvZgJjp8SyCG5QgQPUqWnTxklvh3YY96l8cz5SxqopmUY9g75jYp7XnjebhYPQIm3ToGObneWK5ObjIoT9OYm77pG5AU4brYU4o15HBtn%2F2QsDp3DgCxIxQjdHs5ZnUCOB%2BUL1k7oXLJVa2qj8sbtyBpi8DSlOd&X-Amz-Signature=1d0c26e84d9a2af4c9c4b7a3bbc6af995f4b9b44a1a94d675553428d52ca2f72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662T5LYCIE%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID%2B2SEwvBOGui%2FR5D%2BGWkmAc2Q3mHfwqejBccMC8tr7OAiAQ74noErgCM%2B%2FmYMXM4ZHnbiK4j7Hx4%2BHFDWyupfkcXyr%2FAwhtEAAaDDYzNzQyMzE4MzgwNSIM03%2FcQ%2FmivF42WvxkKtwD1C3%2Fts3%2BXLiZHt6SCnvkjEm7zMHCbFkVVpZth1jAk%2FFmy%2BzIGuZZinghoWEfCRuR01DaT2cXXRBqDosfJ5a%2FlBf8o%2F9Z6BrJ5cy9%2FnUYTIhQd9OJVH096WAR%2FZ5Tq0OF1WbNmEoIRab65yMKDj60zykgJAuNQOdtKQUbhDDm4%2Fw0igSgZIrDObuo%2FO%2BiwuRtFvdMWKrqnaXU%2BGRzixom6L%2F6JPEFp0yO5G6tzMrDZSbxu%2F2eWp7YfIGdvdRdT%2FtThaDyUYwCd3YV6gqZxJkWVLhuK4%2FE3GzlxyGeEpKgTnmRs1%2BUilGU7KnFyirtCthpzaCKuh%2BV3oTW7zZQI4Xz9QUBm75W8v2AykW0zZnhqTTQk7E2GL%2FefeAgaoAixheBNI8HlQQPMzoRxTAXI0M4QVDwuNZNBWzf8TkpkqZ41Pnvr78OFoIIZ%2FPU%2FYfYbM91RMH9vN9VakwiJg2hskoLGS2yd%2BZObQmAaKfbXMHLlfHOTNUC7%2BfHlg8Z2c24XNX32du%2FIdRd1preU8K1zvVuiqvOdcCsHIFcr4f3lkGACpw7DZOZI79ARZJHcLw8y0d2dtPc6DVHDSXGorMsDjF%2F3trcTGFKQXGEycbLyTF5pBAU6rtWSBHoCGY9dqYwzMuQzQY6pgEj3XsGP%2FMWURSDojlLV5P0d700gpTS0dy0YQ8Uga%2F6Xy%2FPLAhwK5hEPCOfgo3pyCvZgJjp8SyCG5QgQPUqWnTxklvh3YY96l8cz5SxqopmUY9g75jYp7XnjebhYPQIm3ToGObneWK5ObjIoT9OYm77pG5AU4brYU4o15HBtn%2F2QsDp3DgCxIxQjdHs5ZnUCOB%2BUL1k7oXLJVa2qj8sbtyBpi8DSlOd&X-Amz-Signature=1d0c26e84d9a2af4c9c4b7a3bbc6af995f4b9b44a1a94d675553428d52ca2f72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN3M6XQH%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T121935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCHVwhYye4VFvplsOYah7SR%2BGVH%2FpK8YUKP1bXeJ7MDhAIhAJPhGxMQvQ1V0OpzjSgzIDEeGTU0r5PeqjuhyNSGpHYVKv8DCG0QABoMNjM3NDIzMTgzODA1Igx9fth3LwHvLBd%2BW2Qq3APcDf%2Fht1TP27%2FMHTIboP9INjlqeJX%2F%2BE%2Fnqd7TVW%2BOS%2BCUEIHjisyOIYmz9a3VqRuUREu8Ka4vbdM3zgXt0HMrtSDVYh8k%2BjSQW7vnK8cP7twmcKXrBSIMUZ065UsYM0N8rQqvyNQcEaQ0mAeiK8bbiuUsZGOpKUXQg%2BSfvl4U4ik6Dljunlb0YkCGg6%2BMJquoCzef9w3QcqbV2l%2FS9MyADEdu76Je7NcdT4uCnvCvXHL2ntqFR3uh%2BmhL%2BJ44xAO634JHH3EcOdyg%2FZTJpx2h4O79d0GVygW72SgxvJ4u0yGG9z3qfxrSKv5TXCdXyc0KkYY69rKRyqt6OigP%2BCOIIWHKLT0CCPgQlhKHJ%2BobzlRjVOGjNYvgAfFX0CLUxS7280wcdQ3n8LpsUTTXOGzNNlmM%2FLf81E%2B8JHS1ES4Yw%2FFwuh1JFjmYB7EHL1S8Jua8jFmvnPvP2fO49P79OeSoE73mhPiMoQpLd7%2BvZIhNBehjTftctZrRKvG%2FGNm4bW31SshuolYSJwL2ED4d4Wa2p%2FNbqozHKkoCTUMFtHEEeQUZdnSXEpQc022s5FXwlCOKQQfzCUbQifJxsD9Yav2AC3pEjbetl48bZBlz6Cv%2F6MjYQPw7oC6NSAVpNzCI15DNBjqkAdfcwcZns372MjBEfi6lIU8IOMb8lnBs0pbW3IES2Xro3Xml607Fve1P2A%2F2EoUyNM1VVnD4jhO63%2Fhy8l4ANak9iDsVFr5Lhd9h6pjzxANS645i%2FVlIcpS%2FOl2ctvalf2rD27%2FNbmORAPBUk5W%2F2nyWyKWZT02kMrw%2BmNPv7jxGpLb99VnGM2siuOCFcCV1VHsWhKCkfyhqUQSWFmcsdftyO5t6&X-Amz-Signature=74e5421755fdaad86661d5c11c5c6dde75a4a957df0ec0a0cacd7505a61486fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

