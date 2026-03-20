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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBZZA6S3%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDNbErKyb9YHPsnK4cwC%2BBoat9KSKGrn3HcX%2FIx%2BzoobgIhALwddtp2qcITxElRujVM2FdFQq4BuSEPlA9iD%2BHZXRTxKv8DCDoQABoMNjM3NDIzMTgzODA1IgxAXZhN8sStEj3Llbwq3ANeXSOWsG1WACNkOSWAmAAMAmtKiOPXf3zzA4dx%2FH%2FtUM2BESIitzgxiRp4ogXEMH9qpH9larohkosu3t9gZotlH%2BIqY4loybPP29eaBjDn6lnqZ5oJZsWG%2BPxx%2BVGzM94ZllYwNRQe4cbhEMOH159bOmdoEnF58rwZ1n3Mr4pJiPyzaSvTloH4%2BpKZMMTjBq83D7m4OVTBI5JwTFvAoNHigW9qQNS4UWsDdsNxTzFgv2OGeFU68LRvNuh%2BMvJ7aElxCxBp%2B1v%2B%2B5A87hWsLyHMyUN%2Bzy%2BbiOlLca7uuVO%2F1l0tUrUby9G51Yb24NS%2Frk5HDfpxV25DGcbAYBRg6BMcIH41xFto5aWcZANhv4QYx1QN%2FAipAqhKDLv54wSNfIe20oCvpnU%2BJ3XesNqgKiN3VbypfKMlHSCJmTBDTWi7L2ssT8xT3FBrl6R19d9%2BlstONEWKDUQh2vJTnv7%2B0jj%2Fkjz22KAIgRHiA55%2FvSQubmp7J06tjFOUd9DLwimRg%2FxwPXaDW8ImbmoKFJNfXp7ifP6wBGm9doX4SfCLWps4ZrXq9uLWcqegg6M92kTss9jWBrkKHmAXYz9E1rljUWL9v3GHp3jSqhWYmxvDB%2BPITc9IXeYsMqF3aa53czCX%2FvXNBjqkASMuTWOkBgM8kkGvJOkNELANp%2BAnleKOQsei6MG6RVU8svSABN0LJ4jZuN7X14MJx34MoYguwBBE%2FJcPMkwsNzIDYJzeRquNDtS74ZngGLIBMbdFQ2lqow34i7qA5Z2OMv3XylePgcY9rXLsyj4F14Iy9Z%2Bp4j1mnFgRkvrOx1DRrkPiz7b3FJhCE%2Bntm6%2FNHxvOsVYTvR0RiW%2ByuhHOrHBaLWE3&X-Amz-Signature=83fdb1c2e4fcd67e5135477ebec2938a2188b90b86ad7adf54cb21238e4af6f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBZZA6S3%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDNbErKyb9YHPsnK4cwC%2BBoat9KSKGrn3HcX%2FIx%2BzoobgIhALwddtp2qcITxElRujVM2FdFQq4BuSEPlA9iD%2BHZXRTxKv8DCDoQABoMNjM3NDIzMTgzODA1IgxAXZhN8sStEj3Llbwq3ANeXSOWsG1WACNkOSWAmAAMAmtKiOPXf3zzA4dx%2FH%2FtUM2BESIitzgxiRp4ogXEMH9qpH9larohkosu3t9gZotlH%2BIqY4loybPP29eaBjDn6lnqZ5oJZsWG%2BPxx%2BVGzM94ZllYwNRQe4cbhEMOH159bOmdoEnF58rwZ1n3Mr4pJiPyzaSvTloH4%2BpKZMMTjBq83D7m4OVTBI5JwTFvAoNHigW9qQNS4UWsDdsNxTzFgv2OGeFU68LRvNuh%2BMvJ7aElxCxBp%2B1v%2B%2B5A87hWsLyHMyUN%2Bzy%2BbiOlLca7uuVO%2F1l0tUrUby9G51Yb24NS%2Frk5HDfpxV25DGcbAYBRg6BMcIH41xFto5aWcZANhv4QYx1QN%2FAipAqhKDLv54wSNfIe20oCvpnU%2BJ3XesNqgKiN3VbypfKMlHSCJmTBDTWi7L2ssT8xT3FBrl6R19d9%2BlstONEWKDUQh2vJTnv7%2B0jj%2Fkjz22KAIgRHiA55%2FvSQubmp7J06tjFOUd9DLwimRg%2FxwPXaDW8ImbmoKFJNfXp7ifP6wBGm9doX4SfCLWps4ZrXq9uLWcqegg6M92kTss9jWBrkKHmAXYz9E1rljUWL9v3GHp3jSqhWYmxvDB%2BPITc9IXeYsMqF3aa53czCX%2FvXNBjqkASMuTWOkBgM8kkGvJOkNELANp%2BAnleKOQsei6MG6RVU8svSABN0LJ4jZuN7X14MJx34MoYguwBBE%2FJcPMkwsNzIDYJzeRquNDtS74ZngGLIBMbdFQ2lqow34i7qA5Z2OMv3XylePgcY9rXLsyj4F14Iy9Z%2Bp4j1mnFgRkvrOx1DRrkPiz7b3FJhCE%2Bntm6%2FNHxvOsVYTvR0RiW%2ByuhHOrHBaLWE3&X-Amz-Signature=83fdb1c2e4fcd67e5135477ebec2938a2188b90b86ad7adf54cb21238e4af6f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMECVY4D%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIFMlGM%2F8%2FrKnlIdvKc4u83e0dhyEWwnrdAKZE6b30RB%2FAiA2fGqXbDt6uAAhdhZ2jT2yYFXLFo35yIFUuBUgJXbo2yr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMGOlrCL6Q%2FWhDHxQYKtwDlOgihdn4%2FlxAs%2FZ7tQ2RRga%2FaKP9j%2BEES94ye%2Fa8tTDTGBuYABscr4CV2Lw%2F%2B6IouIG5ZoIVajBT1dJP6I%2FKByxgR4VobYDRpuvohG%2FTL5MXAcxD1sbmTJqaE%2BAfMLAhB4uG%2BqSSB2ItGS%2Flw8uDrcg78oM1jCSD104As%2BDM%2F84HwLY4ICNzPW0raDbqDiQh6ztIOrnRnfdnr3TbvX4ZOCfYpVuvHTLIM5mnrQHZbCpnlJihqm11VUOBGRH%2FcAtt6zO%2BnVt%2BxgJouddiVB%2FduKlFomIabktOA53kyoHHhKg46Bl2LLNnMOBGJ7LCUgnTchDimcKAcXMYMyBGQbhmkpik7dsv%2Buz6gET99LR2cVpK66VK7Crd6bo5XLz3Yo07JLtB04VheHaGzAs7U3L9xEBrczFlOlyKErUsoZcobyk0yV3fHMRCMbD6ljuO8srNRXIC8RrgzILxSqRBALHaZkTS%2BVLY6UTtPSRhGQcRf2ZZ8SvTzx8ioSXvQHclFaBODw0rf31RimozyGZ49VCnPAfCw6gZIP0MxDozdNEpZh68zp7jyuItB7aZarOBmgPkXp03LCOeFzlqUT1BYI4HXu0csAIBApd62wxjsRpkqSbHmw75XN%2BHiPHkZ9Mwov71zQY6pgFW%2BW%2FASrWjTgfJWZe7KBgiRee8QhYsao1z22kf9BgFkxYLK0ooKQly1IsJF64Jtp8klWLJeNxhQlUjxo42bvNaE5RR68i8WudpdtQ%2BZrmw%2FKlI8qb3dG50U34tPwOMmZ1un2lb3KQ8E8Y%2Fd9wy%2BB5%2Fqwc%2Bcr772FiC%2FJpwGD646YrteTmjNsypGYYn185GkBTHRJM8cCEhfshAw0aZtjKsYWrdRDOp&X-Amz-Signature=aa3390acadd2ecd2c23d79b15d00a80c2956052201b4943ac198ade02700a612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LQ44XOZ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIGMDelpMkLOVm81Kop43rXzJqlgs7%2Fk0atTJfMPccfVEAiBwa8m5YvxolVnQQrL63mT7tzEtulUppi3PT9EkhpOi8Cr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMHZp5PbcMDXd1hZpeKtwDKG8DWeokSa%2Bcvoa07mNJ%2Fl0M4YnILDIbnkyjO%2FUeoGXHg8D29QJDAv%2B8ksf37jgFW9xS2mq57S7nwB3KQAQXAUZJXb8DeMy2Qtoo6y5rbjhMhXMhQRNnAuptqT2cL30r2R3GKRkPJt4E3GjY7KDf2ck76oY9DcExkzGeQPqUmdKxoRb%2BLrDytn3dZ7BYojpeHMMoBLhSIIByGyWkV9U%2BAWv7OoL8%2B7C4SUfjNFIWWU%2FzQNsT3CqlxBzPHwcGYWkgbrG5US5uGRdNal6fhz66JqBp8vGlrA5EJPJGvw0QuCggZdTqgcZaIdDfULKI17InsdLYbJ1Jg%2BXLaMTSYpI%2Bx1xwp1GNBWyEqzGN2iKYRn4NQ1BzCbwVnahvg0YCIp2YpCsbEv7ps2PnQASrgyqfgaIIy9nSXZyuHx%2FqxwxKYM1ni%2FTZ6vcFdvqWrQWBJds%2BoWFSb83sKsJa8S0lPWmgoB6PDaFrQLnkcm5XHxyq8Tl%2FWs%2BpikcqeR2DSKzFG35NSZyBUGynSf4hB1SLQyfF%2Fz75exV19fL7G34DFcv3fnT6W%2F2lWhO5Q5T1WH5Fx7Ahh75j%2BadLU2FVrHChfz86NhiIuimCarq1iwf48XPd5O3eBLLDyuXVNHnhzugwsv71zQY6pgHqEtCYYIURg5dUEGKn2CrD13Dgc2T1jsnQ2SI7Z2jjJRBfU0%2FQB0fLUPod%2B%2B5wzA%2F7Vl9DPLLcqJWtZFeSvJB8p5TtkLTUbKK%2FvFhO2JtH27GiH%2F3wu3gS4iZMp9ae8uOvFFF%2BdvmH01Ex85iBNGla1%2BI5maafh4RlNEeVU0Fx6HHi5BzyawG5n4ZAHRVTWqkAvQhpV%2BtloPsAsnC11bMBINE82zvG&X-Amz-Signature=c59992bb7458abcf6d3aa6b63987356c82af94ddfa2cc3852bfca00be8fad4f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LQ44XOZ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIGMDelpMkLOVm81Kop43rXzJqlgs7%2Fk0atTJfMPccfVEAiBwa8m5YvxolVnQQrL63mT7tzEtulUppi3PT9EkhpOi8Cr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMHZp5PbcMDXd1hZpeKtwDKG8DWeokSa%2Bcvoa07mNJ%2Fl0M4YnILDIbnkyjO%2FUeoGXHg8D29QJDAv%2B8ksf37jgFW9xS2mq57S7nwB3KQAQXAUZJXb8DeMy2Qtoo6y5rbjhMhXMhQRNnAuptqT2cL30r2R3GKRkPJt4E3GjY7KDf2ck76oY9DcExkzGeQPqUmdKxoRb%2BLrDytn3dZ7BYojpeHMMoBLhSIIByGyWkV9U%2BAWv7OoL8%2B7C4SUfjNFIWWU%2FzQNsT3CqlxBzPHwcGYWkgbrG5US5uGRdNal6fhz66JqBp8vGlrA5EJPJGvw0QuCggZdTqgcZaIdDfULKI17InsdLYbJ1Jg%2BXLaMTSYpI%2Bx1xwp1GNBWyEqzGN2iKYRn4NQ1BzCbwVnahvg0YCIp2YpCsbEv7ps2PnQASrgyqfgaIIy9nSXZyuHx%2FqxwxKYM1ni%2FTZ6vcFdvqWrQWBJds%2BoWFSb83sKsJa8S0lPWmgoB6PDaFrQLnkcm5XHxyq8Tl%2FWs%2BpikcqeR2DSKzFG35NSZyBUGynSf4hB1SLQyfF%2Fz75exV19fL7G34DFcv3fnT6W%2F2lWhO5Q5T1WH5Fx7Ahh75j%2BadLU2FVrHChfz86NhiIuimCarq1iwf48XPd5O3eBLLDyuXVNHnhzugwsv71zQY6pgHqEtCYYIURg5dUEGKn2CrD13Dgc2T1jsnQ2SI7Z2jjJRBfU0%2FQB0fLUPod%2B%2B5wzA%2F7Vl9DPLLcqJWtZFeSvJB8p5TtkLTUbKK%2FvFhO2JtH27GiH%2F3wu3gS4iZMp9ae8uOvFFF%2BdvmH01Ex85iBNGla1%2BI5maafh4RlNEeVU0Fx6HHi5BzyawG5n4ZAHRVTWqkAvQhpV%2BtloPsAsnC11bMBINE82zvG&X-Amz-Signature=d9cd03ae12626217b5b3aaf52a9fdfa33dd748c43c7d8934110ec19037de14aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRRP3V34%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQC5FWt2KPrH0G890V9JeTWzHbtxTiSbrSH17Z21G9MKagIhAOc%2Frh9dJGr1KN8X3j1AT2yMBCX%2BFA29QvFxcV4b05aRKv8DCDoQABoMNjM3NDIzMTgzODA1IgzaUWC%2BbXbvKWOAGacq3AMZcyZ2TdvKpNzkf6hTZbQyLA0Sst8sOqDMhKAVe2Un%2BpJHh0y8ysb%2BaiOdQCaOyJ%2FhfrFc5fttR%2Bqik7%2Fd%2B2KAfCGgqTMNODqDAc7B9a6sQ1UmqOizrvv%2FUdLlRSUPGzWbNFs6V%2B5dILhzLwGKFsTI5Ym249GDT9W%2F7DyBf%2B0TqjQc8henVa4k1lP%2B6BkGSEgu1Gg4UJJOQ9USGHercUOBqUsFtKgdip1JGBmXynhAwMR1OGMumgjF0OFyOfSOrjEdEAGmzeE4OF02Ttmz%2BqH5hoFba1rl4n30luavPzVjsxwuMYJ%2FxArMvm8k88I52L3tXnQ0B1W75I9xh5wQQIkTatLVUfVUKCpQ%2F7JEGKrwtXHdHvcw0htVTTagniW1ZO6AjJ2IcdktZFsOfpMhnfEJBfpmwmToA2WTj%2Bry1Iz7XjqU%2FM0%2BnHLTFiD1NxvEZ%2Fuz98WUazauUYXtpOaeMmZN%2FnOviuahk84jZQWpxAxEaGS8urNRlx%2BOdvvThTN%2B7zq2b8vYSmlPbcYt2B39GXoXkICWn6IFpQeBwMctP7r5ZU4NjBqip2pf5WVRP7CMvZyWkfywA3PFLBZDr1EsvGgcjHQEcH2BCUsc1E8U4QEG3mawvwnbQ0dY%2F%2F79HjD3%2FfXNBjqkAWtZoP9CiGZB8p%2FLbPcxeVFm0RQk557ngRozznyCLxb6HtgiT9OJyJxNzNe%2B5aDYaTra%2Bq39WFWXWRzaAvKxWhm6BsDhdY%2BbFt0bQwi2HWtdhNVhIm3L%2B%2FedzD%2BGX%2B3tlDuTSqsXnzY2FFZ5XkHu2Ug1d%2BaRX7gD7Rri7whs4lpiHHQMMGFQrHunnVzvQzeFjv%2BHb24YWNar9TZY3fQWZ3UunNTB&X-Amz-Signature=c6de7cb89ade3208e478e790b615241665f1f0938ca3193ad2811a6b55bfd5bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7N6JJ33%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIH%2BD%2B4aNTFgtaQamIfWjY3usxZ5Si71kBT7ERfWn0y2WAiEArubF1ZNQaoihIPaN5XbhKe9xETHZ1nbR1W%2FDwqo3cv4q%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDD%2FOfPlWviPo9afiWSrcA8ew77MVlEbMucGHeUWgKRFbfBee%2BAXm%2Bw84uKzFaobTchjukhNOuy3VBb2dwd1CpUzNMk%2Fn6SeEqVo6cT3cEFYx9vj7gjnwYUuWY7AS2Gtlfiaemo7pAW71NRBBgmh%2BwurZ4yosiuGuqjEo%2BeDZr8zpOiDz4CvsLuWJ4WInqHsD29LK39eecqDX9Etwrqfp0Ir8rJ4OxchQXBjU9aBRMEM%2Fmyyb3bjlHLzcXOMBWadMkbky2hDRkX%2FIhCHO3cjyzIFqquAM8MLr%2Bm13Qao%2BQIVcxDmcDewrMgRJt%2FcnuxDcGsjvmSUO2IvjIK3cRSGOojWjdwj8CUUg%2FpDCwX2f7Mlmm%2BPfqIvg8oKVUWQDjY6g6M6smoheFrHqLMGEqUJn7Iqq2y39Bo6Q1fPxoxP3rQjjzZMDyUqcS13Y8MGgNY5ZZuJA%2FP6NBD7T1qj%2F0GlZsSyyme6d%2F724GzOAe1gB%2FFRL940ZGWQt%2B1gvTj%2B94lm%2BbezSgPoK6qKXI6zqaNppPX%2Byq5SxaKx%2Bz0%2BsbSGxvvFddCEE4KNeJKTLLnFvPC5izD8w1%2Bn3iF9tiJhpTWXyJJONdPxAAo%2FeTsNed3AWi6Y8BI2t0R7eWnl7oSDz8WX41UhjDo8G65959Jp%2FMLn%2F9c0GOqUBD%2Fej8NQmsaINtxseEw09QrWojPhSUE7Enrkf6YBiKnQHA6LJJzBnH3EQqvKl%2FdbbqXBNeA2kOklJodaTM%2FycGMB9V3eQVkN9hWY4e%2BxMupBit7GLImgntNHzCRI8yl6nz5ShpANwBv0m0gll7eHs7r6PHspmq5koiNN8EPAE%2Fyeek6Eojz4zeJTrcwVZ2jmH2B93GUkQrZwtoBxw3CzTB59VcYLl&X-Amz-Signature=977f653c6cc9beb6829f299259eb651c9a8a52dd8cace9e9a40d61654c790fb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULGJBVJ6%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCTqpAIrQA2XBt3yuK4zrN01IDTZt%2FnEBnmKr9xXUjWxwIgGZSkbfZrVYvRrK2X5CYVaJUNUKtSTbxltD9clrTT1GYq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDBFD%2FSwHQTplkh3fPyrcA%2FkTfbXqg7kHHWjkbem0TBdlgYY4c38Jf%2BLavjuCtTtktWU6RQR%2Bs7kodwZCOy7c1CCqzmIEmpYzUStsu85zm1k9lkt81tX17yrNwB2fiz%2F8Ud1AgPsxhanJlpa%2BuiZ1QxSfiFC7PxS8RiTiUH8lXT3L%2BTBwy%2FDrXgvKkwGclhoL2AIxdClvXPKkfckLj%2F6iMmxxHpTXCCto8s7MqBtUbe3RjyJajHMqRam6edfYKx5W9roCTrkY%2F1t8mqpJbtkY%2BOA0yqxi8%2FWi5jBTqg5ALVy1ddNDQ1dwQDNGvjntbzYHVS8h0CyWJCqpqZUahz1C7MQ30O8ua2%2FRwhM3n%2BYw2lmk3h2IL%2BKiC7Zqds%2F6Ni7xNP8bFLDPfUbohAJXpM3g1g3oCnc4oOauDRfxUaKzHbJ%2Fz3tRRktEdT2H8IF6gnCAe7xEiIp5v35IVttmZFIzZEpqO6T7PywGe%2Fb%2BcgkRHUKsvu%2BPARMyiURSD4l9UIuOW6BkZPqVt%2Fr%2FcLAO4gydb6r7G6sdX756j8IqBRPMwXndWaBLL6gdDWIUNMnwwZfwtV%2BOZ1ZV3mOlHoyGdR6h9%2BOtYBEng9MrBY%2FtL8urhogSs4VNry7PoGCMJLJG94rQ%2Fget6frEj9XgY0ORMKv%2B9c0GOqUBI0kfXPEqvyYo6XDAokV3IetL7z4cFugDpvAYuOKJgCZP%2BNkNyUwOMdGZBF9v1FWX%2B145I%2Bf2ZPQ17zhlT7yl2UEQZN1ua9cS7f5fIOgAtheWryGWiobwbb6M3Qxh%2BflZfGXMh2MmsR05jIn%2BuSrq%2BGnyzsALmBBGIPBI%2Fv7Pw8Iox498igzooQRsO0EZbbdn5Bow72vr3JmByOdSwaTBsQcrcWJv&X-Amz-Signature=b9106fdb7faa21ce415e4c5f11e77f279091b665d69827361e8ef8a2cd881f91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOG5KICA%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIGM6o%2FKcSZ88XXcrbqDX0UZtjKP%2BPY4n2CFrJ0wAyrmXAiBlVK4qwI0jR430lwqtNiYePaZrqkP50Q2%2BjFrPbDZzgCr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMafAhuufE%2B%2Bn4pjqKKtwDjhxMFKM6qN1wRDcZHTWVDXepWMMjLaOv86YPApUcx%2BUuwYsqNova9%2BINwI6EjGppPaOcgHzLG%2Bp5SRlJ2OnAnLOzqDGcRBbrC99doLEZDnSwfdsQopzOcTSZeYlHKWX7UVGiS6RB8y3boKkdJ2oy255T1sn1Zf8iIbFBE9XN%2FU1kAGmaZ%2BXfvsni2smRXl0HClO4btcxDhKhIKLsTHU772UIGlqX7YfL8XyGMlz6kXZi5ie6Zj82PPBYg7a5Dktijee9%2FEXZZtktfUQbzp3eZ2D8Z0pEkonxg8tf7vD4vwMHN0CClezRWSe6cK1MsNMAe2WCO3QKbMmtJzbSDOvKcGe2m5KXYldKjN%2FUsbn%2FGHt62BwkOwGvJlM4WBzroLzQravnEe88ryngmI37l6UT0r%2BTwsRqFQB5EQDSuMqPchuk%2F2TemLVxy6PS3dhTGj8e34yRnPDxp2G8CXeI6SbczXEG2L7SJ8%2FfmS228DY2ZtlNcr9u2kKFHRdS%2BgBsLCvJiDFRraFzhHDIQngDICqxCjUKURWwhMEuqXruBoso4LZaHnisfUZ5jvIqOYnmom3EiSAPM35IuOIl8SUsqsueKI%2FUwvhH3EF09gq77TWRAw6Wzbbg%2B2kt7zhkuI0wxf31zQY6pgFKI3fp%2B14NUp1F6JN%2FCVs5ueykz53eZKsLyCOfRAG%2FMViSbLsx%2Bz%2FNhzqlGvLwOJxW5LrcRURt8J7RB24f%2B8keo770qez8oaO5cwkWgg9JlTa8D%2B5cUiOawKkL8fqoXKgS6O2ALdWvgiZ08Ua8d6Icqh5HH%2BpsxW5oxAqE9dhWyMUMdac2crdl9OVvQacT%2BZFRsLVL8Wwrtli7IiLKlkBYy0l%2FaKMN&X-Amz-Signature=1f01ae1f00944110474747ea47136c3ff3e34e3bb2a7148d0881a7488ec11207&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOG5KICA%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172639Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIGM6o%2FKcSZ88XXcrbqDX0UZtjKP%2BPY4n2CFrJ0wAyrmXAiBlVK4qwI0jR430lwqtNiYePaZrqkP50Q2%2BjFrPbDZzgCr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMafAhuufE%2B%2Bn4pjqKKtwDjhxMFKM6qN1wRDcZHTWVDXepWMMjLaOv86YPApUcx%2BUuwYsqNova9%2BINwI6EjGppPaOcgHzLG%2Bp5SRlJ2OnAnLOzqDGcRBbrC99doLEZDnSwfdsQopzOcTSZeYlHKWX7UVGiS6RB8y3boKkdJ2oy255T1sn1Zf8iIbFBE9XN%2FU1kAGmaZ%2BXfvsni2smRXl0HClO4btcxDhKhIKLsTHU772UIGlqX7YfL8XyGMlz6kXZi5ie6Zj82PPBYg7a5Dktijee9%2FEXZZtktfUQbzp3eZ2D8Z0pEkonxg8tf7vD4vwMHN0CClezRWSe6cK1MsNMAe2WCO3QKbMmtJzbSDOvKcGe2m5KXYldKjN%2FUsbn%2FGHt62BwkOwGvJlM4WBzroLzQravnEe88ryngmI37l6UT0r%2BTwsRqFQB5EQDSuMqPchuk%2F2TemLVxy6PS3dhTGj8e34yRnPDxp2G8CXeI6SbczXEG2L7SJ8%2FfmS228DY2ZtlNcr9u2kKFHRdS%2BgBsLCvJiDFRraFzhHDIQngDICqxCjUKURWwhMEuqXruBoso4LZaHnisfUZ5jvIqOYnmom3EiSAPM35IuOIl8SUsqsueKI%2FUwvhH3EF09gq77TWRAw6Wzbbg%2B2kt7zhkuI0wxf31zQY6pgFKI3fp%2B14NUp1F6JN%2FCVs5ueykz53eZKsLyCOfRAG%2FMViSbLsx%2Bz%2FNhzqlGvLwOJxW5LrcRURt8J7RB24f%2B8keo770qez8oaO5cwkWgg9JlTa8D%2B5cUiOawKkL8fqoXKgS6O2ALdWvgiZ08Ua8d6Icqh5HH%2BpsxW5oxAqE9dhWyMUMdac2crdl9OVvQacT%2BZFRsLVL8Wwrtli7IiLKlkBYy0l%2FaKMN&X-Amz-Signature=bac07863906cf5c2e796ecfad9f1ea87a8c16b251e9f2ce0f9198771cc043d03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7L2FKVM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDxY6L4ODa1GOzbDdF6JUisN3J6Bfhbc1Iwem67Og45iAiEAjFppoMi7YbgM3t%2Fr3V8pam6Wqz5L7Xygs4sR3dkdftIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDBLNWjGuCBam8X9OkircA3S96mqEbtraZtmS%2B27xfRr5VOZ4WT9lAluhRIg8Olu14nDQH3rAnUxwOG8aF%2B7giSEhkXwnLrZIbXAMlD5SQTSxUCZR8wp53m15iW9kltllb4PAg9bSa%2Fp6%2BEuXlZJdyhOQKAInt8%2FE5kF3qYUNlm6fphMImILkXeinMElwOifMyPZc0%2BWxYUmGGPTkOH9Zzv9PrkZfs948U0WKL3IjJ7E1hUCUDDGkoOzEXlAGnbxi3m%2FqCYsQ3sNlIeTiHzY1Sa94tPr9yqgvL9th5IZYx%2FMY4WM%2BPr6xYRH428Q0scqs22nmQoVmdSk0qw%2F464XVfksNb8kdajGIgUdRSd5bwFJL4qdUd2lu2r90H3xENSTdmkLR%2B353lryeP%2FlytUOdoHotTEjB9T5Gr1nyEEdF0VM53QFeU4RwEstME4TH8bSQjeJOL0i2%2Fu3%2B%2BO7f%2BleEdzFvC3U1QMi9k%2FXUFcoamePYqDlcr0%2FsX0VyoRswgM3lCUq7koPAQqAnIZBTgsPR8a0lffWixZldKihjIMbRY9cFXOdGYUcqzu3RgGZKcAIcJqHaXoUW1kOs%2FOL1TrJeyR%2FRzWEBEC33M3R%2FiQ%2FOvGAtR4dUSW5ShOhW0%2B%2BIQa9GFegE6lA8PMEy6toGMJf%2B9c0GOqUB1W4oPcy5Zh9Ga1s9zT5%2BQdeig6zLeMDSJzdDk02YA%2FzhYogYn8fmWfd5V13vJdPdsAaImoLTtiXAyKpvWKBNzvWlYnMVIe2bdI47WVyiVev%2B9PTfg60JajjmgntZNQAVjWiLfnUzezm5oXzUIERBV4dJOs6CsVZEJ5SuEj%2F8CT4z8%2FREEtlpgjVEexUS8pJ4Hlwc0w6U8PRgN%2FGIYU9%2BDHUJ5YjJ&X-Amz-Signature=a88fa702bccb6dbff55c409951df63e8a41b2c17fc2c630d681cdf409e8dd7eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2KGAZEJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIGx0A3LHS2%2FGi9VuWiWsMEQnEfzPTCLJJJMa6wowjzPNAiAEHIoKPL4xHrFuUTVAERTsbhq%2FP9nZt6RWpltNhS5%2Bhyr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMJ06Z4%2FLmZn9yc1%2BNKtwDhegyeu7E3X4EGmspdN4hHsmCkTPDm34hU%2BuCit0v80%2BiP7TZqPPQPtaO60nvlG6Ugx0WLLHe%2BN7FBPWTz6JgiBGxVuwSd1SuKNRmgDQWIXtR0ut4LltDj6%2F1ztW9cTbrTLIlh6KelDhQ5qQ0KW58OytBZbRtGFAG1OvjmLW23Bd7qkL6%2FsepJ2FpH1c30RGzSQuA929YCLCXMcOW9LuYuFgioIKcgPsjTwC5EIIluyXXXd8DJqZgllpp6crObgvJq7bjBUgv7U6wFf61TeLAZF1GOZH%2BvzTgkcsGF8D4eiDykSyxUsCRbD6R42N10im%2BG7WOEV4J1JqOYr6H6NyvureVt68mjYNghoQQ%2BDLn%2FR1lrzcsC3gu8Q4%2FLBJ5GRbkqnDdq670PmHY0dhEXMIeia0cAN%2FykGwgqqhsjCHsAOYEvxo1kwAgqFOnoy8VWTwn%2Bql%2BBlc2Xmp%2BGBIevyH%2BRHWRJDdBQ6jrkvgT2DC%2FBPZMuZ89RZXEyvO8ivYAUkZecqMiuAlbBLkYdXQr6o9zgXqNCqO9pVN%2Fuy1QT%2BuP6MTT8W3ZaqOHfpRd5HFMLx4uzoglQfs%2BkhL6fiyezr8XA4Kg89ERaM4gfUr19aaUiE10gi6mSscCaOcOGnowt%2F31zQY6pgFNdQ3P3aBla2coctcm4GEHfV2xMv3%2BLIMEgCvQxKm6DpwCiI87Z9yMEc7rhInME055%2BHpMCfewL8%2FXYIksecTzaM8%2BluuFFte%2F4JU%2FIgsk8jh7GTx1oxt32RJVG5qtiB%2Beu7ZShB4YDswc%2FEuvcayneyiVpGI9C8dS%2BHDOaJrmEcYbgwIR4I%2B0ygcE0aP9401cs5refdQMOFMjg1%2BrRh%2BJwfXOBSoi&X-Amz-Signature=8c2929f1fb4e30f046968ed6a7b2f76bee8775d2b51859aff0eadd977d18f788&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2KGAZEJ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIGx0A3LHS2%2FGi9VuWiWsMEQnEfzPTCLJJJMa6wowjzPNAiAEHIoKPL4xHrFuUTVAERTsbhq%2FP9nZt6RWpltNhS5%2Bhyr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMJ06Z4%2FLmZn9yc1%2BNKtwDhegyeu7E3X4EGmspdN4hHsmCkTPDm34hU%2BuCit0v80%2BiP7TZqPPQPtaO60nvlG6Ugx0WLLHe%2BN7FBPWTz6JgiBGxVuwSd1SuKNRmgDQWIXtR0ut4LltDj6%2F1ztW9cTbrTLIlh6KelDhQ5qQ0KW58OytBZbRtGFAG1OvjmLW23Bd7qkL6%2FsepJ2FpH1c30RGzSQuA929YCLCXMcOW9LuYuFgioIKcgPsjTwC5EIIluyXXXd8DJqZgllpp6crObgvJq7bjBUgv7U6wFf61TeLAZF1GOZH%2BvzTgkcsGF8D4eiDykSyxUsCRbD6R42N10im%2BG7WOEV4J1JqOYr6H6NyvureVt68mjYNghoQQ%2BDLn%2FR1lrzcsC3gu8Q4%2FLBJ5GRbkqnDdq670PmHY0dhEXMIeia0cAN%2FykGwgqqhsjCHsAOYEvxo1kwAgqFOnoy8VWTwn%2Bql%2BBlc2Xmp%2BGBIevyH%2BRHWRJDdBQ6jrkvgT2DC%2FBPZMuZ89RZXEyvO8ivYAUkZecqMiuAlbBLkYdXQr6o9zgXqNCqO9pVN%2Fuy1QT%2BuP6MTT8W3ZaqOHfpRd5HFMLx4uzoglQfs%2BkhL6fiyezr8XA4Kg89ERaM4gfUr19aaUiE10gi6mSscCaOcOGnowt%2F31zQY6pgFNdQ3P3aBla2coctcm4GEHfV2xMv3%2BLIMEgCvQxKm6DpwCiI87Z9yMEc7rhInME055%2BHpMCfewL8%2FXYIksecTzaM8%2BluuFFte%2F4JU%2FIgsk8jh7GTx1oxt32RJVG5qtiB%2Beu7ZShB4YDswc%2FEuvcayneyiVpGI9C8dS%2BHDOaJrmEcYbgwIR4I%2B0ygcE0aP9401cs5refdQMOFMjg1%2BrRh%2BJwfXOBSoi&X-Amz-Signature=8c2929f1fb4e30f046968ed6a7b2f76bee8775d2b51859aff0eadd977d18f788&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q77DWG2J%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T172646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIGC1M0V7GWWgN7n45D4mDwsrSLej51GqPnXJY5EAUPBeAiEAxbpJHswG3JW4DTvPtzB7PNwKt7hFentT04%2BVdRtp1XIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDNkqLZ1XBkIgsJN61CrcA5b%2BrqgRt2XE7dXZB9euyE%2B7k%2FpJf44OceC%2FjFHafbzWArXmkZC2NFkNJVaSlTOUPqjd3JqE2v4f0wOy8vlFbyyRWYuubRgEuS%2FDYooJiGV%2BPhIklbgcoSv2VGi21V6f%2B8Ikul6lrSfPKmbH1JVl8ycjaEsvNcjv3PVu5tW5Hwffo15ivK%2BbxEqRepHuRy1tBAEuq997YryEly4dCmv4OGJwLXIZSYqP66Qtj3EZuqjXk01opYi6x6d1JUTD5TN5t9xG43sAtzo0WYKZwOele79wmK60hl5l%2Bi3H%2BNIzjYJRL5rxyJT3G7LIM02G2f9cdsh6m6%2FPM8FsVKifTlCntG2Qd1RYGJzcqfjeGpNZH5zn09bt1D62rNo2l5zkjofEUpXB5JTkHZ4podEA34UY%2FRz083hGdFfo5qiV2bFxCc0%2BXx2L85OyzsGlLiwNJqc5lkE61G3jFeV6bh7N%2B3votEt2fMbY79Uaqay%2BQQOkdEi1vrfU2aaclT9HoithqcvLOkCFNVA9M%2BlPzgoICT7WHmuM5y6LPxjZEgrKFisvmVu2FHhTBT3uq0Cvv2vW9siomBZkbo1scaG4liPVUhn69UxVUP5SOld0h%2BAnDqhSqtVnaZ37hC0oAxbtnxYoMNH%2F9c0GOqUBlW6IgBMqbGvDr0AOWRTMGS%2Bt%2BsLd%2BZdzdKq38grGCnYmuOnNRIJ7Uh21vf7bk1D7Wkz59%2FZjFLy8I9p0Thuj4unqIZLsxEwl%2FMNURwS9qgDWEhLSKv3KizVu8ZTaitykuNXRX6TzdIFxrDK3eQ1emnenGkR0dIZunYOIJ02sOUtXWJrAJhnsNFWQyNJtDzpPsK0lnZVcTdvr5sBG%2BBJcmMQKNhvl&X-Amz-Signature=f51eae10f5fdb604782ed2d11d9676f73a3d3e07f9fb3f7d43a2cd950a3f0fc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

