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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5S27TFM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDXQ%2FhCrqrPqV5zL3ndExVjIUgiUKu9DhqD7%2FTKTrdXrQIhAIJFPT8gX24lHJDgdvNe%2FjZiGX67NgrR3kDxiGzvWwzWKv8DCB4QABoMNjM3NDIzMTgzODA1IgzeUQj5jGT2HeQVBB8q3AMoju6pJrCwSAD6VMzo8ycVhnQQCS4ikvgUnyUIw%2BfFN9EnemANB1Byr5HMBqXnhgigWFrQm%2FbWinmfWgSVdWAvXktsgAmS6YKOKDQyazpukywxcWnm4U9AsSkESbumnq7wiZQTEoj5FVGDaCSeWwDNkY2b4MbY%2BnXe3YzknxyHyfp3n2u2jjF2Rw4%2ByggHVxUacDAKMPORFGwapXos9TR%2F31iSob5N4cHtwjhWcpzT0t1xWFlTM25%2B1dKOZmlApeBt8Aoz%2Fp44zI3FhT7UEqp10wRP%2FnGwQG19gt6pMrRdGfp9hUmIodpxy67DUupmDpTYaYO499mO%2FQCc1LHtvEVdGMu0FWwdnl9Rdh9bCuKNAjMQMXb5xbPsWQyEA3r%2ByV4J5qwqzwju4eSibZxhLdqK7Gz8QMU24PnalYSIUXEij%2BHYwxA8ONOKL%2F2p76XG5pB899uXa%2BhK0ru2s2ewB5lxpEFl3N73nvXYTkM%2F3DNvSzfgs5A4RiFp6TR9aDaJx1zm7MQJEZMD2lUa4n6fZ0bikzm9b7cgdA%2BMC6Fbn3wagywN%2FFdUPytcWBcvmMeMOSYyomu7Uiq%2FYi954%2BEtyUbLYhb4Gi1cfbJOuhlrjNlNbM3%2BqnwuA44ziaIYCzCrmP%2FMBjqkAXeG62KgrCSYJEjJBT0BfNA2QvPfmzxpufOfUW1uSI2W8wJBFNmQAjbXqb0pG55dpsUQXNn7R0OoacY3I7KqWNLsLmxnmqK5Oum2%2FC%2B2ZzOOo%2F2s4NCseCrtZqX6cFA6hAhfqOruWFntjHqQ6Kte%2Blm1d%2BIX%2BgYE2wdeDMATuoM8XDO4bWvkeNOd4vldCneEpySJVKs115eTclAbwbe3BmgbecK%2B&X-Amz-Signature=9772e06bb3adca3700007cc9813d4657a53be3ff7df2261efe6d12cd18b98922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5S27TFM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQDXQ%2FhCrqrPqV5zL3ndExVjIUgiUKu9DhqD7%2FTKTrdXrQIhAIJFPT8gX24lHJDgdvNe%2FjZiGX67NgrR3kDxiGzvWwzWKv8DCB4QABoMNjM3NDIzMTgzODA1IgzeUQj5jGT2HeQVBB8q3AMoju6pJrCwSAD6VMzo8ycVhnQQCS4ikvgUnyUIw%2BfFN9EnemANB1Byr5HMBqXnhgigWFrQm%2FbWinmfWgSVdWAvXktsgAmS6YKOKDQyazpukywxcWnm4U9AsSkESbumnq7wiZQTEoj5FVGDaCSeWwDNkY2b4MbY%2BnXe3YzknxyHyfp3n2u2jjF2Rw4%2ByggHVxUacDAKMPORFGwapXos9TR%2F31iSob5N4cHtwjhWcpzT0t1xWFlTM25%2B1dKOZmlApeBt8Aoz%2Fp44zI3FhT7UEqp10wRP%2FnGwQG19gt6pMrRdGfp9hUmIodpxy67DUupmDpTYaYO499mO%2FQCc1LHtvEVdGMu0FWwdnl9Rdh9bCuKNAjMQMXb5xbPsWQyEA3r%2ByV4J5qwqzwju4eSibZxhLdqK7Gz8QMU24PnalYSIUXEij%2BHYwxA8ONOKL%2F2p76XG5pB899uXa%2BhK0ru2s2ewB5lxpEFl3N73nvXYTkM%2F3DNvSzfgs5A4RiFp6TR9aDaJx1zm7MQJEZMD2lUa4n6fZ0bikzm9b7cgdA%2BMC6Fbn3wagywN%2FFdUPytcWBcvmMeMOSYyomu7Uiq%2FYi954%2BEtyUbLYhb4Gi1cfbJOuhlrjNlNbM3%2BqnwuA44ziaIYCzCrmP%2FMBjqkAXeG62KgrCSYJEjJBT0BfNA2QvPfmzxpufOfUW1uSI2W8wJBFNmQAjbXqb0pG55dpsUQXNn7R0OoacY3I7KqWNLsLmxnmqK5Oum2%2FC%2B2ZzOOo%2F2s4NCseCrtZqX6cFA6hAhfqOruWFntjHqQ6Kte%2Blm1d%2BIX%2BgYE2wdeDMATuoM8XDO4bWvkeNOd4vldCneEpySJVKs115eTclAbwbe3BmgbecK%2B&X-Amz-Signature=9772e06bb3adca3700007cc9813d4657a53be3ff7df2261efe6d12cd18b98922&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTIIODDZ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCICtOhYuAJIvTnP1%2FW2PmWzwcdE%2FpIUTXCMsOqmC7tMl9AiB7eyKlxb2G%2BxIYrlagyXtt330sObxtEYJpBlPSy6aUxCr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMkuWpWdwu%2B2HpdBFNKtwD0cMJ6ji2uuPur2rROmpEAZmUF8mn7aojrg2PcoOLeQmV1pcLoOb5gXjJAt%2BiVscN4LpW2bP2t5kJGZSYxoSrBH5li5tYKhS1XOpcLLLpcG9AjQN9ULKVNhieNALTutxxwUEvnf7zZE9BZnQtFQuXauvJpKuKFJO%2FRBtXuWFRfCzdOQTbU05rRed2yeuMRMtjF0IkKiLvmaBF%2BFTElxhzYf6kaa2dfruUDezZn1qM6q6mAV2sXQuHJtFmGC7bTsKn55V9RUg3%2Fgk1TWKrewMUWFMBjjTa1YBHiWnWFH0vmh8cnCGFrmX2wDSG9ieNldVSW5tXuUAI51wVsFRVuh5mAmVp67IvjNI7tTLddJeKOKlLoW7YFajVfgTX9NxRkK%2FtrRDd5tkwqXr2sUuffvOt7e99MujMSBxkBafPlDvaUzWccIJeblucD2CZuGVBilso1FNwVaMOptVrR3%2FhMCHZjB89FYVNHH3WeJ%2FRT3AoQofaKoN6UB2Grj19SFlkX5hA1v0pZnMwEftRuiNTwP29uPNAv6l1Q%2BrJtYl7R44Q3LCgwOUUxxwycRI%2FL8aqlGvN6cpBl21Me3JvAbbv7Snl%2FTBhlvK7eW8bdwR%2Ff%2BCp%2FW40oG0VCcXcV8VCrC0w%2FJf%2FzAY6pgGkIW0DkCS17H%2F2KMmNbhvH3ZpVmhGwCY5Ga3f0RXchsLbVMiALAysnlHSePbdKJRf1VtoSNwn1OfGzexexE%2Ffdg7YMjdslBZKz7hbpaDCUVXYqor9r4YvYbA6l%2B51D3ucUfhZ8q8yNKx2joXHLHrQdKu6abV5ML9SfH3iQ0%2FZj9dT%2BYMU5SGgeFcYtse9%2BQhbMv0hG6uEpMX0oDzDdmTe9vlwINkn7&X-Amz-Signature=20f5624cda9255050d7dd21c5fac69a24ded61069365c6ee832cc8c6f0f690ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOFZPFUX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQD6ZdikuZQa6YvPMIS5wF21s7jW9TIHDAMMFwQgjB8XuAIhAKVpKMkjDga0LwyMQ%2B5MkSjlz4pQ0wxh%2FofoH%2FzvO5QcKv8DCB4QABoMNjM3NDIzMTgzODA1Igx%2F9K1I93%2BLiNRWSGYq3APZG1%2F311Y9EL3OpalpbrmyLP6z2TI%2FkUid4hQRLDGvEsfAU8XJ7OCzlGDDUPR3%2FO102Y8p4uLN7K9M6poWG6Pwuz2urT6%2B3UJSxAmZfUugr4hAOFVROGkeoPwhORUW77%2FZakRKycHJCdOtsjshBzKq0XWJgy%2BstRB66K5zxvTTwIJS%2BCKntTRFN63JAveOWuMjyMilWu9pf65jNWvQzSydsMIWUuFey4XHQWWNIj%2B5WZV0OCUg0kvhevS4arqwSNJMubW3WzhhkDXWMrAhuMJt0tGT8SSwQ2KH1tZsEP1s8SOQAg5etMG1FXpMbs1dXd1DbqBi6OhGucMuwKl%2Fpvv12UZcMgmVFzPIWDmIqELSbjE9J6l0EBj3lfrQnW0jj498O9fpmUO4MveyJeoUOJEgno0y5J4FEfOry7bZ3aMV4kAgT8IrF4OALSb%2FgNgCq4OWNMvMQvj3AUyOUgo0yLWxqVEQoOaB8LvroIedQPEHYFp1nUAg8I7bzBsa0svUy5ABTd7gzq7YYtC0%2F40fgHix2DE%2F70xWWYGIzqM8ne2WAqfkGeqyfRkcXvzB4ikoPqBWw%2F0qTAmE3ZI36uCuVSiPXbHTa0O40Ui7BSGJsOQhLZUuHMTxKZFpQjxd8TDdl%2F%2FMBjqkAan2snw3CTTbDKrdP2zjm9QnafszSbVV0wXObHnuGhNsZ%2FXkmTmOhVkivNnZh11GlVMhvsx6n2%2BeXseLaj%2B%2BiTBNyNJMx9vZxeGomhqQjuDqCXpMDQd9Qy4hMnXm51VnewvKlcr2OM5S4gojatwm%2BOqsMFdX%2FvCs9uexDPISH7fIXmF8ILO%2Fuz5Ilxa6suKbtMKTtOytRsMnE5lu5aHh%2FL4%2FuzNi&X-Amz-Signature=72e40a1d674fb2586002842833dde729486a1237ffc10beee665e702413f7078&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOFZPFUX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQD6ZdikuZQa6YvPMIS5wF21s7jW9TIHDAMMFwQgjB8XuAIhAKVpKMkjDga0LwyMQ%2B5MkSjlz4pQ0wxh%2FofoH%2FzvO5QcKv8DCB4QABoMNjM3NDIzMTgzODA1Igx%2F9K1I93%2BLiNRWSGYq3APZG1%2F311Y9EL3OpalpbrmyLP6z2TI%2FkUid4hQRLDGvEsfAU8XJ7OCzlGDDUPR3%2FO102Y8p4uLN7K9M6poWG6Pwuz2urT6%2B3UJSxAmZfUugr4hAOFVROGkeoPwhORUW77%2FZakRKycHJCdOtsjshBzKq0XWJgy%2BstRB66K5zxvTTwIJS%2BCKntTRFN63JAveOWuMjyMilWu9pf65jNWvQzSydsMIWUuFey4XHQWWNIj%2B5WZV0OCUg0kvhevS4arqwSNJMubW3WzhhkDXWMrAhuMJt0tGT8SSwQ2KH1tZsEP1s8SOQAg5etMG1FXpMbs1dXd1DbqBi6OhGucMuwKl%2Fpvv12UZcMgmVFzPIWDmIqELSbjE9J6l0EBj3lfrQnW0jj498O9fpmUO4MveyJeoUOJEgno0y5J4FEfOry7bZ3aMV4kAgT8IrF4OALSb%2FgNgCq4OWNMvMQvj3AUyOUgo0yLWxqVEQoOaB8LvroIedQPEHYFp1nUAg8I7bzBsa0svUy5ABTd7gzq7YYtC0%2F40fgHix2DE%2F70xWWYGIzqM8ne2WAqfkGeqyfRkcXvzB4ikoPqBWw%2F0qTAmE3ZI36uCuVSiPXbHTa0O40Ui7BSGJsOQhLZUuHMTxKZFpQjxd8TDdl%2F%2FMBjqkAan2snw3CTTbDKrdP2zjm9QnafszSbVV0wXObHnuGhNsZ%2FXkmTmOhVkivNnZh11GlVMhvsx6n2%2BeXseLaj%2B%2BiTBNyNJMx9vZxeGomhqQjuDqCXpMDQd9Qy4hMnXm51VnewvKlcr2OM5S4gojatwm%2BOqsMFdX%2FvCs9uexDPISH7fIXmF8ILO%2Fuz5Ilxa6suKbtMKTtOytRsMnE5lu5aHh%2FL4%2FuzNi&X-Amz-Signature=f95b942555ba67bbed41f4fecaa5d773da5456135b15dd6147d5e23ee34fc67b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFVC35GZ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQC0vHP4tNZFnD2faedBCAuh5%2BApAD%2Fpw67iwP4ianY3EQIgLtWUGrUMQ%2BM75YE7cKbop7BuTzZKb1Ws2vH7Ww7WPLUq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDLcShGAL%2F2EFkEKk0ircA9LFI74BG0hzadUITGkLzGnOeekJNjM%2BofvaM9C8X6tf86w2uGQEqaduBRTF3nJ1%2B8DcKJ0sjbk%2FsEz1182yi2yzadypu6LVVQxVwJDc0UJNt7xMuhZEzWF5YvKiAzKRD5ojbwkVnYRGInpABbkG9KGS8hKocajNI1W%2FGvI6btjpaoBnqmns0aCMnIaMPwUsjv7TAognJAkdNTDpOzC8wWsdUh7wzNYq%2BLVOwv%2BF0JXONGG3cV2Xz07Y1PoqnH6w4SZ1HvKwHFrcGY94IyTcwCuocBui7m5h%2FRXnTLbiUGWEhBzhenW6N%2FgoNAAtip0Q0D%2FbvAxt3J9uWHBO2xSopCnCdVBfaLomwzBHPIm5Pdy5ybnag5F92rcu89BJS%2Bopobx2vF2z84AF12gaMYFxv%2FczQ5wwvgxWsq0mHKn00st4b1kS%2Fc8sC5ykoUgl%2F%2B64kDy3I85MpPpvXtQ3CdanCN7%2FxSMDxneXL3kbGzH%2BlCIU5WYIVrxLEf0x%2BulJsXUneVO64ZnH719UHaL3JzWHf5BFXBEH5992BMbJ7GDrTduSFooXf77SPMH3WVHShB2ppl%2FE%2FC%2FEtyiklLZt4cK4T%2Bl4USg4uHdHh%2Bv7wx9AE6P91bFGynoNe2QE6%2B4kMNuX%2F8wGOqUBDFZx0RgnbWYs8bWJZNzmaDB46B7mzwtAqeGb50z6ng6XJZoe6Y9Wxchvv5tz%2FBfTzwwrJZC63Ydw1255zh4GQY1UUvEL3HjJVEn5aQLnMn7RwSlTYDA4bMQYraEB%2FjSA28elNuaGCcKTU%2F70KQVKZvfznR3BtvoEZjSEkrlH4gXqT29bVQugo28OZIwNccNon5thVZF%2F782BJXYwQAmVjVXL%2FNsH&X-Amz-Signature=b49de6d0e3b8291092fd6cb5f7fc34696ca58e58811a8f76e6388a7a3900476a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TK74QYU7%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIFBMv8Tft%2BOquGeFTe3%2FyrO4Rcu%2FlbIQbuDetP3geAqRAiEAxUd71JII2Uaymv12SSvMDmUy4hJZL1OVJvuJmgGVhiwq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDNd9DYKGautjCIwaCCrcA7hus4vFD5NTblKONSmQpZ2a%2FjMGJqFtKk%2ByWPB29LS6%2Be8h9NJ51g07LZIRcIwQ82fK%2FTBlzW6smP4xbq7CAh5bGylfzihDKbFO%2BInKEUejxYik0FFskex7KFPwOSGctkFUr%2FjopvCtJMTM%2BgUfYQ13Nfn66JJaEAoKCJ1dK5St%2BTlt0IE9mVzB6PwgaB8rpNZsFcYbB%2FsOaxaUHjPcfLvSythr9xQw9sdS%2F39MH4%2B4N6Int9ON6qoJazqLhD60a7zrxnd%2BTeiTQUiun4iLMDChB1ziv%2BEY7RMAXMzTXyaLxRze478ToEgspM8y5n7PjfWlDb9NFwJjLULNKb7bCQF8h1RevMUmnAHiD1nXjLG2T1BeY%2FmPSsPyAIuyhYGP5vOZDJ2LVGUVtOnepPoosc71UP2NtBnj0s7d%2F1XtsJIOAAcUeZQqKc9NNqNWysL5pLVTlhm%2FL1aFJMBdtlp4kMAplmoBf%2B0tR%2FNWyteVD9ZyE1FV1Q9LRPPG54cx8VE0Lo5c0KtrWt0Zyzp%2BMhDR%2BD09KH2FOLIneNJpvDL5L4LMmabBDYC64brVgE0r5SYegvYYW0j9Fp0RG4EkUwVYd1J5%2FACgbWEdGVdA4%2BFePiUgw2YnwMfOsv%2FY%2FE%2B9MPCW%2F8wGOqUB4GNVbkh7n1Ab5vU0DYN4fgEJXmRKn%2FRHdXNXPuSXQd9cgsaqXf%2BwumxOysPX08kiYUk9c2ABpnunHvJ6613XKPZQMaAqpfycPi7EKmNkOXihCkhhDVDIyw4%2FqyOVc%2FLd95oVG7PrYRnQOVNwQe46ftwC%2FIRkllnOCI0USX6mHpzI1HiBRctVYBq0Sj7RYVC9S56vSlKm7RxNkXOFg83wMICH%2FMV9&X-Amz-Signature=eba366f034cc38c9a86e0729b5f12b696ce4ede3040d90af26a6c4b1a265c084&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NYEGUFC%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIB1S8LZrUXkzI8xZQ8bkBoki3qGEhh1KL%2FotdnvdnmkHAiA8ZCN9HT1VdOXSAIrU7%2F4gJYQ8YSQoBsTAawexyhvPTSr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMNXueKM4g%2F8%2FXIdLdKtwDKH1XCD03pJ6XG0X5o5VvugJp8sQR3HR2L8xZJEBVNXMJ56OCu8QIPgp0qS1mVouuqVsmc2Jouw2tyJSnbd65SV%2FucgcvulBWE4c%2BrW%2BoalbnjOw%2FkANVAkwsZ7gLKoJS8Mr%2Fvmp7cv%2FJlQCS80oavH7YpqR8XavMaPkL9LIAWPpP04HZ0QCoogMfKlg0PiiYv1TzdTfju18tYIkM9nixEXmwkJxr9gUOwmiRglejycicl8hq1vs2GvDHy527tTE2MA9kgY7fiM1r%2F1mb6sFHXb47M2KvYGfMhK%2Fd0Z8zojxx9ulcNmuaJOO%2FszvRPXm9RDNfqph4FJ78Dz9gAYyWt%2FgBqc9toFiBhLMl331tTEYcOLh4PQlJBic5uHXcPGhPbk7X33m5NPzFEh5ezpF52lKgQBae6N1awjtDNSe7bAeldNERjkuekCYsSxZ%2FSHY20WrnSiYN5zI0IAeX9UzQggwt0WbOUQWvYtzofsoC1PRQjPOI8bqa%2Bdsqk3MZsfXJAaKD7e1%2FutRDBzUgO9%2FINZFbJezmNiLaGQ%2B8iFpbNn9aBec5wQGKtojizHds55TZeKsjT6h5CgLo20kNPcxVMcdufNABoIYZo73THiUMBHfigTCsjxbUEhuAomgw7pb%2FzAY6pgH%2F9B44XWhr335hSfMCmpAAtQIoHgpeKnWkHf9VuNIk9Vjmv%2B1XW93PcO1fr0l8mkZiQSiYYOaJg1ORCGKtx2yqANHjOX1XfZhhkxZcQoro7vOoWCy%2Fq78H%2FuYtrspBByoMAjabZGsQyqXMfvIQ75BdAL76FG0ZQNWFT%2BXalTa%2BztMpEDqrRD8LWyBqlME2lSe%2FKnVypI9ozk7oI113u59J9Cioz9x7&X-Amz-Signature=f65c9b93d62fd172ebca8030e082d21dd1f81b6ef475af40f60525f741b229b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XW35XES7%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQC1wUjDK27Cd%2FD3%2FD34oGMPON%2B%2FN6A%2FFX83x%2BrvbPM9mgIgB9CSeG5om%2F%2FKfQoypwk93zHPrOOvHGmVy2cLGIpFoScq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDNQHs%2B4oZCsdYFjn4CrcA6wCoxsU4GbhlPLJxZnosWr2gMQDOxhi2hyCWvMvS%2BXzyz7sLVpHELwdejLdj41MDw3NzZ4vppAU6c6P4PnA8E9AfaOFvgMjocSMw%2B4iAARsm%2BJqIbkEthd%2B%2FOeHuhQLAJl1FqU5zlD97EACFci6MWYXDf%2Brhr8ofYuZ3YELf8%2BdJVjw%2FaCIdOxQ2pBdPJXfDRotq22G2HEr9wAUFIp9sMLpJmFfCrt4EzUPEXtUuXy858tK9n5lFFVpPyRtcPbDcckUlu%2FtAMgGTxQakMZ3Bn7EHKBwc7RDZQnpVWNRQOxhBVDUuWh3QJ%2FLYtaAoEJbD%2F4qcMm2EFAWnF0lYhMN3JD22Lt0P79HhalVtQTrraHw58h5pJK2sy2WShYtY1ei2OpFV%2BbGaijBRD0Wde84E5kXbFb1C4rmXS0wbGJY1OyPEIqK6%2BrKxbYPho1%2FCf%2BOr7jAs6AvlwTWynsOdDVAwA%2FKarA2FmhS1DTULXDH8ZywzPyhz2AsGQNXK9g6gpdVlocvIj%2Fl1Eo4vk%2BXX1GJs6m8UyidITwptJXIEvU5qXy92ZGG4IS%2FX93hmwl78nXsqBUXjxZ4uzeTm8qDwlvXkOJlFJpAtS%2BuwEL5uSbbhHJKt5pqh5S5EGcFDD7TMKaX%2F8wGOqUBWIR%2B13%2FdkLJALlFzpFRq6uMibUCQa4sn6I4v5aQvzp28GWZ2tG%2FTioVjnxDEEOWUu3Z25zGblcXpSP8K6h126GDVA9cu70GnRpqYTXr64C35qudGTLyHXsv3Y4hLhKpXHqUpEWfp1nFA4pQg09rkUEoWtuV5gZdPz%2BZzCIUbwJV%2BEVIyQ%2BEkQSc2BIW%2BgFvbh%2BCPVtUQzajtUZc2HJmkEVrNxfU1&X-Amz-Signature=c20ab5037cf994fd7821f8ec6dab2c805f4dd239fd6111a74dfedaf94323afaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XW35XES7%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQC1wUjDK27Cd%2FD3%2FD34oGMPON%2B%2FN6A%2FFX83x%2BrvbPM9mgIgB9CSeG5om%2F%2FKfQoypwk93zHPrOOvHGmVy2cLGIpFoScq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDNQHs%2B4oZCsdYFjn4CrcA6wCoxsU4GbhlPLJxZnosWr2gMQDOxhi2hyCWvMvS%2BXzyz7sLVpHELwdejLdj41MDw3NzZ4vppAU6c6P4PnA8E9AfaOFvgMjocSMw%2B4iAARsm%2BJqIbkEthd%2B%2FOeHuhQLAJl1FqU5zlD97EACFci6MWYXDf%2Brhr8ofYuZ3YELf8%2BdJVjw%2FaCIdOxQ2pBdPJXfDRotq22G2HEr9wAUFIp9sMLpJmFfCrt4EzUPEXtUuXy858tK9n5lFFVpPyRtcPbDcckUlu%2FtAMgGTxQakMZ3Bn7EHKBwc7RDZQnpVWNRQOxhBVDUuWh3QJ%2FLYtaAoEJbD%2F4qcMm2EFAWnF0lYhMN3JD22Lt0P79HhalVtQTrraHw58h5pJK2sy2WShYtY1ei2OpFV%2BbGaijBRD0Wde84E5kXbFb1C4rmXS0wbGJY1OyPEIqK6%2BrKxbYPho1%2FCf%2BOr7jAs6AvlwTWynsOdDVAwA%2FKarA2FmhS1DTULXDH8ZywzPyhz2AsGQNXK9g6gpdVlocvIj%2Fl1Eo4vk%2BXX1GJs6m8UyidITwptJXIEvU5qXy92ZGG4IS%2FX93hmwl78nXsqBUXjxZ4uzeTm8qDwlvXkOJlFJpAtS%2BuwEL5uSbbhHJKt5pqh5S5EGcFDD7TMKaX%2F8wGOqUBWIR%2B13%2FdkLJALlFzpFRq6uMibUCQa4sn6I4v5aQvzp28GWZ2tG%2FTioVjnxDEEOWUu3Z25zGblcXpSP8K6h126GDVA9cu70GnRpqYTXr64C35qudGTLyHXsv3Y4hLhKpXHqUpEWfp1nFA4pQg09rkUEoWtuV5gZdPz%2BZzCIUbwJV%2BEVIyQ%2BEkQSc2BIW%2BgFvbh%2BCPVtUQzajtUZc2HJmkEVrNxfU1&X-Amz-Signature=b122b2d8b76f96c9d13ca41545a208006ec69921acc08968e69faf71d8619057&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666I3FWUG3%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQDfx2T4IpK%2FQ7S6UNPxggYD%2BnavNYxoXXVE5kf5lypLrgIgfNq8KzhSVmGSU2Rsm2eFQGGEv1YDjq8hUbaUkx7X3mQq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDPXjar1vg2HnoD0P1ircAx5FubUO8FXtD7lULErHlJ65hDnDBqobRdQJJW3GJFBQMBsDV9qBay7pQCMfwo0Wl662HGs0wLZzVGyvywMb1zChpEOgh%2Br4pO%2FEz6k4jEQYekV6fpvDboRuST7C%2FIL6V2DCLwoLSo3IKehnTmUT2Hj5Y61dtStPjHDnmt8t6SMMVZ5jQstnFDKzgpd2GyPN23jAT5hipjCx82qa1DMW3zY2nWQIEkP97rI2kaAcOg3AD9pfA%2BkTsgvfqDJD0UQfIUG9ezxFJAUuw0UOEyEkddZGqkGUoof0H%2BH%2Fp5JYKZukFYADGYc2w7A9213VaEcPc3BEUyHOoLdbbY2KlwAs2LxqSpPnxinjY%2BuM%2F5FJIlKv2mV3Wu5t26rDgmLJCBh04mbLJS2L4NLVMKumkr0DDEQc7qsXhycd1uMr%2FbiBCjGwUIWJydljKCTIy2lwvRVG8%2BuO4p7s0BlzNtiHEo2l4pJSOqXbSiibuej2cJlWXm6HDg%2BH1pfZJPG2ZeYoTsjDm64UKx3SMDB1FWfERtuQ3zEY6hPjOANcJfZM7lOiAJpPqoYxEujtG8PrPLmwR0FmyUb0VI8MEi0OlT8CHgZgMg8zTUrigcylmteKRoxNUOcO4WfDoCLRJZ3owkfAMP6X%2F8wGOqUB7DXb4G8lf2iB8makMWvKxqqzOvPPNUcn3223yI50fdPMd7%2FoP0XrFK7n6q09ZI%2B%2BE0KFFDQLXIw85rEc1bO4q5Ttotqy8lSTeAtQiM864EpVIcGGxBkdxItbj2zr4R%2FnGrSHDZ45BQCLl9ZO6F7whvS2v9R95KzpQpPX8ul7Vz6U4ZWAA8mKFhPDbULe8aE8TqMAajSQjRTMY%2BQGi2xlQZXOiodM&X-Amz-Signature=71cefc54201ab765d3bdb21199b4a8bfae9646385a230494a97616f656a79529&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXFS63BQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQDDh4nZDLzLYMLzHc2iWvANXmCrp2MDMe1UC0eUiZS7OAIgZ5uN%2F1jgThu2gegVKnSOrzWK361inn1U65XCn8IhevEq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDHVRAZ9%2FuC6ZVf5UECrcA93FDYgzVADCWoGYFiw7YVOSb2vS8zVJ9ysvd%2FI55mRewgQOowYzfvO%2BD0jFqefacGwy1lItrPXa4kBM97DjHkgydwDndaSCfWp9FQFkF7xDy8coUBigdSDioEv25QiYmiKsFOpnf5uwWzVX8yXqp8WgQ1QV6FGOqf4hKsH1RG3pge5JuTq9rnMnX%2BMvyojjZFca11GsSIzw1fgTAEJ%2BpgOr3BI%2BT5OVypKZlFjtBm7wHhTbsS%2BdHTtkN7dX6YvqG9d5czwUmS30Tz3hE3ENoTJaexO%2BUXI3LuqT1vYlBPeMiqf98K%2FK6xDwaj3H4kNsx02iWXp1BG5oviDeRp2deTNsNYAzWdTdnrhDlMthUNy2cNHEL2XQb9Ap8MuUucc3egNSq2oiKXSA5je6Ax3QPpdpOVeaSN7o0rcVfTTcvI7oh39Iqz3kPBHc%2BZtgcqcRG0UiFQj3xgV6kxR6ssASqEyVhAl7hLnpNe066K7LEHriSBbYt7uLmWLfPGqHkrNe6vsxzVv1L727kLbVGeRwv0vPmoTR%2BfqPuLMia97%2FPHb4%2B7hNvSf7IRBX%2Fsnt%2F8fjWBRu%2BJyUWLEXOv4mETOKG5MI9waO2bfwzdz78vZocd3FOKf4C30rTzxBqcRDMKWX%2F8wGOqUBd5uHK0qHBFvFNhDDifmCrH7REL0VdLRfnKUnCzwwYZ2J8%2FfeJw7T2davCNjFykJ9DUva7IgJq21WmyC%2F9gHkIq1S186aIIZ%2BOyXxByUfhBQGT3V9N6Gv7PQGvpSxLh7bvBRmJlrJR8kCTXaH%2Fx3Mg1kox7KWA6X7Ol8beCak4kzusKUi%2FDN1NURjfUTbWqUH6jWOG0MLv74hDecuUJ3dHFJ%2BKKOJ&X-Amz-Signature=a7463ea70242b81395ed6fc1b10873d0e90f10a0c40cd205188f816e206ef10a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXFS63BQ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQDDh4nZDLzLYMLzHc2iWvANXmCrp2MDMe1UC0eUiZS7OAIgZ5uN%2F1jgThu2gegVKnSOrzWK361inn1U65XCn8IhevEq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDHVRAZ9%2FuC6ZVf5UECrcA93FDYgzVADCWoGYFiw7YVOSb2vS8zVJ9ysvd%2FI55mRewgQOowYzfvO%2BD0jFqefacGwy1lItrPXa4kBM97DjHkgydwDndaSCfWp9FQFkF7xDy8coUBigdSDioEv25QiYmiKsFOpnf5uwWzVX8yXqp8WgQ1QV6FGOqf4hKsH1RG3pge5JuTq9rnMnX%2BMvyojjZFca11GsSIzw1fgTAEJ%2BpgOr3BI%2BT5OVypKZlFjtBm7wHhTbsS%2BdHTtkN7dX6YvqG9d5czwUmS30Tz3hE3ENoTJaexO%2BUXI3LuqT1vYlBPeMiqf98K%2FK6xDwaj3H4kNsx02iWXp1BG5oviDeRp2deTNsNYAzWdTdnrhDlMthUNy2cNHEL2XQb9Ap8MuUucc3egNSq2oiKXSA5je6Ax3QPpdpOVeaSN7o0rcVfTTcvI7oh39Iqz3kPBHc%2BZtgcqcRG0UiFQj3xgV6kxR6ssASqEyVhAl7hLnpNe066K7LEHriSBbYt7uLmWLfPGqHkrNe6vsxzVv1L727kLbVGeRwv0vPmoTR%2BfqPuLMia97%2FPHb4%2B7hNvSf7IRBX%2Fsnt%2F8fjWBRu%2BJyUWLEXOv4mETOKG5MI9waO2bfwzdz78vZocd3FOKf4C30rTzxBqcRDMKWX%2F8wGOqUBd5uHK0qHBFvFNhDDifmCrH7REL0VdLRfnKUnCzwwYZ2J8%2FfeJw7T2davCNjFykJ9DUva7IgJq21WmyC%2F9gHkIq1S186aIIZ%2BOyXxByUfhBQGT3V9N6Gv7PQGvpSxLh7bvBRmJlrJR8kCTXaH%2Fx3Mg1kox7KWA6X7Ol8beCak4kzusKUi%2FDN1NURjfUTbWqUH6jWOG0MLv74hDecuUJ3dHFJ%2BKKOJ&X-Amz-Signature=a7463ea70242b81395ed6fc1b10873d0e90f10a0c40cd205188f816e206ef10a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSN4YPRI%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T051355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQDllFU2j7QRIqAO1yQjJ4Xi%2B3c52YGsjOz4PF6DPB62fgIgRpmDA742ODfqG%2FW3WF0Gkj2mis8e7aIRCrnrkw86KWEq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDEb05TWApmL5hFvhoyrcA0ncPpdYld0GHzE2AKsqB2AT6eJnqfycWvBHaK%2F7qGOJhXhx7k%2FH%2Fn5IATPgQ1fsPbBGMQBT1pAh9en8PQCLhaKDAUwwggbOwGODyMJaz%2F1sm7DmvBPsDdClNhL3b%2BH9dH3SZBULr5nAPbURnLGXvvoYY42dTCWLjpeI%2FpoIbz9epI99Oa5V9oUCTZvRyJTUUj1qiKh4V5enfhtUNWx0rfDQQwR0Fotxahnw0egUjHlut46LO6HcH0APlZrltZpbhU3Myxx2X0uyWwBmKAQxFa0JRHNob%2FObhG7IQGQgmQzYsJioalWfTCAEfhjzMaB90gObn3smazbHtQ%2Bl%2BFNESgBdNYCenzSVHyVstQBavstgA64POqrJGRCsuD2IbI2nugRcvEh%2B1PFyEErqiNCsmCinKcbMveIqb1hBrxwRASSWHt3LI4%2BDTnP93vJkiwrxss8f8F19GsR0ZhUXYbrbIg7FBqZ%2FCQtr2nCA3Mt51yXGG36uZZudsr9oXmi7puy7F%2BY5BOjX23nfR1qH2DTNPaZNFSXkSe8k8ITR4uN935P4kxpES32rHrDP1BgyqDDLVCVaS6eEADvgS6Wu4mGMXiPTdzh3RJvPpKd4XySkQmMy%2FeYfqFnLzG7dmp5TMMuX%2F8wGOqUBiKWd9M1O8eXmtwTiOBTwPOryDlimkI38fokxRK0KkKRwUNxK9PVa5GQvgLy6iajuTy3M3uUenaOs6xMfNVuEjfSEoHXve11nRQu1PXYhRnd7e7zEs%2BvyjKuviRVrnXeb35Ucybv9FZQ2Bt7cMu97IbNaVv0VBRvnejJaXD6zdQFFS3SbtXv4zaT1LuiCoWDSvfXdIZANDDaKw2q7RzTroC63RLso&X-Amz-Signature=2ca2b2c335c18318412e670c2eabf17489f88630820d529d167331e1af8089ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

