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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAKI2B3J%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQC5Nvtg1eaIHnbQv48QBGHiUinY3TMXJkmXiZwJytUBOQIhAKEUkg2WqMeMWNHSgIXpAg3w7LAJuTNC78plCBj6wMaBKv8DCEMQABoMNjM3NDIzMTgzODA1IgwyzW9br7HOJFbCu%2F8q3APflsJDWHeWxHhG%2BeHmIryXn2%2FkoZ3n4LmBmQ1Dzmyhum1FqrBjJ642%2BQmmnH9pf%2F4ckiUgy7Iiu6kdIMIfIAJvZIUrjxMpU4tfs1VSRbX%2FgEJxkVoeJEK6KOgdgd5GHLnsBormsZNJPDozpH%2FBwwurdd93yaWMnz85mhoXk5NrbOj5iZMyTLMrYsRQKQQuQmw%2FgodhTp2%2FGy9wrLm025Nr8xH3wIF2vxsoBSR59O9rkJnqZLXoCFVpU%2FHYtG0OfH51%2FrOh0kJDvSkL9YXSHRc4LcTCfoR6uH4VWKgXvKQjDl%2F%2FNt8O6Au%2FUEGoH3ifOdgqc7VWKmE9FvphBHvruchvOyjrA%2BZW%2F4ji1EIA0g3MkvkxR%2FaXCh9Fc%2BRnIdfor0CeHO0HDx2SXPbvcnSHKuHOnkB8z9oUVCvv9f%2B2gFPR2JxVPi6sGxJag%2B0EOIpcVq13zXp56y3PqplHSa14j9sD%2FbwX5T9P353KM27Czmbv2QWUOT28ydlFFpXZpPt28DjFsuDVq6aUtgJVRydPTbfDz4p6W%2F6sxXPcXtC3hNRJDKFqgzwBWJeIhLV6pWmQdTmcz8YVaAOgDo47GkStV1hN2%2Bl%2FOQjNA9cduv%2FrTHHv0gLm1zVEhzRr9bNcKzDejLDOBjqkAWbeRs4FQaoWsBGVrz8QbJgGJU2oQToUWsfUm2fW9ukRaMwBRugSz%2Bb558NNM702tYTX50cA8CEhFfa%2FraD%2BNLXYsFQ8jxO5CndnMFNldilzvciFomVCTWHjw4nKUht8gY1CX6k65qQSLPK6GSXLhbWm1xGBJF9xOQ6oa8bQmEELPNEgMYTwio8EOCe6p5bq0viu6NXmUlVUnAsIplNIyS0z5%2F1t&X-Amz-Signature=2dd6c6bed1df19467fba9d72a5c3c5e1a97566943f9f24ca2753e54c17f7f78b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAKI2B3J%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQC5Nvtg1eaIHnbQv48QBGHiUinY3TMXJkmXiZwJytUBOQIhAKEUkg2WqMeMWNHSgIXpAg3w7LAJuTNC78plCBj6wMaBKv8DCEMQABoMNjM3NDIzMTgzODA1IgwyzW9br7HOJFbCu%2F8q3APflsJDWHeWxHhG%2BeHmIryXn2%2FkoZ3n4LmBmQ1Dzmyhum1FqrBjJ642%2BQmmnH9pf%2F4ckiUgy7Iiu6kdIMIfIAJvZIUrjxMpU4tfs1VSRbX%2FgEJxkVoeJEK6KOgdgd5GHLnsBormsZNJPDozpH%2FBwwurdd93yaWMnz85mhoXk5NrbOj5iZMyTLMrYsRQKQQuQmw%2FgodhTp2%2FGy9wrLm025Nr8xH3wIF2vxsoBSR59O9rkJnqZLXoCFVpU%2FHYtG0OfH51%2FrOh0kJDvSkL9YXSHRc4LcTCfoR6uH4VWKgXvKQjDl%2F%2FNt8O6Au%2FUEGoH3ifOdgqc7VWKmE9FvphBHvruchvOyjrA%2BZW%2F4ji1EIA0g3MkvkxR%2FaXCh9Fc%2BRnIdfor0CeHO0HDx2SXPbvcnSHKuHOnkB8z9oUVCvv9f%2B2gFPR2JxVPi6sGxJag%2B0EOIpcVq13zXp56y3PqplHSa14j9sD%2FbwX5T9P353KM27Czmbv2QWUOT28ydlFFpXZpPt28DjFsuDVq6aUtgJVRydPTbfDz4p6W%2F6sxXPcXtC3hNRJDKFqgzwBWJeIhLV6pWmQdTmcz8YVaAOgDo47GkStV1hN2%2Bl%2FOQjNA9cduv%2FrTHHv0gLm1zVEhzRr9bNcKzDejLDOBjqkAWbeRs4FQaoWsBGVrz8QbJgGJU2oQToUWsfUm2fW9ukRaMwBRugSz%2Bb558NNM702tYTX50cA8CEhFfa%2FraD%2BNLXYsFQ8jxO5CndnMFNldilzvciFomVCTWHjw4nKUht8gY1CX6k65qQSLPK6GSXLhbWm1xGBJF9xOQ6oa8bQmEELPNEgMYTwio8EOCe6p5bq0viu6NXmUlVUnAsIplNIyS0z5%2F1t&X-Amz-Signature=2dd6c6bed1df19467fba9d72a5c3c5e1a97566943f9f24ca2753e54c17f7f78b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NJ5M7KA%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIBT%2BHbrmkiE8L%2FtOvITQm3WldFYUDfeBdKAqaBPfLMkJAiEAlIi1Re1WsDxgDwogQxwGq%2FcMKjvfELmzGWOqI%2BmOj70q%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDMU2EQIU8ITMWGJz0SrcA2d9WU5%2Fo6c5Jr9SaksMajbN4vHb12%2F079SgWDXkSUjnA8%2B%2BJ4%2F7QnnVS7qCxTIEDWmX30ijv728Op%2Fwr7lCnYH%2BRIIpPx%2F1yhsgICp%2BANSc%2FjlWmaJ8YLYpjt3tNjVHQ%2F8aGDGfdywIxYSUmEqo1OJBr6%2FohDQKIaEqk87Yq0%2BKUp23ABDJtU4pSkv8ITZOjMO2vVXldspjlCLPEtCw9wVIO1nsuMtPWIpPj%2BuXmT%2B3NGrfEhNijxxnoQTFmUl4AO3dBRr1uOVm3HjGMS600XG9XTvns0lOLLG0j2SHuMtsrlzWnxpc3at1hgL6q%2FJllVNM%2BIZd3Z%2Bpb7lhvErB6C23C9GIfRi7VOpvTp4pnv%2Bq9vNl3I0%2FTluuBex8uDoEVIOT5Boakad7Ugzr5pWKeF9Xmp0U79TymhY%2BHFdNN3A7OR%2FH%2FOkInx8HkIgvNIsscjCoIQRqFw3DNnfdrnUZa3UlDoG36xAnZSFSMFRORKoLZjM6TofKahQbrT%2B%2Fm%2BF07OPLH%2BUdUT33nuiGPlTQrfLq%2Fl%2BNIHrKrxAouxNktRVp8bZpw8YnFB9bUEpiZ57PzgEacIqR43KMwZq%2Btrshq2Z6Mp50U0%2Br%2BTnCzoCMpIqkbe%2Bf1ehc5R48eC3fMICNsM4GOqUByy5jH9LUKlHJzzu0NYumDMJfpNb8zcWJOsFCuST4uPIEIb5CXMS8b%2F0rGeEJUNlBXdXeF9%2FG3ooZ4KGv%2BPUaRculTQsEU4gc6YFahuR7LnXXWHLs1kn0lpiuDmUm4CZ%2B52ub9E8n3rz7MMiKqBwPch2wBaMt2ET9XgmPvWZAiwGLE2t1Eh3yDddngsqyrLSgmdnSSEZym3Hqyd4uwZuYXHU8fRtN&X-Amz-Signature=95700261e62603c5972dcd7c6bb524393a8aee23a78f93fbec6e1984de21823c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657ZCCMVM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIA9Of8cNzB9YCG82u5EavhuiCjlzG2wT0Tuo3BykcQ7CAiEAijtnTW40EoFbrkzHf90rZUvtJtguFySWCH2Iv50S3BQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJVMHkhh6%2F703895YircA1RVQ%2FJuCL%2BTzkvJ4P%2FMDUAzuCZuAKCfQo9s0dOL0ZPtnhK%2FxE0YF4%2FAsNKUZRRf4yVKOJFbbN%2BYeJkYEHhkNNWPx2a3AlroftBeq7YZHmPAxt0Bfa%2BNW9yoQULG0Z5e1v1heMTEt%2F2fFaC7E8poBn9VFNyw1rrNGCHrp5H%2FOWVL3xYYSH7D5hSsRbgvTcgt1nz25%2B9Wo9NDJMYg74kpZMLdFthU700vqt4aNe5Mdy05lFaDM9fdgdtWh77Od%2BGCBZeoB%2BSebNK9LI2%2FapAH74fC2DPziDYIdpd6046L0T1M2W6SP2sOSB23staSl1y0OsYoi4N63SuSMNtAvfj1bpgF4ip1622XaI5YFEWTx97pwjgO%2BomU4qz5YAtsCPc0YumdWsl7mHA2%2F69XOxZn1ZaBGR3SnLK14DZwptfiQ%2Fc4Or04UKvn3dPHjLA6WbopN3l9%2Bilx4HaKX6ZiaHsDUT3Mps7lJQOPeQP6jx7Zy13DXk%2BFPcaT3FBECZP5A5qiwQ17FWE1CaVtborjf7IfD8bCjpzGUtAmpZQg7MnofBmgwV6EhexzzGz93Hj4bHfQIpN3sfOJ0SCYU7I1C%2FAZy%2BuUP1EuoPJ%2F30wXwcuz1iRsMKg%2BWEFxiVFg%2BLBdMJmOsM4GOqUB3vBeOKR6hnYSC0xn7DZyLk6o9yOxEXVgFgigpz6MYPEsR79fWE7sXjMz33ECKBCeiNm8QhFc3eAivyGwJCClsd50W2HF8EAmBb7TGcpNsSxTfUSNlfP3FaoGzthLyePlktDoffkX1OfNnbGzBWCNbWf6VqobBnqWI0l9nU6LORNQIWrFZEYWN%2BN6WwL%2BQ%2F4efvkd%2BHW7uEAAQF%2F%2BHpqGDD1F7UUE&X-Amz-Signature=a26de4fc22ef0fedf9b790524b8931b735267af46f88e9a3c5240529705cb090&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657ZCCMVM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIA9Of8cNzB9YCG82u5EavhuiCjlzG2wT0Tuo3BykcQ7CAiEAijtnTW40EoFbrkzHf90rZUvtJtguFySWCH2Iv50S3BQq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJVMHkhh6%2F703895YircA1RVQ%2FJuCL%2BTzkvJ4P%2FMDUAzuCZuAKCfQo9s0dOL0ZPtnhK%2FxE0YF4%2FAsNKUZRRf4yVKOJFbbN%2BYeJkYEHhkNNWPx2a3AlroftBeq7YZHmPAxt0Bfa%2BNW9yoQULG0Z5e1v1heMTEt%2F2fFaC7E8poBn9VFNyw1rrNGCHrp5H%2FOWVL3xYYSH7D5hSsRbgvTcgt1nz25%2B9Wo9NDJMYg74kpZMLdFthU700vqt4aNe5Mdy05lFaDM9fdgdtWh77Od%2BGCBZeoB%2BSebNK9LI2%2FapAH74fC2DPziDYIdpd6046L0T1M2W6SP2sOSB23staSl1y0OsYoi4N63SuSMNtAvfj1bpgF4ip1622XaI5YFEWTx97pwjgO%2BomU4qz5YAtsCPc0YumdWsl7mHA2%2F69XOxZn1ZaBGR3SnLK14DZwptfiQ%2Fc4Or04UKvn3dPHjLA6WbopN3l9%2Bilx4HaKX6ZiaHsDUT3Mps7lJQOPeQP6jx7Zy13DXk%2BFPcaT3FBECZP5A5qiwQ17FWE1CaVtborjf7IfD8bCjpzGUtAmpZQg7MnofBmgwV6EhexzzGz93Hj4bHfQIpN3sfOJ0SCYU7I1C%2FAZy%2BuUP1EuoPJ%2F30wXwcuz1iRsMKg%2BWEFxiVFg%2BLBdMJmOsM4GOqUB3vBeOKR6hnYSC0xn7DZyLk6o9yOxEXVgFgigpz6MYPEsR79fWE7sXjMz33ECKBCeiNm8QhFc3eAivyGwJCClsd50W2HF8EAmBb7TGcpNsSxTfUSNlfP3FaoGzthLyePlktDoffkX1OfNnbGzBWCNbWf6VqobBnqWI0l9nU6LORNQIWrFZEYWN%2BN6WwL%2BQ%2F4efvkd%2BHW7uEAAQF%2F%2BHpqGDD1F7UUE&X-Amz-Signature=dc62ac6cf431f109fdd6be3be88582e6b95368524ad1ae6b30572877ac6e63ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDESAXQ2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIDDe02OvTrWIWuTw3SGD6xcpsu8c3BioriC%2F3daIBdY8AiBL3YH9yCNxO8XgP036GaeHOEY0DVxWf5DeYA6mOL04ASr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMnPR%2F1x5zXBtNkeXeKtwDO9MXs4bqPAYqoBY1oLC7JZJtGaAyM%2B2NVm%2FHhd40VH%2B%2BEtTxK7yNsdFSDnmNMPDn2HlFCUNwrCqvkrWWVpA1Kittpn9oVJ6hJMidEAdZtoKtY2nfoee6XGR9FNpdhoJefYenlfom3nwBEeXEvKymnYcDmt5XGEVXoBAfYlPsMRAgZEgtZPm2nWcYV6HbK0yHB0lCgUEx%2FTtLXr3cGneXn8qlrh9QZQ9vPRVp9quSvy62CPj0zR%2BnM4FbaqJ6USOlnI4ce0HOpA33kJSSlV25qKmEPEkhtvNTeMa1QDFP7YWB0H7tvjPjjFvl4uVfe%2FICl1Q8zzI9rHofZDpmYsWCcuQQIQ87Pvtbl0Js0iZ8XWtXoMi1upmBEYXpYsx3uRFn01X1UxqV%2Bj4ISt0wTGV0SIPAch%2BpDgX952FJEUYLK6t5yhXu4Vwi1FvZzS2qtrOcL1b6oMCh3uj4oelu3yecoh%2B8bgA3LE3aDvVpdy4VMLM5b8%2B0UHulkR7FLqLLU1RDhzenYSnGqZvZ1t3T1KwBfXiBFEGnQaqK9WJnBwT1YjYQ7lf%2B02FtO1mWBB%2BmfrjXMmBDUeWL2NdzS6%2Bk54nYrygf3q7egD7Sx2O1V8XZMd88J%2FtJrxWTcBxGwu0wgo2wzgY6pgEgBWUIaOnwgyhCb0Tow%2FZ6Aw2QSfopRHMvY9RNHIN%2Fvd9q%2BpXF%2Fv551ppIs7TCj%2BpDeIFbJcg9EjBWx6FMi9YEpJQwQRQT9lioJyV86wTBfoGx2ks0mbScmVJ3mhtwDa9iqSTyh48cV2hMMKpDdpvleRoWSuNW2jk8lGGeI6Jxv5o43dJ2lgxn9XQGRsSy2MR5p7j4WHaj%2BOohIEvQhfOZ%2BEUU8gL4&X-Amz-Signature=ae060362c12ac5454a1bc293882e3b387933b546565ab900e09f740be2d33733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYTMBNHQ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQD5eDvdm2PaDUczAwqn0FL1a0eSh9WYSR%2FBx6L3tg9B9QIgXk8szywUMZu585JNsRYIBc3TZFbQdlk%2BeCLvbuvwvlgq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDCfrbuHiRerxe82FWircA0k2QXZkI3Tg2G%2B%2Bhx1jvMdWpHoR34GzkwmojnmSJgrp%2Fh2LXuwtRi2Yz474NbulCumLgzYwURSkihFiRVGuI%2BEGl5dLR2XwpYh0PAkfDeq9ZDCmaGvKiwGo72AKzs6UpmjHyJst2tnCOd8HF4537%2B7hU7Uk%2F8sFI3jpZVkeImCzW2FJsnwlyR%2FDjkxkKiQfG0gtbXNbI1fqTCf%2FoD3s9NG67HJvyXnKrq6QAhd6%2Flg6G578GbqEsDjfJxHPBAsOCEmpAQwT8oPU1PIctDfamaBhPSOXO%2Fo%2B6TpAcPNqSuRCmmPNL%2FWVUJmrGf6R1ewh7C4cjhiK%2FaMIbLWlnTCWNjETqYT3YpIIVZE44lMgzWYX1OdTLMEV3RTlOehZLAHJpp6%2FpDsULgHS4022wdSZ1Y%2Bmdfobi4QIMRbGypb7zBK85wJdMmIevY0EpmGz19YLcFiATf%2BU4rL6ocEI3KwMrjNHtt1hM36U9fEcce7eeGqdIEFyh92Q%2Biqmuy7Z7sdPBc626vHNCZDM5gCIi7oMpOEWCtOouIGghBKCRIz7qvAhzibgKPMUikvWGuqh2I1GKkMVSVV%2FciCjuDpYq0T4auCx8Jeo9CBM6xHZDWTvE%2BfPyTNPjYfTdh4o1GixMJ6NsM4GOqUByVsXwZnbkY5fnIWeFwsvCQIZYRBI7mJJJUTwPnV59DjRtjVNJgx7GQOTFd4YY8aZr5k5G5jPuouietCjjD5agiOCObGdhOlhzBXq2yY6nm0SrKeFE8b%2BDEycBmMnqCPzYj9Gxe0jjTn%2FE%2BTNJqD1bIgBdhJieESq2VZxkRBcVaumrZeyi1zzhDePwksAyamrah%2Fr94dEowUMRlxDXxTHOteDY6mh&X-Amz-Signature=7ad1a3d16256798d9ca36d4a46122c930e08726f6793696e1bf37a2614d33d99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYY42CVY%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCj6inUMyCSDHUKHMOKCis5Y68uRDsM%2BoCWKj4%2FWZlF4QIgPj%2FO8%2Bj1oI4WGk4XyNh0tdv9Clc0gitHwwWQFNnTUDoq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDFdi4vcaSrY5TMe%2FySrcA3YvC1jt%2BTCS4AF8DEUvg0aNEX2627jayQ5%2FXKiIT%2BCAuDKOXvjsVlvRnU%2BXJ%2BFp7AgbiEyJSPZQmQ0x%2BPG6uOhGjXm245%2FVXhkik82%2F1EWqcX5K1uHVUBon8UiZZH6dvCXAbykj8g0pbQIh0qcWbTLa1tO05nCWXbD2H3boiyMLGNyWv5CcQc3GYreDbaVoAPT2vKiWnR198eqlRJPBv4uYO6sc6%2FpkBi1PSYNXyazF7fnFJu%2BaYoxFa9Pv41vLnaOgkHiJ%2Fj7oOA08uUpGJVxBUM8ogIjnX7WnpZSFM29CyOGet82prvKhGIawAT4ozx3gj2yAWxVZdv6xAug4eorDUDCisQGs64jeBfNt7E8XCDxkVITVveMJyICDs4nKDM%2B%2BADtqx13lx%2FhSMKDfZBoI7FPuMp63nICQLYQTfkmi9%2FyTGaGdv6CNXTDGTsgSiOXDpyUHE1ktc61Mt5OQvppfUolFNAZ9aADyGuEsprcv%2F1O9107Lh1kU31A6NWYWDuOL7bAmYal%2FHysshjYLr%2BaoIdZU6Tcn%2FqlNKVzWgz1jZ3bTVog0y4W0vGqVmV19pPWdH51jAt%2FZBvbbAXbFEUgp%2BAI2TOWdOetpmdirAmmatNXPM%2BFlvQ1mNalIMKCNsM4GOqUBFAgSlxKeTuWoxYT1Gmorr9JnkwVp5ABfTyAhmc3NOo39OkYR4ns8Fgn7%2FwjlucGcbsU3YS62aARwaOA5F0ATOP12MVC9bBsBnGPxb4FFzewDfbVSN2uH25S8O4WVFriBiQieBPL1Okr%2BrBpNII65aE2PxX%2BkysED2T0FHM4zcLka7EXT31YYKKf82EIYkoyWQNcdb68Q3vtbyz%2BGdYO%2FxbbVJDT6&X-Amz-Signature=810a1b105abee338c677ca1f138c401e52d8c375c5feeea57cffe77360a74ddd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEQJ3ATE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIHt4XTM2B%2BX6k0JFRmNGat2UBTj%2BpINLIcFAemUcivNvAiAGl4DgBNtScIhOrLus%2FrvRnaDyGkjKoYQfIGoDH48XjSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM63RU5RNr957yMrqnKtwDfy4S1zQcjw2JPLGAQb%2BSxQ6mB48IB7bs4okL9i86Kf%2BBJcaT9e%2FyjHxTKMd1u%2B51pYqzBLOYKB9o3L1ZIcmDPwni7%2BZIg24YdrbDwey0Bzbju4Pu%2BwtSyfvLwpSKxZT8QWXSEREc0IHdxp%2BEb9%2BHBSqZo%2Fw8NPG6%2BuZT6c9lQ874tH6cPt%2BI2JwmGz68KekxIUG54m3yBOLQDj1FbIVsbPzgDgmARC%2FUYYRk5LGU2YNdfxIs9qgiyrwR1xqw2PszHuOeJQspI%2Bmt5igdcPimEcsu5vyJ4ATzQsK91OpfxtN1KIHeclHchl0vxKnlDhYzTbkytQLj8ZOJ0vO3qW1IFuTVQn7HuXExzy5liJT9AGwjDuETD9GDEjduHDgOCdEY3MqZP%2FQRZb%2BLcMhAc02bgrivpzTWqWmpz3ZPPhv3cNGILIU712%2B%2B%2BSKB7iJR2q1nPKwECM3WR0vbiJgvT%2FHjtkkLfk1QqLc25qbz0rwowyLW7odybUgXj%2FzDZkMVOpan%2BbD6xhO5rWevEJaIbb98bW6kBXk6y%2Flzsww%2F4tvRsGf6RQrqOLBxo%2BXw5JuY%2BKwCr9YyRNi9PCZMZnfjBH2i%2BgM8mL1vB2TdKqPDiFlJyngQDSst2yJIgsDnQ1gw1oywzgY6pgF7Td9dUnolnw7QpQNJagzwOI6I543imu%2Ft%2FpHNKmJ36mxUnRTQ%2F9cw9M5sqCmsi1we0aKHeXEZkUuJq9XODvLsj0R5UV%2BljsNuIjrMA5%2FmXIgtiF44YUVU06UWhyAg6SE2iozvoWAB908j%2BPymrR%2FuP5QhafRh%2F68O7gfCF%2BXpfY3VVmKsR7t3zCYasoRLr4RZlIFiGEpipGCnNDXs%2BOJbZaYw20PU&X-Amz-Signature=0fff700edb96c51a72f2f7c3b2ac585fe3ea15ea07d5384e59f8989dcc026be1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEQJ3ATE%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIHt4XTM2B%2BX6k0JFRmNGat2UBTj%2BpINLIcFAemUcivNvAiAGl4DgBNtScIhOrLus%2FrvRnaDyGkjKoYQfIGoDH48XjSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM63RU5RNr957yMrqnKtwDfy4S1zQcjw2JPLGAQb%2BSxQ6mB48IB7bs4okL9i86Kf%2BBJcaT9e%2FyjHxTKMd1u%2B51pYqzBLOYKB9o3L1ZIcmDPwni7%2BZIg24YdrbDwey0Bzbju4Pu%2BwtSyfvLwpSKxZT8QWXSEREc0IHdxp%2BEb9%2BHBSqZo%2Fw8NPG6%2BuZT6c9lQ874tH6cPt%2BI2JwmGz68KekxIUG54m3yBOLQDj1FbIVsbPzgDgmARC%2FUYYRk5LGU2YNdfxIs9qgiyrwR1xqw2PszHuOeJQspI%2Bmt5igdcPimEcsu5vyJ4ATzQsK91OpfxtN1KIHeclHchl0vxKnlDhYzTbkytQLj8ZOJ0vO3qW1IFuTVQn7HuXExzy5liJT9AGwjDuETD9GDEjduHDgOCdEY3MqZP%2FQRZb%2BLcMhAc02bgrivpzTWqWmpz3ZPPhv3cNGILIU712%2B%2B%2BSKB7iJR2q1nPKwECM3WR0vbiJgvT%2FHjtkkLfk1QqLc25qbz0rwowyLW7odybUgXj%2FzDZkMVOpan%2BbD6xhO5rWevEJaIbb98bW6kBXk6y%2Flzsww%2F4tvRsGf6RQrqOLBxo%2BXw5JuY%2BKwCr9YyRNi9PCZMZnfjBH2i%2BgM8mL1vB2TdKqPDiFlJyngQDSst2yJIgsDnQ1gw1oywzgY6pgF7Td9dUnolnw7QpQNJagzwOI6I543imu%2Ft%2FpHNKmJ36mxUnRTQ%2F9cw9M5sqCmsi1we0aKHeXEZkUuJq9XODvLsj0R5UV%2BljsNuIjrMA5%2FmXIgtiF44YUVU06UWhyAg6SE2iozvoWAB908j%2BPymrR%2FuP5QhafRh%2F68O7gfCF%2BXpfY3VVmKsR7t3zCYasoRLr4RZlIFiGEpipGCnNDXs%2BOJbZaYw20PU&X-Amz-Signature=5eadf467c44fa78b303dd804d6756fd64449c4ece731a4cbf11a7dd8e4499c25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTF6MMVJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIGaBEwVIAp7msAmXj997DU545Nt3ckGCesN1XFO5Jy%2B9AiEAxzv34ROvhvTDmetbGdePn90ZvfG0oZ%2F%2FvqNDw01LpNoq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDIZ%2BE67r3NEHkJFGrircA8q1kHSrAO164bXizM6Yphj2sly7cY5qg%2F%2FMOo4K87Mr5ElJTQo7FfsYThsmf%2BMNLn1EAyRl3nQ96LYXT4o3yh0g0VvoL15DEYZhsmHX0al6lKlom9m6mIz1tvpJ%2B%2Bi19%2FJP0CmKZstXo7insv6s0cCxOEK7VhNBXd%2B8uBtP2mbT%2BdOQ%2BHMbSsDe%2FkAPwCKI%2FRtt0lhqAaOYSM61L0C5IkiNiG%2B2%2BceonL0fEZQe8ah9TDYN6ZD%2Fndxq7hSHQy4UtRRdC%2FZQQgsGB%2FAzsU5Uog3i%2FkkHvVuJgzy4P2DoIHcxMlbQktbjKWHtC3bGXPlmMwLSTVP9x7d%2FJ%2BdbaDqwArFAzDCnhwqxucRW8WkXKwiDZ2ywKzXVpVmd%2BGZ52YU2FabdIHXxIeap%2Bfwck2YT3Sny9Tzo6MYtUM5Ostn7hSRsYFOe3%2B4wNdb%2Bi9rqqselPNc3L%2FzrU5PJ22XpWrujs6uZr5ToCbaUueTMVMvSjXnGIzdDt4pYnSqoQXqQkhbGn%2BdEsUy%2FerhYYvTNoXWV69dTGGpQcD3kRKzr6jTKK4oc3gIm09ozr3I8%2BQzKvSwLf439ZB27ko9xFGwcbv8dJgo%2BoOXdyWHpk4yj6z7kI3UFwzLhg%2F545vHXqW8NMMSNsM4GOqUBkb3ay%2BkoGdEePno6ELMSEjGdQSP3at0mtQuZq2IC3ZYwWUT8wPF6w5ZAohtlh0wIj9EBsu0J4zhsL4YPzneRdD8t5H%2BfF9XI42T5UUQ515LbwLSM7QKrX3dOxzykO%2Fo1ySqbWOEwwX28kYuLX%2FarB8e04nT63vD85lpeLPDn%2FcqT0V7k7A59pT9ezfYqCS4fYCmODuq%2BRuufLZu8vrYTrx45bKsB&X-Amz-Signature=1b0b205fbd9c1299878d89981f91ec85b8dec676994e26715ae4b566c52dab55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGWYGJTH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCqALQQ6jnBr%2F5nhLP0HCAmdrMfqvjWVxevHYceTdgiTgIgPMHfdRtT0900SOtg4FC%2Fevf%2Bp%2FcBV3oyA0kMXnl3yHkq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDFQMT6TVBe2Yx2swGSrcA%2BYqPa8IgHleKEtslFWYTnrwb72%2Bu%2FFi7IpNGMWk3Iw2tSuJMzq6sxacQaS2zf2qmhbgE9d53yxH83qBKnkMhu4rtRscQSkatPPDB2ACkUfZHLH4PMrrhk72wkQGG%2B%2BbCuhooDMpDBVawoj2U8G66j4pK0NGjZRN0tlHxbne5e%2FkgRUnJy8mPiASqQtmVTx2AHCSKn2Kc5lOCGf0l%2Bnx69MsSIwZttu9y5v8SJlQHmzgkQpxlgW2kiJCgGKGKsw6tOaeBJc6y7asA7cma6Qfiwg6SEJ8535A4hJvufXZzaNk8OqPyJCEVag%2F7xenMeSNpkRrMMDgy9LVQvNy5CT%2Fpi%2FBOkaqp2kXm7Pmy8eDhHuR%2FoJ%2Fxt1E6JHbUnFtbNHMHVvwwouMCa5ZCIvSP01ujGHohhhzoiLjJ8OKmZ86JY5p%2BJ1OLk186E2Hs7T7mRVlIMsx0xtaWSSxliXYyBLHfTpLVDVlooe7s0wb38WbEE4c7bflkYpB0KaeoRifAG0ulEH2itsBkn2bsNHvT%2BcBpMEJj0W44GDj%2F20pkDzB1rKSdHhuVO0TnvXSU1LekZHEhABrWOI8FULuoDBhnOrf1d5c8b0avXPuF2gMCwUrcg38kLe5cuJkU7YjFf0MMJmOsM4GOqUByv7pYgtFL3CaLt8NuFqTnnjs47Gp7E0EWkdHdH2R%2FmrzV0QKUDhzBmIOKClbj8PmecNu2s%2F7RWfwrjZBvP%2Bph5ELWzRbzk%2F2QXH8%2F7RIHO7v7MKab9wG8rHmRONbqg1JhN7AgGEPpVEGtJm%2B1hST2NmYGrJkxtnnNOobCgetAN9lrc0LskPVvQdgLkCOMdgm%2FnLRfTApRJRwoVY7wjTUTHFvRjnA&X-Amz-Signature=b810f501672ddf7f42b0ec27c7a2eb6231a044e901596c6ab27933aeaa8c81ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGWYGJTH%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIQCqALQQ6jnBr%2F5nhLP0HCAmdrMfqvjWVxevHYceTdgiTgIgPMHfdRtT0900SOtg4FC%2Fevf%2Bp%2FcBV3oyA0kMXnl3yHkq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDFQMT6TVBe2Yx2swGSrcA%2BYqPa8IgHleKEtslFWYTnrwb72%2Bu%2FFi7IpNGMWk3Iw2tSuJMzq6sxacQaS2zf2qmhbgE9d53yxH83qBKnkMhu4rtRscQSkatPPDB2ACkUfZHLH4PMrrhk72wkQGG%2B%2BbCuhooDMpDBVawoj2U8G66j4pK0NGjZRN0tlHxbne5e%2FkgRUnJy8mPiASqQtmVTx2AHCSKn2Kc5lOCGf0l%2Bnx69MsSIwZttu9y5v8SJlQHmzgkQpxlgW2kiJCgGKGKsw6tOaeBJc6y7asA7cma6Qfiwg6SEJ8535A4hJvufXZzaNk8OqPyJCEVag%2F7xenMeSNpkRrMMDgy9LVQvNy5CT%2Fpi%2FBOkaqp2kXm7Pmy8eDhHuR%2FoJ%2Fxt1E6JHbUnFtbNHMHVvwwouMCa5ZCIvSP01ujGHohhhzoiLjJ8OKmZ86JY5p%2BJ1OLk186E2Hs7T7mRVlIMsx0xtaWSSxliXYyBLHfTpLVDVlooe7s0wb38WbEE4c7bflkYpB0KaeoRifAG0ulEH2itsBkn2bsNHvT%2BcBpMEJj0W44GDj%2F20pkDzB1rKSdHhuVO0TnvXSU1LekZHEhABrWOI8FULuoDBhnOrf1d5c8b0avXPuF2gMCwUrcg38kLe5cuJkU7YjFf0MMJmOsM4GOqUByv7pYgtFL3CaLt8NuFqTnnjs47Gp7E0EWkdHdH2R%2FmrzV0QKUDhzBmIOKClbj8PmecNu2s%2F7RWfwrjZBvP%2Bph5ELWzRbzk%2F2QXH8%2F7RIHO7v7MKab9wG8rHmRONbqg1JhN7AgGEPpVEGtJm%2B1hST2NmYGrJkxtnnNOobCgetAN9lrc0LskPVvQdgLkCOMdgm%2FnLRfTApRJRwoVY7wjTUTHFvRjnA&X-Amz-Signature=b810f501672ddf7f42b0ec27c7a2eb6231a044e901596c6ab27933aeaa8c81ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULVQGUC2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T184114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIEzRMPc1FgnCrT4gTsk%2BcrsjDyDRsdeeHgBxgijFgJZQAiEAp8XISmbg56n%2F988mq9auKJ2r6lziCtT7JGQ9f8RwU8kq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDF%2BPfAoFXhcw6xJjHCrcA3bYYps7bHVeSwJiYKaiA1ccxoLdB2%2BvZYup%2Flq3mCTxcS2d6XD5wVqYakCKZhO9hxSqLsPzYqgt9h43nYzt9LQqMN71r89kfRkFtq0oAFEw9AYWLNqJEI8I2F9olyzXuh2%2FUUbDwrO8IXM3ocioyYBRXTxVhJKd3Y89URyonuPOZeOI2l8NFD5ncXTBPeO6mGAcgaMKv9huQA0LjvdvpNtaZJWBQCyUQaZXZkLdkuTH1bd8ePSzRc7tv%2Bc9zNZEKd2iwbFqtd%2FNy7Lwq1jVJA6EAKcnULy46gE1upyUoD%2FNmjYNKUN3KQOIKw7hL5FwzXskybRdRieYljKz%2Bkb7yBNjmxG%2Fzr6KUOhODpmfralQWvYsBtyYcpJMXRozT0WIM%2BLMV0u%2Bkyk4e2hMnhT1D0%2B3cGbNQTlxPY%2B8q10egTzlGk4LXaHF4rn2ENwru90Ow0Asp4TgsF9%2BG6mvQPPqPFyYJ8x6CpwNNPc80xDYfb3XD4BYso6v4VfHYpqo4ZwRRcQRqSbMIVH%2FBq7GMTMdVpejoxp94eFoS9D6xp5lCmkGUeu2oRC0k7497mShAR3R%2FTu8fK%2BEIamBWhKEo9uVJ5UElp90GY9DVoA2E8ydr8%2FP0PkJeARAdC3R33FwMNONsM4GOqUB1i4jFHM%2FN3f9o6N3IlD1IIXtyVHYFeLJaJWoe0dn%2FXhlPTYhQjCS0DQVxXzSmF4HgNIKLMKvaAhfH0iHVCTD%2Fbw9Qk4UJHyOF21jzufJGiMbqxhPkCafxTE2CLaMcbr2ggg14ndmF3IomNM3ywewdvC%2FP8%2Btqpr5Tw64q4govA1%2Fxz%2B8DKFcljvzGLPiyk%2BQSVNbRaGnb2XQigf2ozvvn5tBI%2F4d&X-Amz-Signature=54a05f036d19538be14ab10b1f02ec557a339fe5fd0d2d5f92d1365231db9a01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

