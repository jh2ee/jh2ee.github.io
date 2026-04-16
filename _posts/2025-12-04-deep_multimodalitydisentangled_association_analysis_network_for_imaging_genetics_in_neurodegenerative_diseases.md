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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXD2V3ZT%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICARTLsd7iuuox%2FwmWAUU8993GLxOBR06emJBSwEoV8YAiEAykJ1rQ8t1olbkJg7Fje1ILBwP4uf9452nQ5KafcYQA0qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ9dyo8nwVWjh9RCIyrcA2E8iyJwXbNhwYrwNeAW6nGtVm6EF8uOarRIJPTBu2p1foB%2Btb%2FFk3gzSsL1HeZtiKPmY3O10xlyPW7bTVpcNwzGXCRsND1Yvn4NFMvdn2j18BkV3dYi27XMGoDfxQQ7CTN%2FnBcOXKI34Iml26hgFU2KMwYoeXsQDVrbHQmRvaCCK1LjaWmCbNFKiJQmJhmlpvU1OBmiBmpBUahW8FuNwQBuWnlh1RxWgjjw%2FDwIzgshEBrne3oBciZU1tQ%2BvVPTQf95mEPtZeftIolBz%2BE5AHukHtSUh%2BFlc99oLTgyeDLKTF36J6fEYNhlnnNBvXuh6PnC2tv%2BUMMkAvoabWZIwi1HhwYfGj14xa58ilckLjE%2FHKfyw1Mpr0CD%2FXcXCjUgbIocpcbwLTstJBfWg8jtob7gyFV%2BKwSsVFqNX4sNKBG39VZqN2bfvZ6bkHM1mAwU76GB5tQIeEL9Mgi4w5lfx1j9ypPWLQdgE8pc144%2B20vDseQs2f3vVE1%2BKwJSGZcRwu9rTaFXSHgxrXuKdS7eUKJrnkugcmk1BLZD6QPWn1uQ78kBzRysTwhYyazN1w9CfzHq5YlFUO7hTLg8%2BIQMjUxM%2FtRvhzhQ%2BIh9pW6qL2c8gIAGpZfIBCz7giG5MMPAhc8GOqUBgSq5xzYMIfDEGjullpwNDsu19XRsmy5QDdg3rltcQ%2BRsHpNffxTXK%2FvyyieYv6fbIGKCJygGuryEiPCdgEj4FQGvrqtun%2Bikae8sQe0fNdohjLmgKCtiywBamq4dEU%2BPBKNbJ8k954yyhhdsafZQeD6XJsj4%2FPcJJPPlho0EUNShCPXxuHSioPXfMgrTdgdADlXjpft3R4HBltysA6mzR0dMpH0p&X-Amz-Signature=cf18c775b810b6e9fca2e5ddf58c427f0a99f1f67149f3e4cc29782f2e43c018&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXD2V3ZT%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICARTLsd7iuuox%2FwmWAUU8993GLxOBR06emJBSwEoV8YAiEAykJ1rQ8t1olbkJg7Fje1ILBwP4uf9452nQ5KafcYQA0qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ9dyo8nwVWjh9RCIyrcA2E8iyJwXbNhwYrwNeAW6nGtVm6EF8uOarRIJPTBu2p1foB%2Btb%2FFk3gzSsL1HeZtiKPmY3O10xlyPW7bTVpcNwzGXCRsND1Yvn4NFMvdn2j18BkV3dYi27XMGoDfxQQ7CTN%2FnBcOXKI34Iml26hgFU2KMwYoeXsQDVrbHQmRvaCCK1LjaWmCbNFKiJQmJhmlpvU1OBmiBmpBUahW8FuNwQBuWnlh1RxWgjjw%2FDwIzgshEBrne3oBciZU1tQ%2BvVPTQf95mEPtZeftIolBz%2BE5AHukHtSUh%2BFlc99oLTgyeDLKTF36J6fEYNhlnnNBvXuh6PnC2tv%2BUMMkAvoabWZIwi1HhwYfGj14xa58ilckLjE%2FHKfyw1Mpr0CD%2FXcXCjUgbIocpcbwLTstJBfWg8jtob7gyFV%2BKwSsVFqNX4sNKBG39VZqN2bfvZ6bkHM1mAwU76GB5tQIeEL9Mgi4w5lfx1j9ypPWLQdgE8pc144%2B20vDseQs2f3vVE1%2BKwJSGZcRwu9rTaFXSHgxrXuKdS7eUKJrnkugcmk1BLZD6QPWn1uQ78kBzRysTwhYyazN1w9CfzHq5YlFUO7hTLg8%2BIQMjUxM%2FtRvhzhQ%2BIh9pW6qL2c8gIAGpZfIBCz7giG5MMPAhc8GOqUBgSq5xzYMIfDEGjullpwNDsu19XRsmy5QDdg3rltcQ%2BRsHpNffxTXK%2FvyyieYv6fbIGKCJygGuryEiPCdgEj4FQGvrqtun%2Bikae8sQe0fNdohjLmgKCtiywBamq4dEU%2BPBKNbJ8k954yyhhdsafZQeD6XJsj4%2FPcJJPPlho0EUNShCPXxuHSioPXfMgrTdgdADlXjpft3R4HBltysA6mzR0dMpH0p&X-Amz-Signature=cf18c775b810b6e9fca2e5ddf58c427f0a99f1f67149f3e4cc29782f2e43c018&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNISFYJT%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAhC8Vc8g8qpKNeLb1oyWbUSTBkyF76H3kcePrMNAIM%2BAiEAr%2FQhUfOfwdnMyNKoCOnx14HQF9yhU4jevsEmuHmJ7cYqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP6ttEL%2FAQEJJ6IqxSrcAyn4JxpC95RA3Z8IvIzEaiIV5YWBFpRKxUSoS%2Fg0svUwDJm7LbYZDkv4TEZMT85bVpV6yExTR88HUnsjy2e%2B7V6v7kh%2F%2BRyd4MPNqxqyxAHCqALBAN7UNcjc3XRjZTPztEzBIRZ%2Bcs6mtMKJ6qRBAwm0cC9RdJMUIDGgs6ITDn26HkXzLDHtzFcstv6TSB22JF3QSQchyh3NLvCijPSoxunXIw5vabvqlwS7eTBM1v%2BVvvw2XK3Uz6insFTJlr2t32Fts%2FM7lBtVwjcwTiyB%2FgSOfjaalVk%2FrZsd9X%2BT8D46kJ8NIk0q2JaFHi0lBudbPUhmlMexhnqpSe4E1MqVAaPLtKFnyHmYRhUvweiExs%2BeCpvsVIZ8MaZNuWre%2Bn9q4r8XmeXY34MVfMTjY2lBB6Key9YeNf8d6asVn500X1r%2F3rT4MZql08znDjqqFAwlKJO3fmqvjbAYdmehoxNrxvebLaAT%2F4W2dVEZphm2Ii6Hm3TpMVYGFJwNd%2F8h6656MdFNoIYXArTtaGqm8XpxahYPyUJOLx55qxFvHo0LjS1Mx8D%2FZTmQSqr14g46BdApfW30a9epNpSt6FQvSqQP7bXLMiVonrHRf0bAl4LqaUrnWbgldwU%2F6JPnIecoMOzAhc8GOqUBbsryzgDmU%2BH5a8fwGmC4wXDl1%2FlCJn%2B%2BXob%2Ff%2BZ69BFq1aE%2BjtYmxhQIhzSaKwMh%2FBf%2Fx%2BXKNUOFp0cKUkI6uSkKv8DYFljIIIEDH6Zyhk%2BYTU0o4TIRNOahl3kTFm9nXiAqF%2BtgW2NDMO0QAlQC7HX9Mei2mTc3jLYRX4xPb4Yh1NFJB%2BxHqkzCXwFjKYJzRYoD9KdG4%2BPmUp6jl%2B3GADUV8u0F&X-Amz-Signature=c5a6f19c9bc7d624b53d4696e6d3e4ffd8f5649b16c9be3227f99f69aafb5e23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3LVHHEM%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0FBLaqxDO66I9xWfaGCMgcVjaLJHTZtU%2Fj9IhuzzOwgIgfGFePcc69p3hWkmEIVWzEh7NGxLVgovrahKkmDqtRM4qiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJwMTVXIp74fVCPsXCrcA5TBmNyfo1cW6xSCfv4gZE9bzStmz0IDMRceaAm9L%2ByG%2BxpkVIan4pKekXFoqcZ2gmcS%2FCtkjUNxepOSxj8xas1afy138YvQ5l97UmJ6nH6fa%2FhLNdA0K9pAeMHhazYQ8J%2FBW675J2ic%2BwZaK8NBMY6HrThhcyTCY0DTZaRuL7o1TU0zNR7iDM478UZ46Rlp6vBtCA%2B1Y35GRwtCSuIDhcQOZ4LYWc8UrRB2h5IpDU01eQdPQ263uVSx224Tl57ksLHY0Qm6nY0zJ0Ybc9FF6dapt1Tq19RgNjM4kK8kvhr4DsuXtsIQSNrsRB4s9lAzhCOgI7%2FtjRHNrg8Np6Z7aGYLdHuDvdnpoVJ3mlE%2FHDAQe0q8VnY9fyVcD0UP%2FjsHPtS7lwROB8RgvumXv1PCK3G69oOB7nFR3qK0jAQVLeRrr8YjkHo%2BhqUxfOgzsQEv3CNApD3RpcIhhCRIToo%2BMSpIrm8jcqmdvokuQQsZojBGNBIfEOkwlkc53Gd9fIMekdAUJPC%2FtmA6RfB62446CimEEKJ3hCG87VCnkuYI%2Bta9PEx1a6X%2BxJNCA6flugohlTfJsvpFROTyGpFLPKCFGxCZOF9jTMxOY21Vq%2FNa0UFTBeQjiLV6jdsBVWZPMKDChc8GOqUBu%2BXJL5iH48NGqDEYwk8zj2vL6A3WXTEqtvRnXIJVviCMpsX6vAKiRAhqI%2BPxVSw%2BrUBEnkDpj8Xh1BqyV8yyepOlGq2nzBl2e89azE8azpF25bp9Jv9ObDlePHN9cNsmOzLRLdX8G7pVQ%2FLoo086G84l853TH7LLTSMPgAl2kn%2BO1hXH9SlS%2F7UcTj52BdKWlamaOZ3gqqnptaIrSVtbzDCQ3zH7&X-Amz-Signature=7036483054cdf052565e6e4bd9589b06b9071d3b87218f002d5451ea05c9ca7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3LVHHEM%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD0FBLaqxDO66I9xWfaGCMgcVjaLJHTZtU%2Fj9IhuzzOwgIgfGFePcc69p3hWkmEIVWzEh7NGxLVgovrahKkmDqtRM4qiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJwMTVXIp74fVCPsXCrcA5TBmNyfo1cW6xSCfv4gZE9bzStmz0IDMRceaAm9L%2ByG%2BxpkVIan4pKekXFoqcZ2gmcS%2FCtkjUNxepOSxj8xas1afy138YvQ5l97UmJ6nH6fa%2FhLNdA0K9pAeMHhazYQ8J%2FBW675J2ic%2BwZaK8NBMY6HrThhcyTCY0DTZaRuL7o1TU0zNR7iDM478UZ46Rlp6vBtCA%2B1Y35GRwtCSuIDhcQOZ4LYWc8UrRB2h5IpDU01eQdPQ263uVSx224Tl57ksLHY0Qm6nY0zJ0Ybc9FF6dapt1Tq19RgNjM4kK8kvhr4DsuXtsIQSNrsRB4s9lAzhCOgI7%2FtjRHNrg8Np6Z7aGYLdHuDvdnpoVJ3mlE%2FHDAQe0q8VnY9fyVcD0UP%2FjsHPtS7lwROB8RgvumXv1PCK3G69oOB7nFR3qK0jAQVLeRrr8YjkHo%2BhqUxfOgzsQEv3CNApD3RpcIhhCRIToo%2BMSpIrm8jcqmdvokuQQsZojBGNBIfEOkwlkc53Gd9fIMekdAUJPC%2FtmA6RfB62446CimEEKJ3hCG87VCnkuYI%2Bta9PEx1a6X%2BxJNCA6flugohlTfJsvpFROTyGpFLPKCFGxCZOF9jTMxOY21Vq%2FNa0UFTBeQjiLV6jdsBVWZPMKDChc8GOqUBu%2BXJL5iH48NGqDEYwk8zj2vL6A3WXTEqtvRnXIJVviCMpsX6vAKiRAhqI%2BPxVSw%2BrUBEnkDpj8Xh1BqyV8yyepOlGq2nzBl2e89azE8azpF25bp9Jv9ObDlePHN9cNsmOzLRLdX8G7pVQ%2FLoo086G84l853TH7LLTSMPgAl2kn%2BO1hXH9SlS%2F7UcTj52BdKWlamaOZ3gqqnptaIrSVtbzDCQ3zH7&X-Amz-Signature=51a0b67b9ce475b0d0c8aa2ccf0679f84e663abd65576d7a3ae30d8a18612dd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663E6IMPWI%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDXcBwBIbbyddwflFbj3677J%2F5zH8q2q26y2503RChfqgIhAICwqVQmqK1Ov55S8Bz8iMrPSeLuGnowj2DWu6a%2FY2cjKogECMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxv2OhoZeyEShBCvn8q3AO06em9NrM2y5ug3rRGQzYtz81ClKiO3IOa%2FO%2FOpBUd96ney%2BUNSPo14n1ybj98T6ROKnVOb72qcfJvxRd33SNGxtWysdWIUYlb1WTz17mKApij8mrWYE1L4i0SgpWsy9ccm9%2BjJPF2ZRD1e2uCiDr4p%2BH%2FwnoypaQ0FaItM2iX8owN%2FNI7%2BgtbVwSCFOIPDb4GqtD%2FN2%2Bq25V3h8IaCYACcyAHi8n%2FZjdoCYCDmW7aKCOHBgI%2FyMJ%2FgBB3%2FJzrI1jdPnN0hcnQL4PVTntsCn9pFuQg3IZppfLYQZJlAMFEdKMAyuJXiR5R%2FdmCOJpRzSJczWj8CRMUy8lmhtfcfk%2FLeIsCbKBjTn5T9%2BOaCHK%2Bgf6MgWXr1Aj9qG9t8wYViLPS3XR77I4uEqSWe3T4C%2Bti9vAWG%2F2ja1F96mvfcaltauTQM7MfGV1eDZD3a8iBEAJ039IhuJ6tpHDxpu7kCp5bJW8W6St9AOHWuHGREiEY%2FjXRzSqnTT6ECc6YgJ4ZcHQmY%2Ft38RlwovIoMD%2B0LMp%2B1WIyUsO%2Fa%2B4rnHIlTXabizCV9hYs8yUDaZtVa0iGpntclKpd4WoMD7ohWhC2LORSSR3UpY4m%2FyyXcCcBIM7PJCAv1T%2FgLjRF2iRc8TDJ%2BITPBjqkAQ8%2FFW6vrWzfrDkfVP0t6%2FwTL%2Fs2S4U4vyClyuPUqpThcDYkHIpJirfkpqJ7Uycaj1QKjfib5QXWO99pHuk1t3dh2s%2FmaZj4wZ3NOW3PX%2FZ5vG0BbsfNrNt9WfOtLtNHDx5jYFvWJhCzoOnQak1Ignb2eTcFjuvdDqNrTNVUHt07%2BEn6WWZrzWmJDoF1%2BzNG%2FUo7uH%2FnwjyDX3PKjUMUKMHkdOYe&X-Amz-Signature=a15b17696ef4d9d22c1bcf60f581926e7ee11941710fd02a76edbd4aaebd3d6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFLEHGX6%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICFWtIfpkIWgLour%2FnZol%2BFE4MKM4ZNj%2BCNJStpWZWvlAiEAsNnMmrQTod21IaQau9tzRd4DKxXN4hwmPCMEj01fpqsqiAQIyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEKQt7IFICHLyATUFircAzgL8VHSQrvsUS9Piad33ZeE0Oao38Nf4ysNPBHZ91%2BigXZ6qC2ixB4iwNzDBjNqn%2Bzg6Uf1HHcK2J0h9UXvqRrpIYEmIQaKZ8WNzIUl3cra5YZUQiv1ISq17wfkIW%2FPy7jJwzDmHAbtKHRx54ILy6UHCXpgZ6xtBxreID8pSDfhzwkxjtCa1g5MhwtHtIjp4FXPCqIA%2BCllOVi6QfyiuoFbWjm4aXnE%2BWqs18e10CGpj6owNeAe7R8CChYmRpyX4mig6T2r01C7GBejExiJ4KQ2J7YkUNP%2F5hU61D1Fmx1imbv4PUUx0dpt3hKHLY5JUzVHJKscKpYZX%2FVhZmNPPXstZ7aGyd8n14a758uoXloFSXFhDguNACrK70gg3NA2aJtr8UnEKgfAJBRO7N%2B6dGN2QvyEpHBWv7Y5KwHdbvBi%2BVXBb5VQ8AuavalkOoLPHCDe6gH617MFjrSFmq%2FV3n0nTZYhrRnD6Cd94EzmWb1Qnrdz%2FC6mAaRlxG%2FWFX03zX%2BqgFivpghVMWSf32Isk1Mjpk5OktRvSuy3Ru%2BtJG8Io%2BQCYWebc6JnLTrWhY0kFPPIY0TEljpP96gO2%2BQ7y%2BWgtO9Up0mVZzRXg08QUwLxS0sqgDAxxwDagWfBMKDChc8GOqUBbWYic1i1V7bafmeySuQPigtFVLsw5160frGH4s5wvCmJ25GuAtzxAuOeJLE%2B%2Fr7C3%2Fjtr3%2FW0cNfettxvcvalkfj%2BOwDhMVdTa4VONm0%2BZqXRgZK3B0Gty1tidfeu7b7cbw7vGu%2Bnw2aFtgqfWO%2Fwa96uKkyRT7%2B6maZSuVQLO%2B5I%2FioMoHeBDUaN1gWajFHjEgghmdxSE%2BMo3tZWN2Aoa87alQN&X-Amz-Signature=6f8134cf7f79de01e3f03cd1dcb2874fcb267e5f9b148b003b2db58cd30f56d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YS5KEFD5%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICo12ngATp1meqqnfPbtqjxAZqL%2FPlCJNURSz6zeER%2BpAiEAi5Qlyg8zc3%2B7icP9vA1oEuoNm5wQRERHiA1oQuC4MO8qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJrQCbJrMopueprcuCrcAwaIWkYB0e6mPBA9B06tBotIHQ9tC7HH7%2BQqutzixTWp%2FO7nn%2FZZcAETpd3HaGBZp9UKFceQVmSQQXpOLI8%2B%2FP6BL5vrNly3fANpWflOhzx72trPtXM%2BrRzQsTNFvAXFa82xzSQX%2FQrwJI1ZpN2hMuZO08ojKF4zRXgZcEYjx14cM3vYJ0xFNmlTKJq%2FVTBAuInPm17zg6BUeywztf%2BWJ7r196ALAA4ABZ2yPe9xGhBSn1wrOTNm4BdfPNxTDtHxbmt6QLkfJcNhRyQRFnULGqr5rfEUl7rS%2BF9yupe05cuhAqstj0kKJZXjkf1CHDjCs1ESUa2K2%2Fuh%2Bjs%2F1%2FUtEvbtFx28bDfSzE8Vb8bjsE7Es0mVVaCaEbN4AyOOOWxz6re5vJsrlZbDb2tCccGcLdGL0NeEmTO%2BcmNlUt4jyRcp7Sbi2fLh3kjUOhwTj8DoMn9fswxrdxlxLbH5ahC117m1usM2Gd0hTAfsGJYJr4jiueMZ5Xy4fJcV8xO2gAB6xSQ4o40jpkFpvWBZQaTPNYSoszR4SoJmU8ES%2BBGykb6CitsbpcvvKhLFOOq2d1l8A68QtH6D64Q936SSA9KVu8cju9nwcUz4wwCAPh3t%2B60438Q2OcSK1Rvt7VBLMLLAhc8GOqUBsJP1Q9Aw%2BpmJc44%2Fu8HczjiI4ymdyjE6zFVTj%2Fde6%2B84olZwt4yctzt%2BvZZ8m0Rl1t4gVzhMXNczCdGcBMuGCQRCT8ViFlLY31UGbqZDx8S74cPWT5UUR7iC0E11Nf5u1nwqUkqZZ%2FA7a2QyYhpXyhGpngZ%2F7rGxDgkwfgEhga3drBPrLeLGeZHfaWJFtoroATjv3z3QVVkj8qzd2hZcBLu4J13Y&X-Amz-Signature=b7d9550f87e645244109f93f0a5d99a20cc74064044260f6f3eb4eed554d57c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZH6U2CA%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAKrTLZO5SThRFAV%2FDMob6FT4qzPuHk2kmO8mKfXLFMuAiBMFFCe3MGNvOZH4f21R9NBwE5%2FDPBMwnp8k9eVLGflgiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMj%2FXvpmFNRHiTpm0AKtwD8RZluqujHIR7OBFwEgcZKAIL707XWwwLjSbobjsp2R%2BSILKIcgngxDNGb5sM2w8BpsurKuhAICxAXl9AI06m%2FN6ngXbR7ACCQgWiuzHVwsIbuPYAHc7aVo%2BFZMDeShtqhGNZ63zDU%2Bv71DhXJP%2B4pqWdVJVBlZOyfY5mWrHuIP8VwkQMBWuHlZN%2Fb2XjQliFsaW%2FCZv%2F1I3Yj3ZnW5qRcbZRSCqdl5SUU1E91yvXbzgvHhjrSXTqrzKPLQ76dSgYMzy2boGgkuAERf%2FGda8S46ow%2FXJ5q8Dx8NBjE3ivfA0k3ZZ6ZRXZJVoKMMc56jcSZHKFbURfHcMMnzrctizroqoK%2BX8ZMyc6R3aIadlZxm6YlAszGkq0CVyyGu3A5dqr6FknmRcs%2FYqIl8KspWrUfrqzf2lbUsGu6EZgXWfCoclDg17zUxXfKxpVjJcO1uFjRsN%2Bb1ZiYXeZFOZvoGIngS34elOQVgHLyFCSPGt%2Fw7tex9hkVtkEmmVXUnGASpe4ECuNKfjeNc2HG%2FzMo7WfhjbtDMT9A1h59T5m3NP45gv9SOirrJGqxUcr6XOMtoaCaod1wkF6KCO0A08on7mOPz1RMymvxJ1bxL3cWs2RhPX4Kr9xzyWEu50BGw0wmMCFzwY6pgGf%2FqrQ7m8nT6pkst4%2BI1%2FaJIFVOIkrb%2FZMWMm8hBQvyVWTOQdp3gybJGyV2z7sGS6YMbi0n3olnr6leOvQCnlLEuTLq9l90lxbj9wgAgeZHIyOcIcb8PPR0UAJ2HCeFONYDvMQ3tPg11v%2F%2FA3tNiSPJn7%2FHsU210opTDfYmFnk6IMOp87LICGkFwKVXLd5W91v3S0QaQhzg%2BZcLOk2bppcvbbrTWTs&X-Amz-Signature=85dbc52aec50d0efb6cac54066cd029c322c4f1b608deb32a7d5bac6e0608a53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZH6U2CA%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAKrTLZO5SThRFAV%2FDMob6FT4qzPuHk2kmO8mKfXLFMuAiBMFFCe3MGNvOZH4f21R9NBwE5%2FDPBMwnp8k9eVLGflgiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMj%2FXvpmFNRHiTpm0AKtwD8RZluqujHIR7OBFwEgcZKAIL707XWwwLjSbobjsp2R%2BSILKIcgngxDNGb5sM2w8BpsurKuhAICxAXl9AI06m%2FN6ngXbR7ACCQgWiuzHVwsIbuPYAHc7aVo%2BFZMDeShtqhGNZ63zDU%2Bv71DhXJP%2B4pqWdVJVBlZOyfY5mWrHuIP8VwkQMBWuHlZN%2Fb2XjQliFsaW%2FCZv%2F1I3Yj3ZnW5qRcbZRSCqdl5SUU1E91yvXbzgvHhjrSXTqrzKPLQ76dSgYMzy2boGgkuAERf%2FGda8S46ow%2FXJ5q8Dx8NBjE3ivfA0k3ZZ6ZRXZJVoKMMc56jcSZHKFbURfHcMMnzrctizroqoK%2BX8ZMyc6R3aIadlZxm6YlAszGkq0CVyyGu3A5dqr6FknmRcs%2FYqIl8KspWrUfrqzf2lbUsGu6EZgXWfCoclDg17zUxXfKxpVjJcO1uFjRsN%2Bb1ZiYXeZFOZvoGIngS34elOQVgHLyFCSPGt%2Fw7tex9hkVtkEmmVXUnGASpe4ECuNKfjeNc2HG%2FzMo7WfhjbtDMT9A1h59T5m3NP45gv9SOirrJGqxUcr6XOMtoaCaod1wkF6KCO0A08on7mOPz1RMymvxJ1bxL3cWs2RhPX4Kr9xzyWEu50BGw0wmMCFzwY6pgGf%2FqrQ7m8nT6pkst4%2BI1%2FaJIFVOIkrb%2FZMWMm8hBQvyVWTOQdp3gybJGyV2z7sGS6YMbi0n3olnr6leOvQCnlLEuTLq9l90lxbj9wgAgeZHIyOcIcb8PPR0UAJ2HCeFONYDvMQ3tPg11v%2F%2FA3tNiSPJn7%2FHsU210opTDfYmFnk6IMOp87LICGkFwKVXLd5W91v3S0QaQhzg%2BZcLOk2bppcvbbrTWTs&X-Amz-Signature=b922cc705c0e65b4ecc60e07d5e03e15646aa7a4510180cdf3aa32348f9bcc4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I5ROFRH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCndA%2BQiAtwuef5wOx%2Bmpl7x3FjMJTckrkFhhVpSZlk1QIgMqB69%2FB29PULlopmA0a3PAybfuZ0k7x0K2sCsSQcLHQqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLUknESfCDsLIIczYyrcAxfjuINdORJ0HftnQ4ugtrCxxmd3R0nvqF5X6Fq2Xc%2Fdu0mxCfT%2BWFJgWknFUg900kosfxSqydM5QEqvNm3oyFs6rqupe92RYxUQWi7FcKwi%2Bc1b6BVwjpTiALxWybyaFQ20aW05Nce7wilYB4jwfNRK5oTffgBkQBroQbZokBMJ%2BOKoTfEEvyuYUJxvnQ99cf5ZjQOKjuD5vGq1ASnAHcv8X9IP3qXp43H0A6CvtTkJZsjMeCmHtM1zzJxOajx3nNDp1YiqYbvP%2F%2BEOLLVKpmFbXn8pBVhcNv8N7DjbocnZRPQtLd%2FH0OeAqL8Ct7tw3n5rLG5xhHhZ4rsZNyoUQW%2BsLRWsx6DugUZ%2Flnz%2BgJQpfsbowsLHw7hDdTOOe86BT2chIQ3x%2BoQXMnZm36LsOqa0h%2F4GyK%2BgCoozcuaLltyCfFzhZLGelOCwHenCP25xiBEQZrotqS%2F%2F9xaVk0lcBxk2MbSeWWXr3nO81TtZA74J9gN2viuFsVjsAaYGO9Ojo9LnBAUJqq4RWseCZ4kXqJP7GqWqxGuAZd28AOoh3RjhCjgt1l0H%2FtE1U1FEYOKOmXsp%2FbfwjXELUYuO5vkHVnSXUc%2FIE5%2FqkOxpV2FWRMyV8QQuPbwlTmpkHg48MNz4hM8GOqUBlbBGlGCZ1hJPWRVIFbsPvDW8ez9zmgYlgU%2BVzniXxsNLLS97y2JNWUGyXQiEFhPU88SjHcV4G9%2F%2FC0YfmDiCtjB793zR0aGD3v3lU3NNqYYepx7%2FzOc2F2r6GjExvVVwrM7zdv%2Fv0y9GLCsCZIdDUMXA21lKlt8ZDi6wAOuI762AKV7QbDOp%2FAxTDBZAGAsKvpFNIf5OKNU470n5ZIxlA59PGK%2BF&X-Amz-Signature=80e42ff954ddfb8f543a38a43a7f1c1efeef02199e7ab94d16ddc147190aa059&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHOZXPUH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRAhQlNk0AJhN3eK6Em4iKPOzczAfkMpQIOeW%2F1FjZrwIhAODYLd5oNOdaxowdyt81JETURpVKWQUUrRkQJlxNrSeDKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz8cgRIpYyHmQtFibwq3AOLb1%2BJTwJ81IkNg%2BGyokKJintjLNJp1sK9WWPtRaKkthEn2DWuo8%2FCGw6Ixr%2B6Q7g7XEPsFSOj%2FHsLvXJZfBmGw0CY68XaqKMxVOhIojw8gNPjkxkrgm6tciYJyCWX6R32RymuAJ1RzmDWJ%2BWXWqpD1O0DqBtpjgXu8k43t1YS86JLS5LTSuH8Ti9fYb8acEdyBXmOcN0elu6AXJwXvNkFNf4cLvzC64Fp8loQvBz6a3pNrEP4EWROUxCkiMT7U07%2B%2Fi%2BaoWCTbQ6bH5mQqkehoUeN6xLo2pA8WTt308bh9xYKxrLq1Ghvby0yLDKaWWwF%2BIXAbIynnH9lAelPndduB9g7fBzrA7k4XMXAO%2FJUZy7d%2BeeV688pdK98kC%2FU2taTogNsBFzY4tgdu7eHAJNE2meZEb3O8ZZzDc8j6oSd2RmussTP8dIv4PCTo%2FkwCEd22j3WJmRxcf9uXerU8N52zqMx4dcQVZaXnN%2BGDk4kgNA4cFCmC%2By3Qd4TiIOucFI3u%2FefyZSAkeUlXoqAtBve9CU8ieXT%2Bo%2BRyH88NpOS6uzb%2BczcwRQmoDRukUCMNgXkzdg9psL2cSS1n3ZqgKnQKrcK%2BJLAbx8j67dvlYHTJvt24Ez1ezp%2FIK%2F4lTC5woXPBjqkAZKczHj8We%2FzU%2FASZ4qhWoa5qDu1sCxd59FjFwl33qoHpt8ksHCk%2BBm44fgILhNi4gpos7UwWkmLC3EnKRbaY7pNseqWh6MuWp6G%2F7PMLoUnqmKPM4bUXvc3vePxUSoHLJQB2myaCrC8Q6tC9pQi3LWaR4pGj1tDNoZdfvK%2BnQWtdtCm2dpaJ1memxp18UvKy8eh3UKS25R9TywmB0t0gUHpRtqV&X-Amz-Signature=45ad70ae71b1d5661cc1cbaa05d77d506b1262c0dc2bd5352f32a1228b656811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHOZXPUH%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRAhQlNk0AJhN3eK6Em4iKPOzczAfkMpQIOeW%2F1FjZrwIhAODYLd5oNOdaxowdyt81JETURpVKWQUUrRkQJlxNrSeDKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz8cgRIpYyHmQtFibwq3AOLb1%2BJTwJ81IkNg%2BGyokKJintjLNJp1sK9WWPtRaKkthEn2DWuo8%2FCGw6Ixr%2B6Q7g7XEPsFSOj%2FHsLvXJZfBmGw0CY68XaqKMxVOhIojw8gNPjkxkrgm6tciYJyCWX6R32RymuAJ1RzmDWJ%2BWXWqpD1O0DqBtpjgXu8k43t1YS86JLS5LTSuH8Ti9fYb8acEdyBXmOcN0elu6AXJwXvNkFNf4cLvzC64Fp8loQvBz6a3pNrEP4EWROUxCkiMT7U07%2B%2Fi%2BaoWCTbQ6bH5mQqkehoUeN6xLo2pA8WTt308bh9xYKxrLq1Ghvby0yLDKaWWwF%2BIXAbIynnH9lAelPndduB9g7fBzrA7k4XMXAO%2FJUZy7d%2BeeV688pdK98kC%2FU2taTogNsBFzY4tgdu7eHAJNE2meZEb3O8ZZzDc8j6oSd2RmussTP8dIv4PCTo%2FkwCEd22j3WJmRxcf9uXerU8N52zqMx4dcQVZaXnN%2BGDk4kgNA4cFCmC%2By3Qd4TiIOucFI3u%2FefyZSAkeUlXoqAtBve9CU8ieXT%2Bo%2BRyH88NpOS6uzb%2BczcwRQmoDRukUCMNgXkzdg9psL2cSS1n3ZqgKnQKrcK%2BJLAbx8j67dvlYHTJvt24Ez1ezp%2FIK%2F4lTC5woXPBjqkAZKczHj8We%2FzU%2FASZ4qhWoa5qDu1sCxd59FjFwl33qoHpt8ksHCk%2BBm44fgILhNi4gpos7UwWkmLC3EnKRbaY7pNseqWh6MuWp6G%2F7PMLoUnqmKPM4bUXvc3vePxUSoHLJQB2myaCrC8Q6tC9pQi3LWaR4pGj1tDNoZdfvK%2BnQWtdtCm2dpaJ1memxp18UvKy8eh3UKS25R9TywmB0t0gUHpRtqV&X-Amz-Signature=45ad70ae71b1d5661cc1cbaa05d77d506b1262c0dc2bd5352f32a1228b656811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDA2WN4J%2F20260416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260416T222612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwggW9LQBlmNaxDmBmCRpHTRC6ecRjyuW4G49Sij4%2FPgIgH3PDCYrPlzmksf7T6ZxZpJbJEhLz5fW0wmvyuTqpmDoqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHTLEpUFaBkMwdHxrircA1XzWSrgKjyKwyIOwdoGQ2P6TnUfPi8WcgWCNQNXN6BZ%2BScUd610dF4EsSSl7JWCw3%2BFhJ%2BHQn3QBsZe%2BXmeIm6edoxqV1Ze8VnlaSGka9KG%2B4HnDnjTx%2F1Bm0upQdOJ9b51Mob2Tq%2Bhtgtq0WNNwrm%2F%2Bf4YokmWYQ4kki4xmHUYhwHrsOpjGibsPulS3UXCbq1jASQwyM00mzEZlHWA67cwOkjxoZb0BC6DpeS32ImGdvU2lQ5Hlt18xDX59H4rnIY7YEoolQRwO8fGXjklIroXiO0Q1R2T2bC6tsUk3OPQMKsbteTprXTB19iWLQqOrdJzC8WgvpmPUFUAUC1Omp%2Bik%2F8oZa1vuFVB0JQCRr4WAH3H8qBRnbbEgmctOq9nq52lLdIBJRQnIcQSwj2evV6tw%2Bc3dRJ2ojoM2NjmQrotPcyaJvjU5VBzn1vX3w851zKbp84hxl3wtY7InuB%2BXk2zGgo%2F2P5yC1SkIJ%2BgdodqEKuCn9p9A1AAKOvQELA24eA%2BwfmVyrGyerSqwp7udS8PWKSkOqv8BikyobLlUHfOLDpCVwSprIQwjFvKg21uIOCx73TR11mIkUAyPq8M6KHmdlcbItHGgm56RKqeoFPR%2BY5irD%2BEVLJoUcblMPzChc8GOqUBWa0un8k1Nk6BiD7vyKVpEpv3ceT7dqF8GjCppJymy33rj0HdP%2FdekOdV9lVn4Nr%2FONj%2BOC7DgZHmuMpIDmqieXzvEh2wYwrbAa%2BKsWb533e66XmMiQNkqF%2FIQZfSVW9wHOFrzNegNjqqBwJGyUsHEfX%2FU2qUOAnHoseZ2QfBTXtC%2FW2K9BixskzfhoClrZnAol%2Bj63oNj673x7%2BMUtm7ZjKlVXKc&X-Amz-Signature=be71f4197b7774208a961068f86fffb27cbbbe97e2541dfb2b09f246212cd544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

