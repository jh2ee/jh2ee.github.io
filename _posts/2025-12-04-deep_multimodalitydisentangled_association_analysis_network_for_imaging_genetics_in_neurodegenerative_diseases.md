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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJOVTDJO%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCcQVlOSGhYf3FbWxPsQ2Spl8j2%2F2s7f59%2B3kqJewiPQQIgZVaQVD8IFlfiV25dqZPKs0G5DxBYVftyZqao1YAbuP0q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDLiXwYeIuo7dexHAHSrcA4CL88TqXpBzA55%2FLxa83RIupCJBQpQIvrsrB8dSFgxuQ%2BjdsNEKPJg%2Ff3oyd6bd9KiAQgB7u45IlV2lPvGmOpWamOPXBfJr%2F0k2p3GcB%2FOlBPihdcuyODVLC1WzwsoQlGbwSgVFcpszKOcA8FS6JlFzFEkIY%2FL54StjhEwX%2BHS8bIxkKCSOqqTLvRhJisK%2BzKanUtG%2F3Kv8qye89KcJflwEgTwg7b9t7k44KIlRI6cdZ3KFBmxyIaWgfT2rdDOgAKyR3lSzXQbjfp6Y4JXk4DKRtM8%2BLtHfz4fQrgnQYILWv2Ffo2Xa5PQj9c5Hz5SO900N2c6rpnXB1L1oOm2kKomG%2Bn0nY94mSqo64opnbCMFfHWYHEo83L9pyszQMWBbXWpElmGHYfdo1yWJ0Z19MtWqomAEOpx0B3dxnsywVKL5bSAlRZAVTnWL1ZgeLkrvI3Fn1wTxz5uE4%2BOcOTHTyCgx8B4H0sLnQCInD6a7YCJff3VfG%2FRyu1Fx6aVcRUiaJatJnrRAAZtt9Gdv0Wg4mQE%2FDGDeaqEPxOQberEwQeHXlR1YvyApTbeuxKKx8rzfEQMz33Ap4YqSwmudQUST8hLVIEbgB%2B6bYiuAinQFwMGSpHJc8xg6wF6fL4zMMN6HycwGOqUB9GhkHMNkbpUBg9szS%2B9tjaNXOgncXiBHFqP6Lt729U3vywhIT%2B9gvkiK8JVHxehWdJZYoW3o03MQZ625nbgwVerHbQC9RBnHsU3A7cj6MyOn%2Fqn1ZsjSqcdJpKfMutq0JMl7T3kg0uDUc8MkTJQjKvTxbePizoo6JwTGhobMnnf5M%2Bbwa%2BEEOjJ6ltYc%2FmMPHrRgvu4W98f0lhxMrYD%2B1wduhMia&X-Amz-Signature=dcabff0ebfaf1d3de6c7a71c228e995fb04548f187be49f46bae549feb598e32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJOVTDJO%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCcQVlOSGhYf3FbWxPsQ2Spl8j2%2F2s7f59%2B3kqJewiPQQIgZVaQVD8IFlfiV25dqZPKs0G5DxBYVftyZqao1YAbuP0q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDLiXwYeIuo7dexHAHSrcA4CL88TqXpBzA55%2FLxa83RIupCJBQpQIvrsrB8dSFgxuQ%2BjdsNEKPJg%2Ff3oyd6bd9KiAQgB7u45IlV2lPvGmOpWamOPXBfJr%2F0k2p3GcB%2FOlBPihdcuyODVLC1WzwsoQlGbwSgVFcpszKOcA8FS6JlFzFEkIY%2FL54StjhEwX%2BHS8bIxkKCSOqqTLvRhJisK%2BzKanUtG%2F3Kv8qye89KcJflwEgTwg7b9t7k44KIlRI6cdZ3KFBmxyIaWgfT2rdDOgAKyR3lSzXQbjfp6Y4JXk4DKRtM8%2BLtHfz4fQrgnQYILWv2Ffo2Xa5PQj9c5Hz5SO900N2c6rpnXB1L1oOm2kKomG%2Bn0nY94mSqo64opnbCMFfHWYHEo83L9pyszQMWBbXWpElmGHYfdo1yWJ0Z19MtWqomAEOpx0B3dxnsywVKL5bSAlRZAVTnWL1ZgeLkrvI3Fn1wTxz5uE4%2BOcOTHTyCgx8B4H0sLnQCInD6a7YCJff3VfG%2FRyu1Fx6aVcRUiaJatJnrRAAZtt9Gdv0Wg4mQE%2FDGDeaqEPxOQberEwQeHXlR1YvyApTbeuxKKx8rzfEQMz33Ap4YqSwmudQUST8hLVIEbgB%2B6bYiuAinQFwMGSpHJc8xg6wF6fL4zMMN6HycwGOqUB9GhkHMNkbpUBg9szS%2B9tjaNXOgncXiBHFqP6Lt729U3vywhIT%2B9gvkiK8JVHxehWdJZYoW3o03MQZ625nbgwVerHbQC9RBnHsU3A7cj6MyOn%2Fqn1ZsjSqcdJpKfMutq0JMl7T3kg0uDUc8MkTJQjKvTxbePizoo6JwTGhobMnnf5M%2Bbwa%2BEEOjJ6ltYc%2FmMPHrRgvu4W98f0lhxMrYD%2B1wduhMia&X-Amz-Signature=dcabff0ebfaf1d3de6c7a71c228e995fb04548f187be49f46bae549feb598e32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBXXJKRI%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCR5RinvAAu1ET2jCGcxVm5qVM4Utc0vvgMQaWZCEDlOQIhAJv56Ac1Mb7CCKAqHmZPMUbesDiqeZnlp479xJf7pxxIKv8DCCcQABoMNjM3NDIzMTgzODA1IgwB7nFgSpojSHu0aioq3ANwlrtJpVlE5uZgjP7zuaBIEB2sOCVPyFVJU9GYqZLxijyHRWN31SOmsS1SOSsj0cdHnJ%2FRkMifqAqSVdeGisQyAZX3EbeVBazi8sJ%2BoGlE73CU5Xgt1jVEh3gd6qOKmUoSbiLUxvGOBXr53HU55FOMUFS7dQGshi%2BMXDVjmhs3XyXdafUm6mV049lvL6AykGvjJSC5GVwT6714ge93mwgdlwaj3%2FW%2FqaV%2FkgffzEkcd9FxsZ7bDCCiPUkP%2FuMzVmwKFmVYu3vlq49GEKMl2WIqOssQ2qxAcWid5ZeGPuEuyjQ1yzNd6WzLbl0p9GKxad3STTNwkPc35QySGgGADHFwn7el1xOldtBKYONAfRzmUZrpOJXf%2F01MEu9Cqa2swWyO0%2FGAQhsTVWth9g2EcFGe5WBde9peBMpgCPoRvMgvk%2Bg2YWGjCGO%2FkIhWn0a2mGI867yQEAjeIjvL6iE8J57fi46HHI%2BvRH2pyrUJmC3msd8kqnqjGEAX90cYEuHk4qvhJP3VomujpcI9%2BnCtWTFtm1bhnXtCfXDgrxIkpyl1CDClUaxHBRgQn9Y4QlOEqirD6blHIz%2FbaaOvysQ96qh%2FCv4aXJI%2Fa9OIyH0SoAzMArh732Vm54gCHIuN%2FDDVh8nMBjqkAfY9soWjSxeHVW02CfaBBKjsB%2BO6Jb0Aj4%2FI%2FPb3HNkuCT3vVeRfIfSA0EO2lXUMqWl%2BUrjFREsOSjRIZJWMIc1SJgMGA9j5zTcoygDbA7go4bL69mJLLyeh53AMdcW2lYqdYkNIgxTsk1WIQN9V8Hnz019eHyZSvze0ZUQW4YVFCSO7wX16kW%2BLCbFSfqNb39fgtNmyObHPLsaTvfE3FnRpnAjQ&X-Amz-Signature=6925712f00d366d25aafcafa56c07b331b4c1c168a1c9986c8095046cf7a94d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULZBDI2X%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIAzDhjdXkEdvAAcNEWWQCcp9kPW%2Bz8FiFEj9sI1Fui9EAiAM8KGZRrtObCVqJPv3UNxPqu7Kg42WWc3lPeilnSKWHir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIM0Tsr2OHLPCbAjcATKtwDVDhp%2BoKx7X5PL9k9EIs4T2VYLkhHQvW0bKY%2Frn021DOIskn4soI2wWQ%2BLtRAlBKfTtTUz8yQKrp4uKaqNKW72eBUM5KgkrhHAN%2Fr3vTRRSncyxS7LMF6eiNbA9Db7DnL1EzWnumbeBxI7xMnJY7ojeuhRdUGxYRYHcnynjLbjqL%2F7aMdG37uViRMnFm0Mqh9W9D5mbviip0Tb9NoPRLIeeLhYF7Xhpgh6BDqQiuuMoN4nEn6ttWADT1zmpzI8QkKtrwNzS8Pq3ztt7N3vSPzNYcqtxj%2BbSmjgVPfyYcFe87mh1y%2FnfwJvMfLwhGu6JnT13arFAIHMYe0QgSo1k31dkm5xCl1A0%2FE2mQGcipqmlMDwslcAnV8%2Bn6tY3J5iJ%2F4XNOVQYKG9Io8udoWjCgGbFIWcPTWpiyOvL7OhxRxLRxI63oZBitYrJ2QXNRN%2B%2Bxk%2BPyg1grRJDTO3%2Fj%2F0xrwof0nNfK7f2AHkdHqQsm8bv%2F0c7TnierquDCVB1kHoDmWtCuEAeBPgGXKr5CZyVjNY2NWrmQ4Ri42v%2BwfSs9QSFG40qkvY7GMicGnGVdviF7ByL3sBhyqboTMEOhh%2FvI81tp4YSxvggOipDmMER%2BvTA8pxzzfV55eLZHFUo0wrojJzAY6pgHpicsh3%2Fx9PUhN8atFAsFNtjrMvhA69NHXNNfVmTIdqM7dxvoWJitSQqr1tNZhA6v9pkYeYMT074GinbmoTAQoEFv1C549J9%2FQbMhCKf2zHCIUvxKI4XcmXdnX6g%2BPtXpEora0usQe5uAMxks7fuJ3PeWb0S5%2BAwSgvw0GPmsHt0qKPoMNxDqCX24HIRCrzmxylsptffuubZh8A5Rt%2BNHDrHNr8h7B&X-Amz-Signature=6b225dd5316725a50899e51afb7bee6244d64290abeec668e09fbeeb13145dd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULZBDI2X%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIAzDhjdXkEdvAAcNEWWQCcp9kPW%2Bz8FiFEj9sI1Fui9EAiAM8KGZRrtObCVqJPv3UNxPqu7Kg42WWc3lPeilnSKWHir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIM0Tsr2OHLPCbAjcATKtwDVDhp%2BoKx7X5PL9k9EIs4T2VYLkhHQvW0bKY%2Frn021DOIskn4soI2wWQ%2BLtRAlBKfTtTUz8yQKrp4uKaqNKW72eBUM5KgkrhHAN%2Fr3vTRRSncyxS7LMF6eiNbA9Db7DnL1EzWnumbeBxI7xMnJY7ojeuhRdUGxYRYHcnynjLbjqL%2F7aMdG37uViRMnFm0Mqh9W9D5mbviip0Tb9NoPRLIeeLhYF7Xhpgh6BDqQiuuMoN4nEn6ttWADT1zmpzI8QkKtrwNzS8Pq3ztt7N3vSPzNYcqtxj%2BbSmjgVPfyYcFe87mh1y%2FnfwJvMfLwhGu6JnT13arFAIHMYe0QgSo1k31dkm5xCl1A0%2FE2mQGcipqmlMDwslcAnV8%2Bn6tY3J5iJ%2F4XNOVQYKG9Io8udoWjCgGbFIWcPTWpiyOvL7OhxRxLRxI63oZBitYrJ2QXNRN%2B%2Bxk%2BPyg1grRJDTO3%2Fj%2F0xrwof0nNfK7f2AHkdHqQsm8bv%2F0c7TnierquDCVB1kHoDmWtCuEAeBPgGXKr5CZyVjNY2NWrmQ4Ri42v%2BwfSs9QSFG40qkvY7GMicGnGVdviF7ByL3sBhyqboTMEOhh%2FvI81tp4YSxvggOipDmMER%2BvTA8pxzzfV55eLZHFUo0wrojJzAY6pgHpicsh3%2Fx9PUhN8atFAsFNtjrMvhA69NHXNNfVmTIdqM7dxvoWJitSQqr1tNZhA6v9pkYeYMT074GinbmoTAQoEFv1C549J9%2FQbMhCKf2zHCIUvxKI4XcmXdnX6g%2BPtXpEora0usQe5uAMxks7fuJ3PeWb0S5%2BAwSgvw0GPmsHt0qKPoMNxDqCX24HIRCrzmxylsptffuubZh8A5Rt%2BNHDrHNr8h7B&X-Amz-Signature=3bfacc129783b568e7afca89b6d1dd48eb231b8ccfcb6b1257d2742bfdd702eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URJMNBHW%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIDYRxR0kjTdc7wuGB%2BlxXrsxD53uPdthyo%2BqYT8hQk1QAiEA%2BTijSKV%2F7lFHxSK5Tm1YS%2BkYnt0GBr5VCOstcGBIS%2B4q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDAN7WfPbTah2i7V2SyrcA79IN6qz0hXE5Ssnlha3I3GBOEqxSXfoztvODm26UAUKZ0yDTnuYy1bNIyRdRXc8NJjmcqjm2tgKh2XnQTn9H%2FVI%2FNwDz01vvyEOR8UNof8IgCqzFR0uJoPvWP6IuccmhDtK9j5H%2FX3ShmrTDN3ng0nxax%2FVwqlloysQukv4PFuynOrPc5vMOIES87ea0Jo8ezN%2FycHszvAbsEzW2UFD34i9ftOv%2F6Ap%2FczPod9LFmr9fwzL068IJt1CWieAU0%2BhVzcIYCCX8dHqj4q3sTG5GwKeczEHXMRU0MMq8EgExtUGFsXwD%2FYHyg79%2FdwZ5%2BjjOwSBftmwgNncCzUvAADyNPDX5Sz2HDC8C40WQc5MRVA5Jio4YiiCtWj%2B06E2Y1AjaH1s2CY9xZpGrNaSFN7Zz935ibGWt3Kv8OubWjxbz6Wrv6Yh48r%2BD4D4vEUeGQ8AsIqhXLaGmaf%2FR48Ors1WbAb3X1CIx0buejEQ7NSshJj120nMM0HB8xtj3ep3KD5YkjboLtYdL%2BFBvNxfy9LCsRhn8CXmL2FXoPxjNNqrfuJ3tCc6piGHlEqPBRyJrhMQ4IopkbhT%2Fy3GQq5B3tZ%2Ba5%2BZ%2FYlxRIcM%2FMaLhR%2B2dpOOEOqHTds%2FBBc8KhyOMM2IycwGOqUBKUoBab4O%2F0cDuvE3yWH4kBj5BE3rA0h6AZrj1suvuklt%2FRdJXXf6fxCzguSqA%2Br7%2BgUrhPDXDpv3d4NnagK1OxV190aDiWGJB4bh5zEqU%2B5voG83wOwDY2SEDli3HNMS0N7pLkTmoB81czqFdghLYK6jpoyP7s6qlm9ktlh0eGu0vDoa5I6pyBs7O9XTLrC22%2BwyLh1MuDPwRfeRfAVCVoSh65ny&X-Amz-Signature=eb279c68a35e46d132f0626151e7083f69c6a6582805f3efaf5379de84e7150f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJWJZC74%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQC%2B2OZb3opwc1snuh%2FxVI6hWQfwRs%2BRWIsZhKZBqT%2BHaAIhALUi%2F3sVNiGTQWQXRS%2BGYRXqhjIdP4JwG3CImUa0RiSCKv8DCCcQABoMNjM3NDIzMTgzODA1IgzY3qUloIkLA011lTQq3AMfdnDIc8jikJrTdT0LU6nr4lkv%2F6GJOYbk5qT%2FHng1TrLzHIKv8hmR3St6OVeXcxTXr98OzNAr%2FP4gkoDbh6xNDH8%2BnzwlK5waO6sYm7r%2FqiBgivoiw2r9s%2FKjgF%2F%2BmmDH3rYNjDmV%2F864%2FDHKi00s9sfO2Kygfj3YpNGgUEnCHRXW5nOucXvFpk%2F83ACdgbytYWI58HlU7OSfhbbTQ4mlrTkFcZhWlpW1DwSu6HUGQ8ZuzJc5JSa%2BwlfV3UdvvfvsEt91XTXE0er8htGKo5cbYvcIpTFwGMW434QtYkHn8jTqqusNLMFf7rQgxWPgn4RSHm2iChB57wo2cudmBHtUEPhdp8ydXBG%2BOwe12KOSNV%2BIXzSXlk6skO7A55jJCPvsBnbLo3RktOg8xHZohYejLQ0u6vE55uzryYKqhn7dq2kQg5DaneR3t6FGLHxWkNwNomWIZdpz2l3cPGu%2FBKtcG%2FMiwCyqPGNtzsFw%2B0LjXWAJzRVhN57dKffAid9%2FLku4PhKTupdhII7tv3intwCvQ%2BeQ%2B0kLXsyh4ockH0y4BtTGQl3RCFfRKFRerZXRoSrrmO45Bvxrh3TMw13chzXJM5mhNAQQtJIhR0QO5kh0SJ0TJp8%2BRF%2BuKsmStjDOiMnMBjqkAQUZniJ8RskNHJDvp5HIlNJzWqPzOp5A1yl6fxUKL1lKkQEH1NtrrguwKxHFT7tYOdkLtPbLDQRwBI6DwxaVEWDRPD06p7oBr8SLPKN6mKREaZ2yvvv5pQC501yZiaTllU5c%2FCd5kSaLSFTMhnuqmwZpt1uMjXxIcfKi3v9b%2BKHu7K%2B9GaMkGIfFIoSWt0P5V4wqcx0kQeFDJnBVOYE%2F5YDek4jO&X-Amz-Signature=c9c30d08ae665d213e01ddd416360040603155ccf3f3c8b4f015b1c2f9a272ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6RBQ66S%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIAQxAOa12b3%2BwrXYNMzUZ9NfYMiPe%2B2MNx6s5gArlPI9AiAs%2FjCAB%2BiLXwSbDR7c9BFgbKTxCVJFomqa7UNenhi%2BASr%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIM9Ut3gQuoFm0A3N60KtwD00navwWOqX18dc4l5MNsFIFuXi1uV7Rmk%2BPO6HfhBZKs6Ke9h4EmRHLeZtZoKGk3d4mUoHZj8u2dKud0ADgjGqUOYM%2BzGOm8qUSBBXqu62zdlL2ZwL16qu9ye%2BQgZGv5%2Fw%2FNoYm5iG844mOpRfNykW1JkqRspxZ1WrUlkkX3T3EglV6AWqcAi8mQQVR1JOci6auHF5jhe6tu43cPCNzIKm0BLq3ZX%2F3mTs2P9Rc2m%2FwlFYXpCHI%2F6rFLpzqE0hX1%2BQygXNQpAJLu%2B%2BR5uvmao4x4pP%2BayqQXy7tbeBEY9bOb9YrBSe1mGgrAWnbnu7VKWH6Dp%2FiGV4tdW19%2FD03DW%2FAhxYBkLwvY2Kd2uts%2Bkktona%2FHqtHz18pHg3tnZDB7lrpLQHcVaR8LFXl9Jjgz20uftZk5HG5EC%2Bme9rZMhONG0K2c7cAmrJbzoXfhYVCwkNIpSqzhctDwtu1rZGp60CTMRNP3eMciAjANgd5F0x8qXwmP7maZGUjHER7RNdNhfyr8FMQjnYPPDASFacWMwDmoLKkS7AUj1sAfMoc6oR%2Fkb0anrLZmkknzkfJ0FnSth4mO9OyYvZ7u6y59W1YtUpbU7SknoUxpnwgQwSZokhxsMNH2kKr%2BB6S2F7cwg4jJzAY6pgGPpI0WUwjIFUoylPPu8Glbx7y8vUUFWV3NrTEL6EUhpjnhA9h1AHgPqkSMZhkKV7mfhhITJjT5U1CU7sEMhAjMJAC8OB9IfAbXOB4MsR78sK5M7qNK16YsQjbpKJ0RGyr78XqjIYKAIhbNYWdnJs8ehx%2BKcNUEjp45W44ot6NUiLyh0sPCEGFG8Dc9UKaS2qLlH63KlSp1Zv47XGvTDupm%2BqONSK7j&X-Amz-Signature=c095ba4fd33803e18013cef5458f413c38e7ac022ca783acb11221bd4bc1cd9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBWKYGUE%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDf%2FuCpJrlcTDR3LLKMXU1PgFz%2F6zcviZ8qfU%2BBFAqSfQIgL5lhKdFEnvoPRfXkUPl4IjktVgWriowTuXX%2B70%2F4GiQq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDBU5FjpoVASUQVo1fSrcAzMEoaP%2FWYeliWbldQWjVcZhE0P6HWYpf69qLr8%2Fyox8wC1EOy8oEzEXlA5epilDO06ZmVrq9%2Fyx3PFei3yefK92uqDonAHMlhxR5ye2TlezW4g8Is49C6LPtYMJN8j2p%2FHgRBblaZXf91wYdFMrqjMmu6lxdW6l6M4wROapzXAnIYjMTLeWobbeZOPb8az5i4PGWtkuLCzwpy1P7cX7oVywKPvxHInOwML4kwZkObfHFJ3PzbdevDVCCZeEOIIOAnlbXcLSBcGFuw0aUjLM%2BLUKBKSviqeV%2BEp6zz%2Ff802ZZESwwKJR3A0j8yL6Z4uQfFnq%2F0djq6wzJ5nBsgwuWSg8INAQPcgtasRLMB3t%2Fc8MKqsH9jnYb89U%2Fs4fl7vHbz7i2ZmK%2Fo4zsj3DAbIRMj5l4GBaYIThjHnMXjqY4gFE8tWC0Lkm0U8sviVtW9GfiMLdyoqmk0bZZebjAY9KPYzncohwlnO7Y8rGqYLeMaZWLANMzjERll%2BvzwAu7QX39QOIi9pMtv3co%2FVJoevzvw1zoO4Jcn%2FfNdlalwXNksU6IBS0wnpSnxF8%2F2HUS%2FvRWyFSjhuLOLumzk39nQo89CHJm0V%2Bgq0X0S55tfo9yGrNtVoNScD%2BOLZGaHU3MN%2BHycwGOqUBUD%2Fz%2BUWn6CbxF04zlQOVrtTQyi61cO1i251KN6qxEpN25FMMxkQoLWrdcAGb0Z9%2ByJPhMMV%2BcfBZLL9G0VsyUQAftYjJ5dS13Y2JHyUdpjpaHUuEhYvRvdnGH4Gts7s8LiXnl9jHRHoiDc5DtesHB1Z%2BuVEBs5OKlpsjVHiaKmJp9UB6YF0m0%2BZD6o9smn6vW3EeWI40npaeowbhlUZFjmZX8XsJ&X-Amz-Signature=4b326a97757991280c00f23e57105247765cefaa7dc1e8d7125e88997dba4206&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBWKYGUE%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDf%2FuCpJrlcTDR3LLKMXU1PgFz%2F6zcviZ8qfU%2BBFAqSfQIgL5lhKdFEnvoPRfXkUPl4IjktVgWriowTuXX%2B70%2F4GiQq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDBU5FjpoVASUQVo1fSrcAzMEoaP%2FWYeliWbldQWjVcZhE0P6HWYpf69qLr8%2Fyox8wC1EOy8oEzEXlA5epilDO06ZmVrq9%2Fyx3PFei3yefK92uqDonAHMlhxR5ye2TlezW4g8Is49C6LPtYMJN8j2p%2FHgRBblaZXf91wYdFMrqjMmu6lxdW6l6M4wROapzXAnIYjMTLeWobbeZOPb8az5i4PGWtkuLCzwpy1P7cX7oVywKPvxHInOwML4kwZkObfHFJ3PzbdevDVCCZeEOIIOAnlbXcLSBcGFuw0aUjLM%2BLUKBKSviqeV%2BEp6zz%2Ff802ZZESwwKJR3A0j8yL6Z4uQfFnq%2F0djq6wzJ5nBsgwuWSg8INAQPcgtasRLMB3t%2Fc8MKqsH9jnYb89U%2Fs4fl7vHbz7i2ZmK%2Fo4zsj3DAbIRMj5l4GBaYIThjHnMXjqY4gFE8tWC0Lkm0U8sviVtW9GfiMLdyoqmk0bZZebjAY9KPYzncohwlnO7Y8rGqYLeMaZWLANMzjERll%2BvzwAu7QX39QOIi9pMtv3co%2FVJoevzvw1zoO4Jcn%2FfNdlalwXNksU6IBS0wnpSnxF8%2F2HUS%2FvRWyFSjhuLOLumzk39nQo89CHJm0V%2Bgq0X0S55tfo9yGrNtVoNScD%2BOLZGaHU3MN%2BHycwGOqUBUD%2Fz%2BUWn6CbxF04zlQOVrtTQyi61cO1i251KN6qxEpN25FMMxkQoLWrdcAGb0Z9%2ByJPhMMV%2BcfBZLL9G0VsyUQAftYjJ5dS13Y2JHyUdpjpaHUuEhYvRvdnGH4Gts7s8LiXnl9jHRHoiDc5DtesHB1Z%2BuVEBs5OKlpsjVHiaKmJp9UB6YF0m0%2BZD6o9smn6vW3EeWI40npaeowbhlUZFjmZX8XsJ&X-Amz-Signature=89f8f1a3e48674f2a88e37b12a630de6cfda14223ee50c66b3aa49e0ac283ea9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XI3KZAZF%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIE9ahn7V0OH6cPdOuVw31LDyin7fd%2FEC1iuF8bFx3dp1AiEAlynZm0Iga3Miu8DJjnNFgQRIahzwfk8ne2fUqU5NnOEq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJD5cZrgVi3zCHyKoircA2ceLGA9ZLBry%2B9FbnhFI06DrDEwdTW%2By9RhYY%2FAilR%2FqYs9qM5Uqcuh5%2Btgg%2Ffr3heWWu%2Foa99%2FVwY%2BPoSq3Mk3%2F10vZFzxbUE%2BBMEJXvpOX5o%2FTQk8SiKE3wpXwCDreUjtdp0uml1qXha8RGKMHf9Exm3vOeAIrwlmdrgWFsEnOMBsUe9UUSVW8HhyWCV4mSXGXYhj8zMrGTs3PFdLoEUM45wBv4egAHTR7HwQz1M6IlFNpTf6wXF%2FEVcxjjvdT7QbUJchuNrC0SPRF%2FOUc42NJPBPwqK1sq2%2BxOUsRfoxVuJPJE8GTJBXUGuHF4we%2Bp4%2FRocnC6OnVWAWlb8rgZ1zKDX0IcwztP3UMzzC0r09n13QKUs40inZdllNxC3vUEH12XSqCnHZg4pKg1uY31gaQNphoO%2FpLboLP3ZeywaeHeuOh8hfDGODKmF5aEU0W3BSojqcBDnMopSw1g5iWntCHS%2BmT8RLHtr2rTtm4X%2Bn7CAd44ybJqyDIiIa3aBCWQKim7YGrArW0xcKJjj2zplcQWuBwoAyMzuh7jgJpFI0cY0d2QVbhjqqKGHzTO286B6xKg3A2XdVqF0UbjFDSQIA9ORpfwCuAd3WEUgf8s8eINCZYMWhm%2BHMUZIRMISJycwGOqUBV%2Bwdd08GSPYcVszbgF3ru7zQIB4k%2BvCXQbqx8fudCtp%2BNtk3IbpHe4Vljln3vCjmhrpRCyxcyOLHeveWAyjRf7VDtn7XD4j5OYf4B0fUAQ03n6jTOjG7zldSIQJeKEPa%2Bsfg9gsHOhjG9Coo58ibzdiQbYowmBh2es9GQjG7C3NeKd4OMzcpYd3SM%2B1p5siwQFlJBDJG6vLN4GvEq77eG0hx2O9E&X-Amz-Signature=ec09e6bb5c0bdf6652c0541de48ea2f9ad8157ab3396cb81916071e15b84b67d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JQQXYQY%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDQT2MqrQzmU%2B%2FGaAwUuge%2BFU1xAKWGEIG2XgQwJVdwPQIhAO8DknMDmdfmhC49PY6uF3zWa9Lu7G6o3KX2LJJzKo2KKv8DCCcQABoMNjM3NDIzMTgzODA1Igy3TzmZUuRp5cJgFicq3AP7nnPmHzji5ZKd9xxalzpjY6Rl7u5G0Xl15BgVlVDgQJILe07yvAaVcQg2aApLslFAo9sMfwfhOovZA9MtNfuL9%2Fa63amXoiJI8RhLx3zDSjVtVHSQHBJVNVzFnyJq1pEeqdfnEQ5YLuUnBCB03uwvUAJRdZLdisCEop9o%2BNwDWXN%2BXZEDqatit1%2FcbxXCccveFk7uIvA2jjYeTrU72BD4zfFEp7EH9TT8ml3sd9bf%2FO5iskFQB2izl5qGHecD3Oqr5CvGNCl5yZYXhepEqB8HPeMgC8Q1QRbE5mWAIiFuv7OlSv1hsdO2LqzCdewFflFrBopFIk%2BAPcAuYOYRHpsHjSCRgLNVx3sDqj0bqgAzkzBzu2MQughKdqXW%2F3%2BgVqKVuH%2Brzh%2BLzToHB8Kjeeqs3jPTpumWyVBcNcpBS3ZSjaTNwwr7S%2BSE0uNWlaL%2FyjOqRNya1CHp2HEaJBN5CdmFcEljYyw33SAUrpzZ35M6xJr6mwP15aSPR3Q6QMFaQm%2B4OWgN1WO81yZyUapsoMVWuR5t4hioSN%2B6bOeyiIcGefCS7EkF%2BUpwpfWE1KLScKQBP3PLM%2FhPdEZlUnzinA74UTe80qKrfZPWxGtgEN1vZ9mnk8LwRpM5PcFqbzDvh8nMBjqkAV0UOsls7wQ6GLdZ2Wp4ItLdIYr2i9EON0etsGWb3EDxQFBNQRU7BMsEdQgIa%2F1ROY2DUAU6Yv3oJvtAcI%2BpGYZufm3B0Mu4byEoZ0QnErX%2BXZZuxAAsDDvVVUYqk2guVOQW1xTw2L5p5UeB2OJ2T9hg6AsTUcLJ6IGqVXgRzPVnPhwVFbfGWtoZUtfdO%2BhT%2FZnpYA7r0o%2FK0Une4%2BMKn77KXec7&X-Amz-Signature=8a7dedc2e28a927ffd163c21ad37207cb8b86707983b6e2adeffd274f8e64b5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JQQXYQY%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDQT2MqrQzmU%2B%2FGaAwUuge%2BFU1xAKWGEIG2XgQwJVdwPQIhAO8DknMDmdfmhC49PY6uF3zWa9Lu7G6o3KX2LJJzKo2KKv8DCCcQABoMNjM3NDIzMTgzODA1Igy3TzmZUuRp5cJgFicq3AP7nnPmHzji5ZKd9xxalzpjY6Rl7u5G0Xl15BgVlVDgQJILe07yvAaVcQg2aApLslFAo9sMfwfhOovZA9MtNfuL9%2Fa63amXoiJI8RhLx3zDSjVtVHSQHBJVNVzFnyJq1pEeqdfnEQ5YLuUnBCB03uwvUAJRdZLdisCEop9o%2BNwDWXN%2BXZEDqatit1%2FcbxXCccveFk7uIvA2jjYeTrU72BD4zfFEp7EH9TT8ml3sd9bf%2FO5iskFQB2izl5qGHecD3Oqr5CvGNCl5yZYXhepEqB8HPeMgC8Q1QRbE5mWAIiFuv7OlSv1hsdO2LqzCdewFflFrBopFIk%2BAPcAuYOYRHpsHjSCRgLNVx3sDqj0bqgAzkzBzu2MQughKdqXW%2F3%2BgVqKVuH%2Brzh%2BLzToHB8Kjeeqs3jPTpumWyVBcNcpBS3ZSjaTNwwr7S%2BSE0uNWlaL%2FyjOqRNya1CHp2HEaJBN5CdmFcEljYyw33SAUrpzZ35M6xJr6mwP15aSPR3Q6QMFaQm%2B4OWgN1WO81yZyUapsoMVWuR5t4hioSN%2B6bOeyiIcGefCS7EkF%2BUpwpfWE1KLScKQBP3PLM%2FhPdEZlUnzinA74UTe80qKrfZPWxGtgEN1vZ9mnk8LwRpM5PcFqbzDvh8nMBjqkAV0UOsls7wQ6GLdZ2Wp4ItLdIYr2i9EON0etsGWb3EDxQFBNQRU7BMsEdQgIa%2F1ROY2DUAU6Yv3oJvtAcI%2BpGYZufm3B0Mu4byEoZ0QnErX%2BXZZuxAAsDDvVVUYqk2guVOQW1xTw2L5p5UeB2OJ2T9hg6AsTUcLJ6IGqVXgRzPVnPhwVFbfGWtoZUtfdO%2BhT%2FZnpYA7r0o%2FK0Une4%2BMKn77KXec7&X-Amz-Signature=8a7dedc2e28a927ffd163c21ad37207cb8b86707983b6e2adeffd274f8e64b5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJTZM4EP%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T231356Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCrICNB5%2BQFZ04lwEMVa8haENnyOOauC%2FJRD1SXBlL%2FzwIhAOt%2FLcXREU9YMgIVj79ZUBZl2vBW5N28vuz9Q7pz%2BSodKv8DCCcQABoMNjM3NDIzMTgzODA1Igxv15HY3olZPvF%2BlVgq3APC9l7fD%2FvZXPON0zvbFfJJ%2B3rgdfUYCbGZf%2FmltRiWjL4mUDRKzEVHIFcAvgl0BjzIPjjaqiqQDjn8JTZBUjzilMtemd55wLpGpaXX2m0LHhJGSSn%2BnjkHpXu3bHXrpGxI51sgq%2BuqQHJn9ho6EAsTsEuAMwM8wAOWGdUJWvisgTRUp7VLktLZDz5Qp2Byxjq1Lkq5suPUFu8LARmx%2F269zYWwqhfZq9eThdaTKuXFrWnHqx3xVCL31aQIhHx2GLnWa7m0t1E5%2FkDVh1dnADsX4MCuLn25SRTTVSeIVJdNxp5kGxJNrNUV8WWHDgeuUplxdamUba44YfiQb01A9NnMNJO1A3%2B75QA2C%2F0A7cyMMH7ENmiEQmnR2nmb5vc9ti85sq3Xq5%2BkOFh%2BWcAC%2FAvPDB7qWq76LtO9DU%2B5abyI1eP8hSDKxakHaUdDu3zu8%2B%2B6B3Ar8dQSMek%2Fb%2BTYVFi6rmTWF0Fj4cFUdc2zqAFz%2Fn%2B9JadU1di%2BbubEiChFpNrlmuu%2BaV4UVOHmYCTaUNRaMqZ1ON69s9InVvnrBw4c%2FWDi65Sd5EocxmXzvvUgkBQr7eaESeYRmyFPDzHWORozOPkstQ8cXUMocgwxH%2FOZQ9tI%2Fg6pNiLfD%2BVkOzD0h8nMBjqkAfHUhEvnjaseKOpZzXbgnMIR56VgpFMeqlsWHBy0%2FoI35ySu4BhcMKcnhyyThDb%2BfNHGo3phRhalaZRw%2FQXae5HmROvaZ1MH35T0rr%2FivZ5HqIPxXw30qHdcvDMnHRMyxuq%2B4R7RD1jloA6q6tuZMZivWTSavzHai7%2Bknu29amSG2KWytPud7HcOog75MB4lJg5loKyI4bZD92Sv42BaGxF911%2Bf&X-Amz-Signature=d57d3cfacaed8d0a1c4e8f41b1510c90d6031b95133342a777b5601433ce44b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

