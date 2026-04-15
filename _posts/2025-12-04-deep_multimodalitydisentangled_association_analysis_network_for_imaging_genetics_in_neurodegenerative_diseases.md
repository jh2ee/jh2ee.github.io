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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXQDJEIO%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIErAa%2FrqGzO%2B9jUXFiBtLWlVg%2FQi3vDMFI1amzIkW8c8AiEAufPgw%2F%2FvVz8b3xSQCAkPGpFx2VMPP0DqJYhtv7FA4YYqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO4VJiuQBIm%2F%2F0TBRircA0NYgNwAfDBN6CuyxGMfMwHVgmE9b%2B%2BPdP%2F3aE6nJLs%2Fy1GbNNfzHuwmMc5QoJV5gJpHl95Jtp0vODdxk8Iw0Wer5QaoKcNpmtnoHKmitGz7Es3MKw61%2BzR3zDdEEmZwvmESiD9G3UHIMJyHNbfEB9bKfpOgAKW0Hp6f8Tb8bypiamVATFnUidlcHkwrk48P7xbEErodLzkp6MbnJGuTm5tATdufhtyTszNbfE0Zg6vqx6vcl%2BLnNBPVeIAkEh8JLzfAgXPU1wOAufXzJbYxnDcvm5Bp8%2FMJ6TzNPxHfJzM%2F%2F5gjYxGuxfTNRGVqpK%2B5dp%2BUDCKJBYjERaA3HD4Cra7P%2Fmn6Y45ZiGfyiqFlEFwJiyHi9vcYfrBDbpOOiCUVAfoWa%2BpPmpQkqdaP2IIQuTQzu3Yilyj27hItACDcTCZTGGJUIR0OilhR9aRoPBScZx2WbdS40yM%2FD6eKDgjFjKnWFdJLfm0vk3CpLtXx%2BYmygQm9taoMvsgZRIIpviBszpfRSl07diUY4JKst%2FrbBSAthMsMsSXc%2BZj2tOQ0MqAzCGr7y%2FMlJRx2iPe5cHCNJ8qtd26UEHeEaw5LnQzGwX02WenXngLPebbFI6RE9dN6Y2wRTDNwgELMnxvPMMqb%2Fc4GOqUBdpSrXvtpOkOxIp3PpLlIb9pXy0Gyj3bXYAvMoOTTRTxmsC6tWDFbIPmUrB3TjvGZIoZmknFhoOFTt3Z9v9h%2FYyFqnen%2FfJ7mTy8JA7Krs1ra6dAkop77AUdhD8sjJoIlw8d5d1L8Sp9gykNKwlbwSRqdqicoGfDj2aq2LbtNIMETSf8heC2ddPYOfeBgroFJ557puVSQpLAt4zU9XEjaf3uNt%2FGS&X-Amz-Signature=fd848e06a498ed87941fb2ccfc2c1ea1809314efd895ee5abd78d17ad8387937&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXQDJEIO%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIErAa%2FrqGzO%2B9jUXFiBtLWlVg%2FQi3vDMFI1amzIkW8c8AiEAufPgw%2F%2FvVz8b3xSQCAkPGpFx2VMPP0DqJYhtv7FA4YYqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO4VJiuQBIm%2F%2F0TBRircA0NYgNwAfDBN6CuyxGMfMwHVgmE9b%2B%2BPdP%2F3aE6nJLs%2Fy1GbNNfzHuwmMc5QoJV5gJpHl95Jtp0vODdxk8Iw0Wer5QaoKcNpmtnoHKmitGz7Es3MKw61%2BzR3zDdEEmZwvmESiD9G3UHIMJyHNbfEB9bKfpOgAKW0Hp6f8Tb8bypiamVATFnUidlcHkwrk48P7xbEErodLzkp6MbnJGuTm5tATdufhtyTszNbfE0Zg6vqx6vcl%2BLnNBPVeIAkEh8JLzfAgXPU1wOAufXzJbYxnDcvm5Bp8%2FMJ6TzNPxHfJzM%2F%2F5gjYxGuxfTNRGVqpK%2B5dp%2BUDCKJBYjERaA3HD4Cra7P%2Fmn6Y45ZiGfyiqFlEFwJiyHi9vcYfrBDbpOOiCUVAfoWa%2BpPmpQkqdaP2IIQuTQzu3Yilyj27hItACDcTCZTGGJUIR0OilhR9aRoPBScZx2WbdS40yM%2FD6eKDgjFjKnWFdJLfm0vk3CpLtXx%2BYmygQm9taoMvsgZRIIpviBszpfRSl07diUY4JKst%2FrbBSAthMsMsSXc%2BZj2tOQ0MqAzCGr7y%2FMlJRx2iPe5cHCNJ8qtd26UEHeEaw5LnQzGwX02WenXngLPebbFI6RE9dN6Y2wRTDNwgELMnxvPMMqb%2Fc4GOqUBdpSrXvtpOkOxIp3PpLlIb9pXy0Gyj3bXYAvMoOTTRTxmsC6tWDFbIPmUrB3TjvGZIoZmknFhoOFTt3Z9v9h%2FYyFqnen%2FfJ7mTy8JA7Krs1ra6dAkop77AUdhD8sjJoIlw8d5d1L8Sp9gykNKwlbwSRqdqicoGfDj2aq2LbtNIMETSf8heC2ddPYOfeBgroFJ557puVSQpLAt4zU9XEjaf3uNt%2FGS&X-Amz-Signature=fd848e06a498ed87941fb2ccfc2c1ea1809314efd895ee5abd78d17ad8387937&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNVWDO4A%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEMRQe0QDew59iAcX%2Br%2BWIzPgy2tvDuY%2FbF4elHHWUbAIgCsWKISI7BD0y9dZSfVq5saiqoIIpkl5IbGs5VtIBxH4qiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAKaON1hhBCEiIMScircAwrBrl69xPCBVaMLx0bru5ty4Pvako7JlVpkl4d4omWu26b2Qu1O1FY2nbpzG%2FTFSFYhShL5McErwyOyY68qv9ztEhZWJwd4i3n7ryRyLa7LNhPGClqLIcFLZTETyOITkyMsEpwoAKKiKuEAmUovQTqFGIn4JsrvB5hDPl5Zz5fq2XCm98JNqQO1u4kjeEJU5%2F25wh2F5760KSF3oLyVA50Bw%2Bp580HmJRGqivMhhHbggv2zvrzmSE2psKWgi73ZdMH0DXAY0ThF91QemfoZNVm5JFTkiOjIG8WbPsAQy1B7Cz1dmVggUMObh6VwLRw%2FVnz8cln9OAuZd0HN4Bi4nt%2F2TDp0WbIHl0tB8fdgYnUFRWNz2uIGPnup7F0KCYaNwk5mYk4K%2FiCbI2OqFEVl63yk0cw2S%2BcgeFPT8oA28KQr4aNZJrG7Wr2K2fxI6s%2F2DUoslU88gOIt%2F3r%2FUiASLqQ6zqLlrhA0COQGWea1xySSnH%2FeQO1BMyZrF4CcAaz31l3xrbM%2BsX7K%2F%2BEMCWVNcXj4Y0uHmCxbNjIrrZucxZI4nlVPlTK6Ak%2BbiJz4IClqP0TEQeA0adj4ruEXaJTv78oE4xXfffBYLMk6%2Fj9mJP%2F%2Fcpb%2B2FAcEAKa%2Fgr8MOzE%2Fc4GOqUB%2Fpqo7bOAlwXQfvY3oiUyp%2Fog%2Bc0skqi0kjsvwjk2jdZhkq19nGh40ijAYtea4EpBUpv6ExSFygF74V%2BXRlHd2OuuaSF4UvgfC08iZ1ADttDMLG2woRhQy93mCwhmcXixrPkHDqiCH5pDntpYEv6sAGV1%2FgS2ikAPYaj38df7sZoC4sw4yJnvZZfNlXvdGIq0O9OwEiiTVIVjusznCPZzQTGgSkMF&X-Amz-Signature=f0c3357e0a9449a35d28ddfb67455d8ecc1cc3092b752d6f6ab063bf0b4a830c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JBZTLNQ%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi6fRtZF76UGfEqNCoTNRs%2BabUUgrX5vBFbZdo1WFL%2FAIhALE165oS%2BzOgTbd3AqulPTOMoJSkm1OexqClQI1ZZv4oKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzA7Xykg4LXaN8Cvggq3AOHLh8atwn2ivQy9tQYz69Y5KZPIXJ7xYAqJtkzq55JIkP%2FhS3M6FgrwCHb6qK3YR4wn3DSRtxqQZzXhiEm3GC0O5l3N0QHUdlhvyA98vRVaoR62GMR39wglTIEjYqyfy4rwrTAuArcMZs5BFmJDyMIUP7%2BbyA66e%2FuYdMWJ6NUjJy%2BeP1FPycswMJyXhM3n9egaQkEQP%2BHPaNVQYhokyT0B%2Bts4vdRvw6Z6V39Cpk4ivAmyVKRYgK2DYrB%2BbtpZh%2Fx04dSJYesyeylHTXImm5QxtDqtK7jC2v%2BtRBMC0mTUjoVuWbDTD6zXJbbeMPP9%2FQbRnyG3wd6AbJ6eOYh4yuas%2BhGsvxm9kN0KY%2B5Vw8u6ZAiXncicZ4daMOUyAnKzcCW02fPjdeaMVWDFCmqCQCYwZ6J%2Fq3O9S5oR%2BmrngTSZ4RBClEFppVwKgDQUHtXJ9kas4z4frWoqfAj78hAwcGpuNtu9W4%2BfpjWitTHIqW0GjaG5wSb9qp4ImMWPA07%2F18KlNZUOw2L1LJ8OJwUcnqIS1jdX4ZapgAtmkF8dsx7btErMvfMgZZN%2Fm5c72pNRgOkVk6kNBES2R%2BVIoJLBoUmdmtVL71uzwpOxjwkOV6WaDbg%2FdqVUy1%2FYYKpKDCDnf3OBjqkAbZ1xcsUO9w7U3Nbtzn5sZYK3jj0r0yV0%2BZ3p6Q2Vi19521bF8FTVgvSBkwt8serlVM3k34shpFpb6Bgrubxr5DI%2BuRnh66loWlgECNAruaDbYAQMIFbEGHcam9m1cv45di%2Fo%2FrURsLKHHA7Og%2BJgnvXKtssdN9l1iSEkkvrsng%2FnTHH03IugYRFhhVq6QsxPlzlivSfJ3OYjM7v9Suz4jcibw5%2B&X-Amz-Signature=c40f08b398954854105606517e20e46ffecdd016c668bc20eae0ff6907e2426f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JBZTLNQ%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDi6fRtZF76UGfEqNCoTNRs%2BabUUgrX5vBFbZdo1WFL%2FAIhALE165oS%2BzOgTbd3AqulPTOMoJSkm1OexqClQI1ZZv4oKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzA7Xykg4LXaN8Cvggq3AOHLh8atwn2ivQy9tQYz69Y5KZPIXJ7xYAqJtkzq55JIkP%2FhS3M6FgrwCHb6qK3YR4wn3DSRtxqQZzXhiEm3GC0O5l3N0QHUdlhvyA98vRVaoR62GMR39wglTIEjYqyfy4rwrTAuArcMZs5BFmJDyMIUP7%2BbyA66e%2FuYdMWJ6NUjJy%2BeP1FPycswMJyXhM3n9egaQkEQP%2BHPaNVQYhokyT0B%2Bts4vdRvw6Z6V39Cpk4ivAmyVKRYgK2DYrB%2BbtpZh%2Fx04dSJYesyeylHTXImm5QxtDqtK7jC2v%2BtRBMC0mTUjoVuWbDTD6zXJbbeMPP9%2FQbRnyG3wd6AbJ6eOYh4yuas%2BhGsvxm9kN0KY%2B5Vw8u6ZAiXncicZ4daMOUyAnKzcCW02fPjdeaMVWDFCmqCQCYwZ6J%2Fq3O9S5oR%2BmrngTSZ4RBClEFppVwKgDQUHtXJ9kas4z4frWoqfAj78hAwcGpuNtu9W4%2BfpjWitTHIqW0GjaG5wSb9qp4ImMWPA07%2F18KlNZUOw2L1LJ8OJwUcnqIS1jdX4ZapgAtmkF8dsx7btErMvfMgZZN%2Fm5c72pNRgOkVk6kNBES2R%2BVIoJLBoUmdmtVL71uzwpOxjwkOV6WaDbg%2FdqVUy1%2FYYKpKDCDnf3OBjqkAbZ1xcsUO9w7U3Nbtzn5sZYK3jj0r0yV0%2BZ3p6Q2Vi19521bF8FTVgvSBkwt8serlVM3k34shpFpb6Bgrubxr5DI%2BuRnh66loWlgECNAruaDbYAQMIFbEGHcam9m1cv45di%2Fo%2FrURsLKHHA7Og%2BJgnvXKtssdN9l1iSEkkvrsng%2FnTHH03IugYRFhhVq6QsxPlzlivSfJ3OYjM7v9Suz4jcibw5%2B&X-Amz-Signature=9a8d9f3ff55539a5d3d9f02c7f2a69a2d04f1c99ec2f14beaf391f0c358153fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626HBBLE2%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDj4rjQKdIKlrj8VpHy%2B357zcaOMP8%2FbGITxWL9HBxRlgIgG5ZMgM503M1MEDCugoeFSaZcFCGPHkSFJVQvuCbwUiYqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL%2F04R%2BsFlecPd0QlCrcA1BFy0SaU3kcujvJPx5d9ndKEpgC2rgv7HpyhjY%2FW8Q0GD2LbOQvlpTNU%2BNo0DEw2H2LIzobt%2F4sdV2QR%2Bou1fUuKW1Ce%2F8s5q6ghyNgGgPsSdT9oolp5CMsKwPFN9w0Ql3MzYNSCb%2FQPcWL4Rq1Sh9ldzEVTRqH0I%2BrnTrGvVIztMpjR7BqclzDKi0YdDhPFlRWeK14FGht6HYHnPT0ZHUA0uxucEN210fWSPJIvtjpN%2B%2BCjEkAC5IjapjUOYiDLVYIv%2FJMQ6YiKt1mWTkCPJ9FQ3t9iy3vy3d6OA1A6azUPjoqKmsn33QentCRHYeYQqWpfJpLZXi%2BtTO4EDBIBB6AYNbV6aCsWS7wcT7AoWTHpzanKDfbF6yAQu5TSC04yq7fOv5M8kl%2FzgftOsEFfl7ZbYpbw2UYpq40o4tpZ4rhbtrrsiMCoGOdGMHLar7XgEr2u0FZF%2Fwf5H8elnLEEnrnt3MH4tbBkpnY6MxYkOHv0qhqyydsnvmG5TUYCmv7pmsIunZVd1ecmgvDLTfOjez%2F7nA0%2Fmhx%2BBvUt2mLcy2dnHwFOgyaUrIJ0FOFMv3FO6jIrqduCUqfTf7fl%2F%2BUIJBT3Zagsc4cy50K7QNOFVb8hrWuFe447EjoQ%2BgUMPnD%2Fc4GOqUBPgFWH4cBUJKXruTcLReDJga0qUghUI0Pp3%2Bbvib1u1g2OTnTYUGV2GTSrucMB4IFP0FcWHTtk80e9ssJ%2BeXGr5jndfCiP1w%2Ba5yXrxMXAE6pM%2BtOBY4C6AB3%2BzrF1cQUs7zmjmAmyrz5PjmHzfT8dka1vvdnvzHFYygTOsROpYhhuN6jut5w%2BK9Yx%2FHCoortPnMI9un5I6WySH2sWgkcwxyRo1wQ&X-Amz-Signature=38843d4f4d12d51a3963f7162e7cb3d2e60e655bb71d08d6b8267957c08ec906&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HVBKNKS%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDr1FIV5RHe0UcfJy5AQ1zLCmiACLLEr4ToTvFw%2F7fBgIhAK%2Fnp09koJ%2FTdzkLmlLfwHhozT7t0z43or8rZNiF5vIpKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzHrIcwEpODU7ERk8sq3AN0t%2BhWm3xcjz8GQoOQJzAFK0uP1WsHqR5hJB4YI%2BIZdDKD0XSSydyMkN0JMGWxiqlp%2BmCwj3ggZYe75AE5J4vbxyVVrkHoQ0hbOmeaDXtZ%2FWotVMnGVjgWwvZ4p0kzT3EaMgv3dX%2FE8dzKxMw1A016PSSSVf%2FoA3SE7gMxEMDLq8wunMo3uXZgKLOLEFcJPpesr8vYnF6eBWHDNZy7Rg1QaObP9Hvu3F3W%2Fw5HBw5u6illPa%2Fpc%2FJ9ZcSZv%2BWGcR7dDaa1cOGDpTvCv7ZfoU83rEODxuiEBo9svK9M5gdN6KwSVG3iBmPGu6sJklEb5tqVb5F0o%2BGGsXKEY72Ig1bF9AuaSuVotKhJkqDKfyLwbeHV%2FdEnfYMIe6VVHw4kAsXVYFV3J7uc4uV%2Fpb%2BJ9qXcIkQcaTl5WL2E9N0AVF%2BdLmMcYIwFk%2BWBHHDxSifQZMXSxuFDSFXFQetg3Z%2F4Tz8IrhiMNjx3RH9vEy%2BFl8nqrhCkZ4JTHElM7RsIXqWB2hiIJljbfRz%2BKzkVKqK%2FkdQ6fjCy7sOQKquIBMPA9bZNRjWWEKMrdJ1KG2PIRiQW1P2cjQGd5bsv6sa94g2V4v26z4RPZ5Sc9%2FugfSCo4PLxYyNUY9b%2Fm6g4%2BNEVvzCbnf3OBjqkAQKDJxyD7EYfWlkDJsFtFuOwXCD5qzhIyNqfXg8wNkxZUC6PZvYeANjf3FhA8R4i6aBRdzbHc3HUhlMFdFSpI82hTEuaGu%2Fo5MGXc6Hm9OHq%2FPF%2Fol3NIRSx5NHXSfh33wmVK2LGl75d84WSJYxsWC1LzFoyDqoTg6mNCsGhpJh19BzS3Z4I4k1sus3jTryjMl6VOP3mjDfNC5nEJlCBBWbg54Zq&X-Amz-Signature=1408daecd1ee4ef01dd9c851d19d0c18adc19f3a013724f421f878b4953b3723&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMXC7EJP%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICV3vg6uKsGtAj7IbaP77bEicmWKynnE3qQWHZsuG7%2BSAiAEFRg7U1UP65LJYP%2F0TNDlgyEgR7nxnlJbYZmYkDyuoCqIBAij%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FFClzc0iVJHumQNuKtwDCv6QCM5XLZbY8bMy6UmKjs0cwNalavX9%2FU4rhnKb9XL%2BhpSDpz8J8R8Codeo8gZa46QouRSlz63%2BHFb5lX2aXBBtcJ6%2BiHgYuerx4%2FgG4VMIARwluDzecrT86UTy6clWrO1JdcxshtN16A4H6wUq3XA7O%2Br9stnM7Ay2iO%2BBYerYznYkUoYAZhKMWkYXMyMJH4lArdSyXZ2XDopj7SxMe7RCGloHJr%2F8R1cGzJISzMxWGQG8R3uUQcBb1vS3CUTcSJK2wJtje7PoFgSx1fWz9F9mRvgGNOA1npTvrRPBlVuP%2F%2Fr3hhzIeWij3shFIK78Rhs1CJqxaCVOWBy5V4vEExNhip5DddnF4Hauh3F%2F%2BSd73lVMnJCQADPUlViPMf%2B9iKjVeAgfQkkgJkFre4xpRehPqaKO8rYrSEab5q2sx6slNQ2lgUECy51FeS2%2FP78EPZ6tRGVO2ciXgjzzeRAeUc5Ow%2FYfF5mR4s3e1n6demN7zzeqhv61d4UuFBdt3IrTXhOU7RqDBBa8l8886pLkElc858iRy1I654mqS663bXUr7V%2BB3ptszMYe3ZWAUs4Dw8AC2kSL3xi6w319NgVFL6EIEtj294aHq%2BErsgHyZIkE02mlwYswSj7RO%2BEw3cP9zgY6pgHunmDdk5SBkjuV45Y%2F3bNq%2BPYmQyBjuQqhaxO39u8hhXcofM4ae4GSdKfZ6sblwfyEJ76l5kW1e3GG5lWaM5e%2Fw%2BiqP8CjqPEVTgVDWeC%2BpQG0dhJapBimGn347UqpJyU3xk0Fc8CK4Kr%2BfiVZOE5%2FrSuR8trYpzfb8V3Mxa%2BtSAItVewUpE1rib2kO4dmspp8Ek1P86VyJIK1yCQ8pZD5opoOQdQN&X-Amz-Signature=d0e8d318767dae831022cd8c9cb6cc5b04e0bc821e45cc2785bc7de698412717&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CCIQ2Y7%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE4Qa9wLNkIrrs0Le4V4EsNeBDQdF%2Fb8wKoEzhjqCV2XAiEAp5undItZ9bvE7ZSj0lUyVQgFgc0eoPMovICWP15%2BigAqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPog16N7HkSOiuT93ircA%2BftI1o9rmqajqyjnwWeGMXnzGyHPqGND7cpabB4V%2B1VxtsuinXsMmiCdsrOlkhVjOPG44asscTakHAc4BTwhRW8cMGAWKQjCQ3Ag3x9Jg38gzV%2FOf%2BtCbrAkGuaKJ8tAiAq%2BMmrl4cVOs39RwhyB13BMvCa6uQ%2F3lehSJNCOskADDvH1kVQYXNFbIXdEteiJ4BuXA%2BsSt1UqT22oOnjFYzbbjLf4mM4Ivngx0ZdnCTm6m%2FYLj0HEN9ztrH1q8ExKvWpgCzhADIWuvfrQrnbTqu0bOmibHtf9mCBtVLy0faxGV%2B795An06YZvsyYOB%2FPzmrPTUGTJuIjbugSBH8hJa5Ihg3foCukwxYdGbw9Ae0blJT%2FfE4eyL1%2FRfHy9pZbh4re%2BirzPTXoY%2B6YPee2K6CpocEJPhDiW1PkLrTBKwmIKxkoYZG1okyZnvjr0VbxqQlzYS7CHQZP1gIYWSi3p9EueHKeYCZfUGL27rtIn1Y7FizhzHF3%2FHNcooYx96UdI3nm2WG5V4egv3836uepJmXqsSZwEiOrEUhI3nf4C54xoCEAqerxLR%2BH84dirygl0LcJXB%2Bsx%2BVEPU1%2FVB8LOt630TzstrwKFXGbD9ANBjaAckbtOymMPnsz6H37MPic%2Fc4GOqUBiV%2B9tAW7GLm3mPE50j0IPzAgFLfXRw46vatzIOAb4ojch9uAsJ8WKhMvIq3ipJXdPUlsxmgiDCKIy%2B3xkbh4%2BYz1ELHSc38B%2BMOh1N%2BvDcDVpg7aZBio%2FEXmdpZ%2BJLLYxko2pW8YzIJ%2FlQd0xGGNq0%2BDvxz6%2FY%2BpLjB9lg%2BxACPbknMXW0WxDRGpG%2FrrOdm6YK0nzNCAuzopuwj1NdUoGvj2Mw8m&X-Amz-Signature=cb5762c4c3259925c21397a572f02c12c1a8d8b4d75b742f16402d04dd912c81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CCIQ2Y7%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE4Qa9wLNkIrrs0Le4V4EsNeBDQdF%2Fb8wKoEzhjqCV2XAiEAp5undItZ9bvE7ZSj0lUyVQgFgc0eoPMovICWP15%2BigAqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPog16N7HkSOiuT93ircA%2BftI1o9rmqajqyjnwWeGMXnzGyHPqGND7cpabB4V%2B1VxtsuinXsMmiCdsrOlkhVjOPG44asscTakHAc4BTwhRW8cMGAWKQjCQ3Ag3x9Jg38gzV%2FOf%2BtCbrAkGuaKJ8tAiAq%2BMmrl4cVOs39RwhyB13BMvCa6uQ%2F3lehSJNCOskADDvH1kVQYXNFbIXdEteiJ4BuXA%2BsSt1UqT22oOnjFYzbbjLf4mM4Ivngx0ZdnCTm6m%2FYLj0HEN9ztrH1q8ExKvWpgCzhADIWuvfrQrnbTqu0bOmibHtf9mCBtVLy0faxGV%2B795An06YZvsyYOB%2FPzmrPTUGTJuIjbugSBH8hJa5Ihg3foCukwxYdGbw9Ae0blJT%2FfE4eyL1%2FRfHy9pZbh4re%2BirzPTXoY%2B6YPee2K6CpocEJPhDiW1PkLrTBKwmIKxkoYZG1okyZnvjr0VbxqQlzYS7CHQZP1gIYWSi3p9EueHKeYCZfUGL27rtIn1Y7FizhzHF3%2FHNcooYx96UdI3nm2WG5V4egv3836uepJmXqsSZwEiOrEUhI3nf4C54xoCEAqerxLR%2BH84dirygl0LcJXB%2Bsx%2BVEPU1%2FVB8LOt630TzstrwKFXGbD9ANBjaAckbtOymMPnsz6H37MPic%2Fc4GOqUBiV%2B9tAW7GLm3mPE50j0IPzAgFLfXRw46vatzIOAb4ojch9uAsJ8WKhMvIq3ipJXdPUlsxmgiDCKIy%2B3xkbh4%2BYz1ELHSc38B%2BMOh1N%2BvDcDVpg7aZBio%2FEXmdpZ%2BJLLYxko2pW8YzIJ%2FlQd0xGGNq0%2BDvxz6%2FY%2BpLjB9lg%2BxACPbknMXW0WxDRGpG%2FrrOdm6YK0nzNCAuzopuwj1NdUoGvj2Mw8m&X-Amz-Signature=5ed9ef0b81fe06c353d2bf29e8d4d60e98bc58ab754f20a718dd27e7f34fabba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672ES7Q25%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDS3xDISruhEYys2DGnCjT8dQmlUzRcq9v8SjQBaVdPbgIgO%2FHCuIp9H0eVP2UXTrry5wgmxq2pjBjqusy7vXKfloIqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAV%2B1T6BA0JMgPpt1yrcA96XgiSatbU1DikYZk7e%2BiN6gRuanHQz9XdftKJl1HUPPF%2BG4%2B%2Bx%2BjTgwcDmbRny876dVSsaGoYqPhPWy9FDmBqCLLIkY%2BldRn%2BF%2BGdJbt7zR8SyES4vKeb7YIqaaOvMq2q7i4mZGNTeeg2%2Bzc08gD%2BTtS7W4fZVqCsRrUO8B1PCplEd5AtRn%2FDLXUhb9nXP3aIx3GMOe%2FO3P5883xWLmmLcxwPnBKTTfPz%2FaLftLCXo3bRPWaHzjvF4HoCYHw3aeVfZoQCXsfp9u0wm0r1iAGB1cODIM%2BqgnR59vlIbciy7ZiLz2l9vFmOdstP5HXSPFiLXNelF4ROJWijcnK9qaKwyIIRtMq5pHENnx3Gr0GCDYbcbS1jxWnxu0jJNgUuQLDX0aRQOx%2BAqottC4XySRHB9AVKLNbQoKaDGahi7ZeNlLjmoU8xe05OUrqukns3PD4m1bjWuBdpFAXeTsB6MR6mqmNwd%2BD3TNJGugy9YAmAeEDqC%2B6ZWAAVo2xghWiYE64yXmVC4Af%2FFd4jyTfFkNxIxT5u9MEtLRDfY1ctfZTEY3nnuFkImKuJPn9F0Fvb747mrG5mBT8Z%2FbDXXq5S5KUG1OV%2B3PVdzLb6uU3bYC4eEifqGbNc%2FZUyOk7aUMP%2Bb%2Fc4GOqUB416kaxFI9CvvMCEo90thpcNMBv69oYivMnkX%2FB7XHE4a6x9g4XeZLSNtn83k6hvCI2I4yZSGJRzaFSMTIJ7O2z%2BBROE%2BYiYkInSsJkklW72VpK0%2FQEW9L6zQZyZeVMGMBuqEKESGhjgApomXgbV3OP8do04uyT47mGY31qOC1hIM782AI%2BrDu6brI2DVp%2FGERL%2B1gPB4dTWTJWIU87EvkXrUGyLK&X-Amz-Signature=97cdd98c777e2e52459b1aeccb37bc3d49bb7a74d5b60529b5c1c050e729b4ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXGYVDLC%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcz1fHl4s15xG76lkVAgcfONoPrMkrwdblnpR8a%2Fle7QIgOABOlUnRdGzBaQNnCkzGSWMZzZ0QNU69wun8keoO0LkqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG3iIm%2B4lckcR7p8HCrcA5weIPMBifR4rjMZ25F7vWlknRqwGdLSdzU6jTCVTECnbIwXSdt5unSUllK4R5aIEjrxqrfz3yirbXdAiZvHOwdw6%2F01%2FxPbkAEQBDME4nrHNhN1lb%2FPKpb6ue%2FxWpAe5F%2FieWt18Za2OX%2Bjd%2FhkXbz4GfFKVXyyosjWhTu9guAZ9VK7%2BuVdPdrmrCC1pILffHDlBRrRh2gzN%2B%2FZTPjNwHxcNiRGFqfgAW07eI%2F6BEjrzXBgmpHiKq16DoCL9GyGw7SSs4YTdXFtW9pFX8O89bPMvO57HjPV8wsnpv5ERBaELjuYR1oq8HbFO1nHWP6NIH0kmB7yb%2FwWsllH2nBVa7IS5U93L9dwqPiBjp8Y3yQUWjMokuSyIN8uPiFzBbj0%2BRF25RsdC9O3Cv3ltWWAzvejPoSxTL9xAv1OunE%2BXBEVZwhLan6agGotPrWOFfGCpmb%2B4E4vCMwDtzwJuQfZAN%2B9zGBKCg5JhVo%2Fjd6UvtVv6VWs2zovQoT4JKHXFsiTIqcIgMiAYx9jmLwyIry%2BcBK2EI2mTEq4oxsOx7Zt7a8Sbdy17dOdOx3QXXC2RNTVBK2KPQfY2g0DArLulhDmakgnRiWk16QpC%2FyDBUHdiTaTYJh7gGjsFf88npPzMOGe%2Fc4GOqUBm%2BAl3TFLBFiYomv9l3UtNVJjLxWCrWpMdLiY7HwXoFNeSXJM9hGUArmXCVNsptecwUZAORcA6oDdeOwyxu%2BYSrIfB25nMsP%2FKeWHdI03IoIhUAvEu5qw0450FGByWReYZlLqWti1WPB2pJSQniJCAvUMdt0VrP5Vf%2BrsmLC967976aB8c%2FchCLFTr7KmK87ESvTt24XdEX32KRRU9GARm5T4JMZp&X-Amz-Signature=d0c6db3a67709c7d756665376a890dad1cadb6f9b6ea412a8f2bb1146b4209be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXGYVDLC%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcz1fHl4s15xG76lkVAgcfONoPrMkrwdblnpR8a%2Fle7QIgOABOlUnRdGzBaQNnCkzGSWMZzZ0QNU69wun8keoO0LkqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG3iIm%2B4lckcR7p8HCrcA5weIPMBifR4rjMZ25F7vWlknRqwGdLSdzU6jTCVTECnbIwXSdt5unSUllK4R5aIEjrxqrfz3yirbXdAiZvHOwdw6%2F01%2FxPbkAEQBDME4nrHNhN1lb%2FPKpb6ue%2FxWpAe5F%2FieWt18Za2OX%2Bjd%2FhkXbz4GfFKVXyyosjWhTu9guAZ9VK7%2BuVdPdrmrCC1pILffHDlBRrRh2gzN%2B%2FZTPjNwHxcNiRGFqfgAW07eI%2F6BEjrzXBgmpHiKq16DoCL9GyGw7SSs4YTdXFtW9pFX8O89bPMvO57HjPV8wsnpv5ERBaELjuYR1oq8HbFO1nHWP6NIH0kmB7yb%2FwWsllH2nBVa7IS5U93L9dwqPiBjp8Y3yQUWjMokuSyIN8uPiFzBbj0%2BRF25RsdC9O3Cv3ltWWAzvejPoSxTL9xAv1OunE%2BXBEVZwhLan6agGotPrWOFfGCpmb%2B4E4vCMwDtzwJuQfZAN%2B9zGBKCg5JhVo%2Fjd6UvtVv6VWs2zovQoT4JKHXFsiTIqcIgMiAYx9jmLwyIry%2BcBK2EI2mTEq4oxsOx7Zt7a8Sbdy17dOdOx3QXXC2RNTVBK2KPQfY2g0DArLulhDmakgnRiWk16QpC%2FyDBUHdiTaTYJh7gGjsFf88npPzMOGe%2Fc4GOqUBm%2BAl3TFLBFiYomv9l3UtNVJjLxWCrWpMdLiY7HwXoFNeSXJM9hGUArmXCVNsptecwUZAORcA6oDdeOwyxu%2BYSrIfB25nMsP%2FKeWHdI03IoIhUAvEu5qw0450FGByWReYZlLqWti1WPB2pJSQniJCAvUMdt0VrP5Vf%2BrsmLC967976aB8c%2FchCLFTr7KmK87ESvTt24XdEX32KRRU9GARm5T4JMZp&X-Amz-Signature=d0c6db3a67709c7d756665376a890dad1cadb6f9b6ea412a8f2bb1146b4209be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JCL44OG%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T100416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDSHCdINbwTg37Ax2CPURanuk6DXU%2F9U%2FiT97DtIxCCSgIgYYcx4zSi6ThV64KBs3WTxqOcTPTiZeumJ48qxU5L8sMqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMMamZriDTnNRGELoCrcA1357otiaOMlAYwZC1vfmJBaJ7W3pO2ZA3tKMeqHuaN31cmF4sCxmz85Yja%2Flclj4Xq%2FuzZPjOkONeV24kXvH%2FeYjIzoP%2Bc9LvLq83Teks1q3cTrh6x6TtCdm%2BcEwlP0SnM5KESJUpFdvXOkA3HthRlkkYTVlCaFgPzAxsT6F%2FCGKYMLGSopr9MhRtRC3KHujOF4wyTxTrQhuCZ6zSo0g9sMSblcnDsHrhGpkWnEQ0ixHZuMRutvcMlI0TpjxfFMCwZ3J7FbmiJPptLKYs%2BSjxChUMm9AOiFkTo3rTwXXoxKI%2FJtaY9B5IxwcU8sGumJFobAqn8RDJgPnHrhyPM60j0x32RtpcC2stcC0%2BkCX7ihiwmDxvh2KXY2%2FcVz1tMAt8eQ%2F%2BTFl3XOa0EfXCgH71nk0zlERFYRFmuKV91R6aY%2Bvs3OLuch4PtwSZqzsapxDq71%2F6Y3WZl7l3tu8XIPAbn3qUrOT7raExTlcUjfswZruQGxK%2BCWGBhp8VY4pMQXrzRf2zAv4RdSNykgGpyK%2F3VbOcFIJsbJd9hu549fIaYrNcafevrCAAkz%2BcTrSK4my9Xf9wxgwV5YE%2BchXUKDE6ny16gFesx8iBdxkwpjffrmsFHewuKVAtbns%2FrbMM6c%2Fc4GOqUBP2cZivAZ5UhfxciL1j%2BOj0M%2BC0ZCNk%2Fi%2Fe%2B7wwPw2ghHfwyQm0wtw9jJ5xo75FYux%2Fx5REv4YOgQjXfHbP20F9COj%2F1XPOY7Kjmmx5vp8V9EwFTzZ8Z0BgnjTmcjCI0WhJLR529wgfzxY%2B%2Bk6QExLVplegiX%2BN3ccoUtKj3YnLnyQ7ViQD%2FAtNzy7dVPhIL1r9eERX4gEwFNvV5VgOYEzXVu4PAn&X-Amz-Signature=405dac5082b26fe2c5a7c0443f9b725937c194031b24bf2f599bd1d7478e4124&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

