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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V3VEAG4%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2CDCc2cFUOUjn5q8IUktocqc17TrSnTN5CZxRsrdMgAiA2Xyj9N2NuSuR%2FlQEhiAKCLWiHbl5hhU35QKJmMjyjkSr%2FAwh3EAAaDDYzNzQyMzE4MzgwNSIMnTiRpNoPuJHpgJ3KKtwDgTk1txSe8n2GGUONTfmtwoVa2vNAVX4Y7OOqgL4kveQNfO%2Fcv7858UYsav1uQxPWPKbaH6paLNbSDSbB5wR%2F3%2F8dc2FSm1hR24kTTNKPOub9Cnk72XZ0mSKb2%2BbmiYm%2BZALYJJMh9QVPAwyV8JZqQefbtWIhbLYHV5b%2BLhtAFV3QAQNAVS1hszOm0nV8aCDRSEeh9spHV20XhpjQ7tLv7ZTpMRssmB12V8xwtl9%2BrCBsAHu%2FJqjZ28m6sAWrVdcsFYyiBa7Zfu6DHoCEy06TPTfH3XrEHroemovg9VeG1p%2B4cV%2B2OiX6GLsba88HHsz9srZf4srkj7NzgcBXO5GqiSGMVmgbW2pRV0La%2BWtFCCPt%2FBWl3FuxDzuJRQBXif6TFROMdRcnCJzmwrcieyOqSS5w680nu%2BQg%2F1hyy0HMXFmRuJgj4xkoJwGRFjuL39Y7WNStNiqHSdCHfC67SLudsNGuZdUpAmSYp5E0VqBnNbRegT0M1td5EEHL7ohtgoYqfRtA5gv%2FBJEWiVkDhIYMSA9BkuOnC3w%2BF7EZJPST7mqxq6c7Yw%2BQTLV5uOim3Rf1AAvEFS7aFHLsS%2BqZtgxqV5oCYzDmWibekgkPq5%2BsAvgLip78Xq3bPQ0R9w4wu8e7zgY6pgFPn%2BwXbJOc4hsDuqXt1f93bxuSMvpPfFfwg8ecopzG9PBN%2F8kgvN24p%2Bor40Z2t25O9pLLGV9L628F4ynCT0SurCde%2BaL5g0QXTrZ9gcUYlgcUB2%2BK%2Fg066ALwveYoTP1Nzl1z16l%2FSeFXWjUBEglP%2FLRnAWyt%2BsY9FfU0%2FCc92b8Qnq3nO%2BvQkaLtt%2BWdZA5KPwfaNHWyCd7U0FjfkATHr9PO8sSP&X-Amz-Signature=81931eef1575948ee48be2e0fa2c10e454c8f360057047038fe667cff9465ce1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V3VEAG4%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2CDCc2cFUOUjn5q8IUktocqc17TrSnTN5CZxRsrdMgAiA2Xyj9N2NuSuR%2FlQEhiAKCLWiHbl5hhU35QKJmMjyjkSr%2FAwh3EAAaDDYzNzQyMzE4MzgwNSIMnTiRpNoPuJHpgJ3KKtwDgTk1txSe8n2GGUONTfmtwoVa2vNAVX4Y7OOqgL4kveQNfO%2Fcv7858UYsav1uQxPWPKbaH6paLNbSDSbB5wR%2F3%2F8dc2FSm1hR24kTTNKPOub9Cnk72XZ0mSKb2%2BbmiYm%2BZALYJJMh9QVPAwyV8JZqQefbtWIhbLYHV5b%2BLhtAFV3QAQNAVS1hszOm0nV8aCDRSEeh9spHV20XhpjQ7tLv7ZTpMRssmB12V8xwtl9%2BrCBsAHu%2FJqjZ28m6sAWrVdcsFYyiBa7Zfu6DHoCEy06TPTfH3XrEHroemovg9VeG1p%2B4cV%2B2OiX6GLsba88HHsz9srZf4srkj7NzgcBXO5GqiSGMVmgbW2pRV0La%2BWtFCCPt%2FBWl3FuxDzuJRQBXif6TFROMdRcnCJzmwrcieyOqSS5w680nu%2BQg%2F1hyy0HMXFmRuJgj4xkoJwGRFjuL39Y7WNStNiqHSdCHfC67SLudsNGuZdUpAmSYp5E0VqBnNbRegT0M1td5EEHL7ohtgoYqfRtA5gv%2FBJEWiVkDhIYMSA9BkuOnC3w%2BF7EZJPST7mqxq6c7Yw%2BQTLV5uOim3Rf1AAvEFS7aFHLsS%2BqZtgxqV5oCYzDmWibekgkPq5%2BsAvgLip78Xq3bPQ0R9w4wu8e7zgY6pgFPn%2BwXbJOc4hsDuqXt1f93bxuSMvpPfFfwg8ecopzG9PBN%2F8kgvN24p%2Bor40Z2t25O9pLLGV9L628F4ynCT0SurCde%2BaL5g0QXTrZ9gcUYlgcUB2%2BK%2Fg066ALwveYoTP1Nzl1z16l%2FSeFXWjUBEglP%2FLRnAWyt%2BsY9FfU0%2FCc92b8Qnq3nO%2BvQkaLtt%2BWdZA5KPwfaNHWyCd7U0FjfkATHr9PO8sSP&X-Amz-Signature=81931eef1575948ee48be2e0fa2c10e454c8f360057047038fe667cff9465ce1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXFLRPWR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD16ki6dovSPUCGs71gbQGq4nIrnZGI3UJNR4C3BPTkvAIgELpeUpKh1RC2qovCQyoV%2FKC6vsZrG7uoIE3ttOPCZPwq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDGoOw8Vql6%2FDrGXkwyrcA4n6hA%2FLdKpMg%2FC4mPaHKFX%2BJcBu909fE%2FhgQ1GtAIgC81jIRQdZ3cSultN0EfdGZ3WMnWhpsymbz8QYfz4yg4V336Q6pon5%2F8JK1wafsOtK9ZqtsGc5V9vo8KNCSrE6Evf%2F8JHwhNIMyXsl4n59fNB%2FyrH2VsdejBhic1YdsMWPJ2HHfq24ndn4%2FB8%2FZDykkODllMHvkL0jMiTvL%2BJbJGz8Sl4PmlOBFurfYrMRTsw%2F0Td9P170QW4EoNB%2FAbAlxwkhtlIWj6fYtRd5%2BKOgsgCsRcUF7tM0fLLHFeXNQsJ%2FA6M1B0EZOJk48XtsvaPApfwlIMp3aCf8sP%2FHoOWXMqphw8QkvL5zgC6nX1lZiubG1TvwIAKTzYVL94%2FDb0viu5eh41u7l9ZlLZ6qmTzVxL%2F2rbP7An5fcusTyRUw2z0IirvozEi83Bctm3IjsRn%2BWZKoBvJ66QSsmXgEoiINQHrwe7RANX2GFRyZ1q1yw0VoDa2iIvcVsbnmICCF4sgGyzXQdRyhEoQEw0Nu1OCmurPmgB9DYYznDDJJtn6JZxYGpapIUdl8AE77XASyBD6%2BnfRRNc0j0hAkzD7NeB4ToUFNLcLPhbjf9WuS%2BRL789vkYjxMAVGdMGonC%2Bh9MPzGu84GOqUBMslZUnjCh2zu49V6MObKmI2YoKS3yLSxoi9PESyy2ML6T28iLMJRUfh4FJJ3jtSVvBOL%2F2tpDQXWG3pHwbcbrPfuXaI2jY5m%2FAafGE0x7CPQcvznlzEKXkhtkP9n2BYE6QPUijbP1cGDTo8gjM7g3ePj1lCEFI3t%2BsxJWIBv1we2xkmoZ1KFjez%2BlpZZ8482TRyOHNbn91KYlcq1MruiPgON9elx&X-Amz-Signature=7ce42bfeb6f0d81e5f2351897cd2e1d8de8cf273722c1be08a15eb332371958e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675IV3LXJ%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDXQxZCfYw2t6QMvT2fOeFLZCT6z529%2BHr5fjaK3S15ZQIhAPsN%2FioMIjAZOAbTTexJuW04LL7A3azgpTeGJIJDIETgKv8DCHcQABoMNjM3NDIzMTgzODA1IgyUeOeOv6x0K9YZTXwq3AOTliJFznsMOP0Jx4AdWFyM%2FP69NTO04iugRsPLOqTkQfnXGrTHq9YKVpDXwEQxcLTsV1LBb%2BjxPWH5okluyghkX8q0gC0kFjgSgrbeTu8S53T9tluohwB%2Fm6ccJuqrlES1NTuia2HQl6DmkNsOdDN9DnYIyw2pkzsjH7jsgGQEMyHZeRn56yLHFJ%2FHXhlwVdJI1ILAhfz2ZNPy%2F6OOajgksAzj5nqMl1BBtsRDn7VrcniZQfk%2FA0h0M0WyBfP%2BqBCILXtPte8j14G1P%2FWDGzCOoyrLXZLEKaC0PXWp1CML9lS6INrqyflDXYfDxhZb0Iogfbn229DxGV9jIKiGEbFaajPyirpqMNh40zvqLoSOla9pwRJyXOnSgFEqKygKekVFkEmZyJOW1z6ojNQ9VHWe272qTW9PsP8%2F9iM%2BMeNzwNw%2BpzIIt%2FyzSz5uG%2FqDWpqZYpV1CzlbsHNdSkyzSahDKfLJhGzn%2B%2FqilU63NrPv3OaD3nuQ4J5TOmaNns%2FIHTaR6Ryv%2BArMFEGtQRTUHJgfad8iYA0xXTDA6uGn40HC31cbIdhNyIurbpCrvQuf1V8WuyCpe2lv2qo%2BUSPerSqwlACn79xzXWclIxsLJSMr%2FgK%2BeD39YBZAuwZPWjCZyLvOBjqkAXjQEAsU8EEW3gW%2BVnxtk3cmiltAwPXtdmo0YeRZn9dFEQJW%2FZlBTD914AvF0JLjA5iUkDpGhC7eZL4b9esG8bjO2T1qA8QNPSIrkXqBxepiaYjepUhrmHS%2FBn6Z1b8suu%2FpriDrLTPY8u3sgZuZHdwDa7irgCwfhy0RHrRxJIXDyUmJM1YLnDIJpp%2BL%2FvF0BFKXutWxl%2BUnzQrZS5FDKr8ctpWl&X-Amz-Signature=be1497a3382dee20e51a10d49f824a233477cf651824a4d6de3e282c2abb7d86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675IV3LXJ%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDXQxZCfYw2t6QMvT2fOeFLZCT6z529%2BHr5fjaK3S15ZQIhAPsN%2FioMIjAZOAbTTexJuW04LL7A3azgpTeGJIJDIETgKv8DCHcQABoMNjM3NDIzMTgzODA1IgyUeOeOv6x0K9YZTXwq3AOTliJFznsMOP0Jx4AdWFyM%2FP69NTO04iugRsPLOqTkQfnXGrTHq9YKVpDXwEQxcLTsV1LBb%2BjxPWH5okluyghkX8q0gC0kFjgSgrbeTu8S53T9tluohwB%2Fm6ccJuqrlES1NTuia2HQl6DmkNsOdDN9DnYIyw2pkzsjH7jsgGQEMyHZeRn56yLHFJ%2FHXhlwVdJI1ILAhfz2ZNPy%2F6OOajgksAzj5nqMl1BBtsRDn7VrcniZQfk%2FA0h0M0WyBfP%2BqBCILXtPte8j14G1P%2FWDGzCOoyrLXZLEKaC0PXWp1CML9lS6INrqyflDXYfDxhZb0Iogfbn229DxGV9jIKiGEbFaajPyirpqMNh40zvqLoSOla9pwRJyXOnSgFEqKygKekVFkEmZyJOW1z6ojNQ9VHWe272qTW9PsP8%2F9iM%2BMeNzwNw%2BpzIIt%2FyzSz5uG%2FqDWpqZYpV1CzlbsHNdSkyzSahDKfLJhGzn%2B%2FqilU63NrPv3OaD3nuQ4J5TOmaNns%2FIHTaR6Ryv%2BArMFEGtQRTUHJgfad8iYA0xXTDA6uGn40HC31cbIdhNyIurbpCrvQuf1V8WuyCpe2lv2qo%2BUSPerSqwlACn79xzXWclIxsLJSMr%2FgK%2BeD39YBZAuwZPWjCZyLvOBjqkAXjQEAsU8EEW3gW%2BVnxtk3cmiltAwPXtdmo0YeRZn9dFEQJW%2FZlBTD914AvF0JLjA5iUkDpGhC7eZL4b9esG8bjO2T1qA8QNPSIrkXqBxepiaYjepUhrmHS%2FBn6Z1b8suu%2FpriDrLTPY8u3sgZuZHdwDa7irgCwfhy0RHrRxJIXDyUmJM1YLnDIJpp%2BL%2FvF0BFKXutWxl%2BUnzQrZS5FDKr8ctpWl&X-Amz-Signature=4d0ec8d48df6d238e4dd198996567759a783177a08b76873471f2037873492d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XSKYAHN%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDePl%2BttQjPAxIeut7qZbLU%2BxSITp%2B0M%2FTeyiliHiaQTgIgAUStdkf%2B0e2heeZj1DGwcFRRereEl7X8ya9GiNGRex4q%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDEdWojr0G3C5b%2BKMSircAyy1kc5HdCuqqtbZLJdruPBeyIRfGh6P%2Bouf3cqrbPsgwGxogktS2mTgx0%2B1icP23l%2BIQ3Z31PRT9MZsfEWa%2BTMVNStAlsgnaw95BLZ%2BT7bhg8owgXG4AHFptzRx7PP8RV1%2FW23aPbEWmZGmOQX1ou2r%2BL8QRUxK0j7Hq4Oxt01MsN2Pt20ae11PMwChdWw%2B3PON5H%2BBJqLeNZUsGWSQNQJDo%2FlV86L8YPspvDlj9KJzph8KqIPynnDJaYfe6a%2BaU2g4s%2BwYo%2FqpoY5ndRV%2BHWDlhRzKU5gjEzcCVvJsXgNrTfshNjs9tolVd8FD6kKZEYfdAYo4C%2FD7mQHAGGKiWrE1T6pOoiqNOn%2BSxHKCX8o1AR2B5fAdmnzJwme%2BLj1PVZqEpqTtY81mzq8ZdzNj9NDYwsms%2BzOSrV9QwnGe6C8gXHE%2FU%2BfqvuSLe9D7%2BCUnKg2%2Fyv7rrhUgp4952b%2BbejgLTaz6sHnfbkoNnUs1abLRniDvEWNYC7aVT9M8LwMqVL9%2FueglpPd8qDnzlpPCzK3tJgk1ZDQxJ%2FF4HyfWQoXKhplLBnwprVPmOWUPsrxC5lmkAXAAcbJdoqmOk82jK9g8lfudexPYFlwXJZ3Ax3wMfN3o7xUnf1njc6hMMObHu84GOqUBtq2UDIpdnr7vJH7RuEQpeWqFqfaAMh34iBDA%2BE3iP3%2B%2B9Mv5ZFR2%2F5vhqiD1fUHiHRvrWAXLkTS3cAlLxkbzrtZ6vaYamUlDZXd0jCIysy2MpTFcxug9ocMWAQxXEUAXXNlCiwWCnIwtAYYPIpAIKEV7KjMRtdTVE50dIxNqP9e9TL3iBqoylt3NHIT9ZGzR4httCmMA6lzp1uTeTY8jMtakPoa%2B&X-Amz-Signature=aa4d1fd2a27cfc5311d9a13ab2b14f60e17b65ddfb4839ffb9911e7476ebdc74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TGHSV6A%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEjRR1I3up8VEuIvGyQRO76ygz7mzy5vTUme8NyU41RQIgOXookwEieygbjIJ5dxTViK0unBEdK6vVl5rKco4LF6Iq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDNw5QMjnuc7U9sY6WyrcAyt1an17HU0NK5PQy9U%2FNzy0deOpYj6Tf6oLggX4JV8zf5hmauFGVVKDdD8rsvtXYdpP4nUzfYaspkkt%2FvVumcD7s0z0uw1LkYdQ75H1R42F4ZIjMSQTaxwNH80MUQL4mYhWxjH6poOVTdx%2FFLI%2B5Ru1N1LYnUaC1EYGYyoh08%2BmSvDZlekIwEkfwA%2FpQWrHIpD9Czvg%2FME5hy2R%2BDSlCMzdT2vUbee3lSHh6u8%2FQ0SD9%2Fji4ItPPLBJoOawoQNECw0%2FV%2Bj952JZ2dGyLh54KBEwyoTdOWLuSLDK0LaY4A6zXYSdavJHbMuNkXmT4x192F8gwUINRIFDTKUN%2BXWTWo5WdOjzwD3k%2F6l0wQKmB3iQfCAtmAIJLXQiaTHYuLyLQWE%2B9GZQcufhtqfAUiJMr8zsjMsQ8g3wcO1g55E5LQs4BuSOqAgFLnXyA9OmPQ1xAznuQN4jIppNUaRWhKs7Evv%2BFgJjyMV1vDkJHtXxnS%2BFC7Y7NHvQbCfFGzrpnSofkc1B2E733BPYPx88XLa%2FvLB0%2Fo%2BBAQ2bfg%2Feh7WD85TzAi9X3Y5N9rZvKUDyakXhTarMllXH55SmcRU2LTm9biI98ADlCU1uT2E9XYF%2BZnqPQt9q1GI%2BG3TOJsOXMNHHu84GOqUB1nNA%2BbrKruAwA%2F95aNs87a%2BK4rm2M2tDn8vIC%2BxErI7q%2BHG8pEoJdbrUrqVtEzw6q2%2B50njKySct8QMmYDHfVz2h7rd1ZOBESQ%2F66BZkDCEbisTX68JHV7603mGKzhchHtB68ly4UBpxdPgl9Tpf7eH3MUuN4plwIQ5WYbaqWAJFCEPdISf0ENjk8GqRj3Xa44Yl9cmpBpTr4RBzqAj5bo%2FRYXTJ&X-Amz-Signature=8523c6f2109d7630f3427a91affb39326d0b1d886d326ce5fc651fdff739bc67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SO4NZ7C7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD9TkbEQTl8RXie1vh3jq%2BEleeC%2B4khZaaTepGCXEF8VgIgDGEYSJ2JnHO4MfNYf9FPARssJGVudRtvC%2Bpi0Y8Ajw4q%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDKtdwjaRhBw67iZ98yrcA0dUVP%2FwBkPfdEncLycJ12ecF1yVAz6CX2EB%2Bil0qWQ83FKZt3fHLobKyrezCf2bS29w6ixXmF%2BIgGVrwX1chtJq8f9Ig0VOf4VswFuFeeZ380frkKl49hOCZpOk0vT8myNSh03B6gKxjpHpk1yLTvzdv0mUdEWkhj311OHc7PgkLXggR6hVAwENAYEeOkTXozn5rrYORskdyqVF8BtQRYpDQ8nhda8lpRV7HDZ4g2x7Jc1IpKvSllnV3mavYunqda8pe4hixziXCnKx8E1mINEivaHi%2BZdwc%2FavCqAO1ZpZeurnRIwD0N6nrH11mlaJ71CZDpW1d9GDHcvdZwAvj7Kv4UmKhCmhOWhLQlTUlwIjlF7swDVNS4EU38DgpXhSlRCoGjJHjQKQwX00hDXtZV4QgBTEHO3EXGsPx0hUISlG%2FoO3hJp%2BXUScMU8qZRE6YqvnDxy0WIY6McvrBpdg1dL6SEURO8UtPaBkBM3F%2BTGEv87D88WAnghfvoT5ktP3fUFvWoaL%2FPI%2Fl9Hq5rxJedNHLuuHquDn0XtUlzlGc94Yng6EFpvxDTPua17LJmKZRoGgRjimrz8ojVh36kMWMC1kCf3PeCWXRi2BZuAJLSBDVwMuFdEY8FceNP8nMNDHu84GOqUBSIvVpwIENwHlpDmSMsTB06HARmU4h1MNyqLQ7jWH8KsPZHYOtUFa1O8lpG5UVnO45MEzXUlHDcGnKOnztae2Y4jNttPirkk%2F3FgMuNrjZwK2BXb1A%2F9W7FDmOemXxwNv9Jgo%2FgZjqy%2Fi6KJ28K793iQOHixuKbF4m44yEXwhD75eArJrKs%2FOxGDMu4kUFXkHlS5TIwQHM5M5gK3KgrV2bTPdlRap&X-Amz-Signature=3feb5a64f61b4edc8fd20b72683e6e279954dc053b863a291516127aeddfd34a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFXE4GTR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHnzRHh5wEGj20wdFu3BPabGiaVyY0dpvTy5GO%2F9T%2F5wIgcGzJRKIZKRwM%2Fm86IpdYckGgAdVpM9AD8RfzVmhorRwq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDGs33S6xP%2FVP%2F7eyqCrcA8rk%2BQC%2BWoVHBSBkKHsnwmcAotL94A9s%2BZFvxxSBE3C3wksREy%2FXHB1%2B2p9LYV6tt7Km74m%2BCk6toehZvJ%2F05MNlto7i9pFMA2cI8VP0CULsok0qoqBbyHydqmx23ODaOBd4Ed1HkVtR7XBmptA0ysirX21%2FzkAO%2B5EO4UfE5b%2FaOk5VhST3%2BsBijQpnunZ3Yv1Ig%2FNQuMQy97ViUXlABu8%2B%2BhnxBIwOoCniVaLyPeM7rhdYUFj0SxfYF9zDvrXnmIt2%2Biv0TdvXhI6ZyOYovgkIxbm2Xt6sVuQTC7CUDIlvXCRwmpWhhP%2Fy0CxcSrDB6nbIj6Iy7zf5rtDBTln%2FCNHz3ckFx%2BODsv58jEfSj3jHYC14j7vcg7UrIklwbkLUDiLpzFaGt0B4UPjNM%2BAsTACsnm4S9JuFfrUjkG1Jub7qgEyqzkUVzZ82cgtKvBLVLDVZJVcDNAC0qK3qdrQ%2FD2r2ODvI357ZPz8Cji0qxPXkr3lQcM%2BH%2BvmMgquGGJsuZmP0EFxIN02gDIquyZ7yAbmh4ALcHAo9%2FD7XK5xUxxZ%2FXYzQFEBOxLCz8dlyykOczoXN04nILWlqK9av5M97ic7cQ8zcocWqp90DgxX8NRIIQmL%2Fozj160K9A1rMMN7Iu84GOqUBuDTwSB83bDYftlFUgoEvgpwCuthAThxAdnKJe1kf87MQmPx26fZoHCKgtojqy00wCpZPlJeYZyH%2FN2S40SB8wJONDR2xMVOlrEpW7u53jIXLkd5YsdC3%2Bidv%2FEnDUtL8QAqgDUo55SPQfFvNjfZXe2vD%2BEENWVClumGQz14aPr5V7fO2eOYz9IguVOsEpxE7100Q5LsBCiBt06KBgFBKERQ36cD2&X-Amz-Signature=adc17114b9de8da4ec239318a68169dbb2fa4095010ed58b981e29fb5129a1c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFXE4GTR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHnzRHh5wEGj20wdFu3BPabGiaVyY0dpvTy5GO%2F9T%2F5wIgcGzJRKIZKRwM%2Fm86IpdYckGgAdVpM9AD8RfzVmhorRwq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDGs33S6xP%2FVP%2F7eyqCrcA8rk%2BQC%2BWoVHBSBkKHsnwmcAotL94A9s%2BZFvxxSBE3C3wksREy%2FXHB1%2B2p9LYV6tt7Km74m%2BCk6toehZvJ%2F05MNlto7i9pFMA2cI8VP0CULsok0qoqBbyHydqmx23ODaOBd4Ed1HkVtR7XBmptA0ysirX21%2FzkAO%2B5EO4UfE5b%2FaOk5VhST3%2BsBijQpnunZ3Yv1Ig%2FNQuMQy97ViUXlABu8%2B%2BhnxBIwOoCniVaLyPeM7rhdYUFj0SxfYF9zDvrXnmIt2%2Biv0TdvXhI6ZyOYovgkIxbm2Xt6sVuQTC7CUDIlvXCRwmpWhhP%2Fy0CxcSrDB6nbIj6Iy7zf5rtDBTln%2FCNHz3ckFx%2BODsv58jEfSj3jHYC14j7vcg7UrIklwbkLUDiLpzFaGt0B4UPjNM%2BAsTACsnm4S9JuFfrUjkG1Jub7qgEyqzkUVzZ82cgtKvBLVLDVZJVcDNAC0qK3qdrQ%2FD2r2ODvI357ZPz8Cji0qxPXkr3lQcM%2BH%2BvmMgquGGJsuZmP0EFxIN02gDIquyZ7yAbmh4ALcHAo9%2FD7XK5xUxxZ%2FXYzQFEBOxLCz8dlyykOczoXN04nILWlqK9av5M97ic7cQ8zcocWqp90DgxX8NRIIQmL%2Fozj160K9A1rMMN7Iu84GOqUBuDTwSB83bDYftlFUgoEvgpwCuthAThxAdnKJe1kf87MQmPx26fZoHCKgtojqy00wCpZPlJeYZyH%2FN2S40SB8wJONDR2xMVOlrEpW7u53jIXLkd5YsdC3%2Bidv%2FEnDUtL8QAqgDUo55SPQfFvNjfZXe2vD%2BEENWVClumGQz14aPr5V7fO2eOYz9IguVOsEpxE7100Q5LsBCiBt06KBgFBKERQ36cD2&X-Amz-Signature=3477d0ed66ef8ecc8a1c3d053178369ba4a95cfcd2cfadd668a3ba7fcc124dbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667C5TKTDH%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRQC2EDpha57MO4V4dfA5G3O1%2BXxxfio9ExWrkewB1vwIhAI3GjnmPn6ZTwDMTxBs2mu3x1fwb75Va3xOAlGKv1rlzKv8DCHcQABoMNjM3NDIzMTgzODA1Igyc2PNRhCq3OrX2rZ0q3APjuUnlJkgsyU0g13HdvrMWhNWR%2FWjX%2B16UzmzCHP%2B4Au9JYpKjLhCW13dSLghYNDWdAx7N%2FIx6a1vveshEW%2ByLmu62wYa3GWOSgrdbUU8qIbbaO2A6jwn0FKeGQmeS%2BQbrbEbocyLLFjGwEY9L4KRaiWjTndZztDGlO7%2FcBTvDmEJeH0lAv6R6%2BqgkbihD2z1Pi1RGryGj3bbj6HK0xBd897NOB3cmEqbrpUsaMYys0DWCJfDeZqstxcXlqHHA9tXWy6kXxZ4NdUJnmyeKdGfZI%2BZAuz0vVGlWhou3oJUpR5Op7TB0x%2B3FsA1Q1ZgGtEMBHq36%2BcPewB4P2GU8ZW6y6wfd3nPFIRxAmMAmmmnwFs%2FEyjA8PgWxrG%2FYn%2FVwGsJ52V7efnb1wDmcafyHDGiT%2FQdlM6oiS5FN5K4lr0lHQJ7VRL9%2F8ZBxs51eNkI%2BU5xeWojdpX2bjbaNq4EOnKQfeW2iqhc99SKp3yWsujtULzpgaz0jJrZYyPfBw9atT2Oby1gJAoB%2FgX49AzVVbUm7oFJJzd%2Fo5fr2EPYBT1E%2FZJG0HM2PYxXJZ5YX3SCp45OiS5zOVeEHclBRwLoUWRP%2BiGDBQyrAsobe2OZiCiNSw2wfOgSmaJBJ2ZWGhjCjx7vOBjqkAaiN4vHEkwB3JAEAKPApHz99P9Y4WeSzBSdlO8bk59v06VlXCDlX%2FlWYGdxlA8tviFW4Z%2FtkDME6mCpWAWafRrwgBtHRoxrYrCpemJ3I2x0HcmT4pQ%2BBpMTE5TTVPwRtgS4N8L5AdjKTA0C%2FYEqlfyEo4OCH0cJDHH7Cb8ukgK8%2FQJhSqkBHmhyha1r3Fo79lTAkQLQITx%2BdC3cIoeEL60Plnqy6&X-Amz-Signature=ce2d459ae050e99e4f37b2c663fd013a5d4d194f85db852522538c01e991031b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466366WO2LG%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDLGCUWLYCLQzyU5mQhVnEl2qNmvuJ%2Blyksaf03VbN7kgIhAP1hqTkeN23aKUdxK8TCIp7nnKUb1w85MxEkBbw2iH3DKv8DCHcQABoMNjM3NDIzMTgzODA1IgwaKG55uS5HqZyaTQcq3ANntvVoQGPJPcOYvnUD%2FYee%2Fb8fGllLjGAqQ0CijYz8TpWLK%2BIXmw7uNQS03FcfO5duikfwfrZ2EPk3s3JCcXyBxpAEI715FmM%2F7KXSruZgSjJGZDf5%2FcdLxbsHTJ%2FZk4IelOzMnvD%2F6bVh5phACUtal8NYJV7E5sSC7zijE%2FyUg2HyzNVc1AHHjBinY20oClK2WHHHJTrT0D49LM1sh1i5Dl6%2FyCOQUaNUwCkc4QTe%2BSCuztzc1u2voWz1j9a3XvGaDO9XxGVpEbT%2FkOzz3Vq%2FiwhX2Vhhm6h8NgQte59OQzu1pABQAMvlqDL0ZA3mWwZis3O98JLIWif9tF7GmZQTS9Wfky5VWr7ondsn6CWLQAtAzbP6JU7dzB2CVT%2B6bfPBz8LdKnqAHgwxtlEoS3RmRpOlm2LrSRu%2F3nUJa%2FpvY6J0kDEGF4ozpg53BPujb0eXuyWnAUMD%2FBD0f2swqB0dAf5AOgWywMx2KAvWqlIzTQoTvsERpj5v5V0g8SyBVBLALUQjMSU8p4ZecjNtY4y1gGXrHB320JCIqisTfREIRMf88XQKFMqnuGhAT7EMDoIwdH3Vr6f09xWqCLl7Q2lSr2DrCPsQwU6qlZ%2Fn7MzBqJksjBh7KJWGJCodpzCjxrvOBjqkARsH%2FHhr4q3s0z1fpU5%2BzOXSZ2750wC3XEmE0BgHP%2FtVqSNhPEnAd5RFH2I52k46qSTDPmod8zKQL4IhzkFs09zd9CFWpDKlCHku7U3u1%2B2ugTfT6AF6ViJe3ixi%2FXnqCr8b%2BFJa1FiOVxaimtKGJ9vSOL716POb7BdFT4HkcZPXTSWUj5ZGgNITRerhjFOlKWiQ%2BWLniegUNiIEoJJPUvLqAJJH&X-Amz-Signature=b12b78408654cc828b8f2f635da62e567f7f380917b55f78772a2fd3b2f6ed2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466366WO2LG%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDLGCUWLYCLQzyU5mQhVnEl2qNmvuJ%2Blyksaf03VbN7kgIhAP1hqTkeN23aKUdxK8TCIp7nnKUb1w85MxEkBbw2iH3DKv8DCHcQABoMNjM3NDIzMTgzODA1IgwaKG55uS5HqZyaTQcq3ANntvVoQGPJPcOYvnUD%2FYee%2Fb8fGllLjGAqQ0CijYz8TpWLK%2BIXmw7uNQS03FcfO5duikfwfrZ2EPk3s3JCcXyBxpAEI715FmM%2F7KXSruZgSjJGZDf5%2FcdLxbsHTJ%2FZk4IelOzMnvD%2F6bVh5phACUtal8NYJV7E5sSC7zijE%2FyUg2HyzNVc1AHHjBinY20oClK2WHHHJTrT0D49LM1sh1i5Dl6%2FyCOQUaNUwCkc4QTe%2BSCuztzc1u2voWz1j9a3XvGaDO9XxGVpEbT%2FkOzz3Vq%2FiwhX2Vhhm6h8NgQte59OQzu1pABQAMvlqDL0ZA3mWwZis3O98JLIWif9tF7GmZQTS9Wfky5VWr7ondsn6CWLQAtAzbP6JU7dzB2CVT%2B6bfPBz8LdKnqAHgwxtlEoS3RmRpOlm2LrSRu%2F3nUJa%2FpvY6J0kDEGF4ozpg53BPujb0eXuyWnAUMD%2FBD0f2swqB0dAf5AOgWywMx2KAvWqlIzTQoTvsERpj5v5V0g8SyBVBLALUQjMSU8p4ZecjNtY4y1gGXrHB320JCIqisTfREIRMf88XQKFMqnuGhAT7EMDoIwdH3Vr6f09xWqCLl7Q2lSr2DrCPsQwU6qlZ%2Fn7MzBqJksjBh7KJWGJCodpzCjxrvOBjqkARsH%2FHhr4q3s0z1fpU5%2BzOXSZ2750wC3XEmE0BgHP%2FtVqSNhPEnAd5RFH2I52k46qSTDPmod8zKQL4IhzkFs09zd9CFWpDKlCHku7U3u1%2B2ugTfT6AF6ViJe3ixi%2FXnqCr8b%2BFJa1FiOVxaimtKGJ9vSOL716POb7BdFT4HkcZPXTSWUj5ZGgNITRerhjFOlKWiQ%2BWLniegUNiIEoJJPUvLqAJJH&X-Amz-Signature=b12b78408654cc828b8f2f635da62e567f7f380917b55f78772a2fd3b2f6ed2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYHUGYQE%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T222045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCsLcRPq0q%2BKJovpiMbF2OKaTE0CmakqFcJH6rHV0r8ngIgRPyO5aJUocqYj3c7HbODBZvM8z1LHQTjg4oKgKN%2Fm9Eq%2FwMIdxAAGgw2Mzc0MjMxODM4MDUiDB2KWuC3ecE9fzCCmircA%2BKo0pzG8rlgZE%2FGY6f5OH6GBYbXdbCJkwyi8uadv0mqwyZoAjegksC%2BAgYRWtPJPdkVvd%2BIKMqMoZikMOMHXKsLjtuodiJSQoHLgbG%2FZgmsYK6ym46uiM53ZQIFFqNgxKqGQAT5imyYyW4iesR5Bci2RnzSdRvqYRfjLTOn2kWsGXlON48K24l7SrXJkOvW0lEx2llBVNcBDeyOXf6BuiLYq%2FWbeEB0vRIffZcPwkIuuhs7wLWF%2Ff9mO1q%2BdiwEOj3zWsJfMVQyB95ww2oph%2Bf7Qwn2pLR0orUshzm2q6iFnGIFAEsMPFmtQGF40mZKKSZSJLO4dh31m0SBmZ0KoBvKImw0YjreRaJpDt4jNIgDnvJBPjJJkrQXsQTcLrDC45%2BA8VJpMHiDnOhRoQ3LiKmvQ6OgYV%2FVyMSHx%2Fwq8Zdw3QtYzhTMhnHW6Fk4TtvpSJYGc7%2Fn1JNp3z2LKcd4%2Fd%2BjAajRgiEN9F7Crl2X2V1SJBMCCCa%2BWEIURgX2BKiYT62bahhgjfpoyta9N6pKc76%2BFg4ea97VrG928N6DMJw3K2CHd5vpXr7t2Ogb9Jf6SJZzaojbRFejzfjOCgFr5z6RCX14K9Y3yqwL2W5a4m2eOoTDHg2ttvR9Zw7JMIDGu84GOqUB%2BbBbS43VVJVdKtv1C%2BF3E7kutErRSjSKmxDizkGGcnAmjTkkyzJovtSRs68TNWkbDnHoSunjtz59hdwwQh7jGrrdk30B9KjYzNM%2FLHBaoo40n13PdOS3G8sQQTLamWIjge0Jtorprid82d3UodnlL9hxSsJg2aciL3G3Y6j%2F7YsSbu0XXh3abKtw7wS5pnLmd0xVEl%2Fpk3V37YCkqu%2B7XW%2FgzSfG&X-Amz-Signature=736e8c02d3f9c419014a24d533eb48e9a9398402cc3b05a19fcd2f8c3d6acff6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

