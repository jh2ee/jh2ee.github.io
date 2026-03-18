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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YX72K4K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDww%2BE%2BGwNkPLYUSilpltyzCJ4t5dLsaQMjPgo6PovxcAIgbFo0DIy5KXXHz3wwqyA7cJ%2FY4dvUBbCw3Ma2l5G%2FLMwq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDPoeTRg7Hjo4k6Ae5SrcA%2BBEAKu8LPO9E6oMPD3Fp7EmnneVy0kpp79XXutdj7bisz1K3E19YpP%2FIFWEJg79JpFsiB3IrXFr5Kvc3%2BySzDlvJD%2BMAfJDE6wyQV7RHkFIXzxv9E55AZhooqfBgKywKi6lJQb7zBuyzOcG45ZyMnsj8CerD2UhR9Rdh5JiXjsPdZyyTpIyfIIkfFAP%2B2JYFAtnhV2dih5MweOlM3Tzz7oEOgWvu%2FEQbdHbc9yDwCtXESuy%2FNwdOR%2BgmThJ0Syf8XqoOz5Iis4ygH99ZSB%2FTl3h5kuziRXq7h8fQO96BCvBtBMltREVrdLUqG46ET8R5DspseemlGzPScQ6cc6nauXuC83KGJZRju5q%2F5%2BHxWrYyyo5%2BoMi0%2FMIYQH2LeiFmERXRDgjvgG6FHGX15tr8KfuxhgrDWzV4qFTpCSqCXTxu8pYMd29huHHTi6FwAyEb2NCyYCqtxY61CRLC%2FaPXYmlQxoJtGHj2b0TQssN3yLsjigYCdn5ja6N%2BDYJhHAD8LMXsj2HAFjoiBIujqFej88hvO0vfafaPttfsBHTRVqTH39uODWIJed4bC75pZ8EuiMqOUNSyMelT9YSoV5rRKspDfqaWVyJNlhntFAgAHQVtacsbRP75xxh%2FPToMJmT6c0GOqUBejE%2FxGnlViNAbyStDHDTeoyXMk2Zuv3ZElyqAHLt7h4JILa5rO9ibBfheMnwbiSm%2BgS6nhSH34T62XN5ZNDNUAQ1pI0yzI1xP3cCaY2mMvyZCNDXSAkE8cSLJtg%2Bay%2BfMUchOyNUWTnPQgZmHzMw8K0ofkcuGIvvqwrPAUGu33M7r88ar7A%2BaJpVimYh0A9C2li1Mp6c0yEllnUAW5HTO2XMbjU6&X-Amz-Signature=e3a6c1ee05c7e399f1bdeaa07da2c90139c2a0f4506cf7774e9b4be6c7421213&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YX72K4K%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDww%2BE%2BGwNkPLYUSilpltyzCJ4t5dLsaQMjPgo6PovxcAIgbFo0DIy5KXXHz3wwqyA7cJ%2FY4dvUBbCw3Ma2l5G%2FLMwq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDPoeTRg7Hjo4k6Ae5SrcA%2BBEAKu8LPO9E6oMPD3Fp7EmnneVy0kpp79XXutdj7bisz1K3E19YpP%2FIFWEJg79JpFsiB3IrXFr5Kvc3%2BySzDlvJD%2BMAfJDE6wyQV7RHkFIXzxv9E55AZhooqfBgKywKi6lJQb7zBuyzOcG45ZyMnsj8CerD2UhR9Rdh5JiXjsPdZyyTpIyfIIkfFAP%2B2JYFAtnhV2dih5MweOlM3Tzz7oEOgWvu%2FEQbdHbc9yDwCtXESuy%2FNwdOR%2BgmThJ0Syf8XqoOz5Iis4ygH99ZSB%2FTl3h5kuziRXq7h8fQO96BCvBtBMltREVrdLUqG46ET8R5DspseemlGzPScQ6cc6nauXuC83KGJZRju5q%2F5%2BHxWrYyyo5%2BoMi0%2FMIYQH2LeiFmERXRDgjvgG6FHGX15tr8KfuxhgrDWzV4qFTpCSqCXTxu8pYMd29huHHTi6FwAyEb2NCyYCqtxY61CRLC%2FaPXYmlQxoJtGHj2b0TQssN3yLsjigYCdn5ja6N%2BDYJhHAD8LMXsj2HAFjoiBIujqFej88hvO0vfafaPttfsBHTRVqTH39uODWIJed4bC75pZ8EuiMqOUNSyMelT9YSoV5rRKspDfqaWVyJNlhntFAgAHQVtacsbRP75xxh%2FPToMJmT6c0GOqUBejE%2FxGnlViNAbyStDHDTeoyXMk2Zuv3ZElyqAHLt7h4JILa5rO9ibBfheMnwbiSm%2BgS6nhSH34T62XN5ZNDNUAQ1pI0yzI1xP3cCaY2mMvyZCNDXSAkE8cSLJtg%2Bay%2BfMUchOyNUWTnPQgZmHzMw8K0ofkcuGIvvqwrPAUGu33M7r88ar7A%2BaJpVimYh0A9C2li1Mp6c0yEllnUAW5HTO2XMbjU6&X-Amz-Signature=e3a6c1ee05c7e399f1bdeaa07da2c90139c2a0f4506cf7774e9b4be6c7421213&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWS2KMJH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIEIhxrQrxbdFfXhQ1MqU%2BJl2EthaPnfjGilg89P2lLMgAiEAhCAwkAvrKGvKv2BVc1vSGXBQSpRCt6urPZL43OwYaI0q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDBPBptnt7Fv6aZBxSSrcA%2BlWP2l8qDv%2F3uyKJOZSE5Sw3Oq%2FkPoHoikUg4kM%2FiyuVAsp3r%2FVxa%2FjWWOKFPtddrirF5VTJi5RzLRcsjO65eXxNhZ7XNHIOVkVsLY2NrG73ws8lwH3edbUaz91R1DXMHwMnrKyfRQ7xhQH4wdvrFZNJVz1LagbloOSibtZ6If4d4TlHPHjtTmtbQYk6f6tYezu7bVeVLD1VRXr6cUObdOtsb9dj2bT3YDvmDUxGJRZnbcwL7EjV6pNjFhsLfOqK%2BYIQryZqhbsvkc%2FkMOv7DR%2FAwVdRqTQa%2BOeCHtGp3fKYQG3Dp7kVPVbfNbjE34%2FbqKmSPnSGLIm0IxEqFBA5oslk4PQbVFCMogLFHBGzLCmRQhZHvVrFgKjP6LGxBrcPXzQFcYK0Fl0nW770oxkwnZ%2Bo8u%2FSz4IpmpntCeEXgH1nnMoRRfd%2BujuQ%2BFVCQrLJu9oPF492dv8KbBTS3NpKBskOJATyzvLPaAzDYMNbsSOWedGtRKUm%2BXVKqCKymAIQipa93bc9ByFxY6fRV%2BKcei6St4gKJpk%2FQ602pJST%2FF3SWI07f%2Fh%2BRnX6MhQPZUS3jQnjq5GU3SBIfHIL5IGtsCL7BszvJ5iLl72EulCYaVt5ToeD3z9X8QzB2ZfMK%2BT6c0GOqUBdyKygk%2BSiXFnsKMPoK36f9cE77oo6vNBh%2FPh5Xs7rX0ScPgVZOuxtAFgIZpbZhsFRbdWdw9b6W5rkVQhQm3B4BVgigf7xkMFxWhSyTlLAi%2F18vZQcbQCyk5If3T93VyqVUHb1UDLJp%2B39XdhQCpfDLyWPBULKK1gkW2CYMlApHsxbcgcqKBLLByIpYs1OpCyFsYJHbMkwxn%2FNtfk63Lc%2FvKnIyBZ&X-Amz-Signature=606d21214077b6a95d6a3f1828af300a39fa6992b4d1cd00035e01a982693758&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654O3PCCL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIEBgNdLnCw%2FqhIBdXlZfghvSRnLxCXIKMdlfBuShMWiPAiBLYUHJf5ulbgXIEl6ualod9l68cK64MCMljAuvc90azSr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMgKmBHst5YDFs1m%2BgKtwDK01C%2B%2BjTgryELjZvg3Cn3euARCJprgoogkFyoPXlu1MI2BEr1zRwbodwiIt7Reaiqws8qwOVJU%2BYMIp9UA%2Fp2aCX9SjEBbOK%2FO1Khso69K%2FR2LMqpPe5woZAfY8y%2FdroPG%2BwBeWR2Rwk6dmPZ1glPOOyH40fY%2F5NOldIyB2i%2BYJLW%2FaSO%2B2CF0Gyg%2FvaVKK7HglTSeegt0h0798t%2FeBWLuMiQwKUbkkHv6oI9jETBobvdbNRH53vbvc67sDtLnAdeoBjO85ZroQ3w1MaUbryef23YoIkN4N5sScNCvSgYS%2B%2BxK101HXxO2NYN7%2B97s0pAULF3RfWizbYN0qznAcxlbJZwN5oQ5nGfQWprFcjlGA1rOXDSnXQf25SMEv7PsiMBvku7rrUmvmFfVe9f1k3MyqztURPGZYSaX4i%2FcFj0%2BJfNCTr7Y1PMATv4m6pPoxJ8J%2BT2SmXHz%2Bdwtlyj4EGBfPxXlJQfAXTHKfZRI1Yw3F%2Bf3oIMMxY3FfVBvj%2FEMYLDN%2FmJgtXdlnRCe5s%2BQPPr1ApmU6rv5m9CJTSL8j8WO%2BOkXSnfdqfO7lIZxZMdIV70Y7TuA7SKY2i1dSXdpSwafG%2B7jh8imTMqrkIRiJphlHgG8jqTunH1OY4FmEwz5TpzQY6pgGng6wM%2Fqpl2Hp1d%2BWg2%2F3SYvzfsVS7iqQ5Jp%2BmWYjI4WziqJYjOFwkbJeWUxHTVVJ%2BM7yo07gNdJ3jCU7HUVuV4mscqjqMSLXY2G8FxB9IkSj2mRmrXRmoJueOt9Nk9GzPDqrk0%2BxZOJQ0YcMRNWxbEmqmLQZ4093NW71a8IHxPVAwYBTqXluDi5Eub8WFP1OGLr%2BD4k6IKk9ZsjhoV3ceudSNLg1P&X-Amz-Signature=2325d792e6c7888a519a1e75cb30b41ba4c19bc47007b67660827d48dde3d1d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654O3PCCL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIEBgNdLnCw%2FqhIBdXlZfghvSRnLxCXIKMdlfBuShMWiPAiBLYUHJf5ulbgXIEl6ualod9l68cK64MCMljAuvc90azSr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMgKmBHst5YDFs1m%2BgKtwDK01C%2B%2BjTgryELjZvg3Cn3euARCJprgoogkFyoPXlu1MI2BEr1zRwbodwiIt7Reaiqws8qwOVJU%2BYMIp9UA%2Fp2aCX9SjEBbOK%2FO1Khso69K%2FR2LMqpPe5woZAfY8y%2FdroPG%2BwBeWR2Rwk6dmPZ1glPOOyH40fY%2F5NOldIyB2i%2BYJLW%2FaSO%2B2CF0Gyg%2FvaVKK7HglTSeegt0h0798t%2FeBWLuMiQwKUbkkHv6oI9jETBobvdbNRH53vbvc67sDtLnAdeoBjO85ZroQ3w1MaUbryef23YoIkN4N5sScNCvSgYS%2B%2BxK101HXxO2NYN7%2B97s0pAULF3RfWizbYN0qznAcxlbJZwN5oQ5nGfQWprFcjlGA1rOXDSnXQf25SMEv7PsiMBvku7rrUmvmFfVe9f1k3MyqztURPGZYSaX4i%2FcFj0%2BJfNCTr7Y1PMATv4m6pPoxJ8J%2BT2SmXHz%2Bdwtlyj4EGBfPxXlJQfAXTHKfZRI1Yw3F%2Bf3oIMMxY3FfVBvj%2FEMYLDN%2FmJgtXdlnRCe5s%2BQPPr1ApmU6rv5m9CJTSL8j8WO%2BOkXSnfdqfO7lIZxZMdIV70Y7TuA7SKY2i1dSXdpSwafG%2B7jh8imTMqrkIRiJphlHgG8jqTunH1OY4FmEwz5TpzQY6pgGng6wM%2Fqpl2Hp1d%2BWg2%2F3SYvzfsVS7iqQ5Jp%2BmWYjI4WziqJYjOFwkbJeWUxHTVVJ%2BM7yo07gNdJ3jCU7HUVuV4mscqjqMSLXY2G8FxB9IkSj2mRmrXRmoJueOt9Nk9GzPDqrk0%2BxZOJQ0YcMRNWxbEmqmLQZ4093NW71a8IHxPVAwYBTqXluDi5Eub8WFP1OGLr%2BD4k6IKk9ZsjhoV3ceudSNLg1P&X-Amz-Signature=e5dbb599db9b0bf50eb03e5935b0eefff9e86c33210ae225af1f88a729d95143&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIW7OKFT%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIHhqfrLQmHI8q6ff9kJB%2B8gUCAe3dA0HR%2FrZlWXLxs69AiEAzrRfy5EGjiJLpi3Qd4vC6%2BYNak6MZl9If3MAHpr%2BKoMq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDB393xe%2BuX4lqbsFqSrcAySnqeLdbCNtpy4JrD%2BIcmj1dg2cO6PTEBrWGxGpxtsjHv9WIJI%2BhvF%2FpAhGzWlluZsE7mJvct3dcgPYyf8HN%2FxL1ogsDG8hJQlzcjoAWPmsKWJ9FkxYINuWApZYpHpEIbkFjFBtw4FaxA9nlVEg%2BxQe9W52ZFfo%2BLpPNNnFsOSKpa7%2B7eULKY8otUcLUB0Rtw7MTKY%2BV4tMlow%2Ff7ZovbWTMfhXr0uDK%2FzjnLdPniH9jcZ9biC%2BAbgoLr7%2B42TMGIlUB5Lld77QGmtMIZAJork9eZLWwqAMBZiMjIefVqFuaFmfyRHBrc1pby5Haquoydof0SY98WVhv9WcitK%2FFX%2FRO2c09aEHJ%2BDg%2FwR2T60yyYAO%2BwHXjo13W%2FZTsApR5uCWIT2Yf4zzcAEsY5hvX4kV6aaSY40ZAh77FGfJQ1xirfOEKETLrYcQDrLvRcYzPMM6UYfrN5RxFBoJ%2FNfYnzhlb8uo1kj6mmAT97NIZYNvjDnltFY5iXZNSlRZuhrWogXL1W3BJ1EWhzBP%2ByWOjyLymVjgqP1XwWCjIfqoUJBnUS%2BeO5Ofqu9HVnGR%2BptCkAaGTyJVxT6cw6x%2B8aVQgflAB39JsAiYgAAZBDpxBCqSrVEtEchQacJ%2F%2FDYVMKCU6c0GOqUBgI%2BkrVUjWyF1ozwiHl0vdYnaxNL28lNjkHu%2BbMKEeOOvaGjFUZRs1gY%2BBGNRZkUO0DsDDOlCH6l302Zb5XczYeXJMuWYdf1wk9PPtdUOsdfOjAPlbFZ1Fx9zAA8LOShUOLOjKcnh3%2FiWS6hrcuPLy149xKbkFx4VkN1w5B9OG6%2B4R5m73HnETU2iYfwNEOd61ZR1XM5vXIoqsKjjoI1DuQnYXuTM&X-Amz-Signature=be9d4680cd256357c35fe037fa6d75a30faa9fa9f1120184572cc1c80aa303da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666P3FNRWB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIAoreYF5S%2BLAY%2Fae7jhZO26eW77srxQmUooRdF6xtojyAiACBCzYR2lDEnI0Gw9nesVMFsw506sf0uqKrhE6IHJgrCr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMjgU51azj%2BK7hOWk9KtwDGatAKmwYpFwGQvLO4E%2F1vEaN54AfTeJccGr7b2fJYdrNOKPJBPbuqb9OdYAc1%2F7gcHa8V8CeKTId5%2FrVPgEJhdDnH4uVplWsl7S2eVUmteYL9DHv3OhFnYfixkbm30a%2FpIjXed%2Fy3NcgSpF9Rfd%2Bjdhha2Pxe5YY2lw%2Fi4vgAiW8UjoH6LgAVsGp1oitly8uz%2BPokuJDAelf7rXt%2Ffl9ocYs0%2FGZuSllA1j4p1U9ra3NNTtHt3OhsmxKVM9tgTgDHOl6lSHi4XEiD1kZxS9F7hRpqq%2BnzP7JZM3JYJNSNgqHS3CSiOpfG9X5auJqrrHXORLw7h6LicfJ3upwGR5Dh56qaRh6mbYQRK7lC5O1WtJYBMKTWelzi%2F%2FvK3omyq%2B3x5Aaj6Dmy9TPGkAF74Yfpoqd9HA0eX1MN4HgR1MtTjqFI7nO4VTqXV6BXh%2BnA5HYtQQkQlccO7JPhkTpY3uFJCYlQp8pWbtzgpU9%2Fguo%2F9xP7rYsGONA%2FgMc9qAsIGdHUnsLqejcg%2FDS8lyvzavKpGJElk8rCm6w8aHjsvm7Y34howze1FQEsGF66hnV0E4sRt6wiBnw%2BVtgOeZphEUhVwqsjRtxlbolqV6JMeJic1YB5bxO0N3WUrd%2FjN8w%2B5LpzQY6pgFNscSadb80hgbjAqnowFsWNEcARN1fUpBO2zpEf1kyMe0uWtW5NNkWj%2FLqRE05LhXoZ604stBbwST%2BA3hZi5CD5HwXgRCORDtbhOigLC17Mtv7riCAqgV2AVU%2BYQ7SAwWyreKm%2BcRfSvv34RzppNIcv17wz1kKJiUyOrRjJ0BRxBmTYpaXcrdrbfxzctBQQyfbp9yamt787XYnsOswfZiCJY7f49PV&X-Amz-Signature=3bc10bcd7673d92855539e0e0e4903f12ca660612b594d1422494321218b8f44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665W6STUH3%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDX80N%2BuSmFArCG%2FlST8VN7JDQ12tRumQ%2BGWiCg3xBT4QIgaPPJSSxFK0SJNSwwHjmOEMVrAjFa1a93f2ikowlDRLcq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDEZgGreq7rZFdmlT9yrcAzwyg9%2FvCvVDDo6fWWQ3E6Yt7ibdXu0KCUoy2iJZi9w81W5Lv2ybRPhE%2B2c1JQfL3UIvQI121NnXcAUmNUFYtosJIfRQyJiLrXq8Y4npLV0hMQWIYyTtOQWfBpilarIJgHUdUWurKGeDiYjnQOD3Y%2FUjfEhm24n%2BUTYR9HqPjwiXpqEyu767GC5YZVwYtoF7FFFiCfx1BDSnpuWGcfdfCYmTyLZn%2Fl2z%2FL1Zv10FRj2wXGO0gr2C3yoTd0WXSrp71tykCwJhDw%2B68exEmXl8JYnB1ycQvPGyTaihA0ssbKlELZUevDbjg4tNdWEPYGTBHikDfHRgkafbLv2oGNk%2B6K212JyTGi8M8jnh6o8UDSWkHKOPhk1YplNkrtspukywN2FOJWyiJdPP9bdPJA4trztUtw2OJEk%2BQ3yYKjB7Wj7m6S0zZ1bD5XfqsKsLiAV01IYH9HyEW4u4WfNv6O2PJezmXB96D3MYoGBxLhvLOtTZ3RtPa8B2gw9kIiZLWlcg%2Fpgi3v%2BkvqAv3uVYB9kZqwjS6siRaIqxOhL8CEKipQspxcVBSgxSclRCMBZuzgNquMiYxo4fxS4qRsEe%2Bo3VV1Wih2uHAsf4e9q03bpW6Wodt0T7%2Fr2bdFbQ5ARtMIaU6c0GOqUBOP7ekuGVI0nhb5dF3991uiqG6U0b9vWrSHySFtGggmO3QNwPV34VP7O21MXrNwIwHGI53%2BYympHr9fWzvLmYTf1GvyxKmy7jHpYUc%2B6XRPDYNGmn%2FdhVB%2F2rwptLXmRM5TKaHglyrTN8bDgoJow%2BFlxQWl5fktvDGISZVtN9vfzYbSKM6FqVXGyeT4YTvKvxA9SDoBfYKbPxPF4OgoH3n2mmo9ka&X-Amz-Signature=d3a830d8a507bc25e3d4d60221ab04557cd5b9e295a9543e2cc3e8da3836810f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466275QTQO5%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCrCMH4836GJxJewXMU%2FowVIlpWdOVPOCyp95LO7bVFkQIhAP7AUxT%2F4m37s68u%2FGexiRkZDXByk%2F657jYXjtYjrDexKv8DCAAQABoMNjM3NDIzMTgzODA1IgxJH3KgLOWVCLrPPPcq3APlgT80CAwQc964TfMDgkPQliH8baNzE%2BH4V4HXSxc%2BKvK5BxpgjRPMVcyOb3ycqlFQLbz%2BChfw3VwcQPeqpXN2aD55NFkRorZMWCVjfJkDrN3NIj%2BTxhkcSgmfHjUmwFMZlzhlqRVCCUSMKHwO%2F%2B%2FtYWawT3FVxrmXPc1hQO73K60tioNkuZ%2FGEhtaY6S6je%2BSbZAjJWpLoV7a9ehaZrYov0xksxIZshQgMwPJ9wH49Q0zLC8Aq2YOlTy9c%2Bal44SZdQrtLxjQ7TbmVgNDP0lBJm7wTTDTa9yYwgDQIbWkVmM4%2BbeRtp3ch3pxuNHvUfQYQ%2BOXOxSrbs56imEUtEevLteYqc567KAx5AUIX95n6hrmszjLdKToJgoXU4286k9k9keiCi%2BAQ0V2Hm%2FeJ2GbVbytdZBHZFk8b1JpnBxyG8%2BNpmopcdKGkWkEMJ%2BdGInVx25gIZ%2BjrUK1%2B48gJRloH9o7tWX%2Fi%2BZ%2BNZR0xxdFV2nudG58pySgyF5X%2F%2FfIvNevca%2FLl9Q%2FR0ibs48rEN9cs42prFZv6z3hURiOniyWZgF%2FYDxH01R0w89KDvJIZXZm7DTOq%2FQE%2Fit0mcaQuu1THdp4fRmLMZXhAc5KO%2FzYDzkGq4Pkv%2FHLngabMDDZlOnNBjqkAV9VNE4l7tMl2cpMlyx%2BHhyoP%2F8iiPL2s2WmX5liKrzdN2f%2Bps%2Biug4DBJw0wKtbW5SMgPcg6e708ZREXaqechptnnsytEgVj8nrSv%2BWLmfQlHr7AwMPoWR8WTLLPTTXWVRF0qjmX29BZdSkBsXP6yJ0EPYzpr1zK5Js2EH2qDbXEv5o5nbRWrTSFq5RO6MceFD3BJ55xpfGNsQ%2Br44cmxzEW5O%2B&X-Amz-Signature=6c8489ab43740ed10966331ea6e5f049a64af48cbfc708ecb1d5d3c6c3985cfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466275QTQO5%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQCrCMH4836GJxJewXMU%2FowVIlpWdOVPOCyp95LO7bVFkQIhAP7AUxT%2F4m37s68u%2FGexiRkZDXByk%2F657jYXjtYjrDexKv8DCAAQABoMNjM3NDIzMTgzODA1IgxJH3KgLOWVCLrPPPcq3APlgT80CAwQc964TfMDgkPQliH8baNzE%2BH4V4HXSxc%2BKvK5BxpgjRPMVcyOb3ycqlFQLbz%2BChfw3VwcQPeqpXN2aD55NFkRorZMWCVjfJkDrN3NIj%2BTxhkcSgmfHjUmwFMZlzhlqRVCCUSMKHwO%2F%2B%2FtYWawT3FVxrmXPc1hQO73K60tioNkuZ%2FGEhtaY6S6je%2BSbZAjJWpLoV7a9ehaZrYov0xksxIZshQgMwPJ9wH49Q0zLC8Aq2YOlTy9c%2Bal44SZdQrtLxjQ7TbmVgNDP0lBJm7wTTDTa9yYwgDQIbWkVmM4%2BbeRtp3ch3pxuNHvUfQYQ%2BOXOxSrbs56imEUtEevLteYqc567KAx5AUIX95n6hrmszjLdKToJgoXU4286k9k9keiCi%2BAQ0V2Hm%2FeJ2GbVbytdZBHZFk8b1JpnBxyG8%2BNpmopcdKGkWkEMJ%2BdGInVx25gIZ%2BjrUK1%2B48gJRloH9o7tWX%2Fi%2BZ%2BNZR0xxdFV2nudG58pySgyF5X%2F%2FfIvNevca%2FLl9Q%2FR0ibs48rEN9cs42prFZv6z3hURiOniyWZgF%2FYDxH01R0w89KDvJIZXZm7DTOq%2FQE%2Fit0mcaQuu1THdp4fRmLMZXhAc5KO%2FzYDzkGq4Pkv%2FHLngabMDDZlOnNBjqkAV9VNE4l7tMl2cpMlyx%2BHhyoP%2F8iiPL2s2WmX5liKrzdN2f%2Bps%2Biug4DBJw0wKtbW5SMgPcg6e708ZREXaqechptnnsytEgVj8nrSv%2BWLmfQlHr7AwMPoWR8WTLLPTTXWVRF0qjmX29BZdSkBsXP6yJ0EPYzpr1zK5Js2EH2qDbXEv5o5nbRWrTSFq5RO6MceFD3BJ55xpfGNsQ%2Br44cmxzEW5O%2B&X-Amz-Signature=f8b6a6473a1eab115f8453d592d34258e73d5371e8807574bb3e1e246fa41723&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWVDR5IF%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIEDVJQCsedU4ENIiiEfEhRDFcsc9Xlg4IGxg8rDxEr21AiEA4pDtl9NqFHzn4zYO2b%2BWJNjfQbRBxOn5om5ffHA1G0wq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDBydKyaMBaXaa8a%2BtCrcAw12apdVpfEvFzi38d2tCeqdPk8TLrfe%2BD11y2fza1PLVoziakKuNBLvkmvtTi%2BRiF6MmxDFIrGGvb6O%2Fm5EsJcUkM3ULxNY8AgjT2E9q3FslA%2FkvOt0ckePds1rE%2BZyQKeJDtS%2F7KgIf1ei%2FzXQEkZPlnO%2ByR4BpyG%2BRl3RuIqR7BcsS3sfrDgQzIA2uicZ2t74thZLSw2uSkFKnwP4HQEn27TXq4hb9SRkgBhqHKCI8Yw6qR7NizDdG0VMstYYeb8uBCFL4lwODlN9hp2LA4SQLrGbTudkF6BWfLbKHyAWtARx3OA8kc%2F%2FR8Wppi3thZY3h9pV7Fe5S5zn2pAAZqPGcYptCCiUhTfSe3DislNZ2K5DvKNtmKbNq7vyfLpvMaruuymvkTHOKMU2JzUYh49Sowuqu%2FwN35b80I7qJ2j0zojM4D4KrzpAcTW4bHHsJa7qpjJb0oxurMTvNoKLghpKaW%2BJGaJoUs2PsAQEVgpX%2BpSIRELVaP8E%2Biqa2RgwqucmllfNe6rC4ZBXZD9F93L8YjGBkwh9%2F5Zf8ZO%2FM7cUC0aDm2RYxuUTCbfA0cVX26rkLewG8XBz%2FTxQqtsM3YkL3UV9l3wQZ2NSoqkqkEPbP3Q%2Fbf5mv4SbbF70MKaT6c0GOqUBEH%2FR1BmAJBdXjFun8jnMiw5AzGT7jhx1OlAPWZrx%2FYiSKB7O%2FZaHYHbOe2HGsLci8NbAXcfYnG0zroT4tQyRnywaDeYWe7oMwUuX4hJ8WE5ZeP2miYrBi2O9Auysav5HvByzwmPO3YZN%2BWfNp4jDyfUavMfv69dYbbYxDVRckEukB2Ul%2BRm2hgkkqA8YPt%2BVzy4v%2Fmy5zf6qTyU%2FXPCoxRaavKPO&X-Amz-Signature=18d373e4ffbaf7b35da2896f9242212a4e9fc55b6d1dcd031a1aa79e4e0cbac8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB6XS3QH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCY5Fe3qXX1VG9v9L0m9U7RcgyMWQLH9PYcijsRUq7S0wIgEa9zYoXAOHWC9sfMDGWKstSWnRHqbVgXUdFBP8rym8Qq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDN8XN4Vui01vKb0hmyrcA8%2BsQ6KLuLuVlJCF8W0LxgsF8Zw7aO%2BbcjuHv0gslx78uGHo2c3ekV7XarAku91H3hNt5JM93BYbPA8Q%2Bnuc0S1fbPfea4rk8oRNtkRLjYCC1tful1%2FrL8TndEEpWk7IwJPaEsyA3Me66%2BBplvOyjls89X%2BUcezoszEiqg0DcvcimbDqfMhWNYn9iFJb9i2fM9ENpBV71kuD5P8SkeH7M1EgxWUV3pt1yDanjdp%2FQ1p3GlOZeTnXJzBzLdMOA8Hqu3HTzU%2F5PHF4KKdp2eElWRSeqXMUcgOVtsiVx225CeBcUqDEb3Nep1ANNgf3u9lN%2Ble%2BO52l28T9kWCAE3CB7x6PQpMx9kpgVjm8YXhijx4yNnFgZsy2em4LL%2FZInYOgvOMajhrrYADUOVmZDor7XY6rdDP4oV3Lr%2F62NS5MGg2lHGgwJlmsBZIe8GqAtqG74pRsvU%2FUnpEmAh1Tsq46mzKcLkcVPW66MQpAN8e%2BqReeRk1R4ztv%2BFuBbmd16myiGRCmDtD00v3ia06ZcWe%2BixBvHmhiGQOXTgl6ZTk5FqkcipLY5UcykKvh72WbFyzvvqRKc7WUwKU3MteXJl%2Bb4LpVVRtqocRXZNibqbet1sdvrzQUrZ8V9XHjkHfyML6T6c0GOqUBf0GWUDr0yCEaIrJL2n1X5txZKpDYEKIW5BgxSfd2FCSvf%2Bs75FGEznc59ALD8TPlH0194EOaXtj70bgqZHEcZ4wLhk3aE%2Bg7ythtESPnrN4gLXVeR3QJj9eScMVRwwJ3M3HrEnObOT%2FMDTzmYoG7MFKW8P0%2FL2SaC7Z8wevQIXsscM7Y5ckEXAB26qfQq0jkuuwwGHBbkmwhf%2BD%2BJsLlf9i%2Bbwsk&X-Amz-Signature=cec36443cb1a6445f7e3659dc63ae5863c84ff2997b1230d135ace850f034de7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB6XS3QH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQCY5Fe3qXX1VG9v9L0m9U7RcgyMWQLH9PYcijsRUq7S0wIgEa9zYoXAOHWC9sfMDGWKstSWnRHqbVgXUdFBP8rym8Qq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDN8XN4Vui01vKb0hmyrcA8%2BsQ6KLuLuVlJCF8W0LxgsF8Zw7aO%2BbcjuHv0gslx78uGHo2c3ekV7XarAku91H3hNt5JM93BYbPA8Q%2Bnuc0S1fbPfea4rk8oRNtkRLjYCC1tful1%2FrL8TndEEpWk7IwJPaEsyA3Me66%2BBplvOyjls89X%2BUcezoszEiqg0DcvcimbDqfMhWNYn9iFJb9i2fM9ENpBV71kuD5P8SkeH7M1EgxWUV3pt1yDanjdp%2FQ1p3GlOZeTnXJzBzLdMOA8Hqu3HTzU%2F5PHF4KKdp2eElWRSeqXMUcgOVtsiVx225CeBcUqDEb3Nep1ANNgf3u9lN%2Ble%2BO52l28T9kWCAE3CB7x6PQpMx9kpgVjm8YXhijx4yNnFgZsy2em4LL%2FZInYOgvOMajhrrYADUOVmZDor7XY6rdDP4oV3Lr%2F62NS5MGg2lHGgwJlmsBZIe8GqAtqG74pRsvU%2FUnpEmAh1Tsq46mzKcLkcVPW66MQpAN8e%2BqReeRk1R4ztv%2BFuBbmd16myiGRCmDtD00v3ia06ZcWe%2BixBvHmhiGQOXTgl6ZTk5FqkcipLY5UcykKvh72WbFyzvvqRKc7WUwKU3MteXJl%2Bb4LpVVRtqocRXZNibqbet1sdvrzQUrZ8V9XHjkHfyML6T6c0GOqUBf0GWUDr0yCEaIrJL2n1X5txZKpDYEKIW5BgxSfd2FCSvf%2Bs75FGEznc59ALD8TPlH0194EOaXtj70bgqZHEcZ4wLhk3aE%2Bg7ythtESPnrN4gLXVeR3QJj9eScMVRwwJ3M3HrEnObOT%2FMDTzmYoG7MFKW8P0%2FL2SaC7Z8wevQIXsscM7Y5ckEXAB26qfQq0jkuuwwGHBbkmwhf%2BD%2BJsLlf9i%2Bbwsk&X-Amz-Signature=cec36443cb1a6445f7e3659dc63ae5863c84ff2997b1230d135ace850f034de7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662LWCAQHY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T074234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIHe7goYHMgl61BefjHCx1NDBV%2Bq8uwiP6eccgFqATv8%2FAiEArMCguBrKJl0YldxY%2BIUxdykbZv7xv7vj2arCR6sHcfcq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDKa%2BIUCPF7BoixpivSrcA7TtD0Po3FWxNxj4kDkmzZtUp9%2BX0P%2Fo9UQr8AxaM3BAMCmRlKmi%2BvrkmRALg0oH1LlGOhrx8mE5%2F3nvqw3YjG2zET1NShLZq5445d76Vry%2BTTiM5%2Bjy6olgSpPI392MTVuCG%2Fg2Lmb7%2BujhCte%2BcYUv62WhFqDjOFeJhl76E4BXPo%2F3pi2fzoyOhP9%2BIF3CG1hwWagEyymGb96igpWJ2uBAFMgKhuS5wcpCMcmOgNjGHFBS%2FRWwiaMlCGC3dEPnbt%2Fg%2Bw1%2FPjAdDDZEa%2BsOrDoIur3GKMNyRsYBLKcQksRlL%2F5GXbSyL0SQxiokj%2F7C7qIVO1QjMEpmo5zccKSTSD%2Fn9PswrlDovoPnHDvQCByFgxOhw3ywSMC8tsmZH2u4AbY%2BmT7j4upe4cGn5eWr%2FAMHlEEA4m9CXtPH2JFB9PlARO4suVKMBjff5dwAZpkOc8Eg%2FsNgp9d%2BYVtsmVexYTIJIHgEeaj4ixxa0TrEearMRZblhfVAQlBsYY%2Fx0RHWGmJhqOlUpszkZlf8ZTggg8rtha2vzAN1qCr5PdZhC7nCFeEgqqSf0fV5BHYaKqtbOypzBZWyBZxr5fqyZPFqgvv8DPiaLrkd5vfxi5q4aoPEZm43JWJTrgvEXYqSMKiU6c0GOqUBJpWAS8KmmCbi8aBIxOw%2F4DUuanCAzMlpDO0QpTdxgvsNRFEUrgqeNQHlbo6F9sxfk1wg0b4RUdAi0cYxfH6ih%2FWAJVlakRSjpSOx95xboV5FwEirESq4PJaMr7CJQGprmku6%2BD6xt1V5uk1y5QJNVYCFq%2BpsnEFthPkB4JrI5s3JSsgW0BuA0oF9QiLwpF0%2FEYGs7ztlpZD6TBTVakA0JGw2Fayc&X-Amz-Signature=86218ed2889c29f93319090b6e423145ed501496103e588dd3b01079f00c1ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

