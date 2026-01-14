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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EVALOJF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCICkh1Sb6VQqqAvt8tCuId2gcDep8MKK%2BpTIdoExIB1QNAiEA9ucLXsZjZnsn3BSIS76Z8eXGdjIbAXBJypQPKUAgy%2Foq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDDnL7OrFyQbe0ndIJSrcA6XaDRTtaT6%2BdcNwjozHVxzZaLzYrkTDszoGuJmHuAaIursrGDMv7oATyam8LSe%2F0i8AZ9NomZ6tCxm1DQEfLzrZxlM90iWoF0QL%2F%2F0d8pdaEJuKNKR377SO40QFxtjntUXE0ygOvz%2FG5sjZWgqdzhf4pC12jhHMcitNX1EOCgFjFshFThF9wCjg2eDL5clzlmxwAZJ7MIrV0iIb33OyR10B4tMWL5ZjYRHISBqEV97EyS51ifsmdH7M3zANKMp5x%2FKbSKnZ2jZOK4VZs4G%2FqUumpYEvKjd%2BM8iOIK238XwaEcrNN7lXSrRilqDJ5snxdAXPnnyNiQj%2FFt1gsf%2BrSmeYOpwVYSNJ8uPW4uS9MHTshOa0JXz9EZ9%2FXR5a52dqaLR6L7Cl3vMvHJlogUta2qA8FJb1IkTkxQIpMa7Jvp7bK38tdcIkyHz4HegxsW10vVWRYq3Kyxl0B5ygtjdNNBDadpuVLFqg3lVGgygJoSKl90PqRn%2FfdN%2BL1lL4VSY%2FxIqToOk%2BAq9V8IAqLAOqseN62feK2%2F8%2FPybgLmCOEa8m0jyjBB%2FCEl1ODC50%2BFyWudx5rC%2BqKZMeHCT8nBKDf47C5f0q7a6edfk3c2Pa%2BV65ClB9mHtB67wDQLf5MMKsn8sGOqUBrj5O57QDoCEbyCgr0hRvLC683AfeY%2BW3UvS%2BlVbK4DvcPm%2BEuKAMr1VD5vLHBhUOdNhT3XkUmtsE9icE%2FJccU1FmRKt%2FRQrkZ67kJ06dllTU7qFGSlVTzn%2B0k%2B4tNV%2F1VYi%2FMQlGVwN71r%2BJXtQT2WO%2BlS55Wi3Sybau%2BsURp5yqnKqEv6QzoT6crLwCIGuZogYumiL%2B3%2BRjfxseaUr1gBagoaMa&X-Amz-Signature=1235d2dda5052ff53eea4dccc71f199399f67bf3ee00b3baebcf633da1972782&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EVALOJF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCICkh1Sb6VQqqAvt8tCuId2gcDep8MKK%2BpTIdoExIB1QNAiEA9ucLXsZjZnsn3BSIS76Z8eXGdjIbAXBJypQPKUAgy%2Foq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDDnL7OrFyQbe0ndIJSrcA6XaDRTtaT6%2BdcNwjozHVxzZaLzYrkTDszoGuJmHuAaIursrGDMv7oATyam8LSe%2F0i8AZ9NomZ6tCxm1DQEfLzrZxlM90iWoF0QL%2F%2F0d8pdaEJuKNKR377SO40QFxtjntUXE0ygOvz%2FG5sjZWgqdzhf4pC12jhHMcitNX1EOCgFjFshFThF9wCjg2eDL5clzlmxwAZJ7MIrV0iIb33OyR10B4tMWL5ZjYRHISBqEV97EyS51ifsmdH7M3zANKMp5x%2FKbSKnZ2jZOK4VZs4G%2FqUumpYEvKjd%2BM8iOIK238XwaEcrNN7lXSrRilqDJ5snxdAXPnnyNiQj%2FFt1gsf%2BrSmeYOpwVYSNJ8uPW4uS9MHTshOa0JXz9EZ9%2FXR5a52dqaLR6L7Cl3vMvHJlogUta2qA8FJb1IkTkxQIpMa7Jvp7bK38tdcIkyHz4HegxsW10vVWRYq3Kyxl0B5ygtjdNNBDadpuVLFqg3lVGgygJoSKl90PqRn%2FfdN%2BL1lL4VSY%2FxIqToOk%2BAq9V8IAqLAOqseN62feK2%2F8%2FPybgLmCOEa8m0jyjBB%2FCEl1ODC50%2BFyWudx5rC%2BqKZMeHCT8nBKDf47C5f0q7a6edfk3c2Pa%2BV65ClB9mHtB67wDQLf5MMKsn8sGOqUBrj5O57QDoCEbyCgr0hRvLC683AfeY%2BW3UvS%2BlVbK4DvcPm%2BEuKAMr1VD5vLHBhUOdNhT3XkUmtsE9icE%2FJccU1FmRKt%2FRQrkZ67kJ06dllTU7qFGSlVTzn%2B0k%2B4tNV%2F1VYi%2FMQlGVwN71r%2BJXtQT2WO%2BlS55Wi3Sybau%2BsURp5yqnKqEv6QzoT6crLwCIGuZogYumiL%2B3%2BRjfxseaUr1gBagoaMa&X-Amz-Signature=1235d2dda5052ff53eea4dccc71f199399f67bf3ee00b3baebcf633da1972782&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVEUTOKR%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDmv0aeaOso8khDbic5lqkcioANBGnlF0e%2B8mM2Qw2kAQIgRufrsX%2FMbOG99Q%2Bldmbd0jkwyHDzY6sMl%2BCKdSZG1Iwq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDDZevDvsau%2BuUilTLyrcAzrK65iTG%2Fftzcv5CDPj87v%2F2gWw8xGNiW14oCUOxSpSUxPgN90vvWaU8VvpZPs2TPOwMGFm3N1UoJxLNNItmimtGH%2FotF7swslGOazGhs8zWA7JbA8uiwlxNQqFvkl2tgpmp5HmUg%2F6PqGv7i8l7qgU8GF0grucF9r8cuRoW7KRWwV20iQn7e%2FYxeSxlq5SCRODX2s9okSnMWZlK558F%2FihxKZsbZms8BChDUvNVDlDriOfDj7aSzFfj7%2BtyMDucPVfQ8dBTmemHcM6jVz37erBbYTDY2%2FugLfxcHPW4xodPldsgghukdj8NFVmOm7kKvogLVNyd%2FkrHKRTCLN%2FuBjBsY6APMycbZ2fPdK5XyJt4I5G%2FPgZHzEG0A3duQVGnCk%2BAJpvXsb0lj%2B7tvcELnLvXUNSW1ucBVUPCtMSGH6QOwO8LO03LiCvUpr0iyH%2BRUR5DWEXxWX7XfvhfBoO4NNGA0iOETIk3Clm2PO9x1DuDAzGw8G4gKBi4LOUhn0T9a2hBNkvgAKfO8QoBLsalNeF4Ry1CBYLAARTaaK%2B4M0OXIdaP8%2FVT2NSBdnSnClc10iTiDTknERzqWACNOX8OXyyrCnHZowekCbbn6uHab4Zzo8Jf0yAZRBNhTTnML%2Bsn8sGOqUBJbLZrZWTH8MVgQxUL92%2FvIleHBN7PbkKpTD9b0zeKMkjhhrgM7zK9rAkY0Gha4NgN1lTTNwJtzwPNVnJ09A%2FequZ0yd5SWNjkKrtSazJSUmpuQPXJRaGqL%2BOKHvz3PYILZyFqYujErgGQAFQBvT6wABN3bZhr%2FFZHGaJ6EBzD26tFFTCuxMaPpgoj8ur2PoVlouEp0dU%2FTgkFVIN4uF7dfuLLn70&X-Amz-Signature=285c27974cca8f9be37434c767a10695260f68578af5f2c76dee13024bc63206&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KLTC22M%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCfiG1fmULvzlkWXPHADt44yH7%2B4PRjjgTnx3qw%2FTx85QIhAIrzxpejj%2F6bSGcB%2BTHc8%2F7IhdYYtyUS2pCsZPztzaVyKv8DCCMQABoMNjM3NDIzMTgzODA1IgzCfVJoPrTCIpAh%2Fwoq3ANaFRbVx%2FDWy7s45GBz4QNYBdeNDgma9VH5Bol%2BYXH3CutObqNwowUp64iYLiiIbMytodFQBKW8J76%2FxGHGu8pl38rcqGm4Hx59%2FN9QPc6K0hg1cPSOYvJcr5u3SSr5PrmVwko67fP11V8WpaVS20Gacl0lVyRSqQkzDtrNnKprCFXWPP0bpN9raZfmheC%2FqD52IMuEhs85om4085nf4UrdlkEgCPDRDLSA9gTwad%2BtMpPV816zC2%2BROngfx8yC6B9pWWvNA2VkAoO2%2FptS7LXF5%2FPa5Dg%2F1dDu%2FkrHGu7A2tfBszY9%2BJQVZbJm8g1NkB7WO14XdWNK7ZlkDFPBzgUZuKez9%2BKE1rcV21O%2BGI6CdC%2FaLCxgXoO6VdFJ6yEeYleE7wt9b%2FwcBN6YqUEmYUFi35Dhopg0ItJ27NOYO9XUza90xY8RdLcWRvKcJ49dTNIY1FtrRuMngMnPzgss828Qf8TBQAinTtH731F6cDniWIzBx%2FrXJN9y659%2Fn6bqjYpyGuYdOUKows8ZLQdrYd7GPdrvQPSS%2Bj0cL7i8i26JkOdr04sAVV7MGsKPBrVGXhYD7f4EQ6obV%2BMeV1N%2B4X7SQL0qiuA9MnQ%2F9C2n1V5DYodDwnYqBIg2USdmFDDRqp%2FLBjqkAfksXzY8ivLQ2gTHZV05vIOdLPus6qaT2AoqHOsMRsQoZ3v%2B2DB1IuDhtomE9UdCvSPMgRnqQq%2F%2FGFISNhwLIsGfVK5fIjYV8KtM97yjz0cJwk40aA2W1JLXJ7%2F5fJ0m%2BLWr2jlGn5G8xsxYCBD0olk8PM07PhUVhd53GJtVN4eNo%2BZ8iHG4tAOCJrSHHZ05gCbvJ1qmGYmbJAOCBlkMc68I%2B9Kc&X-Amz-Signature=bac6c698f25ab072a8b7d561aa7c4802ebe92e4f49ab7c0efc1b7357ba955704&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KLTC22M%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCfiG1fmULvzlkWXPHADt44yH7%2B4PRjjgTnx3qw%2FTx85QIhAIrzxpejj%2F6bSGcB%2BTHc8%2F7IhdYYtyUS2pCsZPztzaVyKv8DCCMQABoMNjM3NDIzMTgzODA1IgzCfVJoPrTCIpAh%2Fwoq3ANaFRbVx%2FDWy7s45GBz4QNYBdeNDgma9VH5Bol%2BYXH3CutObqNwowUp64iYLiiIbMytodFQBKW8J76%2FxGHGu8pl38rcqGm4Hx59%2FN9QPc6K0hg1cPSOYvJcr5u3SSr5PrmVwko67fP11V8WpaVS20Gacl0lVyRSqQkzDtrNnKprCFXWPP0bpN9raZfmheC%2FqD52IMuEhs85om4085nf4UrdlkEgCPDRDLSA9gTwad%2BtMpPV816zC2%2BROngfx8yC6B9pWWvNA2VkAoO2%2FptS7LXF5%2FPa5Dg%2F1dDu%2FkrHGu7A2tfBszY9%2BJQVZbJm8g1NkB7WO14XdWNK7ZlkDFPBzgUZuKez9%2BKE1rcV21O%2BGI6CdC%2FaLCxgXoO6VdFJ6yEeYleE7wt9b%2FwcBN6YqUEmYUFi35Dhopg0ItJ27NOYO9XUza90xY8RdLcWRvKcJ49dTNIY1FtrRuMngMnPzgss828Qf8TBQAinTtH731F6cDniWIzBx%2FrXJN9y659%2Fn6bqjYpyGuYdOUKows8ZLQdrYd7GPdrvQPSS%2Bj0cL7i8i26JkOdr04sAVV7MGsKPBrVGXhYD7f4EQ6obV%2BMeV1N%2B4X7SQL0qiuA9MnQ%2F9C2n1V5DYodDwnYqBIg2USdmFDDRqp%2FLBjqkAfksXzY8ivLQ2gTHZV05vIOdLPus6qaT2AoqHOsMRsQoZ3v%2B2DB1IuDhtomE9UdCvSPMgRnqQq%2F%2FGFISNhwLIsGfVK5fIjYV8KtM97yjz0cJwk40aA2W1JLXJ7%2F5fJ0m%2BLWr2jlGn5G8xsxYCBD0olk8PM07PhUVhd53GJtVN4eNo%2BZ8iHG4tAOCJrSHHZ05gCbvJ1qmGYmbJAOCBlkMc68I%2B9Kc&X-Amz-Signature=233104788a3eb2d7b20b7fc506226fcd625682f92125d8ed123ee08a612366b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662H2GU6NC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQC67mgB2PFMXJ8wK%2Fx0wuYbbLinHK9wj8spTtXploxnpQIhANjiaf1ESB9v85J%2FHZd6XLLUeT2fdtE3Dmin%2FrxmqrPwKv8DCCMQABoMNjM3NDIzMTgzODA1Igwj6J9URf1tk7vMjeQq3AMeWQIJI12ag39kSGU1WE9ExURNUOf4nBn1uNGi8u%2FtASRjNHobd76ED6B158y8T7FAJXpPA4YzdRzRlOhDeUrR4yIsZ08aAK74j7xht%2BWgZvnLEj8W60J5E15UK2SERc2jn1%2B58OvxKYw04oT9%2BE8VoYKv7iD3VbnvuEPfZZ1UXRsWNeUnqzgIE5Zgm1UabP3wxF6g3ibuxgZREv%2FVUDMYgbyGzRQIUEow%2F8VamUJX0lWGi3DqYpVUaYvG0o%2FR5bTdcGi%2BYCnz0XQxfIyLHg%2BhF2sPeG0jB7XQpA7hvPNiKgoVpvfSD0Wwg9RZQuke6BG6sckehgreu5Ilck6TgoKSpbllIfR3VB3FgB7Skqt1p3dwX8VgCXHMjcZGQQEMPGrr2pgzF%2B8gJnPfbdlmStE4zFRjicr2ZfGAvwk%2FTorkAgf5w6VmPrvxFQsZIVRVo1TMWx4jtYD0%2Bz51SB7AuqH5nGjJyxplM2XR5cbyCelnxv3JLhKGD1fZ6c8CGLPrINVRpJJdlZOOOx1OTumuh%2BYXfgEuxZ7CtjhX%2Bqc1DXB%2Fv%2F%2BgshkiXl9GPn4GKDBnge5Q6yLA%2BSz2IeZISFaW%2BFknKNgezsamuRkXaUpfaHBiN8aCWDmAsZzkeTWPdDD4qZ%2FLBjqkAfUr3f%2FnNeA184p%2BGRKX%2Fl4rYH8tNNY%2FuAvKGxO5IITLYky6reObspPQN51%2FQvxuod%2BAyD4FDVJKO4Xa%2FB4RviPitJCauSm7%2FvfenjgtZ4qJdtNHzHOG2o2NGr2u0yCD0RBXWFvEq70ZbtQt86Pm%2BPMUD4KS0BJlk%2BgzR5ymjg2O6rocMylOEcvDOSyvPCB7%2BVYidtmloKX3oGELJl3ltyddqpC7&X-Amz-Signature=2e2558a1d3fa93c672517b179831e025459cbb1f603edcddfa8a740b8c006207&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664O3H4GWP%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIF5w%2BhPkvPzNZyBHynaj8egFQSDAF7tgRUZJDezEVCPfAiEA7JnHXuwOHFKGjlkfMOSfyMjFaVXgOJDUBvfpRrY38dwq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDNBxrBQU6MiOMkng2SrcAyntKPitMwUTnlf3vyiZKuuVKtsDOtGLgFHK7DAa%2FG0wP4L1jXG04DMu7grBGAIWkAbmS0%2BZsmemLQ9j0wURYVSdNA%2BgBzXZx%2FD2eLOcE9nMw5wdwxr%2FjMcg8JWFDdEDRhVytVv4HYiSh6wHyTG83UZvUm4sW5RK2WenzWr3m46S%2FNje0vuteXIxyRPQpWRZ2NZlSLLQhNs7flF1hOh5FN1CmxpS2wfDOdywfj%2BVGz3U8w4FE75SPh4J7aV8a81g3OTIGz%2BUCiK2nsdjY8MfUQ8rpvvLiO9iTUjHfIfUX%2BV9Gx12hzUdIIxuYG6GYqpDUUEpZ6UOJpw5UBse%2FJag7tg8jusLUGBfVIP1txiT%2BKXVHt5ZK0YcBK7LqKWqLgGb1%2FnMju2a8WDmjWDWhFlq%2FIaYUw2oHASDxWwXu7%2BDjvJIoNP5ybZDsl2KsVo3DNnUMFXKN8sTbH%2BWHKWp7CKM3f49qs%2BQkUxRO2%2FOLEsvmIkrY%2Fo6%2FaQtTOdmilK2Sh4414tLXnlcmANPHGYYoKLWvWt7Ae%2BCpvANOs%2Bb3PmbXMEVQYct2y%2B7fImEjGKyRK4c9nBkeL70rLECWpafS%2Fb%2FFP%2FrTmiKMIMYbqfSsiJmr%2Fg9v1zd4LC6uRoixABAMOOsn8sGOqUB1Iu8jX0z9DUHKz99jnbeuRIaUFn7x9pQX8BBE0a7g7LeH7AlmDy3ZU9obcR%2BDwrhaKKpj%2B%2BuG5w7NFLNvPHurnDhgn5NZy94Po%2FF4xxaUpHfYwFteGeFJwH8sVxwg%2FoYJvJQGd2vikHyoFstIjPyVpNj37Uv%2BL1bezU9alN0qp4iHZ6KHbePuz2rpIqc4FqjIFupl58bA5SWWQUf2Pqm%2BHekXJxk&X-Amz-Signature=c55531436f37351650bcc92f1cb302f145dc3928be3feede083621fa2efb3331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVALM6JC%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDdGJocoNWTAyX%2BEO74pAIZB0jAmFSQWRQ3Xg7VdEBD7gIgUGdkG1IAs5av4a36IOUSD%2FbCrcGnwB1z9%2BrEu6Qsc08q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDHKbFKwTbdMgguHycyrcA%2Ftyvsa%2FNaGE%2Fn2HJF5T0YUpQwGfMuVb6CFmGPpkJnJmKlBUjtkbBophsriCD%2FF3GMejBhXMouTNrCUZk3arIt6pKT5h2ayDPTmssFOxWfhNHhUK6hJlIZ0iVBxlBGVvp3ZD2x744pF9NhG0BEjXJWDKriFwbu5p1F%2BSOH3UY1ebKCRGtwWUNwMoQJu8gFjv5x2sdCvZJ33Sj5H4CKnD1yXm7Q%2B4zmIWYZNY%2BJjbEhlz8PpaANnk7cUP4C8f%2BcSDKX0%2Fndk%2Bgl%2F6FljhojzlKjnEJbP7OUxfO95kdy7SCNjlk0OhfpHxi6pBZmMl7gpNpuLmP5BhGEVbSZ47gKaQW9IxhHpleWFz1T089YAv3a66jZ1l4T01GxSSiPh02Zf5U4kTXgMEHok3t3LxtwnDRz%2B%2By8fMGSuI72oOP7GUnj2KmAu44yKmko0VI9G7nS3TnfrUTzMIb623e%2FMj%2BZ5Bx3ZqolLOh987qPKJdzgZeeccnWusDMPa5WBmhhNKJ9x%2FrISC3KQPmE8BDpDHANPsUDoxeTrG6mUc0yowd7AkEq6NywudO2L1TMceNLYz1odhJrHC9ey9l%2BheEoAa4t6NRqCPkF4h1lwCMZZZy4uDUi05xu281gASz%2F%2FP7B0XMMKsn8sGOqUBzXwCEXcdtfyl8k5xeSw6JB%2FC%2B%2B8NTm3iS69o4ytSdpfNiDPqeFmIXDQ0c%2B%2FQcJHjp5ZwRcoHLSt4pDkTQSxM90L%2FbIdeCG24gCn7ZGM1vF5%2FpCBCajPFZLWoG%2BJt4Q4pbbztHOd%2FaxI%2BQLXGRLar%2BY%2FGqu5d8w7uEh9AXMh9HieNE48pptKcHxD9%2Bse2By2aHBxoaGIArZ06zf5NkrlXohMcbjw6&X-Amz-Signature=138c54d6d6cdaed9311ad74a8d4f9a4631f75f928837084a9ff30c0bf3a4f34e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFIOAK3V%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCOFv7c%2BksSTDYmhwMQSXZw4kynA04F3p%2FnXwzUyjAyCQIgCP%2Fxy2Wi8%2BLTm6Dr09ce1QjkH%2F3adeIwHX7mUUVPHBcq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDAIQcmmUC1fYcDT2wCrcAwK4U7Fj%2FTUb1ebaXPL4XtVsZfxcpuVetpnUsnHJXtmsRYdDlo%2FTQywbqxQyFzgrTP6uJ6hWrhA0xSxYYW1M1pZuxd%2B%2BwVDla0%2FfW5zgeXdjlyLpTxFKNB8ploNFX1oYSHL3pvpIizhxyeOAJnvv0j7gN6V3JAdShGY30%2FSZY%2F0fhTy2PXC6SCnqazvSyPqwt3vb0ggOO6ruNnm7F8qfYGNa%2BQnN1BE64fZNqDaCOeblIrTDoVI1WOLE8FcvcR9%2Fd8J6pNhCELImxere6lRG77Lp9ZNqOQYw5uKg2EyxU5X2uHT9cD%2FZ91pUML2OlN2ZPOwA6BbCjYOAhPlfQmb9OYt%2Bza%2FfxR4WD5ZuyIpLGQolVe5eao6sjmXPApurVvvsM%2FAQBTmDhsIaj1ZzVnt1wC1qatNsujepArZ2L75ljt6abAevG5EKP4Dt6XgvdcFsPmnlWyv9aeac6rUsMW3Q9POoJcxB5uge7wq8ubUUGSootI2Xcy5PRPKQ3DPfG0ToBnZn6sdh%2Few4WgKEqSZVS5xfUCM37VaQcBFqBDTbuVl%2BQFSbkZd9sB5%2BOQPBU9DBmTgg2tPN%2BI0YpA80qs%2B63TAIeGHiCVA%2BGAEScFahJkAfDpq3w%2FzcA4uM4dZnMOOsn8sGOqUBKnKNf1qP782tAAFmCSruoOEVJwnPZZ3bCFmJKetU14zymBTlrMuQOtV%2BfvCL%2FznLMUHy%2BC0tyYHhi5IduWjctVEy2plufyK83BnsCqRNlM2R48rXtPp0b8j9F7PxR0mMP830KR7oj91db2BC48DtZPYI2UJh9xS4MFPjVNKEnX9ovxWwaSIaMrKaF5ZV5Au62RdpfZNuASnyNA%2BlcVLP%2FTqPTI50&X-Amz-Signature=99cff978499af5ebaac8ae18e0edb4b37f9d985f51f338778c5925b2404e8618&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFIOAK3V%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCOFv7c%2BksSTDYmhwMQSXZw4kynA04F3p%2FnXwzUyjAyCQIgCP%2Fxy2Wi8%2BLTm6Dr09ce1QjkH%2F3adeIwHX7mUUVPHBcq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDAIQcmmUC1fYcDT2wCrcAwK4U7Fj%2FTUb1ebaXPL4XtVsZfxcpuVetpnUsnHJXtmsRYdDlo%2FTQywbqxQyFzgrTP6uJ6hWrhA0xSxYYW1M1pZuxd%2B%2BwVDla0%2FfW5zgeXdjlyLpTxFKNB8ploNFX1oYSHL3pvpIizhxyeOAJnvv0j7gN6V3JAdShGY30%2FSZY%2F0fhTy2PXC6SCnqazvSyPqwt3vb0ggOO6ruNnm7F8qfYGNa%2BQnN1BE64fZNqDaCOeblIrTDoVI1WOLE8FcvcR9%2Fd8J6pNhCELImxere6lRG77Lp9ZNqOQYw5uKg2EyxU5X2uHT9cD%2FZ91pUML2OlN2ZPOwA6BbCjYOAhPlfQmb9OYt%2Bza%2FfxR4WD5ZuyIpLGQolVe5eao6sjmXPApurVvvsM%2FAQBTmDhsIaj1ZzVnt1wC1qatNsujepArZ2L75ljt6abAevG5EKP4Dt6XgvdcFsPmnlWyv9aeac6rUsMW3Q9POoJcxB5uge7wq8ubUUGSootI2Xcy5PRPKQ3DPfG0ToBnZn6sdh%2Few4WgKEqSZVS5xfUCM37VaQcBFqBDTbuVl%2BQFSbkZd9sB5%2BOQPBU9DBmTgg2tPN%2BI0YpA80qs%2B63TAIeGHiCVA%2BGAEScFahJkAfDpq3w%2FzcA4uM4dZnMOOsn8sGOqUBKnKNf1qP782tAAFmCSruoOEVJwnPZZ3bCFmJKetU14zymBTlrMuQOtV%2BfvCL%2FznLMUHy%2BC0tyYHhi5IduWjctVEy2plufyK83BnsCqRNlM2R48rXtPp0b8j9F7PxR0mMP830KR7oj91db2BC48DtZPYI2UJh9xS4MFPjVNKEnX9ovxWwaSIaMrKaF5ZV5Au62RdpfZNuASnyNA%2BlcVLP%2FTqPTI50&X-Amz-Signature=53ed36a504987906f135a921b8c5b8f423f59e8bf85869dd986707adca6e7caa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWYTRXVH%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDVPo%2Fu09%2FPK7q%2FaGqHLgo02HoZPSEDlPFr7s6hgTCJpwIgJMadHfGPD2rtg8DfTvXw8iFnPS8euVpaok1F%2F%2Fy%2B8Qoq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDHUtrzqydPd0SBHBXyrcA89BGlOdB3T0TNeDVhcSp82MmSl2PFeqDAHQb5XfBD3lvNWQ19NAqups0tRudlYVivcGq9weE%2FtjPHEodRR8XfaBM%2FNYlnMr%2BU7DQgiI6gip0A5zdKP5yieVlRFAQQmMgkony3WCOMBDh%2Bwm9gnLi64tbafutjJNCBxUlG%2Fa1KACRGP%2FPEdxrke3Ii8imTcxU7lPB2pE7t0GlSip9Zvwyp0oox%2B6%2B2BeAwtAcmUxf8KTEHCokeLo9kZwjMpkv4ltvKVJKJbRsoR0Hg6JxT3H1PjJGYYqtQhMkJAksG29Is3RzBXC5MTdtP7OoDZijSLwfMuri8m3%2FxKIFprRBZs%2FcngFpyenzlsNLDNZmOJqgfBxw00O%2F%2B7weqzubx39oahyeSfzu48jszNjbf3LlEWjSn3F1Ki1KMl4HKQZHM3250a6Ic4RRQmOA3SRVD5RrPGF9huPrPorIs8S%2FTqzs6PKRX0OVXXMiRHvbzguqusO44mOapU3%2FZCM5T4kEDFwpKhy82vNp4AsjMYgyZab%2B7n7weilr5GuFP3mRz88cjwR60R2csUOchdQC82jhvf8DJZzbcIL8oMxWwMr68Ega0%2FGtDHj%2F%2FSjC0xOOLJ1iawTQZhkbh0x2fAYr1YVZ%2FJQML6sn8sGOqUBvT8G3da64lsNUj0uYsQj1y9%2BeGO18UytArkMTNruBlzBhugv%2BoPWfJ7CQNkqRHICUrYoh24UKWk4vZcvEF5xc1S0BM516pl6lLMYUVnin02zP7D2cZUHvgG4qonGzYQFJY0PMucNmDWEcGaT5j6%2Fq3cTbyLWrY3grNNoyAuCXskow54mWLWnClxStmcfwDLtpZnLqMug%2FPizwMVDaZwYjSGgWymu&X-Amz-Signature=0a42da9818bc61088bb33cd5091f02bc6cf1045320a39a6c2077fe27cbaef180&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMY5HVIX%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIANNfqtE7MzlhoD56na4vlG7C4kvfz8rlcc64cFQxwN5AiBpMG9GTAh4thXANb10wj3F%2FzCHqss1qANKbpDI%2Fio%2BTir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM9O5tAULb%2BhRFYhd%2BKtwDhvS2MYR%2BLW%2BTxemIDmRQbKFYAdiRYu%2FJ1PMEe%2FLbyj4S3Trqb2EmeW22RZ07i2MLCjRZ5uNbaYoU4on8t%2FOsG6Eu9y9BOTUC5lqSuFJbWCl9pHkI3jtNKjokiaIh1tykabyYhnLwLG9mt4Xqv44Qd2icfIKFPdChirSGMmiDxwiqFSClAGZ%2BfPPYfPzliS4okfw3hXSI6f17I04fa%2BCEIMjEpJsGtzcX90JUD61HDOUImxO1STrJwVuSs7FJHi7a2pH6jIHECzfzIxxjvdDIE8EbaonLbJmwu%2FVoAdV7KgfAVE95CdGd%2BjzSVBv6GyBgdq9s6552fNiELLo1NE3vFV4lYFTg2pvCRjafwHdaiBPnubux%2FVlQZrQvQoBkSQu6br2%2BiIvoL4yKBwC00RwGA3vpoQ3tWs6zwH4EE2WdCD9bB7JZ%2FTwjH7lTPGzlDXoL%2BPHFUFcFySwEvVllBe0BwhqGimGj73BE5qYwRou6BLZaVQzxw%2BxJoXEWuTyp4zMcoT1GSq%2BuyJ0ryFj%2BYUlgGVoWrVJ3Sm3Qzkx94Uu%2B7Z9OQtRLjabjuuKsZyEe3kDA%2FZ%2Fgd2Ksqh%2Fx4J1wbKD7fWbSz8jNvXej%2FwSP6K%2FfgclF9VSJxkSUfUJah0ow3aqfywY6pgFxEGZn510Lhxgzx1c2skbnQMaT%2BZlJmoaQnb0vfXc%2F03dS5qkQpCn1nPjhOlgov0wQ%2Bogo9Pm4ZlYkVHfOpZ4YA6s%2BS9N2VdyOHYacMkZUJOO%2BvHPPaACY37cbZW5OVug6nAfi2Wc6PhncAzt08bfDe6DteD6esemB8tJNxdnKw3rXD3pdtwl%2B79rFDKDfSo4pil7YFR4XkVqV8AkPdajmMStrsEzS&X-Amz-Signature=90c5ec6333389792257c653624750f99e50b287c680d9bd908215ef7194f59b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WMY5HVIX%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIANNfqtE7MzlhoD56na4vlG7C4kvfz8rlcc64cFQxwN5AiBpMG9GTAh4thXANb10wj3F%2FzCHqss1qANKbpDI%2Fio%2BTir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM9O5tAULb%2BhRFYhd%2BKtwDhvS2MYR%2BLW%2BTxemIDmRQbKFYAdiRYu%2FJ1PMEe%2FLbyj4S3Trqb2EmeW22RZ07i2MLCjRZ5uNbaYoU4on8t%2FOsG6Eu9y9BOTUC5lqSuFJbWCl9pHkI3jtNKjokiaIh1tykabyYhnLwLG9mt4Xqv44Qd2icfIKFPdChirSGMmiDxwiqFSClAGZ%2BfPPYfPzliS4okfw3hXSI6f17I04fa%2BCEIMjEpJsGtzcX90JUD61HDOUImxO1STrJwVuSs7FJHi7a2pH6jIHECzfzIxxjvdDIE8EbaonLbJmwu%2FVoAdV7KgfAVE95CdGd%2BjzSVBv6GyBgdq9s6552fNiELLo1NE3vFV4lYFTg2pvCRjafwHdaiBPnubux%2FVlQZrQvQoBkSQu6br2%2BiIvoL4yKBwC00RwGA3vpoQ3tWs6zwH4EE2WdCD9bB7JZ%2FTwjH7lTPGzlDXoL%2BPHFUFcFySwEvVllBe0BwhqGimGj73BE5qYwRou6BLZaVQzxw%2BxJoXEWuTyp4zMcoT1GSq%2BuyJ0ryFj%2BYUlgGVoWrVJ3Sm3Qzkx94Uu%2B7Z9OQtRLjabjuuKsZyEe3kDA%2FZ%2Fgd2Ksqh%2Fx4J1wbKD7fWbSz8jNvXej%2FwSP6K%2FfgclF9VSJxkSUfUJah0ow3aqfywY6pgFxEGZn510Lhxgzx1c2skbnQMaT%2BZlJmoaQnb0vfXc%2F03dS5qkQpCn1nPjhOlgov0wQ%2Bogo9Pm4ZlYkVHfOpZ4YA6s%2BS9N2VdyOHYacMkZUJOO%2BvHPPaACY37cbZW5OVug6nAfi2Wc6PhncAzt08bfDe6DteD6esemB8tJNxdnKw3rXD3pdtwl%2B79rFDKDfSo4pil7YFR4XkVqV8AkPdajmMStrsEzS&X-Amz-Signature=90c5ec6333389792257c653624750f99e50b287c680d9bd908215ef7194f59b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FYO42Z2%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T200116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQDF4qEFOqdlKH4bYXqKjOzJvbP9%2FQ9ur7TBzggFYBSyMwIgG0Ozh8Gb7vzejth5fIWIEl8HpqBWw7Em%2BymggX3M1JYq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDO%2BYSIbcPHspw6BSZyrcA1jTDjioUABghb8A2UruRsurCjbDfqjmUuyF2TQ%2FWzqukbg%2FaizC7JbpADr%2F4PXqXhJPzdw1D2dinUIMPK7A9nWT29wrNU8rbKQcVwTIHrH390Ve%2FPdvqoc76PiIrbk6IAWDAD1%2FKyVhJ7w3GfNHrLr5RiaTjI%2FQ1r8chfc8SzuSBbI9oM5T5HYnEQJ1%2BiUYZENIP%2BjM7Xpbv9KIOIIDxK7jtpZAoDXtyGfHvpCRCu5QSzgKefm2ucfkFsuA11sDbpCoLpU%2BewKSY5yAa61XURpTNJLEGFaxIuWqlIlajl3ccnQ0SjDGx0XFlq2csvClFHkYWDyl1QFHNiu8Un872YNiwBvJfUMsm0dwVVHaVk%2BAEUkeAdjIwgaB5K9LFZcfNMSiYpeL9BZKpLfnv%2BvIpSNeyAZP5hL7n9FpTau892STKX%2BaQkzpJJHGv6dZgCkKL2Jf1IQ2RZoNYvCA6M6hK3ogDEG1ZsxJu8xNy1V%2BoHvFJKLCTGVlsFmCfauxHHsBTuJB6je%2BoqVQa05VNhmPgRqYCMM0QoBRfOS%2B4dlLvmMA3HPT4Gs7b9cLmH7tPY4zUbTaStuczpK%2B%2FsxTPbZqCCkfU1U23ZmJwtHhE9owLvbz172%2BVsQjqGp%2F4HBrMOiqn8sGOqUBPoEFyM%2B0AAIYPC5Dkbc9BQw6PKSAYXlMdU%2BHxtAYpzhEYTiMTScun9K9UMCdMpRYebj%2BJZrgWnz5p2pdoN8E9mh%2FDzByiFozPis6JRlJ7VGLgc40IaIXH4OOE9ww8xa7TMSiFpeHt2kLhLPdhA6QyxTCBY4FHhtkMldBesPwktSIJs2UT61bJLW%2FXmSa1N7KwI6iXZPiTTEo8%2B%2FTKYxaxYVJHCxO&X-Amz-Signature=a499ae4e5a708433d6ef00e4cbdad793d24319299499f5e6cf21eac871d6252b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

