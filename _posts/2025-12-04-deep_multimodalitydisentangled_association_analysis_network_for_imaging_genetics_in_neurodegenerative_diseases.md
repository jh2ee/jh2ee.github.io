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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7BJN6JY%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDHe%2F%2FsBEh8BiCnTK0Rdr%2FS0pZ7IX0r%2BqeG8Ra%2BfzcpIgIhAPbaglvqenWHJ1jaHRdF%2BnIRwqwFImG17mxMJXMMPwyFKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2FXwdkowFjWXQWY2kq3AM1%2BevxcHRfgThIhaXVFaImFt%2BhN%2F7VoiyJxtAbve9Gf4MyNzCyUM%2FnHu%2FTSykRRo2BKzkHsHQaKKJdNgliAKzIuqWyeYSXwPuFsRwYDiwgEaWnLh17cjOpj1vHQ5O%2Fw852a4iOf3VnnYJOWjXdiDCRy3HprBNlOKUiMjotmtApol6RdmfjcHPH88K1CUt8nzChUIThd7JxJ%2BLJekZDv1uuwvOFKtErhqlZj3B4nhHJGW2BHAZvzY%2FpeiJBfBL2rNtArr8Txf%2B0XXfB0fsFB30tYDcwuDuE57pJjGnFmV%2FSP9wjYayBFDx8KnbYpQYPVv08NrgMeQyDKCPAGPoaokwUV7FmfOd152Ww4AOjWVtgcX3TgcVw7ZuBiFACDSYqVjX5utuE9k4fizlD34U3An%2BIB%2FNh7ZJGDPx1kYpKlq6PINV6jeA3w6mcREPQn%2Bz91VcvIzHwNpuLfXb3PxBja4QzettVxpJUHhDc84HCojQEHgbSShi%2FUOKloocWoS73FAjTAnwYak5WdPTrRUeIueVIu0WSUptHmkEwATuoQdPSf6RyAfN2Mdiz9%2FQAqXlCLFq8HnlDMnlPi%2FHFWeMOkC0aqd6%2FH9gZPDcnE%2FV2lJy6qaB32szwq4fnkl1T9zDCufDMBjqkAXTBb0SSjaU8%2FQIDYm78dqcRraJpaM1eXr%2Fj8xBIljz0SRdp2isBSGm62p27e5boqMoyijgTXhoHg9iTGKAdrNvTGYCJxMwWxFAW4NnlP14tI6vioQ5P0Jdqv2hCVpU2LBh2ZnSI%2BmjMAPttMkuTIygLXy5wuxFlL7k8s8RnRICVS39%2BFCcFxfuL3fD%2BkJQZ513zyEQ2FBBJ9RehutJPz4DzATlX&X-Amz-Signature=f0b4866018a193cf6e33e9f4ceadbabaf4ffe4c249b4b44345029c7f64f1997a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7BJN6JY%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDHe%2F%2FsBEh8BiCnTK0Rdr%2FS0pZ7IX0r%2BqeG8Ra%2BfzcpIgIhAPbaglvqenWHJ1jaHRdF%2BnIRwqwFImG17mxMJXMMPwyFKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx%2FXwdkowFjWXQWY2kq3AM1%2BevxcHRfgThIhaXVFaImFt%2BhN%2F7VoiyJxtAbve9Gf4MyNzCyUM%2FnHu%2FTSykRRo2BKzkHsHQaKKJdNgliAKzIuqWyeYSXwPuFsRwYDiwgEaWnLh17cjOpj1vHQ5O%2Fw852a4iOf3VnnYJOWjXdiDCRy3HprBNlOKUiMjotmtApol6RdmfjcHPH88K1CUt8nzChUIThd7JxJ%2BLJekZDv1uuwvOFKtErhqlZj3B4nhHJGW2BHAZvzY%2FpeiJBfBL2rNtArr8Txf%2B0XXfB0fsFB30tYDcwuDuE57pJjGnFmV%2FSP9wjYayBFDx8KnbYpQYPVv08NrgMeQyDKCPAGPoaokwUV7FmfOd152Ww4AOjWVtgcX3TgcVw7ZuBiFACDSYqVjX5utuE9k4fizlD34U3An%2BIB%2FNh7ZJGDPx1kYpKlq6PINV6jeA3w6mcREPQn%2Bz91VcvIzHwNpuLfXb3PxBja4QzettVxpJUHhDc84HCojQEHgbSShi%2FUOKloocWoS73FAjTAnwYak5WdPTrRUeIueVIu0WSUptHmkEwATuoQdPSf6RyAfN2Mdiz9%2FQAqXlCLFq8HnlDMnlPi%2FHFWeMOkC0aqd6%2FH9gZPDcnE%2FV2lJy6qaB32szwq4fnkl1T9zDCufDMBjqkAXTBb0SSjaU8%2FQIDYm78dqcRraJpaM1eXr%2Fj8xBIljz0SRdp2isBSGm62p27e5boqMoyijgTXhoHg9iTGKAdrNvTGYCJxMwWxFAW4NnlP14tI6vioQ5P0Jdqv2hCVpU2LBh2ZnSI%2BmjMAPttMkuTIygLXy5wuxFlL7k8s8RnRICVS39%2BFCcFxfuL3fD%2BkJQZ513zyEQ2FBBJ9RehutJPz4DzATlX&X-Amz-Signature=f0b4866018a193cf6e33e9f4ceadbabaf4ffe4c249b4b44345029c7f64f1997a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSB4N7OY%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIBNzomADigjOwd34Q6q9VByTkAendCamVDq1sWaz9309AiAJ5hLkq%2FhyrRV3gfoU4riHiF5GnPnjfBvIcUZSIWm7CiqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNEcWIMfY7wK2gvM1KtwDWl9tAcglkcJJDXa0RKbCNsCeKKbHNJ8BbPTDr25VRYdJHnizwaEehUH%2Fan1aWBcrvqIqLPrqtM31l%2FJ1NcXKNL1K9QIFE9qGTL4yuAcw5rxzyya7QWsPfI4o4QQVeg9spPjr2OzdrssgStFOFimCItdmv1aOTOiU6nkf6cgjwNjZoAB6lUXel3pxipixd2VyK6O%2BQMiUzBqpbAXWeKONOf%2BDwo52tVBZvHbXb4Iqno%2Bv1oYOeZbJwHc24TP33No3BgY9GE673VpJNpxR1H4loARpH4NeS3ea%2BaZvtSxkdboDGAviLdCet%2FMaXIQx68mjScTbkqctvHy5CFfm7nUXHuqCn6KNpl1OTnQkpp8YHDSnygjiAS%2F45vZIIOuV6L%2FPItDz69djE3SDu0jhW9AXwvcsRXMcwCycrjwFOJdaYKnNq%2BbQDdxx0UnzHcAeCM7bmPG1SkcoR%2FCKsdxfN%2FPYJmOd2Je8KlpFi6q%2F6RvIUjGdwFsu3HN10O%2B24y8UnM76lPuZWiJ1H3OSnU6UMTP1k9J5B1juUC7i0oBvAyZffCPVOD6DtlSePijRWKH%2Bh239%2FjEsCcsp%2BNjoYRMHUUb1YDB9jbdWet4aEyv4VfNVCwIyZ%2FtpOTIz9WD9ld4wjbrwzAY6pgHcXoCtTH%2B6vrioZMKrPI1i2XN%2B7Nz%2FUtqF2Nq3T5iaj%2BHEEi%2FAQomv2ejmrNE9RmVbbxH2K%2F%2BMB6jaNkJ6PEMTR65rNgabPGY9f6wMsdPC53J58BBnaddJuDcZcc3GjfERlZiAXP%2F6msYQ3VNa2EPdyRLt%2FlZtcSpe0pVHj71Pl5RBPe8xGgb2IrC62AmavtPF72O8B6wOsLwQ8NWu%2Bpy1LQkJ6pjU&X-Amz-Signature=c699846ef8ee4681e06609a6020cf79b0a8391d79174e66d26546daa984c29da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646N4IIWD%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIHzjceEbSOVhZJTfkMhPbTbu8wEu44Lkmn74jGkvUoFKAiEAn5hDW54XYZPKP%2FkChJUCUsQNB%2F0LMOqzSpYofMG2zcgqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMX370kyJlQ6%2FCIGVCrcA8ZdnabPeboyqbd5c3dofLcsMsr3WSluw1jf%2BLDKr5p30amMsw1Ley%2B8H5tgyhbs46r%2FHMv2LeU5yqNxOVt9GzWEDRnLYfQd1VWAE2Wx8vrRJ0vKb5ebZUL2XYHC4TjdjCzXPsPy8H%2BpmMrqFNsSs5qKjxkOwobowtnm%2B75NEPCWBQTykrVMEXgwA%2BD%2FUgzhNrtaTV5EJ0toBkc3W47EcNsZcgAqq6kWVnIcFh276rq2mVEA3AmV3VfXUkYz7Y4nqE%2FUhw%2BsNrJt%2BblDvtdQO9ftGOJKVBgTRRYVjWPjeUriVJrW19phyLt7BQm6mgV4TIocXX0oiE3%2BatPt4D7uZ2tq5s1QV5M726k1mV%2FB0ZMqlN5wUuZsCfAHB8XmUNuUBSbrPP3gAWuRSeTukO6nyl8X74N17kk8z0LH%2B3UWzu0NjSlmgpkmLdf3QFLffwZjabyuF3ozXg25xHy%2FXs6d9UU1mcrAmivW40Pq%2FVisci3nCpqecO4O4osr6lVfD%2FrXW9OM5acpmS0ti9C1JlXvJCzD9SFCeTr766AhtiE2kobLJllI1YUgnzhn2i91U29vxsbtzOk28dR4j1ETJ4e5i2WGMnCqn4ydKDa1toli77gsVlDH3mFGPhFtVb8rMMq58MwGOqUBfJiJmWocps95RhiczR4HCHhemvG%2FPKuP0YLwYSBpH7l%2BHao0MYCOjxp5tUeOvOmDYFQah9NqSKzMw%2FQa%2B7%2FdMTa%2B5vE1gPZ8ex4Jm9pCfz1I1q%2FI14lzMGHNHz0smE2pNWk%2FJdQ2px0mi7V8CdWonpt75nX7zWwFqkfzhZ2awhqH%2BP7MQnw6Cs6rSjRa6zmEGsgGGnLxsZwlE0HJmmInKtQPoBSI&X-Amz-Signature=02a611ff700d4a3e6926db03fcd356b62f5ead4680c923af79afac210cede966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646N4IIWD%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIHzjceEbSOVhZJTfkMhPbTbu8wEu44Lkmn74jGkvUoFKAiEAn5hDW54XYZPKP%2FkChJUCUsQNB%2F0LMOqzSpYofMG2zcgqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMX370kyJlQ6%2FCIGVCrcA8ZdnabPeboyqbd5c3dofLcsMsr3WSluw1jf%2BLDKr5p30amMsw1Ley%2B8H5tgyhbs46r%2FHMv2LeU5yqNxOVt9GzWEDRnLYfQd1VWAE2Wx8vrRJ0vKb5ebZUL2XYHC4TjdjCzXPsPy8H%2BpmMrqFNsSs5qKjxkOwobowtnm%2B75NEPCWBQTykrVMEXgwA%2BD%2FUgzhNrtaTV5EJ0toBkc3W47EcNsZcgAqq6kWVnIcFh276rq2mVEA3AmV3VfXUkYz7Y4nqE%2FUhw%2BsNrJt%2BblDvtdQO9ftGOJKVBgTRRYVjWPjeUriVJrW19phyLt7BQm6mgV4TIocXX0oiE3%2BatPt4D7uZ2tq5s1QV5M726k1mV%2FB0ZMqlN5wUuZsCfAHB8XmUNuUBSbrPP3gAWuRSeTukO6nyl8X74N17kk8z0LH%2B3UWzu0NjSlmgpkmLdf3QFLffwZjabyuF3ozXg25xHy%2FXs6d9UU1mcrAmivW40Pq%2FVisci3nCpqecO4O4osr6lVfD%2FrXW9OM5acpmS0ti9C1JlXvJCzD9SFCeTr766AhtiE2kobLJllI1YUgnzhn2i91U29vxsbtzOk28dR4j1ETJ4e5i2WGMnCqn4ydKDa1toli77gsVlDH3mFGPhFtVb8rMMq58MwGOqUBfJiJmWocps95RhiczR4HCHhemvG%2FPKuP0YLwYSBpH7l%2BHao0MYCOjxp5tUeOvOmDYFQah9NqSKzMw%2FQa%2B7%2FdMTa%2B5vE1gPZ8ex4Jm9pCfz1I1q%2FI14lzMGHNHz0smE2pNWk%2FJdQ2px0mi7V8CdWonpt75nX7zWwFqkfzhZ2awhqH%2BP7MQnw6Cs6rSjRa6zmEGsgGGnLxsZwlE0HJmmInKtQPoBSI&X-Amz-Signature=945d76cea35a2aecbc9fc996a342100cfcd305fc6da11d99dfc217828d61d7aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643URGUAF%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIEUu0sqbAIT1S9kqViiG7CsXMvICMtmpl5Y%2F9Y66MWcIAiEA6xbXgQ229iauJOP9Y%2BJWHQuZPohSOm%2BpyvCPzkLSrFsqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNUUsbYKaLrZBXeYHyrcA73IK1sNN5U4MW%2F5hzTIzt87ZrLBgWLGxQ3tZs6jE63h2N5eMC7AxFSMu7C26hKpjbeVYNMhzyvym5slS7%2Fr9g1DT9EVWBTaR5t3O8QUqXm8om5%2Bnx2U1YohRUE9D90rrvNYyhiOswt1AaUB0TVxTcsFUS53VV18YMfR418kyLUfIuVoTSpBV2zKEh2bhX9%2F7t%2B0i88p6zblEIG6k1wivyi6yC57oxeA7RmVsyvlUMkLwQyxbEP1WMpznQilOjDYO6pu5EyZoFRuKGQj%2Ft4l1MAD1Qah7SIZydGWp4AyPbPk9UdeZnbTJyljkEsCo%2B2j%2B6GHz%2BFELCyewrdXjz2CHyPuKSeMxgHl8udRE3pBbeiaxZPivchoK9BqrYIrLvC%2F9W%2FGUooPOSPcC12xhKnugX5oOGoEIR6YWYFx9OS7lYOIHJMD8ub6VIx5rkGgWDycU54VuXCVJ2piwV%2BOXAGZx8M8idozlUHd6CCnRKd3Z1kv6zLn08Eb1jfVQamhUCXI7Hrg%2BHzZzCqJVysLJ0UHARccUZlmk2uaNPw1edUkkZWvoGGGsxm0SCv8vWHJ%2Fih09P3zbi1O9zn5rwpse1bkdWA8PVsPnOTpu%2Bgh4p%2Fa5v%2BGi87nCwdn%2Fskg0UpTMI%2B58MwGOqUBGWvQ%2B4SLd0Uk75EanCYbtFDvbGgtQnuNYCpc9FNbfdKs0mrpZceSuxb76BxQ0JUV3y6BDVq6FZbKuDRhOD7Qm2wvIsCuwU8mfgftc94k%2BfURqysICRan2WfxAlSAdV7YHyHPncvw0YqD72A7loNSKpDGjV3TD%2B1gEH6azlkvckQmwQYVecfvYpdpcgCvWnZ650hTr7pAmvOKsCLzRJFtUcFNa7oV&X-Amz-Signature=91227bdf3732a45104499e46dca8b043b0f33820bc9ceca54ae945d5f12545c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZE4DRLD%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDXwAWUaGf0Bs1edUqD2oVAdaVdbKx%2BikfySSIh1CaFigIgQDHGPTcMHfExh42eXbXCrSlu%2FPilQZLbXiFVHs9oeDUqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGKIaiKZY5WyWQYl4SrcA7WDqct%2BsDwsIuuunkYwvDSPOLclSYEetR3mUHLrwtxVryV4UltWzVutpAVzxwHP9SGcSAgG2ifWqoKyKJixCAsJie14yfeZduGDX1ASWdtENeYP81M3WUwWxg7rh1%2Bm8TnVlRDVi7rguZofCh8MnA4FHY8RZEglUgZq8Yd5a4IJ865%2F9uz5MDFRUyhZDf890b3E3Ld2F6ImvmJJTQa8VC71QN880xzHgfDo85JnYGdGUxQciLEqCnbW4KpBVPKqi4rbZhFP4wynxCEooDkOLe%2Fj5NnoQGQvtuuePfPIR8XH6AfwzX36vPiyn1K9LsaqPUhhZOkHgJIZy%2FduVENDwwYAel13%2BYlAko5jZX9jTG4JOx9MOs%2FQ6t3DKlZOXiIT9pI26Kni3Z69F1qOUGieXpo5Iwh9diqU5lUpqTShHc50xurjaXOiChGvfgdVSXNF0IAgPGsuQQGPGtUQ2kTqn4YK%2BjTHeMDjHFeKeglY8BN%2BhiCn45YKHk6CkzksGJir54V7ez0nb6dEIfrLHS%2BVJD7oP738efdEHsSjk0B7baQznGbME2DR0nqVyajAd2c0Rel%2FJqj72x7kjr3fKM2w9XtwGJONikgc4dAhwNh2tcNz4%2BOBj0Vak1wM9cy7MI648MwGOqUBiJeeT2YVwDwVvqpx%2F5QgconTNVeA0hZl%2F%2FW%2BjwItXsZ5russJZs6LOE0CKVrPxvCmg1fzMtA7KnqYRA289FeFCwFdSwLkgt8Koxgn368aqWrIxERxVLLrwjsHiTbjgF4d%2Fh5w3O9TsyCODsy7Ro8UTCybQHcp3zoe064271YYY1MfxuLh%2F4%2B5mm%2BSI9j6RnnGMxRt3phgZzQ%2Bc0dm83dz0lhnPwo&X-Amz-Signature=e91c05bdabdc778757db8140252bc3a3836997014c094fc1d19495c4bc54639a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ2PTROG%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIFf%2BY1LcJHsFZsmCsjwyXEwbD76cvdt0lVDVykTPs9RgAiAt7CaUPlF1GYaoNzRmWkvXpu8GPbAWKKTGRLLIhh7YVCqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5cmCvNlZjDH5G%2FpwKtwD6j3xTjmAM7I6WNLW5E3Rt8cZ5kZ2fxQ1tzHzLQH8im60k%2FUn3RDzYaVH7MCo3m4URk6YviRdf7qgsra6ozhy1BQMCStRZbpuFKP6rEB2mtAkHLL7B%2BoJwIM6H%2BFrw97AmoMfdiY7TNtUl3b9z9RrWw42KmjUBpRQQl1ka1IWBC5aaSPL%2FK7A0ppWh7SHcxzc1XxqzOPz10o%2F87nAMO4T6UVEQa96BkogIkjye36D5ka99SQx1zJfVzeK0ZrrlH8GfUU3SEKkwgaZuaLU0LF%2BqND6OHO2JdkGPdJ5DtHwWEXc4pb3LWoVF%2Bg2ZePU25Bb0kTGbP%2Ff%2FGeGR%2Fs%2FbfoGNv7nkyNsgftmxGyPVpa4YKAjoNms14j7TxgIubt5TKhRW7%2B2H%2FOhD8%2BCej%2BgTukcQAw9IR%2Fyyd4OTRC4q%2BQTGJYRhhYwvqTCyMO7XnWgKMBNbSVXDSbCCEpRpv6EQMV03beIuNzPAq01GOmes7u4xiB4huPbQv9%2FrsY7HaSi2%2B0gboxB4sWWOjAAxdcfLXVGiTX6WuWEau%2BbxJtTF2MZd65TIj7z4RbwcQHNTq%2F5VWwRmPaTf%2FoWkopq8GSjH01YR8rI2EuNbGzPHVgqUIIVRJQBwoL6jz9T3WCtrwYwjLjwzAY6pgHh7DEkNmyBtVExxgA2opt509wnIMdm4hIEjNgo2Eq8pb%2B2CzK8WxQz%2FOkqUAyDCopTXeCCOUc1cH7e%2B18F5%2FPD0pMG06q7QMw7cfnFTmfZpEnskeu28jzHTRbehRZCc9%2FAcQwSGOTnhfXegrhS5pTQ3mmmy8I%2BoiUpEU29oKYkBUGj%2FRA%2BLHA71YDwzKdIjlltu721iN9FXHHVV5To8WOvXUo4kq%2BY&X-Amz-Signature=1b84dd93d7b0557e98694e52ede501260e02bd46122db4ee5a94588cc157ca44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOCUPYIJ%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDs932Djbm1yX%2FuhpnrBNvVYyti4DuAmw7XZwh4j6AvdAIhAN3Z09kXTrQG46nkUZjGc%2F3RHI%2FsZEFQiv%2Frx62KpxRzKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwzVXP8Qw4IKNCPhZcq3AMBzptRZpZolMHmGg60Fxh9ZJDhNWzYiBKboCdnvrEfow4FuQFdB0GJCyLJymD%2FvFxkgzVcNJQep%2FDKWWIxo2j1%2B7duk27%2FkObT3qkg4bZhE6OHS5xGVZaYfwO1Yz6qBTcPLfMNQQyeujI%2B2rJHKMkAS3yfOfG%2B%2ByniaHTR%2F92CPUnodFEQD7K2MKWw9gVBJFE%2ByRmz41NTz0f71mqlWIwvayADqeQYAW%2Fj7NMF%2FfDjus2%2FM6kqMtg%2BNx2aGY52R%2F5uE02W0QuGxizArelL7S2cRCGIUyFes7yEBgwR13lKnkZSvktKl3ADjq5wHW8nLsXESKKxKGAB%2FtULGZWWvwetNT8VJtFwFlpuwrKnuXIjyAsqmaMdFfze6lwRk5N%2BSBudyDjBConXLJM81YnAdmGCMkKtbJTBOpgL7nF4EWW4fvrLYyN%2FxzJpte0hJbJiRKpWdmsRxCPDYt4psMSlMksAsl0ijynJF5%2FPi15Y8476nGERquq2nDllrViF0%2BncBuBe9ne8vNVy8ZKNYiXJxiszD4VxYd%2BqFsTsGKL2X%2BgtAELcH4Lc01%2FVmshgs7V57Cbwhsu93tiZcdAZh5ofqvcAbpTwDpqQQLN0KpUitAgVnSKgFGnXKFiz0S4E9zCFufDMBjqkAc80lZRpM%2Btj72YiWZfrxRWA1VJdDoGeBFWOj37nCbJ5IQHm6h4r0uNtYzTuvABTvPqXoP9EMZTvCNTGeAuaLGlKBrjp3HOjTgmZ%2F0A4%2FjkB5i%2Br0B9yHZBWo4PhT%2FOiyYOiREvSAZucTJhyhkDdIlbp2awP%2BsdMAb2asNMZh9rS%2Fu7yhak68a53sOAWOixmersfdJQ3YCziBnfMZVgvYItwgzvk&X-Amz-Signature=8d2a829f34258d58ecbff71295cae1f65c59173cf41613dc372f6248dfb20460&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOCUPYIJ%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQDs932Djbm1yX%2FuhpnrBNvVYyti4DuAmw7XZwh4j6AvdAIhAN3Z09kXTrQG46nkUZjGc%2F3RHI%2FsZEFQiv%2Frx62KpxRzKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwzVXP8Qw4IKNCPhZcq3AMBzptRZpZolMHmGg60Fxh9ZJDhNWzYiBKboCdnvrEfow4FuQFdB0GJCyLJymD%2FvFxkgzVcNJQep%2FDKWWIxo2j1%2B7duk27%2FkObT3qkg4bZhE6OHS5xGVZaYfwO1Yz6qBTcPLfMNQQyeujI%2B2rJHKMkAS3yfOfG%2B%2ByniaHTR%2F92CPUnodFEQD7K2MKWw9gVBJFE%2ByRmz41NTz0f71mqlWIwvayADqeQYAW%2Fj7NMF%2FfDjus2%2FM6kqMtg%2BNx2aGY52R%2F5uE02W0QuGxizArelL7S2cRCGIUyFes7yEBgwR13lKnkZSvktKl3ADjq5wHW8nLsXESKKxKGAB%2FtULGZWWvwetNT8VJtFwFlpuwrKnuXIjyAsqmaMdFfze6lwRk5N%2BSBudyDjBConXLJM81YnAdmGCMkKtbJTBOpgL7nF4EWW4fvrLYyN%2FxzJpte0hJbJiRKpWdmsRxCPDYt4psMSlMksAsl0ijynJF5%2FPi15Y8476nGERquq2nDllrViF0%2BncBuBe9ne8vNVy8ZKNYiXJxiszD4VxYd%2BqFsTsGKL2X%2BgtAELcH4Lc01%2FVmshgs7V57Cbwhsu93tiZcdAZh5ofqvcAbpTwDpqQQLN0KpUitAgVnSKgFGnXKFiz0S4E9zCFufDMBjqkAc80lZRpM%2Btj72YiWZfrxRWA1VJdDoGeBFWOj37nCbJ5IQHm6h4r0uNtYzTuvABTvPqXoP9EMZTvCNTGeAuaLGlKBrjp3HOjTgmZ%2F0A4%2FjkB5i%2Br0B9yHZBWo4PhT%2FOiyYOiREvSAZucTJhyhkDdIlbp2awP%2BsdMAb2asNMZh9rS%2Fu7yhak68a53sOAWOixmersfdJQ3YCziBnfMZVgvYItwgzvk&X-Amz-Signature=81fdd980f2b99d6cead35a67775d1a91faf20c3523662714d85cf321a7d544a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UZLOOSB%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDDOyEa87E%2F70%2BpN4c6PeYbwCc8KWAOqD6UmKvZ5x888QIgZsnL2PG%2B5DeMSKv8TrBsIsQFa3lQ%2BYjA2y6srGHhVmwqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPG0HN2bRsXs9hdSBircA6F4Zf97CbxmemAhaTHtwUsdhjj0L0fde94DtTAsf1vuQ4UgHl1m50GOZXQETvh1BP3PRtzJoJtLWQt0sG57Ea6dng81aJzcn8%2BRBhCEl8vVIBmzizQR6fztayV3ifqrB8kXvQQwYVohln%2Bv3CnegvpZ767a9diP21hJcm6YWyGU%2FSb%2BIeTSOMQ%2FL6NWZeWiuvoKTaasBmSFSPnYp3gJJNH37QYckTCmdl94yV4nUATkiUrFbylkw2deQCRBMRxdpHlBTwY0ShcnhhSnGMIHKGfofChrbbF3LiyiOBfHYJnC%2BpDOHKKqoXxlEcvL%2F6x4uP56QrboBcmpNOmuSeagBflL%2BvjLOqWlBfDCjRl7ttUeKWUgtBau2bMllFRRGGiqAWKvoKOj1QVI3B81Uhhe5c63nKqRDO74Ek8hkpaDrGvhVi3w5%2B31ecjv0WxYb10iu2gtyUf5nHPzj6I7eUA31%2B0c535JK3RGWi5TkEXYfeFO%2F01lW15WeNeAKleimb%2FCYxbABsnkzzI4Rg5M5Ix1iCPQSerqAyOSmyWLPlnz%2FvME1YC60UbPPWpcOqH4U5Z6QhIJ2SasMYsf%2FUQdlerz362Zihmm%2Fa9dPnpQ72q8GUaxxCILLz5j75WEjWT2MMG58MwGOqUBpgdc0ONDOoNEfaKCT2n%2BvWlrhxLuY2Aeqehu%2F8M7R2rnuCS%2BnTrcyTQO9RoMLFXULtvygFL%2BbAt3Ou94KVTAd%2FU%2FbJC0FE7XpQHttB0%2B7bCLhutnyRZYQ8MjbO%2FMPcLxD1mb9%2BS9vLQZIGmNLiYLDMC8exQfCSJd6%2FXaBdOPIJfPVU2j%2Fu289tTNQNdqdbF5kckzi%2FLnOCkP3p2tzu658AsectNp&X-Amz-Signature=1f8f25404c4f331550575eee7b117f563edd8b7b403e1620fa24e0fc55235aa8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ER2IPU4%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQChMBdceCyrRvJDdoDoHgh6jxg00iymg0oSXj7Jlr0T6gIgdx5vWLR3m0rU5ONuIsKa1fvnrL4cj8lsLguLlh0IubAqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFLC6e6PmBFGf8sKWircA2meRuu795U5MOcOp%2B%2BBV6jJSgN5QeJivSle7pgnCQgq9gmkZoUc9u1G%2B23Gxa%2Fxd473zbJoKCL%2BgFJc1WaFAAWz%2BW1n%2BdKlh7pvoDeL%2FXfta29iOJ3ZZDYuk8qSCyGycTjN4y%2BArmM2yEx1k9JFuZSp0SJejyATdlMI8Vj8hD6tL7LUcSodLBNBBbE9CIVSbhi3xYq5e8qwf7ycSFZaEsDIioGrXaI%2FuRypUEiLuODxcAZdigDrnrb%2B3ImKu5uRNAUrJ7wFZ9%2B5ZDIito5fpLFOrY5LXFz0OESwFn%2BrN6JPc3KZZjszOX%2F6Jo%2FWnPeCe8mzjUhUtSZ2JL2BvqIkOLYUzU843gpJVkyduVabOLj1LVDn7%2BNMC3a%2FwCN%2BWxaW2ypWEGA7oEpewxJO7heQh7IfsW4wR%2Bq3%2F7%2F4QT2xM%2B%2BZp4jiG8Qvlc%2FIrlKY%2F%2FS4Bu62vJpEoFvFnk9Y9pEpXViErVZf5J8EMFVVjYj6VkZtQvf1h0mPzphfqAsQISskDiyxJcTMGwZIGd1FqDqahcWE6sU5VA2uiJR9l%2Fi7tOLfXs4iXkNfw%2FSEiqr1OmT3d0V0NDxutZ9OkOFW9q5eN9g%2FHgNxOhVATfJJSC2JYVOKcYomtCNJEBjMT1FIMOi58MwGOqUBHaaYsJKtTx1%2BWYUupcS1c6ry9UAkRf4kXaUn9MJN756cLXkXrKRdrLV3lnpcdpH4PfUu83viPN5ns6KkDyD3gw803rgoZClUcC1l3vxZkLc0AkrNqrkEje86FW8msGoXB9jxbC9N5EILGmPtUmBjnNyPfLAFuNA7lybfD0oBWq21Z%2BRASjmZ4uKxBBx%2FZbN2ITxwQtpnrukv3rZv60ObBwoqCss1&X-Amz-Signature=aee432d504abd0b0b55495a5d0e56243eb36635321b4e10a34f2f9adf4d7e5ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ER2IPU4%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQChMBdceCyrRvJDdoDoHgh6jxg00iymg0oSXj7Jlr0T6gIgdx5vWLR3m0rU5ONuIsKa1fvnrL4cj8lsLguLlh0IubAqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFLC6e6PmBFGf8sKWircA2meRuu795U5MOcOp%2B%2BBV6jJSgN5QeJivSle7pgnCQgq9gmkZoUc9u1G%2B23Gxa%2Fxd473zbJoKCL%2BgFJc1WaFAAWz%2BW1n%2BdKlh7pvoDeL%2FXfta29iOJ3ZZDYuk8qSCyGycTjN4y%2BArmM2yEx1k9JFuZSp0SJejyATdlMI8Vj8hD6tL7LUcSodLBNBBbE9CIVSbhi3xYq5e8qwf7ycSFZaEsDIioGrXaI%2FuRypUEiLuODxcAZdigDrnrb%2B3ImKu5uRNAUrJ7wFZ9%2B5ZDIito5fpLFOrY5LXFz0OESwFn%2BrN6JPc3KZZjszOX%2F6Jo%2FWnPeCe8mzjUhUtSZ2JL2BvqIkOLYUzU843gpJVkyduVabOLj1LVDn7%2BNMC3a%2FwCN%2BWxaW2ypWEGA7oEpewxJO7heQh7IfsW4wR%2Bq3%2F7%2F4QT2xM%2B%2BZp4jiG8Qvlc%2FIrlKY%2F%2FS4Bu62vJpEoFvFnk9Y9pEpXViErVZf5J8EMFVVjYj6VkZtQvf1h0mPzphfqAsQISskDiyxJcTMGwZIGd1FqDqahcWE6sU5VA2uiJR9l%2Fi7tOLfXs4iXkNfw%2FSEiqr1OmT3d0V0NDxutZ9OkOFW9q5eN9g%2FHgNxOhVATfJJSC2JYVOKcYomtCNJEBjMT1FIMOi58MwGOqUBHaaYsJKtTx1%2BWYUupcS1c6ry9UAkRf4kXaUn9MJN756cLXkXrKRdrLV3lnpcdpH4PfUu83viPN5ns6KkDyD3gw803rgoZClUcC1l3vxZkLc0AkrNqrkEje86FW8msGoXB9jxbC9N5EILGmPtUmBjnNyPfLAFuNA7lybfD0oBWq21Z%2BRASjmZ4uKxBBx%2FZbN2ITxwQtpnrukv3rZv60ObBwoqCss1&X-Amz-Signature=aee432d504abd0b0b55495a5d0e56243eb36635321b4e10a34f2f9adf4d7e5ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666U6G2K3P%2F20260223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260223T093907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIEpGDP3gOHaWOLA19NRzflWig5FxUgoiJYi9rrLDpiR%2FAiAqmnaSlr2fHxg2xNRa6%2Bt0HR%2FfKQuL5s%2FSGtx%2BFjCdRSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4PuWJYUoN7MrnI%2BbKtwDN612Ix6i7%2BcyQ7xfCvLZiS9MiQvb6gwZIJIMRgRhzv3pqeli4meDnL%2B%2FhXTMQw1%2FLbvkx5yzeAUW%2BZhEKt6wSNkD5IaY6zzy2%2B0rlaIHbDVjaNVLvjAw%2FIed0EORSCHdHDwLb2dMZL%2FjPzMFBeBfFSJxeku%2FIfuJfZrT0q2VNX2bdH91CwIl%2B2GRtu14AZuJzOY5BAte39zx9Nmi7aVo%2BcKmHvn%2BCK5i13J9vhZjHWOOPU2stCGSCdWDrFhfxwenRpyQKsr7QQqjW2Z4qRdm1NLy%2FMblV2oQF9Y3NTaD7beF6OeU1aW3VmpAGzue%2Ba5J0uiajvGM9qtbTMbyjS0dIfVkO%2FKZ6rCVDjhvHZ4FOxPeQl%2FHngyf2UhThho21pH5NlVmCSF3%2F0KyuiMJ8bD4Rlc8bBR9C7%2FI6HgU%2Fll4LS0Ix8w%2FtbzgyhanCe52e%2B2enEW364izTeB%2BMALtfFXvJwwx0DKS4NAYD11VQmSq34ibMDlJmjMzjHESPnQ1qKTlfy%2BdxMo4sL06MRLCHhL7XEBJUyiJXQnSWqsRMl3nPNIZB%2FODyyfDRioYuZK%2FZIcy6I%2FOC8tsLSJrXqQj3PyWHEdq57FPGSTxQ7fYA%2BR8g6lP77xTTJ%2BW95v%2F53kw5bjwzAY6pgEQW8Ny623hNJuEBS4CP2SD%2FqNergf%2F69KYCmtNE5fDPctDgAfjYu4DH0vj5Za7paFLnZb9LTMl0ftw9VDwHnUKug9R5lnM3fW9JjwxuIIlhmcMJl9IGdbhoiVFwKpMy%2FgFXnKdy7HBemzJojyHpg8UtZ2l%2BmtswfDUrByOnmyNa96OfM26aVCOoaJNZa4YoOdKUo6p2zU7uN4UIpz8pamVDmsV3wSn&X-Amz-Signature=c5a99a37e710f16de01f2bb6b1e501261b5dd10ea04f72fa8c497662f56cf0d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

