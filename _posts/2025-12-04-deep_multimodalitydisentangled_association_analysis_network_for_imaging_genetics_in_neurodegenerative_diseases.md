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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z32473LV%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIC9Siv7RfTK82zdf8xPYKozE9qzaH38XU8UxIE%2Fpk9b8AiEA5jM%2FjngkOSLMSqAvmsIm32KZlvyYSl9rRpCdNHqFP1gqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPgabecwGfJn6Wtc6CrcA7PXJiG27rFQruvaaxMv4F%2FjzyfyGqf%2Fs89a9aH4jSs5lXCOP3rsCGgxF%2FGfEMyRXHSMCLtbu2hLUP7of5CmSCgPV4QLAs8DgI24okOiupzcEAgiSfVBCikY1BtJC8j4G4Gi9nChWx9uy%2BuWqYoC3VdRPl1rf7QNUx7qAx6hLHVspXy3uUtSoXyCPuyj1gA%2BEZKAO%2B6emtvAUqpH7nuMV8zJG%2FtO0BevO3uCjbmEqkIv1WxBGCAFB7r6ba2Y1IAEPc9V41bCN9xU%2Fn1WigU33vRvIuTeDXhkSrqOFz0Tpvtz%2FzOYvYMio%2BrB%2F%2BBOuTco2fFysgK6d1cDgi%2FSWURgKL9iJiCP8AWOOGJZPTtm5OObgIbOk04ETNn7EcfolSup6Re6940mEnmWWye7s1FBkeGhVP0GniKmhZ234SayERb1EYW8hGHENa3zP8qZDcJssdkygd%2BnVYzvYas%2FmmaO7%2BonQWcn%2BxpPYsiJHctW9AJGnrlqeVeGwWniv5QD5bpQ2FJH3iEhRwUZs7VQCQZvev%2FhTfwh1g%2FpbsQ3Fr66h2wbhPIrLdMn%2FnZKrIuFhcxDYOFvU%2BJJinVGCoiz2fjCuhzZcbwL3qUaP%2FayC1A2hiYSoLVv%2FJy8WOayHLVaMIavvMwGOqUB3%2FeI5tGnZbHHvhXwEqef8%2BDY0TcWrLoYVLXciLsQR6a2ldzfsj9hXtrm09itANJsapziRlQf0RiylcMDGa%2FoIOFInHOP3iJPXCJ5ciKNtRo%2BJ0UukoagNxfdL509sHg0G%2BoJf8X4sX4pfDeJIpF%2FzVL1Qujgo4vRwSqaUUc2p11nR7TevOwbpHnACpOcv%2FixxDei34JWya4O3gONKykW85VNfI3w&X-Amz-Signature=5467a701523d00c2c88c5b7721fdc618c117f2fc8520f4f5d20e4575c47e47e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z32473LV%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIC9Siv7RfTK82zdf8xPYKozE9qzaH38XU8UxIE%2Fpk9b8AiEA5jM%2FjngkOSLMSqAvmsIm32KZlvyYSl9rRpCdNHqFP1gqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPgabecwGfJn6Wtc6CrcA7PXJiG27rFQruvaaxMv4F%2FjzyfyGqf%2Fs89a9aH4jSs5lXCOP3rsCGgxF%2FGfEMyRXHSMCLtbu2hLUP7of5CmSCgPV4QLAs8DgI24okOiupzcEAgiSfVBCikY1BtJC8j4G4Gi9nChWx9uy%2BuWqYoC3VdRPl1rf7QNUx7qAx6hLHVspXy3uUtSoXyCPuyj1gA%2BEZKAO%2B6emtvAUqpH7nuMV8zJG%2FtO0BevO3uCjbmEqkIv1WxBGCAFB7r6ba2Y1IAEPc9V41bCN9xU%2Fn1WigU33vRvIuTeDXhkSrqOFz0Tpvtz%2FzOYvYMio%2BrB%2F%2BBOuTco2fFysgK6d1cDgi%2FSWURgKL9iJiCP8AWOOGJZPTtm5OObgIbOk04ETNn7EcfolSup6Re6940mEnmWWye7s1FBkeGhVP0GniKmhZ234SayERb1EYW8hGHENa3zP8qZDcJssdkygd%2BnVYzvYas%2FmmaO7%2BonQWcn%2BxpPYsiJHctW9AJGnrlqeVeGwWniv5QD5bpQ2FJH3iEhRwUZs7VQCQZvev%2FhTfwh1g%2FpbsQ3Fr66h2wbhPIrLdMn%2FnZKrIuFhcxDYOFvU%2BJJinVGCoiz2fjCuhzZcbwL3qUaP%2FayC1A2hiYSoLVv%2FJy8WOayHLVaMIavvMwGOqUB3%2FeI5tGnZbHHvhXwEqef8%2BDY0TcWrLoYVLXciLsQR6a2ldzfsj9hXtrm09itANJsapziRlQf0RiylcMDGa%2FoIOFInHOP3iJPXCJ5ciKNtRo%2BJ0UukoagNxfdL509sHg0G%2BoJf8X4sX4pfDeJIpF%2FzVL1Qujgo4vRwSqaUUc2p11nR7TevOwbpHnACpOcv%2FixxDei34JWya4O3gONKykW85VNfI3w&X-Amz-Signature=5467a701523d00c2c88c5b7721fdc618c117f2fc8520f4f5d20e4575c47e47e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HT7OQFY%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQCa9k7TYjnJd4xEE4t5lM1t3FInn1uiW7RLkoSUI00UJwIhANPzNCjpoTfcUL5Vcy4XqVh8egOng3lMPTwBwJxo%2BSnMKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwNhzIEKaOu2RWIzDgq3APFrHiMFMGxMGFdRZxUsArUpYAJ%2BHprBzc3TeRzXjt3C30DKn6H5Uies5sCIFqXdamaOV5q53UM%2FguxxV9jn7Sv9XYwBdTHcaw05gvi7ZL39w%2F4kToOFSSGeLEo84vZXbrCn801RYB942LAuWHiTP9zr22WBztE13M4NdGIpF%2FzknrJHqCTG0G2CrvCIMFh9v2cjTIex3CVafj98XNmTSROrUu0XmOVQABbBSHfe%2BKgx0Acf4QxbuzuIbPUn6olHrewCt8H29FVAY97%2BKI5kRibDGMziX9BK%2Bwd%2BsQ0wJ6bBCKgJ5PBpDAmWJZhH%2F743PtDChIckOOfsNznbBvg%2B62GdFv5w2cOEl7Cgs8%2FZ3RWyUephZAx8MvmYArdokV2Uxmj%2B6ynj0YoT8F5TuBo2Q7up6ejBDrR9Lqhmi3fp5mq9NF%2BgmLcK9GrVRhTHDXTIM9%2FOzuuR0cJbbR8oMc32ALoB51RYIJgFeMVIpAj5N7rzE16YzfR0Fj8N%2BP%2FUX%2B7H85s4LWliOCvY2Gc2NEYslYds%2FkxYuGObFk4XWZh8DHIfNhy5ZEuTuTzjxJ3ciYaxV6F9KlfJvu5DyP6%2FWiE9WqWtSroQGic5r%2BbqxPrs0fqYvVSG2sfO9c5iy3Y8zCpr7zMBjqkASkUHAuR%2BK4Uz%2FZWuYFSFkDLR76nnDOsuoBdpgRi1a9tr1v%2FE3I59k4DS92duq1ptHd7SSPwJClWhMQlWec88WxWkE1KATrRf9JW07ExpL%2BoLAjBAIDYshvAsRq3jtja%2BFrzMAGP9IwIH6OziV5FngPmKOdc%2BqNtc60%2F3WK%2F3Wqb0iTMv3UX03tvRgLgYjS6wnBDERrjGdtCaJfYkLuYKOzf86Yv&X-Amz-Signature=32683453f53a0f17f17ab96d19b417f7a9401d31e735adfa4cf9af7d02dd85a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S22T4MKE%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIGwmI7y9BZvQBzGyLoIS%2BO%2BM08yHrgUkyWkDTZIspi8IAiEAsHj1aDd1TbsA9hXNAe6mT0sXWMavBKpFUxlizTOog1wqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIFF75n5Ei79S6ADaircA9b%2BVQg6Je3UpKZurKmUifTQQkgnWKaLolmrl69bnhyX7z95vCcd1LF7Go%2FkmWurWjO1TWbEabI4VVZ7ubVLat%2FoyqJrG2FkGevu4%2FqAitBjMZ%2Bar2%2BjAlTxsKGFVjV6JdoHQGUBg8JIIZgXcqwWDS2XpwBdQeIZ3xT1n0%2FF7Brs32Vo46aMGycC3K5DZAkAilVoMThL2T3KEMpmTFqVZvXPPvzPXscv3M0eeCXGXfhYCJa%2BbRWxvHqMiGpmgWR3LgGC5nUl5plHt8gxmB7hsmlyUrk%2B%2F2SsdE4VrSwY4fKHYAZWxR1RNuITi%2Brr3xrG7iulSOXm9mVLQmcre5%2F%2FpoUckzd3hTusZUnsclyuK9tZToodDVv%2BMxA8ZBneFCdvdNwbbDSwCoghlbKEAdMTj2Yln8Mh%2F6bVHugWNWfVJOVIdHsx05mHi12P4hmwJsvgV0NH%2B7IumxpLnUAZ0F1jfSIFmq62yP52gL9BRjNEKHyAc5%2F7PRQBySS%2Bp%2BdYy5HROD19ptiyMb7Oam3sDou3CRpNCMkZQtlpDHl0kApEmcvAKIQm%2FCXJXp4LA%2FF8eKUugpaUv4kUoiPDoUYdOCXUV3JdJMmBVrWJWwtzwc%2Fffa7otzYnSS7CBa1u6KtRMMmvvMwGOqUBXji6CujDctSZa7A5qHKZFHqDAdNzYvuKobMKmoyesxT8JD%2BjgWk%2B%2B3k7woIE%2FGcil3pnhNvlYBnsduOWeeLLkuOpJVbnyTNyTSE3ky9bgZVgnmwCB83SAuKpNjtT0RPHvsRcimBWAI5njW6qI2%2FzPLWNc3uvdLM%2BFVEcoyy0ClARjClCfuLsD630O%2FhfI%2Bgrcrobps4HKf9BA%2FpV9LjswCZ1CXrc&X-Amz-Signature=1adc20c773fd95bf69d78a3caa92f157f6b0137a2edf3ba2c602f039506ee582&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S22T4MKE%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIGwmI7y9BZvQBzGyLoIS%2BO%2BM08yHrgUkyWkDTZIspi8IAiEAsHj1aDd1TbsA9hXNAe6mT0sXWMavBKpFUxlizTOog1wqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIFF75n5Ei79S6ADaircA9b%2BVQg6Je3UpKZurKmUifTQQkgnWKaLolmrl69bnhyX7z95vCcd1LF7Go%2FkmWurWjO1TWbEabI4VVZ7ubVLat%2FoyqJrG2FkGevu4%2FqAitBjMZ%2Bar2%2BjAlTxsKGFVjV6JdoHQGUBg8JIIZgXcqwWDS2XpwBdQeIZ3xT1n0%2FF7Brs32Vo46aMGycC3K5DZAkAilVoMThL2T3KEMpmTFqVZvXPPvzPXscv3M0eeCXGXfhYCJa%2BbRWxvHqMiGpmgWR3LgGC5nUl5plHt8gxmB7hsmlyUrk%2B%2F2SsdE4VrSwY4fKHYAZWxR1RNuITi%2Brr3xrG7iulSOXm9mVLQmcre5%2F%2FpoUckzd3hTusZUnsclyuK9tZToodDVv%2BMxA8ZBneFCdvdNwbbDSwCoghlbKEAdMTj2Yln8Mh%2F6bVHugWNWfVJOVIdHsx05mHi12P4hmwJsvgV0NH%2B7IumxpLnUAZ0F1jfSIFmq62yP52gL9BRjNEKHyAc5%2F7PRQBySS%2Bp%2BdYy5HROD19ptiyMb7Oam3sDou3CRpNCMkZQtlpDHl0kApEmcvAKIQm%2FCXJXp4LA%2FF8eKUugpaUv4kUoiPDoUYdOCXUV3JdJMmBVrWJWwtzwc%2Fffa7otzYnSS7CBa1u6KtRMMmvvMwGOqUBXji6CujDctSZa7A5qHKZFHqDAdNzYvuKobMKmoyesxT8JD%2BjgWk%2B%2B3k7woIE%2FGcil3pnhNvlYBnsduOWeeLLkuOpJVbnyTNyTSE3ky9bgZVgnmwCB83SAuKpNjtT0RPHvsRcimBWAI5njW6qI2%2FzPLWNc3uvdLM%2BFVEcoyy0ClARjClCfuLsD630O%2FhfI%2Bgrcrobps4HKf9BA%2FpV9LjswCZ1CXrc&X-Amz-Signature=b969d037d898d70ca1abf262bd549862ae1a9ace4a29b7bc54953b844c94a5c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4MTPPBU%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQC5e1vDqjFWz6EBYkmBKF6jrWiW7oU5aT%2FEicZHkfM8EAIgAPXzTLUXA074Q2u3i7BYtWcyS%2B5FQOVVO0AlJFyViM4qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBhYgwjtGkkfHV6zqyrcA4%2FO74nJnzwRV39OMDlGwwF34n5wr4%2BzPaibwCX%2FD1DuPRSWXl5cf3ZXlf43ZjXhZ5rU3F7W4fXKmoYlM0JRZAisOt3vmv%2FieU%2FLD86iYDXIBLauG1RYfnRmyHugs8%2FIb%2BOC6MTspjKJF5qcuR160NU4hcHGrSkEdDIN2a8Bkz5%2FEwHY6IYwB3NKwIx0hfiyjbnSul1XY4%2FE6pXgCNns6FZsiTPBRmkLQgjhs95lkFmnQZmcl9w%2FZCtO0mzQcYhLChyBowQrO2cpNllVxY9q6ztsX6ocLTcC5x%2FPi3SBAfLDl7RHF8um1ZO%2BfdSuL3skwXvNkau9SgAKLoKzVip7U%2BabuiCSTOJPueJe22aWGqfJwPP2ELFhPHKE9yFCy%2FfTKZwaHQxgos0WyTRzxdk49DG18qfTkn4Qt9q20WGEumt5OddUTf70rV%2FqwIjxZ%2FsNhRE5DiVvg6i4%2BcA9TsXV9JrlJKHqBUXxJbvvV2TtkDlCcdkqr%2FWQVioq9MCBDDst2VZafc7qMitddtA7FT9cU1lcGqYZM9UGmXrhqoaapEcW4us0%2BDHe0kEHmBo7vPgvIW9FI2Ke205EC8R0WnXbITT9o8vpMeKnMMOFXlmFlp%2FLzlwZPV7wW4w%2FAt4yMLuuvMwGOqUBuXmP%2B4DcPs%2BS8amNrDMuhHUxG8sCPSlWc%2F9tMTQZcOtXXiRO4yoDsqMN5VxvTfICn%2Fe9XVENcYCBD%2FlaGpdH9E9dX4Clp6%2FCV5IczRrh1Smtc0BRg%2BMTiZRfdn4lJm3bVVNG7%2BS9twhckf7VG2CbmGFgk%2BolXTgX28zY%2BhiO5JEBpgmcrGQ59yVf3NwGhzb8izPPEBgz2vtG6fAMxn37%2BOS23Nby&X-Amz-Signature=577da4a9ccb1ac6cb83a6584fc40ab232edfab82aa61865b44c6b5a2a29a3852&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y47VM5CL%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQDC4H6PVc41Io0AdPqy0xBOk2mBKdXRBNgTMfGKUxneHAIhAPi3GvC65f0iLe9fKjp%2BC6Wc4CmqSkBMVscY4jSn5ryJKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWYDg9b%2Breldzzq7Aq3APT6Noihd9mchKXI7OIWuRm1QKdOby8mm%2Bop8lsUAjs83lBx7EBqJuGldxhvfdDwhDkwLezrQdmgYXfhHQqXzBj0dgXAjIIEeACIP9098a7DyF8FBDFkVZowLU8kbZTHExAcaEAOkWQvmpJan%2BERdZMmj4We2Miut7LKNLoZj%2B2b13YGksJwJYb26R340ulFfykAvB2BNEUOWVvpBSMpdAlZE%2FKrV5FIBaLzymH4AiIyFx3ZPPKXpDsVF8oFYwX6BTK4bOUx0SYRCBtb0ssArWHlVBJfHJz16H4iio9KgpoK%2BI0OkjfJHOyH%2FQRrLWA2y3P5mR6OXlilMSXIgJiWsRVUlhS5aiR2SSx%2BnJKhZUlVDdNSop29pHaDM6yh6KyvuGgVd5KXleFaxIgZlGGdbub5qbkf4QiILtrUlbR7kUG1PFeXsBgIxCrqPp8ow8rJRhcjqJJPH%2F6wh5ZkXEYXQbUYBZ42O6cv3mAFjIdymdy7P0bH0DRD5E8I%2FcG%2B060XIqxY4c5PoH4uDhuAYcyJGg2p8WAjtzsFSBYMBnA73DCcWINUPvGlCCeQOeI7eejQfiRz47zYlVKKb57oxTTLY6R2iVMHE%2FCDbK5bhu36OXaDLq0savT8WKGsxaO6jCWr7zMBjqkARqTY4pcBAs3KFOHAADxtI4R4BmG%2FTPgTKC44Ip5ZVbPJEh1%2B%2BMivBW81JYW8nCeB%2B8Q4FLawzgDdw2GwQVGhhIYTr3A6rOeTbJ8gnsFaHht1DSx97bx%2FIr7km2QdmrvF6qrv5rD%2FdH4kxRJ4KZweT0ZdfqKIlkkNOVZnGEJ6in0TjpiOo1DOcuan%2Bz9GIwWhUlV9p4zwXHjQvc8rcDt6kmc2tw8&X-Amz-Signature=74f86b5a8e030d7870938b93601b14d1879f64b6d37e9d03dd585c378f9ab000&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466374EFZJQ%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCIAX9eZx0RWQJrU2RdyFPeIWI%2FhiaytOwoe4axpJMudu%2BAiBpJOh%2Bb6LSjryJYBZTVwk4Y%2FbLEAH4Wr%2BMUcHW7lonjCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0Rj3gDi%2FiSRbzh4NKtwDrsilfe4yeeHveDFOd1EFZv9We7HIquzE2cswexGzmt86Nm1kX6j3n5EQ4n96W9Kp3hHAjofT3XDKcko0QFvr40V7anBA48rcCJKQnxFIK6P9iyjPD5HrTRrjJBZoF4JHyS9JHjwnT%2FBoxNEjW%2FjgorfWgwozaqIq79UWl%2BAOQhwBrL%2F6pK6ZLuKsGugDKNH69%2B%2Bu9zkp6efwD9SFgukZlDaEkkHBxBTHucGPCUQ0LTuixF8WKCxeBf3TOIko%2BzK15bH1vLEM6sXz2O0ga6Bhkc6UKI7ieSwcrTRh8kxsznGZBdQyMXAe8xMNz8sihxKjFHdFddg52TWc5gdtiKLojkVV%2B4a7lLaUFfnvb%2FjywNd4TlonTC7gzhZzx1wX%2FQPCpJ0n4XtgsBe1Gn%2FLm8F5bDXCH9MbemUdIfsMukyuofD8LM%2BJU4us5dqEmaDASxoSip71uuwynvGFvfiRDwTGnsXYnK9X9ZAzknqJuror8AGUXlV6GFo0um82MPK5fa11ZH2KUTGVZaj40K42SF5acmhSmfA%2BFSpYLcT0uttf%2BRpGQY0NVjH6roBFsrwByrxlDwZnbDW%2BRud4rmwHqLgYlnxWaloiPVxHnqWOHFyrA9%2FZdCvAjXwrWPvEZyown668zAY6pgHz87FyfopTgTUCvk0XCVFbSFiMcACF5StOTGKmYlM0PhpL9S5FyagZAKTUj4gWnvOM0RhsCXFPhUN3WHGmIOSN5naGFXSfyDFyjfYF5eqd%2BehaKQrzL%2Biovxx0ikMMvcy7lGJe%2FMlA1dQB3UJhI2xofR4yeyjXk%2BOUYuAQNGF7j1Agn51oVgyiohurTbFTjzlNVJxWOHPSdFYHAd7iNznEcOvKN0Lh&X-Amz-Signature=e3bc2c8c7393680ba6726d6be34b2d6cb4d2dd55789f5b53b370a4cc5908c8de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPPQCAJ5%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQDMP49D6D99v2srNr%2FZkVjgCX9G5hYkdIySgJgqAxNRSgIgRgEN7g8rO6QMaWAKFL10t%2FUh3EQUpo0k9sMKxWsEpjAqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaJH4S%2BG%2FN%2FIKRveircA1AfeYQciEOVk%2F2Kt83OsucSIGXf%2FXU%2Fx272XYWga2Q3YHJZ48CEEYINycxjVj82KWu6fxLMSyp0PVt14RYJsr3t%2F8V3quhJkMrSAeVpD7%2F09AM%2FnoDjAemcvEeTVvCiiAeYQjcT%2FaPKhS7gzDGqxm4gGVBinNYoXnsihLmy62sn78NakQmSGPC6%2FyQ3JJvFvzCK91kJbwrQRHzxHlTGI4uyL0hamgJNrHd7Whl%2FFeypKnDLoHUWIZt64A4Ql8QMpt57ptuSWvrut0%2BiRRDQrw9kUXN1b1HXvZSP3XC9V6ZYH1vShIFpr5l83t8qheUVZdQ5mOYaSJsmsl37Q7JnE5S7cq08S3b%2F05N%2FSACdddp8MeQpDpk5UohKQZI2Z1N6x5Gg%2BPEF9C2DCZWL0UpnoGd9lSuPDT8c6XRPTDMchzgXJFwqW10Fnz3jS%2Fc8THo4R659uf8SZjjcPk25wU4f1NejYEkwPvu62kBiUkQRKz4nSaA6ozsv7XpDBl5aJeW4rv66JfX4nyUANeSpTNz3JwGeEG6%2BJpS1JwYL2fsXS28zJUdIg24hOtNvE2HIXNFJXJnyVh%2FY1eMrS1SslGjsL9%2BYGWImp0nxEuLwn5AlGbQAaWFuBKwU%2FM3klcRIMKevvMwGOqUBPWZqnPtohfei3I3uYJ%2BsBc3YuevhPPps30X%2BuNm%2FtfWFrhKWTYJ%2FlZRs6o4XDNFv%2FMQ05%2B1jVhvvQxHNX0%2BYUS20lV0iJ9uwLiA8uNb%2F2jQTIbevFBPDH3S4NEo9Rwseok6LQ2q9Z24veecqM1T8pgU7rsRlDtnWrevhGw6%2B94%2B%2BscpJTPqTT5h0GMhfZElC5yx6aLV24HWAVHw8T%2FoorDoz4mhK&X-Amz-Signature=eb8db25a3ef7be7e9ca43bc184d5595af7700f7d43365dc439a92c5592255c4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPPQCAJ5%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQDMP49D6D99v2srNr%2FZkVjgCX9G5hYkdIySgJgqAxNRSgIgRgEN7g8rO6QMaWAKFL10t%2FUh3EQUpo0k9sMKxWsEpjAqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOaJH4S%2BG%2FN%2FIKRveircA1AfeYQciEOVk%2F2Kt83OsucSIGXf%2FXU%2Fx272XYWga2Q3YHJZ48CEEYINycxjVj82KWu6fxLMSyp0PVt14RYJsr3t%2F8V3quhJkMrSAeVpD7%2F09AM%2FnoDjAemcvEeTVvCiiAeYQjcT%2FaPKhS7gzDGqxm4gGVBinNYoXnsihLmy62sn78NakQmSGPC6%2FyQ3JJvFvzCK91kJbwrQRHzxHlTGI4uyL0hamgJNrHd7Whl%2FFeypKnDLoHUWIZt64A4Ql8QMpt57ptuSWvrut0%2BiRRDQrw9kUXN1b1HXvZSP3XC9V6ZYH1vShIFpr5l83t8qheUVZdQ5mOYaSJsmsl37Q7JnE5S7cq08S3b%2F05N%2FSACdddp8MeQpDpk5UohKQZI2Z1N6x5Gg%2BPEF9C2DCZWL0UpnoGd9lSuPDT8c6XRPTDMchzgXJFwqW10Fnz3jS%2Fc8THo4R659uf8SZjjcPk25wU4f1NejYEkwPvu62kBiUkQRKz4nSaA6ozsv7XpDBl5aJeW4rv66JfX4nyUANeSpTNz3JwGeEG6%2BJpS1JwYL2fsXS28zJUdIg24hOtNvE2HIXNFJXJnyVh%2FY1eMrS1SslGjsL9%2BYGWImp0nxEuLwn5AlGbQAaWFuBKwU%2FM3klcRIMKevvMwGOqUBPWZqnPtohfei3I3uYJ%2BsBc3YuevhPPps30X%2BuNm%2FtfWFrhKWTYJ%2FlZRs6o4XDNFv%2FMQ05%2B1jVhvvQxHNX0%2BYUS20lV0iJ9uwLiA8uNb%2F2jQTIbevFBPDH3S4NEo9Rwseok6LQ2q9Z24veecqM1T8pgU7rsRlDtnWrevhGw6%2B94%2B%2BscpJTPqTT5h0GMhfZElC5yx6aLV24HWAVHw8T%2FoorDoz4mhK&X-Amz-Signature=4383a52117de2d9d676f6960c6d876ddef81b5e57e3aad0e3dba1b1336837d1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQDHK446%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQC1kQi0Oxo0lQcDm9zGIHdVOnhw4Qx%2Bzlg%2F6qGcsLIRQgIgFWOg5CjskETuwDiSL3m%2FasEWBOLNYe5yDWy25Bs2Nu4qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCzmuwbXZufiyBao4yrcA9kAB3qU5uhDe9YnvESjcxjqtjy4YXzQPmBszIWD34UvNiN9AFqPbsSzG6hqupJ%2BZ5RKYiVJe3sTf3HOA3IsUZMtqQOAboqIeyE7zex694D1%2Bh809jqSRcJFyO9faRpt80eUqkVwu1hlfhI8tk6LEa6PTWkF60W0yPKYR1fQEp14du8nbMGlASTi0EKfKoJCIa6trqaqOOkx%2F00MpPNIqYimBXLl22KKzU3Gq%2BVOxNe2dIh2Z0DqlhzPjubVRqMsZjCCCbKvWm%2FSljANg%2FuXNlb1etpJbXkxyRG1oHoebmwpB6OuenA7ZToaKS1ysSxB7Mt5D5OcODCScXliJMjLBLdjaHkmvv5IJSBiwnTlfvAwtyqE2J4vVtj%2Ft0sKHXF0FdTdetdGYeeJV9pD%2FAQBwJi3FjPcMhPMMWpf8dfD7kr4rG5kl3Je9qxGjxWD47f13jgn%2FOg9u50NXM0%2FUod9UQ93RpBCWJiGb%2F1IyZ3d7aJ1aUyTG%2B9rxzqF12i%2FivVjNTmNV5CPxoLenMJspkdD0bA9sPXhDbqnLyQVEcE5gwHkloLR77A%2FdiyMIaep%2Fy%2F7JbkKIbbpjqcsw1jh5NIOQAwNuZ73pR7keakGdsW%2B4DHSAbTugOzLg27tSqjCMLSvvMwGOqUBMngAtGrZiJ8xiVIW0qeHB4sDkgL9%2F2adlsUzlvCnAXhYc4QJ%2FhSg5cEcxJJxdRrCiAJ7ft4NVsSi5qAEnZrHep0YVhG4pUrjLcppxhqxopszKCoOFMod7M%2FQEV9PkkSn0kXNoXcVEp6QrzSqOwmJGQKLEs8GAGDCeBoYL4eb9gnQod6ktdGgQNYzoPCR%2BuooMuRWPUJHzBlWISJHBBUxBwQqHtGs&X-Amz-Signature=8fe889dcbb25ddbfd7be65c928bd070d30140d8e84b76766893a3325b7aa0683&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVORLXON%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCIC7QJCuS1dsUJvQ%2Bmlh8MW17xNfQkSU8%2BIsuyWpnA8PdAiA6W7NIE0vul17YJ9d6lM2lD4cvm9WIEF%2FT9WXw4Ao3eyqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BIAZ6fUi2xE1CTYzKtwDUgiWDOUZz1zs7HF1yDwVmkXBzivqGKGwUOwyOQr06ZmCmvSTGaoU7bAxC1aBQSPLcoBbhCkTQ8mXpWulSsUnJoHttbuBVu6GMWm0kAV81v%2BNK7pPElzDYw%2Bje2QQ3Qii0jpyeVzE7DX84zUFmHmLoiNWZGv9qv4gPCCowPqs5J1W2xRVKri%2FiR2vz9pSArGRwQXpIVtmvRq3%2BgnC6Q35l8CCkqbol%2BTZecB9g3eiTn8yRcg8s7Dyp%2BXO65WKnfmxFbXqiwJDPKeP4bXLHDRM6kpamZxBF44lrXQprjseb8Sa2E0AToRAjSBkjvFDUNiTe5X4EAb1Y4ByT6sLL%2FiZ8mvkqf4heDUI%2BGkLGO0bs7Te1G%2F8%2Fi5a6cul1CvgqJleBpw9bs68BZVwY5vhkCjcFdNcGhTy6HQ8p6vFPe%2FeMt1wY0Xhii1eBskYQHAoKatCVFQTScqRT%2F6dPEsEdFCAN%2FYFeEVpDLEwxdtqbdStq9y9ow%2BKZ5lwHWKBqDQJtKyg0SZNjXk%2F%2FuLcpaPa5rCTC%2Fy67w58Xoe2yhcn%2BHTV%2FV1EfJME4Zs2jsdWZOEEQgwRzUczO9eMBpakP76FsIA%2FvtzMmSpH6d4szmm%2BsEBv0EJfKItbgTScaKz1mxsw8668zAY6pgFnMfhfIH7s2QXllweEmDrItG9%2B9F3on8k8ivmakbrbnIl64acD%2FbZu8SFoezwpc8n%2BzYJIU3e9htNhBT%2BOe9Eb6U2oFZrIAO%2Bi9iRtr9UPEUdQaIcyYO5cFSGuVR8FKyRjCeoPRbHjVloB5WaspLu7qNv48zqFd8S5vP4p%2Fv0AqcYovf%2FXFLIOfBgQoZFrriwHsFYitYokcEpeBKosdMw%2F%2BDwCNViV&X-Amz-Signature=40866825476a1c0d17d2db7862ca762b45b1868b3262b8e34cf9852e6d1763bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVORLXON%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCIC7QJCuS1dsUJvQ%2Bmlh8MW17xNfQkSU8%2BIsuyWpnA8PdAiA6W7NIE0vul17YJ9d6lM2lD4cvm9WIEF%2FT9WXw4Ao3eyqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BIAZ6fUi2xE1CTYzKtwDUgiWDOUZz1zs7HF1yDwVmkXBzivqGKGwUOwyOQr06ZmCmvSTGaoU7bAxC1aBQSPLcoBbhCkTQ8mXpWulSsUnJoHttbuBVu6GMWm0kAV81v%2BNK7pPElzDYw%2Bje2QQ3Qii0jpyeVzE7DX84zUFmHmLoiNWZGv9qv4gPCCowPqs5J1W2xRVKri%2FiR2vz9pSArGRwQXpIVtmvRq3%2BgnC6Q35l8CCkqbol%2BTZecB9g3eiTn8yRcg8s7Dyp%2BXO65WKnfmxFbXqiwJDPKeP4bXLHDRM6kpamZxBF44lrXQprjseb8Sa2E0AToRAjSBkjvFDUNiTe5X4EAb1Y4ByT6sLL%2FiZ8mvkqf4heDUI%2BGkLGO0bs7Te1G%2F8%2Fi5a6cul1CvgqJleBpw9bs68BZVwY5vhkCjcFdNcGhTy6HQ8p6vFPe%2FeMt1wY0Xhii1eBskYQHAoKatCVFQTScqRT%2F6dPEsEdFCAN%2FYFeEVpDLEwxdtqbdStq9y9ow%2BKZ5lwHWKBqDQJtKyg0SZNjXk%2F%2FuLcpaPa5rCTC%2Fy67w58Xoe2yhcn%2BHTV%2FV1EfJME4Zs2jsdWZOEEQgwRzUczO9eMBpakP76FsIA%2FvtzMmSpH6d4szmm%2BsEBv0EJfKItbgTScaKz1mxsw8668zAY6pgFnMfhfIH7s2QXllweEmDrItG9%2B9F3on8k8ivmakbrbnIl64acD%2FbZu8SFoezwpc8n%2BzYJIU3e9htNhBT%2BOe9Eb6U2oFZrIAO%2Bi9iRtr9UPEUdQaIcyYO5cFSGuVR8FKyRjCeoPRbHjVloB5WaspLu7qNv48zqFd8S5vP4p%2Fv0AqcYovf%2FXFLIOfBgQoZFrriwHsFYitYokcEpeBKosdMw%2F%2BDwCNViV&X-Amz-Signature=40866825476a1c0d17d2db7862ca762b45b1868b3262b8e34cf9852e6d1763bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2TMH667%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T122803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQDVdHnCau3fdh4oLorNHiKoWKYJWB2ymO0KrfbzP4NeFAIhAIHIAgrHamp3aYjTyPepcukXZ0lzsep9IGBzti%2BMefSwKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxoBAHbGTyMpwocdTcq3AP8oqi3jdtGUPsfiKaaI5PLURYf%2BwceiMoA5wKrA2zwn2gsjH5M9UpPE1BI%2B8dVR%2FBcGtDFzEYoSwd4Boa%2BtCFommexzBvOb%2F0ltcLFh8GYwQPxw1hqFiij6MOtCHr7nlUDDhpGI1zIxE%2BOVcOKyEoPp60aCVJhXzRlp62cEtYVQLvXSVs19%2FUyGkTtGI%2BvVTkmYD7%2FrP9wTA2dt1U6csTnoi6NWGexjKG1WoZXcjeu%2BFbi2dtA4regDw3NXBlMDPIgTZWyX19%2Fk5eMUO8Pgvjv%2B%2FLDqcyGukV86aY1ua0QtT05tHb%2BSFkBgFcmcWn5eaeGJTzvWBa3feDLcUiURlHwjPRFgfTv5xyA6dXlZO00rzAUFnVo1IZ%2FBJKBXE5UKMSmVI4W4RdIAremcBOxWf0MQg8mz7u3RkbXqhYeWZEMZqoEabOrCljhHALzNdJ%2B5IBWhmcH8grGBdIN%2Bl6O4aJrI9SFzD053umMuJfAmv%2BDliGmQjR66%2F5rERLjxjkh8%2F4p7baXb7BiXSiRkcw9epu%2BBNo9EgSK2bgy6w7PvkmAdGBOpcM2krJLiKJwnL8o0X%2BAYverfUd0kxRfHpMN%2FprePe1re1UCUmDqT3gaidHpIRR%2FtRk%2Bdpvk9icOgzDKr7zMBjqkAalbTzt9ttgJx1Mxi6meel4u9exgyt85oTT0gnpPF6rExJtJ7CPA%2FIsP%2FDspMB%2BMMVf1qjRWoAWFHPh2LfkA9qGVArqN2jo5R54NTtDTvglbPiMyOoG6vP8kqxKcnJEtKAHovUMCM%2FW8EkOLNujyIk6ur8BeZuhIUztyOuTF42cCU0IS2h2rks16ySAiIaBPQZWJTJeYKGQSVm4ZpvY%2F2iql1C%2BA&X-Amz-Signature=aa2bb2dabe16b06b99ba5a143e9bdcd4d66b80b7d136c116cebb354a9c86da69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

