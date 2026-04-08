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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCV25USP%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDR6Z6IlRJpR%2F0StqlCh7HFHGQzEkUBHYpEkQbsxn3K5AIgQg2i95UMt9gLHYnluiNFFX8nErLd2cjg1pQfjZkd3cIq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDKWHo22Apr%2BWpj6FpSrcAxUO9vv3zSKHEYVu7Un4OdWv6eLvatkGZbQpD%2BxdJJsauSwwYF6QcLt6%2Br1b63dNrJvIH1c8jhHnbgeFqE1mRZOmIsEaCwoaXwyhEY6hCLglXRemfyJhp%2BMn%2BUv78394PosCLnIEchfme1RXYUw3zrHMfjwa%2B5UFRw2o6qnfh9hEct8Zt2rIIRGzpVU98olmzdlgC0Mm8K5rw94jcH1xKaDsp%2BbIw%2BnZCwyxjf76ZjLlEinsjKjLx%2Bd9%2F8HNMOxBi%2B%2BMieko0Grtr6LirzRkU9dbcWM2JJJ2QwlDunrdc8crzjkTqa4jAi6Iz1YPz%2F52CrznDw7jWyUgFNO1jKo2EXWrwBu%2FBw0MfiQxvW7fnV9WJ1w242jFIekMwxNZUU1%2BYKve4e9pNVne9F4f25iXWhFmUqHh%2BDzimUqk6843x44ktFthq8BvTeKc2CrbKqYiXSHJmMgVc7xYMn9bpVc09Km%2FSVH%2F%2Fn9WLPuIvWQJUk0q2boXqf76%2FA0Zl1WtGqehDoWDI2Tm5EnthzFzOfRF88n6zqmHgONQpUAzSm3SoRwU3IAwBYylbsGh4WTH4ZfKVUtI7qfT6yYdKEFqfyyU%2BTaIdf8EtK7HbPDxGwjIogAZT8MyPbv3Y3niK0n5MNCi284GOqUBJBGgjxRVS7y3znOBmPaZ%2FxpJ7bhIFvIjfThcH8fPP7fB7sy9aAulW7PdAm1xHuZhZZXEVDE6fspZug9cgok1jvDt8kFB3aNItEg7OJj5SDcPsArt%2FGz8MNqcYMxDCru4CK8hdWDA0a8mj8szNkb%2F7tgTH54PX0y1duupMmEO7P%2F5ZrB24vgx2AbcTk1ibdXj4ohhnZ%2B17Jq0fmLV46ppTx7oCQsK&X-Amz-Signature=eea5d151eb1c1b079e4a6d6f8b7e0d982283c3c270adeaf2c33602f90416b9f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCV25USP%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDR6Z6IlRJpR%2F0StqlCh7HFHGQzEkUBHYpEkQbsxn3K5AIgQg2i95UMt9gLHYnluiNFFX8nErLd2cjg1pQfjZkd3cIq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDKWHo22Apr%2BWpj6FpSrcAxUO9vv3zSKHEYVu7Un4OdWv6eLvatkGZbQpD%2BxdJJsauSwwYF6QcLt6%2Br1b63dNrJvIH1c8jhHnbgeFqE1mRZOmIsEaCwoaXwyhEY6hCLglXRemfyJhp%2BMn%2BUv78394PosCLnIEchfme1RXYUw3zrHMfjwa%2B5UFRw2o6qnfh9hEct8Zt2rIIRGzpVU98olmzdlgC0Mm8K5rw94jcH1xKaDsp%2BbIw%2BnZCwyxjf76ZjLlEinsjKjLx%2Bd9%2F8HNMOxBi%2B%2BMieko0Grtr6LirzRkU9dbcWM2JJJ2QwlDunrdc8crzjkTqa4jAi6Iz1YPz%2F52CrznDw7jWyUgFNO1jKo2EXWrwBu%2FBw0MfiQxvW7fnV9WJ1w242jFIekMwxNZUU1%2BYKve4e9pNVne9F4f25iXWhFmUqHh%2BDzimUqk6843x44ktFthq8BvTeKc2CrbKqYiXSHJmMgVc7xYMn9bpVc09Km%2FSVH%2F%2Fn9WLPuIvWQJUk0q2boXqf76%2FA0Zl1WtGqehDoWDI2Tm5EnthzFzOfRF88n6zqmHgONQpUAzSm3SoRwU3IAwBYylbsGh4WTH4ZfKVUtI7qfT6yYdKEFqfyyU%2BTaIdf8EtK7HbPDxGwjIogAZT8MyPbv3Y3niK0n5MNCi284GOqUBJBGgjxRVS7y3znOBmPaZ%2FxpJ7bhIFvIjfThcH8fPP7fB7sy9aAulW7PdAm1xHuZhZZXEVDE6fspZug9cgok1jvDt8kFB3aNItEg7OJj5SDcPsArt%2FGz8MNqcYMxDCru4CK8hdWDA0a8mj8szNkb%2F7tgTH54PX0y1duupMmEO7P%2F5ZrB24vgx2AbcTk1ibdXj4ohhnZ%2B17Jq0fmLV46ppTx7oCQsK&X-Amz-Signature=eea5d151eb1c1b079e4a6d6f8b7e0d982283c3c270adeaf2c33602f90416b9f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WO2UMZ53%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIARaDsipGtyL8NEO0KJqSvq9l%2BchiUvQh6OBqqS4FpvoAiByMRQz3wMsTGjFCfSDdu30GwG4YejsdCK0zCQS4TzymCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMGsM%2BeaYTo5jDUSeQKtwDuHD5UNHVFiSujlchCFrANSfxsSAmEhws14C5ZvXESY4uj1A%2Fq8K4c3j%2BACUA51of%2FMwHFKBe7%2FM5hct%2BivTkv1eboCqy%2F0%2FxZ7HhoovzB59NCrwDlvB5wbKj6Uc672M30LvOHedp6aJdLrN1x7uwBx5v58cbODwBYy65k3EelW7s490IZAhFLo58fwv73yRecD%2FTvIpqMefCKXZ6rOYDaWGVwEJPqAu84wtdVXXznCAF6s2yhZQYvoU4F%2BsSlLOHXjRGfdDEjZEaQLJQtuCyQu5xNiMx5ZipmHmr4KBF%2FdWNSJ8FhDUm%2B4mgR1ucrgd5dxIObCbf5kb31azQOdqiGAEw4EVVR7LSRxN%2FdmD85BvY7URLMxOYi1ahWxHvQWxTpuVmbCfv1VjKDBpyPfNnU%2F2zREzTNJjlGLvxxb3%2BmD8xNCQ3prjWREQrz5Ntko7%2FKBwgNY%2FdKJIAJy%2Fa1mVjCogt3sAjBbaMRT50vnx55SqaLtT%2B9%2BVMabad4faTPujKRke9jnc039Z%2B%2BEZ082LlFHz95%2BP98OWEVIUdtSD2It0Y63YUR0X%2Ftu%2ByrebyGH2QbkMtvtttHOaS8Eg288DRUoS1q6dVLQvhLSYXqfUY6CxGpVJTsi%2BtyOyIWyYwu6LbzgY6pgGxq1z4WanjS2wtfuPVsL2GGbzmz7iXgcYgmnL1l0vDPrfTJei45mpfjokP85fFXPzcB1cf2lupnuUq07dDNmiyMJJ6sywdp%2F868jWeIJSdV84nZX7JT27gyGabqav2sSArPzhgnWMM3oranJIrLbfa6B4rVAwZpPzzHXMYlsYeiUf3yrP9aXya6aHh2fh6Lv8QkFCK%2FGLvnLDNq7wZMdEP2meP87OV&X-Amz-Signature=dd6e2d40490eae38a002caa9a86366f33880428788b4ef497041f5d2ca4d46fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSEBW47D%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDrGdMSU%2BUCWcoTNLZq5oiHmVLJlMhqYW3prIebUqdEdgIgOuk4mnnUUQbHFYKirLcGre9fTHugogaJ%2BeBeKud4rOIq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDJ7HOMJZExsj%2BdKteircA%2BoFORdKlIB1r4D4hGg2sYCtG8PfM6FKOnohohekKTTvCeqwV591YV6nqBFlSZtYqH9EBr%2BYn5I5mOmiNjbz4tQ%2Fn14ZT9l9BvSrC6PhlMSDVdqYNTAnyWwTKDtlRTWr8DCHVsGPRG3Jl2fHiiC%2ByljSu2gr6HiSmDtla6L42eZUff6oGVo2qhBZrWw3j2jeoSyhDDNk7yNm%2BEiMAjOWjjqgX3rFqZZ22ZndhWfmasWNn0oX%2BKVVJDzGvxgkKHPrFlLPZbvqkGNJmN6A5iFgvC2pzylgT4iFwoF77XbFrP3rM5RsOGBFbYxI2ISzg%2FSA7S%2F2%2BYakurYrkfzEmjDrCUq3hvhXv%2BoeopvEN7LXeViWY76SzVV0%2FLaNU3AdQ0Jb6W20GSluWkZt%2BkUaFZRvhlRwYnoHf7SozkVilc8ayvZbxpMSBnG3ZafUIza1cHQOH74axbBC%2ByZn2BUEqrcEHMeHeZ5QKDqHsDkRLUGzyf6x1nWgCFsOHQXKNf8zT4VAuUF92eDE8O%2BDnjClFZnabR35cY7DtfWwOhIS6g4atrXb774DCmyvaGZPgg8tsaBqDnmBsP5rlSqSnIUEa4xLKakZCryZ56kHvJkHKWEZQLHo2hwK86%2FfoE0o9mc%2BMOCh284GOqUBt8mas4Ma%2Fi0SAoXMtRg3lbGg6T3Cjg4rCFlEEsfmzdWh2xCI9ZKG12gXVKT1C4gwS9sO0j2o737Nww%2FdSrxWdR%2BMfFKpKdyirlrrsfUEHBtT4y2PcFLTm96%2FmPTs9f6Se7MQw8hPt%2FBneACkhzkOfblGEXJHGTLcFg%2FkoJTv%2FM4QQ1mpeNm5t7Gk%2BGpdXJKXujqXrfW2xr2la2RhScoGgbc7pXOq&X-Amz-Signature=0f2193d893fad851d96544b816338eba29cda272e0b7d7f52cf5053bc66c7ec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSEBW47D%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDrGdMSU%2BUCWcoTNLZq5oiHmVLJlMhqYW3prIebUqdEdgIgOuk4mnnUUQbHFYKirLcGre9fTHugogaJ%2BeBeKud4rOIq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDJ7HOMJZExsj%2BdKteircA%2BoFORdKlIB1r4D4hGg2sYCtG8PfM6FKOnohohekKTTvCeqwV591YV6nqBFlSZtYqH9EBr%2BYn5I5mOmiNjbz4tQ%2Fn14ZT9l9BvSrC6PhlMSDVdqYNTAnyWwTKDtlRTWr8DCHVsGPRG3Jl2fHiiC%2ByljSu2gr6HiSmDtla6L42eZUff6oGVo2qhBZrWw3j2jeoSyhDDNk7yNm%2BEiMAjOWjjqgX3rFqZZ22ZndhWfmasWNn0oX%2BKVVJDzGvxgkKHPrFlLPZbvqkGNJmN6A5iFgvC2pzylgT4iFwoF77XbFrP3rM5RsOGBFbYxI2ISzg%2FSA7S%2F2%2BYakurYrkfzEmjDrCUq3hvhXv%2BoeopvEN7LXeViWY76SzVV0%2FLaNU3AdQ0Jb6W20GSluWkZt%2BkUaFZRvhlRwYnoHf7SozkVilc8ayvZbxpMSBnG3ZafUIza1cHQOH74axbBC%2ByZn2BUEqrcEHMeHeZ5QKDqHsDkRLUGzyf6x1nWgCFsOHQXKNf8zT4VAuUF92eDE8O%2BDnjClFZnabR35cY7DtfWwOhIS6g4atrXb774DCmyvaGZPgg8tsaBqDnmBsP5rlSqSnIUEa4xLKakZCryZ56kHvJkHKWEZQLHo2hwK86%2FfoE0o9mc%2BMOCh284GOqUBt8mas4Ma%2Fi0SAoXMtRg3lbGg6T3Cjg4rCFlEEsfmzdWh2xCI9ZKG12gXVKT1C4gwS9sO0j2o737Nww%2FdSrxWdR%2BMfFKpKdyirlrrsfUEHBtT4y2PcFLTm96%2FmPTs9f6Se7MQw8hPt%2FBneACkhzkOfblGEXJHGTLcFg%2FkoJTv%2FM4QQ1mpeNm5t7Gk%2BGpdXJKXujqXrfW2xr2la2RhScoGgbc7pXOq&X-Amz-Signature=230a25725a0785640ff73fb5728348a197d8e583e4417cd533c309103428ee0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4VBJVL2%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCICJyFHVqRzgQrql67TUkogd%2FaGsZwRKMdt4dXl%2BVxmAbAiEAsMWLSuJD4dyan0%2BcTdnsnFfob0rGf690jyoVbp2x%2B%2FAq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDDZ0VFgVnfKrn949OCrcA97pgjDLQe5NqhlJamv3O5YoqJQGtXcmslCRAKi4WJMHSdT8LvtCkxtwO79pbMPMJkPnzyNyG2f%2FbL8f4UzarWGOhtslyHmsl6BCo%2B2%2FvpPbF%2BzOGB2VyOuBpUPToOuZ9vtUo8tQTF4Jg%2BufRLSTnUL2Xc%2F6QF3EBwePhZG9aIaddTroQvFko4cWDZ8dF55S6AvBMOzUt5foKz5KoUJYScsYpaT7pVYpVt3AZu7gpGpaV2u9j7zlN2sEQlOTscxpZziqcT0L0IfouZCMSGSo4INNnIzjYnLE0qaFl6RSjLGMAvDuAhJF0L7FfKLO9poNP8zl79k1BCDWHn%2F795HACh4oQh1xKDECSDbmwrOVB1IMCpblYja%2BRae0EArypWxY9wsrOVzHfsSXZXdv487HPCKMEk9hVnxRjZjbgCDsJzykS8L8pEbHUIabvv9%2B5JbB%2F6gNc4jJOODSuCsehdenmAyEfO5ZGxfYVsnRZntDNL7wYOy0eqyuXflbZ7XqcbPD%2Fq3LM%2BDrd%2F8dxWjwv531gq9TbPfTWmJOapX7eKtT6%2BXl9CHvXQ9xNMXQ3eu6lF5hfisA2jDh9P6qE8wR31QiDkrKiWzQfe%2BqpCMZJ%2FvbzbWq5W3dsARmU1bGbYGjMNOi284GOqUBQVclHB0tY%2BrwSYx%2FcqaVe1laZodG%2Bw7J%2Bs6zPeGFosFV55E6L8%2FcEXtsoI3Rva7Dk9Nbxl3MdCHb4IDsVp4W4jJ36cUXybG2catQZkXN7APr9cTxXyjwnBc4DoWWYYLmTT5dGgSuikYuheeYjEZ3PYuDmaV53E877wveGFg3W%2Fwv8Vy5n5RqVUvw40sEc0Un6SS4TMc%2Br30S1VMD6vIaLWNzuA0q&X-Amz-Signature=9b9a3234730c582bac3adc6f6d55857592d3277c94444da54e578ce8d224da99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BNGVBYQ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCJfDPbhXbrwxBOU%2F3frhhd095trEy57ufG%2F0VFr7zVrAIhALwkj7NG6ODYJ0HY2wsV8NghzlJOvQKdJiRdZR3uqJvKKv8DCAcQABoMNjM3NDIzMTgzODA1Igzas2BqRVFrQbE5iIIq3AMGcfacLN2wMKpSnEuAtVRWJGL0x9EhU%2Fz0gdduf%2BDmFCDTe5UF9TtwgPXefEA2I12z3r3WAEaGUX0pHmtPxG0kQkRKa1eEntifBE2iZACk5BQgCV%2FaV6QKlqFZzRhDal1I37Fwoq29wi67xZHIUijoDVZ2CMY5ps6p5T1OM5DNR%2Br86%2FLdn1bRtNqI6jnH6jglUpmdjYcVFR%2FOFoPXKVKRfLGI1dYDpimPIx%2BLCzuLzBz%2FdDkVvzFIcu9hpTRT1vstgnGEHegppBZIgS4qnELTYQrJf40k%2Fp%2FcMm7%2FQBnNtzgQpIyTU%2BXzKlpbBjFtdH9SbjZUhaFyuBs9sw%2Bo7L8LW%2BdkVRYyAPvg9wWTMyqeD0lhDW%2FXmOvaZ9YH2K6%2B9qsiSp32XvNnI9NBLD2YiRtm1s2yO%2FkdoczXFVHplDrfw5BIL%2BRQkz8IM%2FjatO0lrDwKPY2d3R10WNlgScxE4Vxzqp1PKrHh2e4QnhqE6Hkgr2po6wVu9X1%2F%2Fg9cHXksPUlHMVejrYCKLPNMlibGp%2BWt3qnWv5%2F9uih%2BSrHkiREjpH5hMQP4LyLsfnamA53651DsORQhOKFvlqCUcpIDIwq2%2BMkfFUgkqNxT9klTQtO8Tbas7yCUwuQ65fsKhTC3otvOBjqkAQDCWQWIaa%2FwoljnKXPRSbr3Qcj6ek6n2SkF%2F%2BAb8SVWDRIx1a00VzY4oaBXMCyw8ZOTszZlfZM8eDH%2FDghFOGYooUTpbx0mGNPSDz2J7Lyrtu7f%2FwogA6qJqm5wPnvA%2F6BJQN0PiyB6Irvqx5Ljz%2BwZlvd7CymCAUC0MAvWBr9i8tNeoAm4H3XH%2FoIHgC4JIIVWwSg0d5aENnHLG3QJmxqi3UPr&X-Amz-Signature=868847dc0bfe184f31d87802764c67f60e242daaf8b8c283631b01261c6333f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXBOWA4E%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIB%2FgCZf3i2crtPZt4pRY8fWznujcjpgVsS5tbMqLhoYWAiEAllZjWKyZ6hy5Ak5FK84ndmaShP4ybFP5Ddqf1ldDEv8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDJ8jOABifgmCPaliGSrcA%2FxbkX%2FtdpJCVPLq9HKwNo7ofInJ9N7Hy%2Fexjx%2F74Z2xmJobfjAl9tw36TroIfjnCS%2FS7J6d5xbxryxNDaMSFRU%2BOkx9EjxbPQSaTm%2FBwZCM7dc5rwZxR2cMIE3rQ3fVRPfY7s9TscY%2BIy8WkXlriFBn2OESAqavatBJ220IC4oqViU40lG5xYJwYTiku2Yg1AhMOju3Q9x61jb%2F7KNEJT4P%2Bksy3TeNWjZArkU%2Fs%2BOMkdly8%2FWjIoX1D3i6FNUOw8SwWl7AZcsSt2vTt19Ord%2BXZR5tP%2FMcuEqCN09WFnbtHBKT58j7v4GYVPbjOCCUWDd%2F8vmacUj3gWUQf4CaAsW%2FfThdmBheF5x2Jc%2FDLUui9hX6FMY4UgjRly6vYrKY3qZujjI6%2BisOm%2BZU%2FgB%2F%2F1GmqXkWjYuZ8ODXyF9geNL%2BirsMLk%2BC0KkzdyxPphHwgO%2F8DeixoUJnelM5ps3lxshxHlap1WgilaYQoUuzZwU%2Fz06EuPcm%2FHqIba0arL4ubP16H7rq1h680jDLvsHWA894kvPyrRDUiGWwe5yIrLZ%2FVcBwoM%2FckOjCo1sniW%2BlKPNHS9V7XTYrXDIg35N5%2BRUNVi4R%2BYiHr9AfNqo2OUiLEMdfm8u0hg9rwK5EMN6h284GOqUBmiewyEiWf2cGnOG%2FY4pvNB%2BHcm3SJ4%2FVCZv79EDImqoQkLkLSqpnVdGDPkZPQIpOZyWLsF1JZRmaU2BPgdXVUr6%2B9BxwaX1rhb4AMJ1fA7Sq0XtsiLKj0ExZtDMrQE26disoJXP7%2BMUlsKKhSHwcLfVKF4RV68D21kEybwiIIXBQW6Kof%2Fb03U4rXr4gA1fEe90Z68rYf70xFHbDG00%2B%2BZLGE2Rn&X-Amz-Signature=077039a51aaabe684526cd41fbdb401e79b566f5bc6edd22f1fa893783f83537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXXLB4SJ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFtd0v%2FpHgRNFZ6fLBD2f2M5JecbbO52dRRWLQpczOWgAiEAmEng3AxnTHssXNHW2j4lWqhniVPUoNs6gwggUuGfwQsq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDOUUdzbwAuZk5g6cGCrcA8LtQsTkiCa6m5rzXcwJcqRRda%2F0%2F7jwIih0NZxM6kQ8hmvYI%2BgmJgBNpOcjh4YYEp%2FZBd%2BBFIwZrOvMNeDNgLWWon4XRDjQOqNh6aBiSvf%2BfYBEXGMCwCr0AJNoc5JxXuTxfD6Fv2RE0hOA59SV7dzw9Bhd6Pn%2FEsk4rrFp7GeiAaCEWrODbWcdG3CCQoNoXQWMX%2FgrhKQ3ZneR2EP8ejOX8rSYse%2BjqBpWrmQ58xaL5lyS9tQtUj%2BA105Rlji%2Fpn2sAzMMvVL8qyR1dXoVGRzi%2FHDsSE%2Bm3AStt%2BXUS3b%2FEcaT8Hx2qdBrGgeZEf5YwEvUDj1QZKUGzcupZQrBguvalDj1ufZexHTcTCvQ6N5fU5D3j77NeimX7E5SWTVRTsQPds3t9bJmpa%2BDy7mzachn8Bw%2Fa5O5bFfwLQKLW1Zf4uiaRpy1z0H4Qn%2BalhGxXcrnkbT8X%2F3mVAH69gSZiSiVP93YS37Ve3zwp7o4QogCYSWCza0dqLl3W0yGkkfVWKAwGvFXovd5vFtkp7MQetVUDCv4JuzwV9tWxTCFIZzXx1FAdLgEHXEGX4FYRpQCu4FdGRhfNS2f7nxVw%2BYsZfqVURkjfjiGQU7OadKYILJjfYHJwPJiBwIi3zrmMPCg284GOqUBDZjxkNKkrFd%2B0nxPL5j9ZVwxk6DnS1uKJTeh4L6bAXsuzdSlV5%2B%2BGRbjXcCjYkzRXjHYl0f95Eo5avguBo8V%2FdFX2yUOnq1TOwrpyYo8uy%2F6Fds9FIA6KPs%2FKsU%2FBpUvriq9J7XTKLiq1G8dMlR8HCpTBL4gxnsbJvoydlaBbED%2Bg5dwf0HJAWau10WYOlyuaIzfsXsK%2BlVkr8kWRvM4QnPCbCmg&X-Amz-Signature=8c54ef1ad4d9ac54f143dcdeefed087b3f0344892e659b142dd8a33b49a5a56d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXXLB4SJ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFtd0v%2FpHgRNFZ6fLBD2f2M5JecbbO52dRRWLQpczOWgAiEAmEng3AxnTHssXNHW2j4lWqhniVPUoNs6gwggUuGfwQsq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDOUUdzbwAuZk5g6cGCrcA8LtQsTkiCa6m5rzXcwJcqRRda%2F0%2F7jwIih0NZxM6kQ8hmvYI%2BgmJgBNpOcjh4YYEp%2FZBd%2BBFIwZrOvMNeDNgLWWon4XRDjQOqNh6aBiSvf%2BfYBEXGMCwCr0AJNoc5JxXuTxfD6Fv2RE0hOA59SV7dzw9Bhd6Pn%2FEsk4rrFp7GeiAaCEWrODbWcdG3CCQoNoXQWMX%2FgrhKQ3ZneR2EP8ejOX8rSYse%2BjqBpWrmQ58xaL5lyS9tQtUj%2BA105Rlji%2Fpn2sAzMMvVL8qyR1dXoVGRzi%2FHDsSE%2Bm3AStt%2BXUS3b%2FEcaT8Hx2qdBrGgeZEf5YwEvUDj1QZKUGzcupZQrBguvalDj1ufZexHTcTCvQ6N5fU5D3j77NeimX7E5SWTVRTsQPds3t9bJmpa%2BDy7mzachn8Bw%2Fa5O5bFfwLQKLW1Zf4uiaRpy1z0H4Qn%2BalhGxXcrnkbT8X%2F3mVAH69gSZiSiVP93YS37Ve3zwp7o4QogCYSWCza0dqLl3W0yGkkfVWKAwGvFXovd5vFtkp7MQetVUDCv4JuzwV9tWxTCFIZzXx1FAdLgEHXEGX4FYRpQCu4FdGRhfNS2f7nxVw%2BYsZfqVURkjfjiGQU7OadKYILJjfYHJwPJiBwIi3zrmMPCg284GOqUBDZjxkNKkrFd%2B0nxPL5j9ZVwxk6DnS1uKJTeh4L6bAXsuzdSlV5%2B%2BGRbjXcCjYkzRXjHYl0f95Eo5avguBo8V%2FdFX2yUOnq1TOwrpyYo8uy%2F6Fds9FIA6KPs%2FKsU%2FBpUvriq9J7XTKLiq1G8dMlR8HCpTBL4gxnsbJvoydlaBbED%2Bg5dwf0HJAWau10WYOlyuaIzfsXsK%2BlVkr8kWRvM4QnPCbCmg&X-Amz-Signature=fa34bfc7554e9af38e5cb238984334a9b028edf85dc02726feb32d32cc589af6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZB2GKCE%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCYV1HmudMfNIr4QB7WJEAXvaYP7HfcincgswB15T6ORwIhAJcjpcUpXn5moZ0JecYZbeYExRyttj6IwsNYZpIfur%2B6Kv8DCAcQABoMNjM3NDIzMTgzODA1IgxbN1RHP%2BcdJywL3qcq3AN%2BTtszLTRFOkhRE2kvp%2BbYaudBPhwVHcUmkdNfxvmaQ3PHDrQkk7owGK92dYxZ7E6dT4bbJvGlDM3h27ZluEGo12FxWHrEoouRqVsbk312UbQuN%2B4x2RChVkdbp2f%2BOuARRdqQFnc1MRN8k5iB53xmseT1hcRLIa6N0piBET6Rr%2BFT4xO%2FWsnXCfcepzUhDsZenKqx1BFvM8UiT%2FxKZpRKGfewOGfpfurBkS9uPSF89zOts1rfP%2Fe61JgJVGrQ9kwQZbkS0%2B8fknlDt1A4QfzEtXyM%2FpJNAxM00aA9fIC51CziIq9isfvhQ0FMsgu7JDwEZmv4kkjClYt6OCf7xWeOoJAaZB%2Fk%2B1Jhj9xZgjxks7TgVNm1cLFbaRhJoHTI4JAORknxxyDRA9Lr2LlbBd5qXl%2BBYZSIYwCNEssOX6KVfMWEveB0kpCzDETU2SjvKZ%2B4oz%2BChp5gx7c0Xa8P8jg1R6zwU0UB3jBuckDJKUzcCQYqqaJ79i9tF1QMYiBxiMMygpbctxy5J76FWrVq%2FJv5ndhEIXg5nWO7eN4wfx%2FVGMCLw2I53DqYkyCo9sLYLOh2RAk8lSXNKZr86OLgihkuM7md8kSqg2PpFW9%2Bhv8ZZHRtDrrA%2BFLQ44CUZzDyodvOBjqkAYtwp70ELj1LXEeu4g6dDnCA9zc2%2FW8Pnc4wi26vmwai9haRYj0lqvF3UhkPBVhlse%2FUQ9BEizrUrhNBJg9z5EA7F2pQLX%2FRl3KBOh2hSk%2Fd9ybe8arTR6aPkymj%2BemnTIvolF82fgOa33YAPGmxlv%2FmZVGALIJAZOyCfz%2FCfLwf8X%2BoND5KoQCUOGR2jeOjaLzOFUt0s6cN0Ez%2BO11RuwCRkvjs&X-Amz-Signature=736eff7ff6a43b0a181e12b84e7af7514aaeb3e68043c6e17dbcce569a7aa6ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5CSFPKU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCID7MwhBsesl0ldzisLinJAsVWoCYFckJvAJPf5wc%2BGY9AiAz9RjF9DCo8M7T1K%2BxSjZYuUyc4sdXRxKrnbkvL%2BfHUir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMTuimrLsePJvU4GDbKtwDinFW1RmGZ7U691LeWxSKFICmOD0MGnyKVt4JAnPmV%2BSK1GFYsbzNx%2Bq3hxJ3TJYwsPB%2Bh0gaTnyyFl5dEiucbyPzh1DPfDN8gM26qQQC5wGdDfay2I0pdHrM%2BBPaijK2Asv%2FCf60%2FQfSBnt4Qvgozhqf6WHo45O%2Fb6I0BGt%2BR%2FwEhV1BegvS9lnPabehszycv1c9QsAK3vgNxKcfdwPauYBYevESEy3Z%2Brr%2BwnLbnZ3cwy96EQBb9fhn1jMvWdCxSG3005xV7iRk6gEkKgNJkx19%2F7oDRA4O8aSSLC3fmxqF3N3%2FNKHbuQd5Xxsn8fZ90utp7jjJyrX%2FngJgKka7Ol4q%2BT6jnKBXoaZoala2DYrU5ZkeQDZmWxc%2BiyqlPci25oy8RIzwoiO1DOYi96fOuKgnsSmP%2FTYb5wpe9twuGqMPpESqOaYW9%2BploLBQzMpzUJ4aJuvpTS6qPCKnD%2FJPaqyeu4LVa1BOAHazroRxsRcy5xZlKURjoPzB14aYYTYMpet%2FKOUcpFxgpaKE76lTyzc1xe%2FlOOgNSJONSM%2FgC8KkpoeRIisIv542Tge1D4gtv7n6aV5sRfqihFXfbVUZkVUXZuSFLRho9eZ6RGzjzRAMAX45UT4al8tebNAwoqLbzgY6pgFCS3nM5hyvOuAmjLFp4euDjxJI%2BvEyMW6y7WFa9U52GLSNuNbGagOflg9cHOPxVl6O0By9kEimdeg8Om0316e7WAX9VwGSFz6viil4i%2Bt8waWoZDF4tH%2BrhIxExVE6lKojpGvMpVoz9eIGT3M2aVRBs86bmtSxn8zXMb%2Bk0h6khcOkKy1Xy5M0TnVItm8I69rwomXUBJQUs%2BdL5VzXsCbEAvywr88e&X-Amz-Signature=4f0b3180f5c3e291ef422da9ee6d38cf78c9f567affe27824ccd53969bba4a7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5CSFPKU%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCID7MwhBsesl0ldzisLinJAsVWoCYFckJvAJPf5wc%2BGY9AiAz9RjF9DCo8M7T1K%2BxSjZYuUyc4sdXRxKrnbkvL%2BfHUir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMTuimrLsePJvU4GDbKtwDinFW1RmGZ7U691LeWxSKFICmOD0MGnyKVt4JAnPmV%2BSK1GFYsbzNx%2Bq3hxJ3TJYwsPB%2Bh0gaTnyyFl5dEiucbyPzh1DPfDN8gM26qQQC5wGdDfay2I0pdHrM%2BBPaijK2Asv%2FCf60%2FQfSBnt4Qvgozhqf6WHo45O%2Fb6I0BGt%2BR%2FwEhV1BegvS9lnPabehszycv1c9QsAK3vgNxKcfdwPauYBYevESEy3Z%2Brr%2BwnLbnZ3cwy96EQBb9fhn1jMvWdCxSG3005xV7iRk6gEkKgNJkx19%2F7oDRA4O8aSSLC3fmxqF3N3%2FNKHbuQd5Xxsn8fZ90utp7jjJyrX%2FngJgKka7Ol4q%2BT6jnKBXoaZoala2DYrU5ZkeQDZmWxc%2BiyqlPci25oy8RIzwoiO1DOYi96fOuKgnsSmP%2FTYb5wpe9twuGqMPpESqOaYW9%2BploLBQzMpzUJ4aJuvpTS6qPCKnD%2FJPaqyeu4LVa1BOAHazroRxsRcy5xZlKURjoPzB14aYYTYMpet%2FKOUcpFxgpaKE76lTyzc1xe%2FlOOgNSJONSM%2FgC8KkpoeRIisIv542Tge1D4gtv7n6aV5sRfqihFXfbVUZkVUXZuSFLRho9eZ6RGzjzRAMAX45UT4al8tebNAwoqLbzgY6pgFCS3nM5hyvOuAmjLFp4euDjxJI%2BvEyMW6y7WFa9U52GLSNuNbGagOflg9cHOPxVl6O0By9kEimdeg8Om0316e7WAX9VwGSFz6viil4i%2Bt8waWoZDF4tH%2BrhIxExVE6lKojpGvMpVoz9eIGT3M2aVRBs86bmtSxn8zXMb%2Bk0h6khcOkKy1Xy5M0TnVItm8I69rwomXUBJQUs%2BdL5VzXsCbEAvywr88e&X-Amz-Signature=4f0b3180f5c3e291ef422da9ee6d38cf78c9f567affe27824ccd53969bba4a7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKCJA75N%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T232730Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGHmc%2Fvr6oWf5iYAZP1rgxLhQ4F9GbpGX9t1E%2BWIkXGOAiBt%2BEi5MQB4SOdoEVIML62KnWVP8r672%2FNrgx%2Bmt%2FbF7Sr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMCKibpM2jDmQs66%2FcKtwDE8nUTN0n41wYkloF8T%2Fe2Exe1A4tdNBvb9YHkrjNvu0YSG1hx6p2XePiNM2A2f6xZqfBNszus8Vxwt%2BosBOM%2BBANQ15%2FTr8EHctBPMAbeNevnynYSZCHPMdd%2BOygyO84b4pDwohglcpLjUbJmG7OAzOHrHT4aii7kWW%2F7GJ3lyA2mExBD%2FI8rtq4bV3DDp5mVpfNazRVwHrPQz7OpaHvqJG9QNvqs4VZHx07FupmzCHVHwKWFMt9nw5EdyzpEMkfXpT9rmLFezL8ruuIFsNArAKRdBUIfB2R4iwH5VWAZLVg2j6EYnFbYSwwnFZPShOrUDnTybLfFDErtbGWd%2BQ3PaeWHRV9%2Fya93AkgARh5aKXNbE8gW7tSvsqRPxrDJGl2ljwp0b9%2BN2YB%2B2sdQsELC8ZHZNaVrWRCuUCqO1AUHiLmJGhTQDJLOityILPuTJOpFhZm0pqpUIGbJF0L3lWX1wWnBA83GQwUE%2BfVNkrD%2BzPidj5VWxmLEBq%2BVOzolKTZ10OE2vkU4rR5Sw%2BMkmkhMALAXVC1CDzydMLLLXcNnED%2BcootpfZYfMmvV6ezl9Gwzl2nUE00ZR%2BK0ib4a0ZjcbQ9%2FZ3P84hcj3LIRrAsPkxy1pfnpcXIFynkmqkw6KPbzgY6pgFUGrrbaHmHS20I3EQl8ggAjsLMN8soYwLiIDbi7c6L2P0ukZr4wF4FPsHqQLbDsv1Xf%2Bf0YDvQoREhHul8Ig8397znPl9KNbDqLBZFGAE1r1895iPuQia%2FiFQrp6UAwfaBIip1YhtyKNTZaTFxxB15%2FXYMN2pwqEvwzSzpyst7KXNmXSOcbko6NVz%2Fx68B%2BrUgfIJAGKPiVdiRd1M0WOjTPEIeG2Zx&X-Amz-Signature=fbb8bb27d569ac6295c570b7a061b785fc7ac3cc72e83ba15facc509bc540d32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

