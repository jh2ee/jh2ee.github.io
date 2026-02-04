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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQ7LHGME%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIG38bCXHTVS4zvaKu881cAi8Hqm4dXDbXdfvBMoyqfqqAiEAtLlfkod7%2FjzrlAMs%2BKJ%2FaE2ogzRx2psgpZQFl2hslysq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDMRaHi%2BNRxKvaBGc6yrcA4zF7iSOgrhN1ze%2BhZtcfEctIWvXqxOhIZp57C1cMnDfa4HCQx8SxSSGOkPdiZ4RQ%2FgJs3ylA39YVx8hh3%2B3kHpirLD%2Bxt61J2zM2mUKf7i%2B93CRjxxTXtmDhLrXwo0DOB3Aw8wF%2BZ%2Bxy5ysLhOXQaIbnPHkEKd79wMVX66D8MM%2FQsZX8UN0L0%2BaN%2Bt4amwadiXrF4gk%2BvmkLgGLlRhTYZI7WE%2F2ag7tjLUei9rMZFzDwvpvnL9V2IY9%2BnGYDVReacKEpx6G8TBJxJxKnbi%2FHCkM5GLsuMBof7eVEljl%2B8eftr2Ibzfr3vVeCHMVcKLawZZ9I7x4gxksmeIDFPH1BrTEQmJeoChTEh0kP%2B6AlBxtoe1I3DAK%2B4mG%2FbT6y0RmDTzaMSIRLh4itiAu4UngEkmOOlrgmLwcqBS0CSThJDXnxSZbjnI%2Bi6W23fGTuiXe9FJ%2FCXvonr0nVI17d1iex9FAezoprQc9g7jnAIRkIFhSyksJlJs5wbap%2FiEiULqcvscqA7tdYxkOpQ809hdihifiLSbUh6urP1nUFrM9JbLVoV8Yc4yhLcdJk1vBc8Hb4XZXiGMeRy8jfLf5e2UovXfuBTBLRzxe5U0X5X1Y%2BFVcLmGMgB3YblyhUNydMIKaj8wGOqUBZq32fYOzRcgE7%2BEAv%2FQEOym3y56GGQ0RdyGoRIZ2xXm0xT2%2Bv19uUbjhoQ0cmHgBbfD1UJ51Posoe4O9uJb88swmslQeFZGGiKngmnIili1FxyW1ePROhfyDF5M4aQQdg1UlI02rbk7sRGusgvmOwkwAxfHOtZLe2OnxmcIlFuoD%2FjoPxf3mLcH4u3KvhbIXqaaeb5eQ1grZoK711EbtyCkxGLjp&X-Amz-Signature=924a0b40b4b73d51bde90fceb551b4434441915985af76a7db368bc87a11dc31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQ7LHGME%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIG38bCXHTVS4zvaKu881cAi8Hqm4dXDbXdfvBMoyqfqqAiEAtLlfkod7%2FjzrlAMs%2BKJ%2FaE2ogzRx2psgpZQFl2hslysq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDMRaHi%2BNRxKvaBGc6yrcA4zF7iSOgrhN1ze%2BhZtcfEctIWvXqxOhIZp57C1cMnDfa4HCQx8SxSSGOkPdiZ4RQ%2FgJs3ylA39YVx8hh3%2B3kHpirLD%2Bxt61J2zM2mUKf7i%2B93CRjxxTXtmDhLrXwo0DOB3Aw8wF%2BZ%2Bxy5ysLhOXQaIbnPHkEKd79wMVX66D8MM%2FQsZX8UN0L0%2BaN%2Bt4amwadiXrF4gk%2BvmkLgGLlRhTYZI7WE%2F2ag7tjLUei9rMZFzDwvpvnL9V2IY9%2BnGYDVReacKEpx6G8TBJxJxKnbi%2FHCkM5GLsuMBof7eVEljl%2B8eftr2Ibzfr3vVeCHMVcKLawZZ9I7x4gxksmeIDFPH1BrTEQmJeoChTEh0kP%2B6AlBxtoe1I3DAK%2B4mG%2FbT6y0RmDTzaMSIRLh4itiAu4UngEkmOOlrgmLwcqBS0CSThJDXnxSZbjnI%2Bi6W23fGTuiXe9FJ%2FCXvonr0nVI17d1iex9FAezoprQc9g7jnAIRkIFhSyksJlJs5wbap%2FiEiULqcvscqA7tdYxkOpQ809hdihifiLSbUh6urP1nUFrM9JbLVoV8Yc4yhLcdJk1vBc8Hb4XZXiGMeRy8jfLf5e2UovXfuBTBLRzxe5U0X5X1Y%2BFVcLmGMgB3YblyhUNydMIKaj8wGOqUBZq32fYOzRcgE7%2BEAv%2FQEOym3y56GGQ0RdyGoRIZ2xXm0xT2%2Bv19uUbjhoQ0cmHgBbfD1UJ51Posoe4O9uJb88swmslQeFZGGiKngmnIili1FxyW1ePROhfyDF5M4aQQdg1UlI02rbk7sRGusgvmOwkwAxfHOtZLe2OnxmcIlFuoD%2FjoPxf3mLcH4u3KvhbIXqaaeb5eQ1grZoK711EbtyCkxGLjp&X-Amz-Signature=924a0b40b4b73d51bde90fceb551b4434441915985af76a7db368bc87a11dc31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLWLBEOM%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQD1GagYZetGelS7J8wcrAU6cSAI4Gd2ex%2BkWmXyFrBODgIgU43Wr1ql7cZaFQ6Uil%2BJHRYjgFD%2FEFe1Yb5kjQmbcIcq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDFRZ33mKZ3iZAK70ASrcA%2BSgDUSqilxei37CXOC6x7LK5jHtq1xYpbzC9MdtT9vdd203UBOSWoUzNy5bXYP3zS9pRAoKM3LJNYeVLq6h2km35e9QZpEA2zvq321FXuIgwX1SJeWiE%2F%2BCokSy%2F6y9K%2FwXg3SorNtqZR7fwq8bmOdy%2F6MuSJ84uXpIT1bKlOVe97PYesFHupCE2GjlhI7kquXWUFDePnCzGt0sz6jspN523tFcErgeSUxNQnowFENGSkWNuzLCTuSZk2LAyAhLJf2Bp1EtBOuuf2dn5oC0K2t%2Fr3XckL22cYT1at4L%2BRaY8ta2mL5OhZdELrBzg7%2BUEb6w2hn%2B7uKj%2Brkj%2BHIDRCVvzQZEDZBoql4zvPJgYSbOr%2FleDOWdPkj3vb8y3dT%2BXRvdg617NDSoiiWi1ymYmIa6u5WXGgD2mIoEJr2a79FVffKWuYJLPPP7CdQL9qS8E59g549nxqsgZF0jRA27qsjG5%2BrhKD%2BLPJkHKnQwCy2MlJzPCD9MIn%2BHzH5Unf9m1lS6wvolsPmZoj8eQ8hYhJLqvnlcM8yxxuty1P%2FCHE2nt7%2BTzR96Zu7DEJxhp5Q0SPKVfyc84yT2DcZIGiagBpnimCBMMcoqrcLNk%2FFG39ipZuaFujRQoNGOjQoaMMeZj8wGOqUBCAJ3ClAPx1eCjZt5x4JFbD1aAYed7I2e2ytc2hv8e9ggQc%2BHwbxM0OTcLP%2FNzV0rwA558nqIfgWUrss%2BFB%2BwLMvz922vFAjlpZImNQ9bEKNBTDXeXaPKxV5wSRV4k3harOTiZslMNHjQ34Rear3olG1qIaYbRo9bFHTYoHUScW0h5kWCMdAU%2BbHpLTsmgCEz47VGlOnFUBSDdjhfLu2mmpxXZMvr&X-Amz-Signature=ca1da178380cf0691f7b7eff22b553916322492ed545081527fa2222974df007&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663DNLXE5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIGNzjTYPHy7zv0NG5%2Bo7PcyO4UVuLFHSllSghZnNs7gCAiAa0CP8gQ3lYkmQfA%2B%2BkKRi%2BumzF9ViX3eIZxxmNwO9bSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMXMiletEM1MX%2FcUigKtwDeYm7J%2FRsKX0SRk19RcubXYrobR81rPRVQ5qo%2Fs%2FBV7SEM0rZHdHvpBOW3UK9acuwQiOB3K7SKF21uakMQHc8gJt6g%2FCfuOznTKWVxiOQLwMCIa88PTT7ojxzFXlhX82P8HcjsyVVWRQ2GJ79cYGYyQEtO4n6op6GEG27q69B2oFCadfwhfCtczjPEUoDmP1iLIfNeqTUxyEbsGPu0uH%2BhvvkaTQ6C6I1uA7%2Bp29dWZRBpFj%2F7oBpFc01NCjhj%2BzbiZcj%2F6XGhTVdFs59QH9lBvyuHg8seCAcpW%2BO7jht3X1iNgHErTQOvUOIkz4nOjsgqzotycRpzWnhVzRMg%2FHLA1G7ZkTjD1I4wegOb7mHHK%2FdtNRDh8jxiQ%2FUXe%2FifOd5xmmwjB3PqF9k2VItE1Cdnkq%2BKpoMdCg6OhE%2BT9Xn8KQqHnXxSM9tC3%2BWyug0Nn26gA9%2FLnc%2BzEeaSpzZEiwBLTky9nrpbWn5wX19bRkKEL2JUukAFUl9VfjELPSkTNjwjGyJSRou%2B9ScDOL%2B4UGUXRsGGmeTaSE02ZLfaq4sg%2FS3jYcftB1sBXyaEBIDBr1NORc0Ff3xYQezOUlsXovHgDn7jTkAHzy1IqKf1MyBxAjXT3s5npmhNZle7lcw65iPzAY6pgFej%2FkAESDovXxCCwvdFb0Xe0OMMKfkxa6ymP1r1E8n7DudYsbCuYIY%2BF4ByKshtKK1tU85v30lgncUtbBC0kkKINk2rkOYkOVuXdWMZ0UOAAuP6w%2BwCNwqm%2Fexq75PKaGnJE2HLnkkbGawVbz3UbNk%2FRKrHa0G%2Fd6O92Bgh%2BRCFnY8Qf6849PtJZ06zsiTt3kIomMdNkQuh%2Ffi%2BxJgRXInpBmDB2b3&X-Amz-Signature=044d8d0fcc99c7f35d4b3e15e2f13f17d18d14f10836d64e4522bbca15dbeb7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663DNLXE5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJGMEQCIGNzjTYPHy7zv0NG5%2Bo7PcyO4UVuLFHSllSghZnNs7gCAiAa0CP8gQ3lYkmQfA%2B%2BkKRi%2BumzF9ViX3eIZxxmNwO9bSr%2FAwggEAAaDDYzNzQyMzE4MzgwNSIMXMiletEM1MX%2FcUigKtwDeYm7J%2FRsKX0SRk19RcubXYrobR81rPRVQ5qo%2Fs%2FBV7SEM0rZHdHvpBOW3UK9acuwQiOB3K7SKF21uakMQHc8gJt6g%2FCfuOznTKWVxiOQLwMCIa88PTT7ojxzFXlhX82P8HcjsyVVWRQ2GJ79cYGYyQEtO4n6op6GEG27q69B2oFCadfwhfCtczjPEUoDmP1iLIfNeqTUxyEbsGPu0uH%2BhvvkaTQ6C6I1uA7%2Bp29dWZRBpFj%2F7oBpFc01NCjhj%2BzbiZcj%2F6XGhTVdFs59QH9lBvyuHg8seCAcpW%2BO7jht3X1iNgHErTQOvUOIkz4nOjsgqzotycRpzWnhVzRMg%2FHLA1G7ZkTjD1I4wegOb7mHHK%2FdtNRDh8jxiQ%2FUXe%2FifOd5xmmwjB3PqF9k2VItE1Cdnkq%2BKpoMdCg6OhE%2BT9Xn8KQqHnXxSM9tC3%2BWyug0Nn26gA9%2FLnc%2BzEeaSpzZEiwBLTky9nrpbWn5wX19bRkKEL2JUukAFUl9VfjELPSkTNjwjGyJSRou%2B9ScDOL%2B4UGUXRsGGmeTaSE02ZLfaq4sg%2FS3jYcftB1sBXyaEBIDBr1NORc0Ff3xYQezOUlsXovHgDn7jTkAHzy1IqKf1MyBxAjXT3s5npmhNZle7lcw65iPzAY6pgFej%2FkAESDovXxCCwvdFb0Xe0OMMKfkxa6ymP1r1E8n7DudYsbCuYIY%2BF4ByKshtKK1tU85v30lgncUtbBC0kkKINk2rkOYkOVuXdWMZ0UOAAuP6w%2BwCNwqm%2Fexq75PKaGnJE2HLnkkbGawVbz3UbNk%2FRKrHa0G%2Fd6O92Bgh%2BRCFnY8Qf6849PtJZ06zsiTt3kIomMdNkQuh%2Ffi%2BxJgRXInpBmDB2b3&X-Amz-Signature=9a2e761625e3985189c21eb8f36fb08e810f543e3b6c771f918fcc8039e95681&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLQDNAOK%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIBCfnrHtOltLyatxuBU5pFKYWbH0nx5Nl6p8Exsu4McjAiEA%2FgZVjIegfbAVQd%2F14dxc7JRFV4SkbpA2dTMZ9vBBRXEq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDArhSa0lYLviqfUrryrcAxq%2F9%2B3EC0zY54OzDzFjnDqF0L%2BoAbFbrnwVL9ZPjwEf%2FwRQAxp1A06MgNb%2BQTPDbaJ%2FtY2fYfHu7eczuPkBnDsLCMeSjYG6ix5qeCK6KIc20L7O1%2BalVsBIQkF6AsTrwDfvAjiHGbA3%2B88KYyTmzwnnQjHXG00nKMSuuUpy01qdeDrSFFaDzD4VBRGpCt%2BG7P%2BlNwdLFirV4b%2BlYi%2Fr3q%2FNNRAUGNhyOOnhPliVECQP62pDi8IKZ3S%2FBzhQ5%2FuHs6LaMbWPhMaiIbBjuMTbKh%2FtlFgmGCbeBCajKZ7uv4aUtb9FR6khjLezcFk%2Bt%2FWGvUtVJ%2FY0Y2X4MktpbccoV2btlLwssxobAREyEOKUrCq9JEyC9yOxRXtF%2FIIPFQTFvI64jbEukMBDHOc%2FMBtBbGbN2JyQAWPCtioJg4t0d4GdRFCDK0R%2Bf6qfC3xnW9MeqQOIQ%2BP3c1lPJxSWkzK62TnZ1b%2Bh7gvzCb7DlZZCtqVSfmaReCnJLnmZbUIij4%2FBSAZg%2BBTeIhFAJs4fvbSEsTGzB7GjesPhjL94I9Bhf6vv4Tzp0Mq2BBNy8BwSkvoKtorA%2BaG4bUyaKFDgZvc4%2BZIBeVNLRlAaanEADGWbPwe2Pi5lkayQAX49coq7MPSZj8wGOqUBh2hZbfMRCfsE%2FyDULU%2Flkz4yeBC4hvseDkwvWbXNQixV7BdfIO41SXtMZZbhKpIoK43KW8cqX2b5IIR3wMLrBT9lMGi5exO0oJrBo2jGR2XgTnLOJWn%2B60539UBn1z3DglHLtQsKH1Eb7vXYLpgLiHtauZJz6Eyp2UEvKz2KLsniVyGTXLwlRi28QnH1LWUTU2%2BbPIsGgq%2F9a8Lgqoajlf99tfwv&X-Amz-Signature=7fac8e8a1e104c153b94cd5763a4f294bcde17f36614f2929f6c95cb66a62986&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCYUUZOV%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJIMEYCIQCYP7fjag%2BDzmdlVHgAsMyBbPzpaGXGdldr%2BYDVU2WU%2BgIhAP0cLpkQtWRyLxUSkOeqzjDjEyq3ZNDPRJ3cYm4C7WK0Kv8DCCAQABoMNjM3NDIzMTgzODA1IgzTQ4hHC0ma3gJnJCcq3AOmSJe2A4K%2F%2F%2BobRoYjaFMpqO6NjmBrg0LXpXVFt6jTddRzXh2yGnmPUDAIZ%2Fkg73jKrfNgxo3dQpQxBnVTVTAyOlCuqL4ej7d4vDP%2FlsJz7cRShib1zxfKx0gOPHKtBbUUZ2GXXGzlelVBTcm%2FM80ZJRKykgswFw9ZAQKSM2pB8OBjngjxpa6wMYm6rsSCv%2BeYSvHpWZpDzhvK9Go%2FelhUrr65j1WFpA4sKjIlCd8QFRwFOGRlLeyH7pERRRFUpxx2kMNMqpEoN8R7JQQKCDQ8Fz62ZRuPv1wIVCVgYcx1H%2FP2RKevaP5K%2F4aVLKsWAWXJfPKgE%2BHjYOQVi5rXXYMb2588fpjWhrJjGG0NO9e7uVobwmXYDTvMSsOJOEVLTAbzJDnHSdTeM8mASSVv3HjPVRE3gBk5x%2Fg6rqYbOHxxNUYcJmqgl59EJFDbQ38h1uvvINPF%2FbagSega6TRZaRYPmIlqFBNqoAZpcvLHmQB%2FDGYEX55%2FZ%2FXisn4KtxtYM0iBT8FVyJ08vSR5bRme6TA8JHyRr98SgQAcEocTfPg8GqtF%2FXghOOJ8Ck%2BEyifkJQURS1H9ykBS3ojEdWGYPuWL%2FAHsRWXQ7sQsX%2FHcvpvIvv5leIijaMFB3Be4kjDxmI%2FMBjqkARTDApIaR5uwmFm%2FYIf%2BoHn0ApV1CXHHEsO0dvFCsNk54ZjaGpd3FPhoh%2FNGIOkM7hVu80%2FhelJp7ANJe50QTPRGkOfFQzyyLHYu3pc9O6mQohtzBYr50Phie94MJRqDiyt6GekTbW6tNVvWRhcKzU8QKVdHP%2Bh1I%2FpFet0vNaOUlX92MHebmv1Zh1j5RIbWi4IJatxZJxv9UeqIn3OoXunRIULA&X-Amz-Signature=63b10c89b155d8ba438431d31674c8c101a40d7565bb0341f5c768ca0d7692ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLQDNAOK%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIBCfnrHtOltLyatxuBU5pFKYWbH0nx5Nl6p8Exsu4McjAiEA%2FgZVjIegfbAVQd%2F14dxc7JRFV4SkbpA2dTMZ9vBBRXEq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDArhSa0lYLviqfUrryrcAxq%2F9%2B3EC0zY54OzDzFjnDqF0L%2BoAbFbrnwVL9ZPjwEf%2FwRQAxp1A06MgNb%2BQTPDbaJ%2FtY2fYfHu7eczuPkBnDsLCMeSjYG6ix5qeCK6KIc20L7O1%2BalVsBIQkF6AsTrwDfvAjiHGbA3%2B88KYyTmzwnnQjHXG00nKMSuuUpy01qdeDrSFFaDzD4VBRGpCt%2BG7P%2BlNwdLFirV4b%2BlYi%2Fr3q%2FNNRAUGNhyOOnhPliVECQP62pDi8IKZ3S%2FBzhQ5%2FuHs6LaMbWPhMaiIbBjuMTbKh%2FtlFgmGCbeBCajKZ7uv4aUtb9FR6khjLezcFk%2Bt%2FWGvUtVJ%2FY0Y2X4MktpbccoV2btlLwssxobAREyEOKUrCq9JEyC9yOxRXtF%2FIIPFQTFvI64jbEukMBDHOc%2FMBtBbGbN2JyQAWPCtioJg4t0d4GdRFCDK0R%2Bf6qfC3xnW9MeqQOIQ%2BP3c1lPJxSWkzK62TnZ1b%2Bh7gvzCb7DlZZCtqVSfmaReCnJLnmZbUIij4%2FBSAZg%2BBTeIhFAJs4fvbSEsTGzB7GjesPhjL94I9Bhf6vv4Tzp0Mq2BBNy8BwSkvoKtorA%2BaG4bUyaKFDgZvc4%2BZIBeVNLRlAaanEADGWbPwe2Pi5lkayQAX49coq7MPSZj8wGOqUBh2hZbfMRCfsE%2FyDULU%2Flkz4yeBC4hvseDkwvWbXNQixV7BdfIO41SXtMZZbhKpIoK43KW8cqX2b5IIR3wMLrBT9lMGi5exO0oJrBo2jGR2XgTnLOJWn%2B60539UBn1z3DglHLtQsKH1Eb7vXYLpgLiHtauZJz6Eyp2UEvKz2KLsniVyGTXLwlRi28QnH1LWUTU2%2BbPIsGgq%2F9a8Lgqoajlf99tfwv&X-Amz-Signature=098e9c58740074942a7f8fdaf20381470d1cc68bd75dd5b4f984f74c01a87a7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBBBBSY5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDOeIUO6L689JFPP65qiafIu%2BHbOw6W3UnLfHjk91t53gIgXEUtKSlX43xRovuRg7NO8Nf9fXc9wmDjyxAzVvNVBvwq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDNI5dqkv6VPe4n0KmyrcA9UOkoS9BXO3euMhznsHg1YdHCW6GJuAyGbbqJbgf1d0sLgbN%2Fi2a%2BSWE6h%2B0kHNf6TaXvy2%2F14Rut%2FyX1yRnXnEXEBdW7Zvn2nUczeQJOqr%2Fi8h8FbHJ3n%2F53DCrcgA6c%2FrqqSHY5sUlyDh9OqZ3ywlJUBreywPaKfx8QOwh9i4DwlwiDjdcV7au9%2FteyogbKiER13IVaLc%2F7Mbx9MLQbNwz279INFG5MKHWNjeSx0apKAhNUJzsIeyWGuuPLux2Z9H2JBwEAMcaM3u8rg5yVpgEAqWJWr7XLWjVj1HVf4rWg47ymnr%2B6622LIrUjzI72A%2FUHspd6vdtHl3IabEtk0if9xW9cb5Y5T%2FqCiloGofp11rRf8XD3HKCy6z5WzD8vQIOXjcJ%2FFef0eIz3HHH%2FZy4vPBuMR0ZX%2BKonW977Wo%2FKlLYjd%2F%2FwJDGGtxFNoAdjPIii6y0s6GRQxW%2BI1ZJUOyyHuj%2FhY6ToeFB%2F7StGANlp7YZJkpZFz3pTdc%2B%2FU%2BzRa0b9LaYBnRyhLUfgu3Vru6WqniFUlSMgkF4yANMv2DOIuK%2F%2BSC6s0Z7s%2FhdSKn8X1wldx2LNiHLbRduhH%2BvMzwo10ZrgC94fSJcy4K9qVP%2BBz2tE4fl0KFfcjUMIKaj8wGOqUBO9eHHSvzw1TvprYSqOD%2F6WiqXfqzKgeiHriFl45H%2BbTsU7q7aNlb0rHtRaZIb%2BsfIPa4NunBPU%2FZLqKdHYTiwwmzkleOXOUwhSHCFxXcmV3MrMcRm4c8TVG12YRn%2B3YtUDw1bGOsK3s%2BXAhk9QzsBvwvGIvXd51D3aYJKMv58yybkuWezFlZqXOO5lMLVo5HTsZ8zrbBIEP1KITNblkhUtgdXnoq&X-Amz-Signature=69dbe351bd652b48a8333be4ba6c98e65d4b25ff1f7cdfa8e7c8e5298a46bc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBBBBSY5%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIQDOeIUO6L689JFPP65qiafIu%2BHbOw6W3UnLfHjk91t53gIgXEUtKSlX43xRovuRg7NO8Nf9fXc9wmDjyxAzVvNVBvwq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDNI5dqkv6VPe4n0KmyrcA9UOkoS9BXO3euMhznsHg1YdHCW6GJuAyGbbqJbgf1d0sLgbN%2Fi2a%2BSWE6h%2B0kHNf6TaXvy2%2F14Rut%2FyX1yRnXnEXEBdW7Zvn2nUczeQJOqr%2Fi8h8FbHJ3n%2F53DCrcgA6c%2FrqqSHY5sUlyDh9OqZ3ywlJUBreywPaKfx8QOwh9i4DwlwiDjdcV7au9%2FteyogbKiER13IVaLc%2F7Mbx9MLQbNwz279INFG5MKHWNjeSx0apKAhNUJzsIeyWGuuPLux2Z9H2JBwEAMcaM3u8rg5yVpgEAqWJWr7XLWjVj1HVf4rWg47ymnr%2B6622LIrUjzI72A%2FUHspd6vdtHl3IabEtk0if9xW9cb5Y5T%2FqCiloGofp11rRf8XD3HKCy6z5WzD8vQIOXjcJ%2FFef0eIz3HHH%2FZy4vPBuMR0ZX%2BKonW977Wo%2FKlLYjd%2F%2FwJDGGtxFNoAdjPIii6y0s6GRQxW%2BI1ZJUOyyHuj%2FhY6ToeFB%2F7StGANlp7YZJkpZFz3pTdc%2B%2FU%2BzRa0b9LaYBnRyhLUfgu3Vru6WqniFUlSMgkF4yANMv2DOIuK%2F%2BSC6s0Z7s%2FhdSKn8X1wldx2LNiHLbRduhH%2BvMzwo10ZrgC94fSJcy4K9qVP%2BBz2tE4fl0KFfcjUMIKaj8wGOqUBO9eHHSvzw1TvprYSqOD%2F6WiqXfqzKgeiHriFl45H%2BbTsU7q7aNlb0rHtRaZIb%2BsfIPa4NunBPU%2FZLqKdHYTiwwmzkleOXOUwhSHCFxXcmV3MrMcRm4c8TVG12YRn%2B3YtUDw1bGOsK3s%2BXAhk9QzsBvwvGIvXd51D3aYJKMv58yybkuWezFlZqXOO5lMLVo5HTsZ8zrbBIEP1KITNblkhUtgdXnoq&X-Amz-Signature=c29a18ed5551978088b40a100bed3fe941df3e7367664e64dd710e3318d0cb13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBU6WWLP%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIGhe7nw7fhGq9YJrn2BGgqtzf2Ajn%2BfGAQRmeR4uk40lAiEAq7AkyMEUkyiE9IqRizMrSn6N59HrC%2F61Iy%2FyRgW%2FCUsq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDPT2AGuGnRw0Cufk%2FSrcA%2BhI%2F1f9smcNt37xw4uXK7GDmC%2Btuh1YPjP%2ByuAJesreGcMoahOpkMjolKBX7Bovn%2BoJ8bc6u94XBLpIsBqS%2FFq8Qz0OdYvB55O410t964Kdg7JGW83Bghf3IESNA%2BXcrezMATHslcporcJpUG7RcBePiSevlsWlnw%2BcW1sQEUR6duwoYojLkNZr0tLjLSgffrfKmRaLED5dm%2FZXB8b1HX4%2FAp4FStmg2YU7ImqZfFPg%2BRA3JC%2BpuFfeSIKKb4C7j04ZZEYh9XiLT4%2B2F1sskzQQPV5Ds%2BI%2B25VHCmQ%2FYfd0%2Bvl4ESTFFh0oLChnWULs8FY3X8rWi4rCEj9bh51bTS%2FeikYGsq%2BtcGD5OoYGIBPariJ0%2Bi8dBYXrfOxSQJUvccPTX6QTIXmTNJbzhlRqDh%2BKjRg3NJtzE93PgxZAvsWCwA%2B2BwAjJsOuPZCK0S1WsUNeQry5IplEZxzRjGo764v4jIQcb%2F3LqsaBIKBvHsR79jbmHfaNGwDsO9oDUC7Z2NUdGz1%2Fh6%2FUUV2Jbi2DBK5HY6N2lSH1We6KohmPSfT7v5W5rpqRPUiGL9bzwoL7DonLlf2IqqLMVdu3xiqMUmQEIbUcv5RKNWS0LbRAoNjyayv3MySMoGyb%2F0HvMJ6Zj8wGOqUBJeIjnJqUmhqltZwV8oKr5hXcfaRg3q6wWmaZw1lMdCQb3f86tQ4vFLcEVTSv1nbToYR%2BHrHRCUIJWVdwAl1csJMlhiGWZy79opPve0abmdtW18nX7v5otB%2BsNqrKevbCi131kcypcV12e76yz5agEbkyjv9cyb%2Flvcn50I%2BbsMmdCOofzb9guZPdfzvfBpxdZoDXySm9spqc4JRmpRmHREu4h315&X-Amz-Signature=0a66418e2f931e1448090e5c5425f50742231c7c6fca0d9d0b7e9ac7dbb5b812&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BVTASPZ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIFT5eyCn8%2BYBFeElb%2FT8JHA744k2fSqm1ZmQ4Upg8HaPAiEAoPd77QCsBA%2F1WTvXjzu%2BSY3Gj6%2BoDZ9Tmgibs4Mk4Pcq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDA52B4E7QLrXnPZk3yrcA4QtEciFmmRcD0t8dBxbkoW8%2B0%2FnvXphKBwA3ou%2BVufTJqq4%2FwPP0f8kM%2B9c9y8Ygojv%2FwdvJFzA%2Fq3j69R9%2FS6c%2Bpf%2BOD0NtObWxavPdgUubyWM7qHMzD1nDYRZJ%2B6iV3SuO0aAihn6OZBH2os%2BKJ0v2OmyXoFm%2BoWtncdVB0KSQUwxG0SjL7OVl4t4mi%2BdZSqyDZgQTednahGQlF29P%2B6sCC0uf6NtKO7eSTcqXraxNdMepzlgM9vFlPYX8eD77aaDmUPX4XAvByaJ%2FvoYI7yB2bGuSxeWHqiC8ZVAIaA2jQp04mR0Bq9u43pwwIEthoFCLxB7p3t5C4RWi3Q%2Bloc8tIVcOcoT5HBCKQku5dpIgAyMZK0uZ1By5QhlEce9Z6l8hYp4t7EL0YiazH0PRbA9xaz8xpeSfnmsS6AlSc7p9UNrjUEXOjyqgaQzlI0OWswOF7RsTj%2BLuiQstaGbtOGhD%2FEb6IPT3kqCXQTiHsph5QjJofYC1ODqsMAjM9ZRn%2BFY0%2FWow12sVfYpW0RYeD7cNRw43amFLCxUpbjg2iOPq4478CUMEXSGKMDWWhh1j2%2B0rJUb6MJng1%2Fjg%2FxUVba6jglxb7srPKjZNJEbOU0L26pxwxrfXR87PrSDMIWaj8wGOqUBlIIQdKHmJ1EC%2BqtiT%2Bi7CAwt8kvx7I8lcgOYMQrmKNyF5TKFvcTGxx1Q3jyFbeeM3vQvH4oppdKT5dgq%2B8zw0c1H3%2FaHO8OmLseghbahczXuMHvW5J94hrakCznNds3AZA0wxpaBhoguYhc1fj59Q0hjHwLSuDqCCzJqJJEqE%2F%2Brk6WN2cOmjkXuhBWSxwUR2satsUHkGkyjfIj8vI591Kyy6Drl&X-Amz-Signature=dd837da679aa46ad932f1aa480230d26303f1af6ed51336f432ef09d59f0e402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BVTASPZ%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIFT5eyCn8%2BYBFeElb%2FT8JHA744k2fSqm1ZmQ4Upg8HaPAiEAoPd77QCsBA%2F1WTvXjzu%2BSY3Gj6%2BoDZ9Tmgibs4Mk4Pcq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDA52B4E7QLrXnPZk3yrcA4QtEciFmmRcD0t8dBxbkoW8%2B0%2FnvXphKBwA3ou%2BVufTJqq4%2FwPP0f8kM%2B9c9y8Ygojv%2FwdvJFzA%2Fq3j69R9%2FS6c%2Bpf%2BOD0NtObWxavPdgUubyWM7qHMzD1nDYRZJ%2B6iV3SuO0aAihn6OZBH2os%2BKJ0v2OmyXoFm%2BoWtncdVB0KSQUwxG0SjL7OVl4t4mi%2BdZSqyDZgQTednahGQlF29P%2B6sCC0uf6NtKO7eSTcqXraxNdMepzlgM9vFlPYX8eD77aaDmUPX4XAvByaJ%2FvoYI7yB2bGuSxeWHqiC8ZVAIaA2jQp04mR0Bq9u43pwwIEthoFCLxB7p3t5C4RWi3Q%2Bloc8tIVcOcoT5HBCKQku5dpIgAyMZK0uZ1By5QhlEce9Z6l8hYp4t7EL0YiazH0PRbA9xaz8xpeSfnmsS6AlSc7p9UNrjUEXOjyqgaQzlI0OWswOF7RsTj%2BLuiQstaGbtOGhD%2FEb6IPT3kqCXQTiHsph5QjJofYC1ODqsMAjM9ZRn%2BFY0%2FWow12sVfYpW0RYeD7cNRw43amFLCxUpbjg2iOPq4478CUMEXSGKMDWWhh1j2%2B0rJUb6MJng1%2Fjg%2FxUVba6jglxb7srPKjZNJEbOU0L26pxwxrfXR87PrSDMIWaj8wGOqUBlIIQdKHmJ1EC%2BqtiT%2Bi7CAwt8kvx7I8lcgOYMQrmKNyF5TKFvcTGxx1Q3jyFbeeM3vQvH4oppdKT5dgq%2B8zw0c1H3%2FaHO8OmLseghbahczXuMHvW5J94hrakCznNds3AZA0wxpaBhoguYhc1fj59Q0hjHwLSuDqCCzJqJJEqE%2F%2Brk6WN2cOmjkXuhBWSxwUR2satsUHkGkyjfIj8vI591Kyy6Drl&X-Amz-Signature=dd837da679aa46ad932f1aa480230d26303f1af6ed51336f432ef09d59f0e402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635W2MUIA%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T231428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLXdlc3QtMiJHMEUCIChLIc3GQw03krE4J0yJqo0i2PY5rosPr6wCaYKIiUQ0AiEA0Oq8Cpff%2FlddN0iJ6nnY0%2BaWFASH8nUT7GQtyBLBgskq%2FwMIIBAAGgw2Mzc0MjMxODM4MDUiDCpZml2Xx1qM4lescCrcA3VFQewNSrk4HRew0hdkxR%2F2mDxX7wR%2FeU1kz5qaESforkUomRKh5H76CV%2Fgg54EUeJ%2FeXBtMrCxmJPUVD1kCVq9px8fD4wSR31iekZZUVgGNtNcwWXvqt6Yyt7mA%2BNg6mexsdVzwqLeXrssPD%2FT8oIj%2BvVS9UJe%2BoC8JPY97bOW4%2FyQh10ZDHNMVWkp0hk15tAEY8TJkrhiKgBLSxrfBYoCI9gCd%2FJXghBWIY4B%2FWifaXyC0fo6KHVRmKKS4PRus8pvqXQAs10YV2seDbI6JbuGXzUiqvIgH6SCzGZWhnFloGGEmH%2BjO4fMTTibZ1vunb7DEQmDSLg0nHDVVO3Ajgvpp4O67Zu6V5ulCvUY5YUeqBbiicVfoFEXhkZby41F6SfNm3TIy%2Bf%2Fp2mTyq1qX3dcTyfrIlKdHUb9AA3VqC7uLICIA4xwPC%2FMGwhVEfi%2BzM0o%2BCv7QgP%2BImAYUITnG27bOF5FOCJj3fN72QdT4t2rsLP%2FegbWxLb%2B8uYcIoSHhWnKlIY0P6i5Rn8PAz3pSyILO%2BNqcj7xoJRgMr8pOmowk%2F2TzKPuDX9x%2BqImrMfGCCOj%2FCjxyrRVfKa62wgLgz3%2F3CePd4AZYqZVXur0F7dbsTH%2FKQ%2F527UAi9pmMLSZj8wGOqUBD3t5ZkJ41nkiYFhXV5gVNJj%2BsUhk2tCgbCOL3WTRA2v0Ptql2QYZFHySqsAPXo5HnrXLEjxdMmLQBDgBeTIPi0nxt699%2F6kKvMxQVJRZnWKHahe%2FxPrxoNx2lfymT0D75QbUqW07mrwzcSRfvAtGTVIEyVaPtYs3n2hK%2FXTNcVFeNKe4cwIIgZtyundzhusBR%2BmrHzA7hRrzk4v8Gdtex22Hfj%2BP&X-Amz-Signature=52e45777bbdad168e293cf28031afec6225af3fbe47a01da18fc12149b3c809c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

