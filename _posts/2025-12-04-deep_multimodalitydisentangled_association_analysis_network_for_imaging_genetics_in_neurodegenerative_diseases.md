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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HQIZTYX%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCfSW1nJp5qCj1ao2rtFZmvy5nRMkVpji6amGqrYLVehgIhAM2seP4eWFk5quuGDYN8VeYFlzhSYYk7DkhJFeUtbu4JKv8DCCwQABoMNjM3NDIzMTgzODA1IgzTlaoar5tFphmHEj4q3AOPwAKWCyDAjduovBIevicS2RmY3TDF7EctLv2Io6XwoDHK4qLAewpAUFTmL3tEVeHgUFQhveq8Q27AB3zeVNm%2FixgX%2FJ21kCz4yIZzhzuCiMEqBD97DIR9UzCrRKk9eZ3N%2FOtsYCi%2B7Did2vBGORNKXR1AnAR7FsdY1Q2Byw%2FN5ZVFOKGy%2BhstdLg5YZi8IT2e%2BgYauSbYa1CwNV%2FHwfV0QdD%2FbLooibaHFnCHV%2F2ha13AkvbtQINZ7fjOTX23oMlXhLmzUlMgidL3%2F7nP3enb%2FLuZUboQRuwaNO4yr0fueaquK%2B2ieWvRmPQR%2B%2BnqV9A4TwWwCbVuIxnT6qocwnmTwNINu2vBfI%2BAxF5fCy4zK3DxVFp8JTn3rIL0BoGotAPO5VXOJPJJA1z5VNMMFwlObKbswaouImKUPiglBhjZnuJF1c4yOBF1YNEPTvZBPjKGOgpHDBiht5B4D0OlmEuetBcmRlMsIMB1%2FE4y3eLfzKvXR%2BEUUYcVg67xv2SmvQRePTGFDqk51FKTGHOGHCoIGCWce%2FgSBfb8LLzKZ5pMJzX2soMCLaOK8jG388ETgzaqMtcX4Hqlnq6cpnXtXY%2ByYTDn87aTg1guPPJve4LGyX8M2Kd%2BBVhug3X27zD1k6vOBjqkAfw1zxSaJTdKV8T1VsUjJEsee1TygqrK4V4WFOOsW94NJ6idYdtvSgzZ8SE1L6Mj5RyGFAZTbBg5Xt3hZLWBB9sMtG7rhjGAPnfwmqVOhqhz6YKVJrgvf9VCKatlqSuMMyf%2BcaOUMnBVXH%2BG8mPivd0%2BP8fosUZlHA6BiPUqKmLoNNhkW0F6jI1vDAnNOsZYOBBh%2Bg3uR5TwhVHOCiekbIU1ZgHd&X-Amz-Signature=8bbcdece8a5fb3c22e9ee0680f413652b83934ee11b7f8f48299a127c586a7b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HQIZTYX%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCfSW1nJp5qCj1ao2rtFZmvy5nRMkVpji6amGqrYLVehgIhAM2seP4eWFk5quuGDYN8VeYFlzhSYYk7DkhJFeUtbu4JKv8DCCwQABoMNjM3NDIzMTgzODA1IgzTlaoar5tFphmHEj4q3AOPwAKWCyDAjduovBIevicS2RmY3TDF7EctLv2Io6XwoDHK4qLAewpAUFTmL3tEVeHgUFQhveq8Q27AB3zeVNm%2FixgX%2FJ21kCz4yIZzhzuCiMEqBD97DIR9UzCrRKk9eZ3N%2FOtsYCi%2B7Did2vBGORNKXR1AnAR7FsdY1Q2Byw%2FN5ZVFOKGy%2BhstdLg5YZi8IT2e%2BgYauSbYa1CwNV%2FHwfV0QdD%2FbLooibaHFnCHV%2F2ha13AkvbtQINZ7fjOTX23oMlXhLmzUlMgidL3%2F7nP3enb%2FLuZUboQRuwaNO4yr0fueaquK%2B2ieWvRmPQR%2B%2BnqV9A4TwWwCbVuIxnT6qocwnmTwNINu2vBfI%2BAxF5fCy4zK3DxVFp8JTn3rIL0BoGotAPO5VXOJPJJA1z5VNMMFwlObKbswaouImKUPiglBhjZnuJF1c4yOBF1YNEPTvZBPjKGOgpHDBiht5B4D0OlmEuetBcmRlMsIMB1%2FE4y3eLfzKvXR%2BEUUYcVg67xv2SmvQRePTGFDqk51FKTGHOGHCoIGCWce%2FgSBfb8LLzKZ5pMJzX2soMCLaOK8jG388ETgzaqMtcX4Hqlnq6cpnXtXY%2ByYTDn87aTg1guPPJve4LGyX8M2Kd%2BBVhug3X27zD1k6vOBjqkAfw1zxSaJTdKV8T1VsUjJEsee1TygqrK4V4WFOOsW94NJ6idYdtvSgzZ8SE1L6Mj5RyGFAZTbBg5Xt3hZLWBB9sMtG7rhjGAPnfwmqVOhqhz6YKVJrgvf9VCKatlqSuMMyf%2BcaOUMnBVXH%2BG8mPivd0%2BP8fosUZlHA6BiPUqKmLoNNhkW0F6jI1vDAnNOsZYOBBh%2Bg3uR5TwhVHOCiekbIU1ZgHd&X-Amz-Signature=8bbcdece8a5fb3c22e9ee0680f413652b83934ee11b7f8f48299a127c586a7b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5SVRYDG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCw5UCa%2FOzxEi21uh0rszwlBVL42gQGFLWHa2kfYdjBUwIhALm%2FYxIcjs0bWQt9k1%2B1pw4F8QqTjroI6aCnLzpy%2FcPtKv8DCCwQABoMNjM3NDIzMTgzODA1IgyDYCAYJePXNtatGMAq3AN42preV5LMcqd6xqtGJqjGIT1lo%2Fa0WZQ5YaTgLIF3T4DtOiO42GPwY6Mhx22LakWheykaFPuUpR3XCoPOLdkHNnRHkMHm5%2BNg4814A4fWHwVjj8xbSve6znN%2FVoqrlv%2BmIZgf0Jl5CteGjK9NY%2Bx7fFd98G38hX0%2FBR8pMT%2F%2FGghxSRrk96q%2FIdZLUIQUl%2FHQWpZNVD9HWhBEZqaUDwxJEozapHkK73re3ECb09Xhf16MuaFJ1gwiYyFBGbYBRLrSP4maMHVSYUM4L%2BeZb6uBZVbgReXeaZDDNwTV%2BVap5t%2FiTW9FponZgdzslGRBiR1gU5Es3kktrm3Vbn2LToTB00DzA15k6JMeU8%2F%2BNCK1KgBvocq10c5muBoR71Dt%2Fry6ST7JS838Ahb75tpqjPoH12JRKHyvgSR%2B%2B2EFR7zgmnT4kNYz0UFjEMDOdAvketcXlo8ItdKZcEPMM6rCDqHpC4TpwPPKnHJMCoQeD2oF9fWvAWr0EpUBpjW0Y4YV5K05R7NnaWjX%2F9GzsbdyuAILaavlANGZto8E0gDwT3qAUpYBj6ce9KBHQfk4ujyXWuPTPml77MBiOKtcS95xUNWjpz0E3VhM8LAJQR%2B2Ex%2F4Yw2NN8h2%2BkrDxhsmCTDPk6vOBjqkAer9wDuO2d%2FWxnNzfM5rPR7PtaYWjhGQywJzf9tkqiF6HDgH7gAnBAwvtBk3UQxCIpkOCTqKba5qhshhyBKQ%2FH0cyM95UWQUEK00PGKPNf%2FG7yAqF8lgbwJs3DBiUkgMlyHs0ib56eM3oRBRF9xeqhID4AjK4PdagG25s6RFnCmiDtRveuFCCZbkx8YYr0V6pjlMKOEtkcIIThc5Lkv2tNrcp9ac&X-Amz-Signature=b157253a332701b1850d04b48a32b210c86bc62c26bcfaaaa382b06bdbe83e18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GUCMOLU%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDoVMqE72s%2B7%2BcjwuaiO5VjGV%2FqKLYReyogJFb3GzpjjwIgPZ7MKfQ7VFazZT%2BKn813S%2BBsNSV%2BzFargxiau86Kodoq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCE%2FEmcvbSy2ejpAZircA6DdFPYOdi1zUrg%2BY2rDWWgd9Ghaf3ibB1TeD3Amhm3RjC4zFWlNFsyb5n9g061buWuNknZy7e5edcHDpzhU%2BS%2BHMtYmaeM5danUe5rJ3s7HDWrVk1wYEAuJoxnjWr8ALpjGKFpRrX9sUMDVyynfl%2FXNs91ohmhA0QgbLz8TM9OC5clooLE9GUwoyUdyI3o4DBjVs2C6zfWbLw6E%2Fqmqbw580x9pXu3ETldVfp0gt8P21ZDFMeEzAkNbVhVfq1Iuckq1pFGZ4cAHvKzY5R01f7I22VRbdG2PcsAvsFsqzSe4dQgUXCAJP6WUBlj1AjbhiLDfVQ9xdK7RxMkwiN%2Bhu6uqo%2FAchF3x8ixixts4fIS43LIkYCq%2FYiNRYa%2BcrqsuMLCraMgj5AQjgwyJmi7uDDY20J%2FzZFlwfIe8DuYMANn6n6PZ77WJdC6KJksBAvbE2SwSVHhi5ssZjAHoE7a%2FKjoi%2FveKUcFdNCYUQ6iFL%2B8KVuxSrzvdGyzgoCM4014sICuJW2y2IclgtQakZnr1Cxo0TKCBj%2BTTt0xKPFO1r6m%2Fke7WDNEQRmzwpu%2BTc8lXHIKFIFCUK%2BjY9dEb%2BCUqgyS7skMjYcN0wUck8NAKQqiSI8l0JJvhGrQiv6msMNmSq84GOqUBs8gCYsb6xk7ufk8gJ4c6mjBX3a%2BZaouGTS77nDZ7LBRQHhNAIsE%2Fc%2FyiC9F%2B%2FmFkM2hkPXTAmMWusb9Nok3y4jKtwb442FPzmkoSKSjPj3LpDRvyRaS4AMMO1XTAk%2Bri807qc7m%2FGNi2gDdasGNus4%2BciN0i5ogXpoB2KvQvC2Mb9MIxMpB3AmR3kxUvJNYyT1rT6yNDemV7q282KeK8QjsFqS7H&X-Amz-Signature=4cbf54b2033b9e342ece62273433a1dbed68128d40bdcb02d7f883db46a9bc86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GUCMOLU%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDoVMqE72s%2B7%2BcjwuaiO5VjGV%2FqKLYReyogJFb3GzpjjwIgPZ7MKfQ7VFazZT%2BKn813S%2BBsNSV%2BzFargxiau86Kodoq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDCE%2FEmcvbSy2ejpAZircA6DdFPYOdi1zUrg%2BY2rDWWgd9Ghaf3ibB1TeD3Amhm3RjC4zFWlNFsyb5n9g061buWuNknZy7e5edcHDpzhU%2BS%2BHMtYmaeM5danUe5rJ3s7HDWrVk1wYEAuJoxnjWr8ALpjGKFpRrX9sUMDVyynfl%2FXNs91ohmhA0QgbLz8TM9OC5clooLE9GUwoyUdyI3o4DBjVs2C6zfWbLw6E%2Fqmqbw580x9pXu3ETldVfp0gt8P21ZDFMeEzAkNbVhVfq1Iuckq1pFGZ4cAHvKzY5R01f7I22VRbdG2PcsAvsFsqzSe4dQgUXCAJP6WUBlj1AjbhiLDfVQ9xdK7RxMkwiN%2Bhu6uqo%2FAchF3x8ixixts4fIS43LIkYCq%2FYiNRYa%2BcrqsuMLCraMgj5AQjgwyJmi7uDDY20J%2FzZFlwfIe8DuYMANn6n6PZ77WJdC6KJksBAvbE2SwSVHhi5ssZjAHoE7a%2FKjoi%2FveKUcFdNCYUQ6iFL%2B8KVuxSrzvdGyzgoCM4014sICuJW2y2IclgtQakZnr1Cxo0TKCBj%2BTTt0xKPFO1r6m%2Fke7WDNEQRmzwpu%2BTc8lXHIKFIFCUK%2BjY9dEb%2BCUqgyS7skMjYcN0wUck8NAKQqiSI8l0JJvhGrQiv6msMNmSq84GOqUBs8gCYsb6xk7ufk8gJ4c6mjBX3a%2BZaouGTS77nDZ7LBRQHhNAIsE%2Fc%2FyiC9F%2B%2FmFkM2hkPXTAmMWusb9Nok3y4jKtwb442FPzmkoSKSjPj3LpDRvyRaS4AMMO1XTAk%2Bri807qc7m%2FGNi2gDdasGNus4%2BciN0i5ogXpoB2KvQvC2Mb9MIxMpB3AmR3kxUvJNYyT1rT6yNDemV7q282KeK8QjsFqS7H&X-Amz-Signature=aa9dd01daff8b09ee8bec8999e991face6d7c776971070bf8629833d4599b5f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOBFEL6T%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCZIqxHv%2B%2B6AitozLE4Trau94DdnXj%2BqQGgnEScoB1QAgIgcbf2chTZFLo%2FoKa80fMiAP8%2BzIqefQIRLpIoy0IyFR4q%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDE2xQTxYN7WrOxynjCrcA77fLpYgrP9gindC6uskDDq5OH0KvlHVLCryQFvYBJGvQNoS%2FkPxne%2BpgG15hsQkEfcd8O0D8dsF8laZ%2BWAarQL1ULzc52JIjmgqM3zK5QpZesEAqFVPDqWA3Gwr14DyY%2BoSQBR%2FEVnL5nNmf1vepjwzLRHBAR4Zk6nOB4zfXxpD6qnZf%2FKHpz84xfXj0GzfI6045xacFOSul7Koa9aJynoDTldJtsWFZV14GJorAlWe%2FEqhCyScBSNc8cKHAowpmk1zrAh7YC%2BLiC7QUAqXXD1VXXow87jTOfozqUjJiDmhXXlB1ASZ8TUQ15vjlFworv5JRbPlxNq%2FkhERAp%2F044N8e6U%2B81ytiT8m%2BisRRXZuQWMb5aAGRGPoPZhq4ELGAHlkyLySU2qKXZS%2B7uSjRavL2FoDjjeiULrVpFCXaa1QjtKTL%2FNxltsoTpEBhjHrh1lV3fmabU2UP8dhicAu4J7Pjfj4Gu8nhSZxouulHkQqTlXegwJcTt1jxmzCn%2B9FEbssYw7Z2MZumUY%2FZGj5BUPQHs4PhnfP82yGedkrO6oe2E%2FtfimhxghLieayD4othIUO0qh0GqgjGloBwpW3lrSfRRgjhvli8fIZtlG0404eUbsOBldPv03Q6qNdMJKTq84GOqUBbSeiRjBXXFIxXd6HmLK%2FK2xXn3APO2c%2BK9YlmgoEx4zS%2Bnewsp5Mms2ru%2BQI1pNh5RyZXlaUqOM2Y5GaBeA%2Bm49BaZpLCKSOGAOP6lrOLC4jF%2BLplXEQVcS%2F%2BS1IYRcTq7megIs9QsBqrj0zj1haQtWg4XmGI5tG4f4Q5N8mF7Y1LjgA3rl4GIiKSBkReTbTx3Id7QzTaKqU9c98xg1624tLxB3Y&X-Amz-Signature=5ae20fd0ab6fe9a270254a52ad0cbb77f72c4ebad9c62679d81eed5c1d365ccd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR2OXIJP%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQCqdS4ewDet58qtgJndMbbDWvXHW2H1rRF6viIWilxCCwIgL8EIsw0ZEoi5y3l%2Bb3LlHYX3U1pYvKwMCd%2FMFqOYOFIq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDDhLanUqe1x8W1QV5CrcAxHJh5HK7vCRIIHz1VhZ%2BOh%2FyoJ3KrRSbE2XorbDItRsTPrzdqktT2Zrt81N71vOgo3JXf2YRUizsquanlB9oT8Q6K7YaAn%2F%2B44%2Ff7h0349GDvvdExxDGyMX1nEN4okIchSqdmOeBsEhN3htSe55UOKj4q5dfMXpkw4ZtT7BjkLsXB%2FgCg0XEaCkWZTbdBpN2d81BiMF2ZkKLguWZT0C5GdH1w1aegmlJKMtvK%2BdFJk3MoDKIDMYBNreTJrmJxBSBNNGiu270oZcaTYYJohuvBUjfBwvxU3H2dN7Hlxz71Ny8U9JP2LjKOr%2F5uM6NFF8o8%2B%2BTDRxobgt%2FaqtSbcDAaEK0kd3hHxPvyOwtCGjPmBQ4H9MJnKfUCM9U0k69RD8q%2Fir%2Fb7c5oC60YyP%2Fiv02%2Bc4ToAr1ZCNL4%2FblnX6EQa0cNHopuAe%2BRpDeMM%2BjJObMCU0rTJIqPwbY9dBOby6xx%2FXPQoypCZsvxUDXliE5jOOtpGHA2ioVxxhATJVT4B0zPybV0Eu74mRFr8pILtQ4Ykl4J%2B9Zf1baJpmwu8dTukH8oIHORmd3ogbsMXxiAgm1i6lQlvGRaoJQInCDvkyv22%2FOMOSIbx%2BEt1NEEliDdhQ86bHIC7oT%2F7qbCqDMKuiq84GOqUBDHWR9pTDUDcH7RcG9pGCyTabp19ctrmR7azSLWNTdTG5eyG5WHSWvK7dTgmyRy7CiobuXZsKYjISR1NoG%2FwwqQLc1cMeY4VwuML4bw9pZVFqlKDmce9vH5QvwjfrfldZ9Bc%2FjVy8srZ9K8ZGWIxihTl%2BGMlZ0LX1qcI%2BzRizpXAOEbCgqNWK2nbM%2FxiRH4Jrl2AAI7HSUDpAGd7XpuxWiDqkfbzv&X-Amz-Signature=ee5decfbe65f3ad4ffe4dc57520953c6dcca9a7ab028e0fda941926c7ad23ee4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U56APH4A%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIBZfXJt3mjBkibXunbGJckELrzdEKOvccWIKLX8ydNTPAiAWH5h2ia0jGmxYhKeGyXuy%2BOBRxvGR%2BA4z1Z5rT8gw5Cr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMPZnzPajbVR8pOiuWKtwDh6HkHjLbqFpcTyDNgv3hY5%2BKdAHK1IeH6ulXh2ne4Tx9YgFG9SmR6zbFzTAlTlzyGiAPuRJ6I9MWBE3Bzgwiud9omDq9pogOdGsuZeOxM6euTrysAmCebBcLOleSSnORl270zGFrn8uzdDPAIfOyCp%2BIOGWxN4eo%2FUwK00CmTeRH%2FYMXopF3nHWq7EZnyj4iOte%2FrhObengsm5LMwVS2z712nt7m9WO3Ex8zfX1DSuN0ktbqxeWySnfwDJkmKibCfUyNQ0E9RcLR1P86qIgxZUSLlV9AB20WYnX7LSimYA9Y9cLPDeY%2B%2BhpjrYIi9TDpQr4Aapz6jNfLMoXO2qOuj5PN3AlhUUGoQapmPJEB05qnkgWh6qBDZ1FmZDmcFbMnxlgqeiTLd5MBD%2BoNB%2B%2Frui62mKDMLd5vkVh1DBSlIlUnjkly8GalqjFDX%2FBY9XIjGeo5zfbrRU3wuEOWataoOGKKS4ipEtFyc13VtOdiFnE9fv9A2FUlpitnhMmJPtlHaWwmaXyQJFWmNZdUcOvQLUxamyxN2uEDwofxrLZnMzvS78gWLN%2BaS%2BzZzUBYUH%2BZApQ9kNkbLDc93D3jMM4pPbyFsyvZuT%2F66uXB1HieHpcOMqJltzaHqfTzdjcw%2BZOrzgY6pgFQUqzP6sZCjH76Q5eKmtyDjMXFXilGBvzxe92l63u6VTfuUa%2FISav%2FFhRFK7Wfr%2FLcTud8oGnVYd5oKEgQ4s8PeZktsetw0Iqddqb%2FEVLdxluk0PunDRUXI7s9wHCzBg%2Br0vemcJoFK7zpSucvcSoFIiIGLcXycG9o2HZPbLv%2F2Al7yFxhr3xzc4WqluJWKA51yMgiaQYj10yJzjrWRP2zb1qsZe5B&X-Amz-Signature=1efd2df1905665e5e37d56e5b15c0a3d39097fce086c9b12793eed637fad9eb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JFMWBIR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIBUYmEd%2FHjaL56di9R5eSBw1XUqXBhZXAbrUWH6BCBwuAiBK%2BOCsTvDDKiR7wtH4ZKXJoTB%2FGW09o3Zfsi9yd4NpMCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMf4jXwpNZR%2BLJvR7zKtwDbRnYxe8G3SjIH%2FEDDbHkVe2A9%2BLkN4kAbRe5gaOO2KBBuYZLAnO7noeWXHrc5zcv4IXSjPKTy7MTPWIwxygYpqoxprJRmj%2Bvm8un3Zm3Bgv2%2FihUzyOck4ZmBjSMlt64S7dmxS2OAsqQdpa8WZxQRUr3anKP8Z87Ftt5ovOXKPdyuntyRMkmBT%2BcIIypRcN0PMvGJj%2B9JtYTbAX4fbPoyXgYyD59ldCt%2FuvycRuHmh%2BpdEJBJRjdOJMXIX0N0J9fbPSmPF9LbvAtLqJnnUnw3DUsByJV4OznsDjYYCNaJzOxgU%2FzgCMS1iyla5G%2Fi6Wda3S1n%2FuSYVOiF7CuuqQsMApWgclY8uxc3uYqxC80p%2BgwmiY8tvD7yD1t7DCyq4WustwnwmCFyka%2Fk%2FTTJUS0PcP8ogtDtHvFUPF14JKy8a%2FJmnwRVSneXV5VA5UwrrLExfrFzIfXlYOebF53x9FX0dhgufLQipi40ffl24CohzfFmgw8sFcZG4tn4ODVjgcOB26MnLqAnZf1xnbuJb8lGbnnSrBHYLwge5%2BU62UZywHqcyaxmc4eh7Sh7sTDgHrcYwAuNo7CG3s4J4fiBe8diz1Nx5zs88TZdmARt8EHPFZ4q4ZkWQwPMWxWC7EwhZOrzgY6pgE%2BDLgwpPH%2BUPYiUSYzh%2FvMc0VYw00VkQiU%2FXpc2qy0T8wtFDnscqIZD2bLLl0ce8bMsK8%2BZgPF7TTKWWElfv6efjn%2FMLz4pIc%2FmEMdhzA7Vx3BzimGaH0SeBbcQgh0XFbKb%2Bn6%2FxKMK22qE4qUOkJUjjinTa1rAcUqEVEo9ipc291IkbNCTPPKSm85lcGrtaUn1N3XWuqbi%2F1oE7QfjRApWk7GULi9&X-Amz-Signature=f9d9b5a61240efe762f103d50ec0c9818a7fa9e4ff9af0b980698ad54b87c497&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JFMWBIR%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIBUYmEd%2FHjaL56di9R5eSBw1XUqXBhZXAbrUWH6BCBwuAiBK%2BOCsTvDDKiR7wtH4ZKXJoTB%2FGW09o3Zfsi9yd4NpMCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMf4jXwpNZR%2BLJvR7zKtwDbRnYxe8G3SjIH%2FEDDbHkVe2A9%2BLkN4kAbRe5gaOO2KBBuYZLAnO7noeWXHrc5zcv4IXSjPKTy7MTPWIwxygYpqoxprJRmj%2Bvm8un3Zm3Bgv2%2FihUzyOck4ZmBjSMlt64S7dmxS2OAsqQdpa8WZxQRUr3anKP8Z87Ftt5ovOXKPdyuntyRMkmBT%2BcIIypRcN0PMvGJj%2B9JtYTbAX4fbPoyXgYyD59ldCt%2FuvycRuHmh%2BpdEJBJRjdOJMXIX0N0J9fbPSmPF9LbvAtLqJnnUnw3DUsByJV4OznsDjYYCNaJzOxgU%2FzgCMS1iyla5G%2Fi6Wda3S1n%2FuSYVOiF7CuuqQsMApWgclY8uxc3uYqxC80p%2BgwmiY8tvD7yD1t7DCyq4WustwnwmCFyka%2Fk%2FTTJUS0PcP8ogtDtHvFUPF14JKy8a%2FJmnwRVSneXV5VA5UwrrLExfrFzIfXlYOebF53x9FX0dhgufLQipi40ffl24CohzfFmgw8sFcZG4tn4ODVjgcOB26MnLqAnZf1xnbuJb8lGbnnSrBHYLwge5%2BU62UZywHqcyaxmc4eh7Sh7sTDgHrcYwAuNo7CG3s4J4fiBe8diz1Nx5zs88TZdmARt8EHPFZ4q4ZkWQwPMWxWC7EwhZOrzgY6pgE%2BDLgwpPH%2BUPYiUSYzh%2FvMc0VYw00VkQiU%2FXpc2qy0T8wtFDnscqIZD2bLLl0ce8bMsK8%2BZgPF7TTKWWElfv6efjn%2FMLz4pIc%2FmEMdhzA7Vx3BzimGaH0SeBbcQgh0XFbKb%2Bn6%2FxKMK22qE4qUOkJUjjinTa1rAcUqEVEo9ipc291IkbNCTPPKSm85lcGrtaUn1N3XWuqbi%2F1oE7QfjRApWk7GULi9&X-Amz-Signature=48ec7acc30f35bbcf5163f9f5721900620e9bfa3ce35bf56176dfb0c92392720&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3P52AOK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCuvIkevOxtBZESQxzk5F%2F7nHZXHjDeTc22DWc12hOnGAIhAL1aPZNk99bVRHdvQ4X%2BewoYg%2FbwORFwjuzkI4CKIkovKv8DCCwQABoMNjM3NDIzMTgzODA1Igzhaf2E%2FN3N6SEY4sYq3AOEPt1wgZCv8dOBtm4n6rO21XRSUyWiAlZt1eidDIG4NetXr3pW1Ix%2B4h2f7E9z%2BmPDxI3qJVA8yHMRXkzjrWWGZbDoCt2cc1r29AuF0VNy8vFk9b2zQAdUgXZchx0ePPIfZOxMWT7TdnlrfPvm1WLNouocTQifz5QDce8fkqvH1CwFTufplLfAwZMJgMRYI8RF0J2q%2FxsoDK1u9wgFyEJ%2BrB%2BQIDiVnevLp2B2mty4BwutIpNYRYn%2FX8KiRf2fZklVhpDddxTJLdCaNjhFZCzv2YIOsI1SwGGr%2FqZlfMgCMHbfs4t3QdyVzR%2BLBlP1RsQlbRs0CaYmsh0v1bXBpLG2uXFW2nvUJSOGYecSJv1K%2FWY6CHzOLOvF25qO%2B28%2BRb7RaTdjJNcB7mWPpwLC9PVSSTlq3Rrp0SP%2FgZGtcW%2FDvMvHiEvlYGjA%2Bf%2BciYasb%2F8wAXwvy0dQzYHdEcFgGm3M4l4CwH9QfB302Xcu1ycr3K3o2mCSCFysKQej4xsySp4MHMCPjHmJ%2Bx5J4PMf8ABuLZhnEMYQ%2FXsOD7qn1qz2PWKnveyxtiLCKXdx%2Bm2m%2Bgm0FjM7MIWG98S3xJDGw6FBHbAMEeQKDAimtYx1w6fInvuhIVt8R%2FpUTbt64zCvk6vOBjqkAVUMR0%2BOvzowJDdhswUNkixgAMFsmeuaXxsYojoY1Yu%2BYLoHkU6cGEhQDAa6Fo0EyZdf%2F3Euk5HnENo0njpnJPA%2FjQsAde3XHxQdB1c57ktMQaKnfhr%2FH8f2IcEOrJcIwQ7veyAcqSj9LLQKF5HJrDFXeB52CSsrCw30FIQG96C2W91D3i40fB%2Bh5mOYmf00yrKllUrU9ALjFF8Vvp64VPGFkbCw&X-Amz-Signature=58f1341d5f3d8a1da83ecc68ca98e3c4f1ea6bf3d156ac46772931b29b80ad4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655HDBBGW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDTG1uvpIHW8B8y5rX3SXQyleqvqj1E1390YSk8awOIRAIgaMfdaqQpuKXG1gqJME8e%2FJA%2Flrwwsbo%2Fy31yn2cWsugq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDAvKeK7j1Dk756kukircA4XFZgRTllUDy44pXUpQmMAOtmIwTrc%2B%2FM%2FpVDKNPd00Xmp85ITcUnnmUI%2BRVmrsagwgz3lMO2E%2BcN%2BpJ57MmqPGuNirwAjDqNcuU8KzpwDdw%2F3SPNUZrKdhmz9Q6JZaPiLTZhPbOIiuyHzhyYGoRR8ya15ZhEVXIASoOfYGqs0FxwxuEJWs32VeS4S6a806UQEKBja4R4phfcrHC6YPnRpLT9Q35fH8FBXHWaJOICqvIH0C96iFfUpvUCGiJb95g9RzeHDC2bCuSyabH6W8lrpAWu9CtrooKgP%2BLyusMHqtjjLXZbXU3A8grAkf0ZTvT0T0cei7A7rV0fZ5CRNYW1Rrkzm8MCyKrqN7C3vf6iJmWdeqNjGM8195l6am%2ByzGDbmRbjuJBW0gCK8ypDKPGGLtOg09haRSbliX4uVnGVr6jwHNp8%2BZy83F%2FShkl%2FKlINny634V9Ea79Wf6pGbxdBzhkkSIqU47FZV20pfGwhpFYbqmD3XfH%2FOCUZFeBMQV9ahZLVd7qkczpzBHE6R3UgF8%2FGTh8JWUOAY00kuyVkiPUOiZ9x9hSzGs2JPvwhf8t2VE1javf9vVtZhOm1QcTWdWICZB7jj3ZLpy%2BjvaXkaMOTrvkjZtqXtXXrh9MIKTq84GOqUBtYLxPAS4zOVESI8SWDkfiZMCxpkcnfaDhLeBn2qd1z9h1UfLGIcod7j3vM9ypcXVrcmKSr0uD8UiCDlY7wHYBKeyjk4FyxVQ1DD9k8gWP%2B%2F3RfK697JWfw9NBsTQ7W3yo1YGI72UJeujtK7zKjH%2F1fFYSZYR27ggp9bu%2BW5%2Bk35qvy3HRRMAu7W%2Ba8ouj7KU9Hj%2Fy7CHTbvXq2MIYMez%2BzEkTvuF&X-Amz-Signature=c5fa895f2171b1c7d47564931ed3b3d2107c919755a31018dbacd78c7b6bfd96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655HDBBGW%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDTG1uvpIHW8B8y5rX3SXQyleqvqj1E1390YSk8awOIRAIgaMfdaqQpuKXG1gqJME8e%2FJA%2Flrwwsbo%2Fy31yn2cWsugq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDAvKeK7j1Dk756kukircA4XFZgRTllUDy44pXUpQmMAOtmIwTrc%2B%2FM%2FpVDKNPd00Xmp85ITcUnnmUI%2BRVmrsagwgz3lMO2E%2BcN%2BpJ57MmqPGuNirwAjDqNcuU8KzpwDdw%2F3SPNUZrKdhmz9Q6JZaPiLTZhPbOIiuyHzhyYGoRR8ya15ZhEVXIASoOfYGqs0FxwxuEJWs32VeS4S6a806UQEKBja4R4phfcrHC6YPnRpLT9Q35fH8FBXHWaJOICqvIH0C96iFfUpvUCGiJb95g9RzeHDC2bCuSyabH6W8lrpAWu9CtrooKgP%2BLyusMHqtjjLXZbXU3A8grAkf0ZTvT0T0cei7A7rV0fZ5CRNYW1Rrkzm8MCyKrqN7C3vf6iJmWdeqNjGM8195l6am%2ByzGDbmRbjuJBW0gCK8ypDKPGGLtOg09haRSbliX4uVnGVr6jwHNp8%2BZy83F%2FShkl%2FKlINny634V9Ea79Wf6pGbxdBzhkkSIqU47FZV20pfGwhpFYbqmD3XfH%2FOCUZFeBMQV9ahZLVd7qkczpzBHE6R3UgF8%2FGTh8JWUOAY00kuyVkiPUOiZ9x9hSzGs2JPvwhf8t2VE1javf9vVtZhOm1QcTWdWICZB7jj3ZLpy%2BjvaXkaMOTrvkjZtqXtXXrh9MIKTq84GOqUBtYLxPAS4zOVESI8SWDkfiZMCxpkcnfaDhLeBn2qd1z9h1UfLGIcod7j3vM9ypcXVrcmKSr0uD8UiCDlY7wHYBKeyjk4FyxVQ1DD9k8gWP%2B%2F3RfK697JWfw9NBsTQ7W3yo1YGI72UJeujtK7zKjH%2F1fFYSZYR27ggp9bu%2BW5%2Bk35qvy3HRRMAu7W%2Ba8ouj7KU9Hj%2Fy7CHTbvXq2MIYMez%2BzEkTvuF&X-Amz-Signature=c5fa895f2171b1c7d47564931ed3b3d2107c919755a31018dbacd78c7b6bfd96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSOJJCG3%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T203124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCj4Se1UdfgxdggLSFCda53AU67KdVHraZ6tLZ2HudEUQIhAPNF3qHN4juutd%2BfR64mxdRvhPuvEkZYRAOBOoAttJasKv8DCCwQABoMNjM3NDIzMTgzODA1Igz6tM%2BzE7gleOQ34o4q3APWQ04RWiodEbm7V7LwMDbBSzwubmv0gI%2B4GLDQF9M%2Fmt0Qc%2BDNkDMtZZeuvBds%2Bkmrs%2BTWE%2FYc%2BqKRDA6uz6hPVseR1Brk4pxc9m%2F56FD4Cm2R9muigpthMzKh14BfYopPY1K2rxjh2iCO4PiVB851X3%2FG%2FgddUcvtRfpbMISWx%2Bpvwq2CJQ31k%2BBqUoU44vltLUObyjys0b2ytpMkTds6YMT8sRPMaMDIO47XK5g0HEYgLc7R%2Fq7FthgDp2qWGvv21cPT0r2bSF7k%2BzQapIOwchEJpr%2FR6gPzvVhrMDr9MLVsxuu1G2g3dIvBQfFpQj5vEwRadsEBXqj1OfQdsKB64Tb73xmdawbXBG7PKY4DV53dcxDi%2BIQrKXm6MpSGltJBGpWNUqKNRw%2FvcppMFG2YatnnhHX2qeLeavGBfNx27xlrZ45OuOc71BhrMZ1a8VmqZG75yzPOMngrTRaUktl1ZlnvZPhmic%2BgR9QLL0oGedWqA1KosxpEokPk6zB1Z%2FO5KodmihS89jb6O7N%2BBflhu2cH%2FBtq7%2Fzx2cDcaacE3%2BJMTxcTV8YbAoh%2FQb96Ov4Ge11opfUNUPlCsQRXO6rB1QKcFmY1jespCkpSvduL9WZKV2Q7iXUrIRNzAjCzlKvOBjqkAVNedl1yeIqiYO87iEYu%2FoncmqER07pETGg9R7JLUWiMLqNOllc6N7d0c4P47vwNVNO9szs1Hf%2Fbepyg4RTI6LyInJ62dwq8Oim1rKQ21CGgzTlFy9%2FNUu%2FncCBe137MXCTQXLNDRhqTimM%2B1cfuRI%2BHi0aDekc5BLacA422Cae08ojzYb1ZeBG5NAFKMlwnm8q%2BPaMFGBEEG%2BUZT%2F8o3uGSV5b%2F&X-Amz-Signature=1b2172d514bc5758a68a41dbb13c77ab9cbf9bbf1c1c1dbb0c5dea21f7033a8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

